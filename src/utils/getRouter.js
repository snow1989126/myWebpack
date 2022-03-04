import React, { lazy, memo, Suspense } from 'react';
import { set } from 'lodash';
import HocKeepAlive from "hocComponents/hocKeepAlive";

const Login = lazy(() => import("pages/Login"));
const NotFound = lazy(() => import("pages/NotFound"));
const Home = lazy(() => import("pages/Home"))


const getMenuPath = (item, path = "") => {
  path = path + '/' + item.path;
  if (!item?.children?.length) return path
  return item?.children.map((i) => getMenuPath(i, path))
}


/**
 * 根据 pages 目录生成路径配置
 */
function generatePathConfig(meunList) {
  // 扫描 src/pages 下的所有具有路由文件
  const modules = require.context("../pages/Home", true, new RegExp(`(\\$.*)(js|jsx)$`, 'i'), 'lazy');
  let menuPathArr = [];
  meunList.forEach(f => {
    menuPathArr = menuPathArr.concat(getMenuPath(f).join('_').toLowerCase().split('_'))
  })

  let pathConfig = {};
  modules.keys().forEach((filePath) => {
    const routePath = filePath
      // 去除 src/pages 不相关的字符
      .replace('.', '')
      // 去除文件名后缀
      .replace(/\$/, '')
      .replace(/index?/, '')
      .replace(/.jsx?/, '')
      // 转换动态路由 $[foo].tsx => :foo
      .replace(/\$\[([\w-]+)]/, ':$1')
      // 转换以 $ 开头的文件
      .replace(/\$([\w-]+)/, '$1')
    // 以目录分隔
    // 使用 lodash.set 合并为一个对象 toLowerCase()
    const matchMenuRoutePath = routePath.toLowerCase().slice(0, -1)
    if (!!matchMenuRoutePath && menuPathArr.includes(matchMenuRoutePath)) {
      set(pathConfig, routePath.split('/'), { $: modules(filePath) });
    }
  });
  return pathConfig;
}

/**
 * 为动态 import 包裹 lazy 和 Suspense
 */
function wrapSuspense(importer, isKeepAlive) {
  if (!importer) {
    return undefined;
  }
  // 使用 React.lazy 包裹 () => import() 语法

  const Component = lazy(() => importer)
  // lazy(() => );
  const HocComponent = isKeepAlive ? HocKeepAlive(Component) : memo(Component)
  // 结合 Suspense，这里可以自定义 loading 组件
  return (
    <Suspense fallback={null}>
      <HocComponent />
    </Suspense>
  );
}

/**
 * 将文件路径配置映射为 react-router 路由
 */

function mapPathConfigToRoute(cfg) {
  // route 的子节点为数组
  return Object.entries(cfg).map(([routePath, child]) => {
    // 是否需要keepAlive 目前只有home不需要 这里需要根据具体的业务来定
    const isKeepAlive = routePath !== 'Home';
    // 否则为目录，则查找下一层级
    const { $, ...rest } = child;
    return {
      path: routePath,
      // layout 处理
      element: wrapSuspense($, isKeepAlive),
      // 递归 children
      children: mapPathConfigToRoute(rest),
    };
  });
}

function generateRouteConfig(menuList) {
  const { $, ...pathConfig } = generatePathConfig(menuList);
  // 提取跟路由的 layout
  return [
    {
      path: '/',
      element: wrapSuspense($),
      children: mapPathConfigToRoute(pathConfig),
    },
  ];
}


export default function routerEle(meunList) {
  const routeConfig = meunList?.length && generateRouteConfig(meunList);
  return [
    {
      path: "/", element: <Login />,
    },
    {
      path: "Home", element: <Home />,
      children: routeConfig?.[0]?.children?.[0]?.children.concat({ path: '*', element: <NotFound /> }),
    },
    { path: '*', element: <NotFound /> },
  ]
}

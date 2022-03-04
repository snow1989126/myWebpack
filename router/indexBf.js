/*
 * @Author: xiangxue 
 * @Date: 2022-03-03 09:40:41 
 * @Last Modified by:   xiangxue 
 * @Last Modified time: 2022-03-03 09:40:41 
 * @备份 router
 */


import React, { lazy, memo, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { set } from 'lodash';
import HocKeepAlive from "hocComponents/hocKeepAlive";




// const HomeChild = [
//   {
//     path: "new",
//     children: [
//       {
//         path: "forecast",
//         children: [
//           {
//             path: "weatherForecast",
//             element: <KeepAliveWeatherForecast />
//           }
//         ]
//       },
//       {
//         path: "pollutionMsg",
//         element: <KeepAlivePollutionMsg />
//       }
//     ]
//   },
//   {
//     path: "oneMap",
//     children: [
//       {
//         path: "warning",
//         element: <KeepAliveEarlyWarning />,
//         // children: [
//         //   {
//         //     path: "weatherForecast",
//         //     element: <WeatherForecast />,
//         //   }
//         // ]
//       }
//     ]
//   },
//   { path: '*', element: <NotFound /> },
// ];


const Login = lazy(() => import("pages/Login"));
const NotFound = lazy(() => import("pages/NotFound"));
// const Home = lazy(() => import("pages/Home"))
// const WeatherForecast = lazy(() => import("pages/WeatherForecast"));
// const PollutionMsg = lazy(() => import("pages/PollutionMsg"));
// const EarlyWarning = lazy(() => import("pages/EarlyWarning"));
// const KeepAlivePollutionMsg = HocKeepAlive(PollutionMsg);
// const KeepAliveWeatherForecast = HocKeepAlive(WeatherForecast);
// const KeepAliveEarlyWarning = HocKeepAlive(EarlyWarning);



/**
 * 根据 pages 目录生成路径配置
 */
function generatePathConfig() {
  // 扫描 src/pages 下的所有具有路由文件
  const modules = require.context("../src/pages", true, /(\$.*).(js|jsx)$/, 'lazy');
  let pathConfig = {};
  modules.keys().forEach((filePath) => {
    const routePath = filePath
      // 去除 src/pages 不相关的字符
      .replace('./', '')
      // 去除文件名后缀
      .replace(/.jsx?/, '')
      // 转换动态路由 $[foo].tsx => :foo
      .replace(/\$\[([\w-]+)]/, ':$1')
      // 转换以 $ 开头的文件
      .replace(/\$([\w-]+)/, '$1')
      // 以目录分隔
      .split('/')
      .filter(key => key !== 'index');
    // 使用 lodash.set 合并为一个对象
    console.log(routePath, 'routePath===')
    set(pathConfig, routePath, { $: modules(filePath) });
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

  const Component = lazy(() => importer);
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

function generateRouteConfig() {
  const { $, ...pathConfig } = generatePathConfig();
  // 提取跟路由的 layout
  return [
    {
      path: '/',
      element: wrapSuspense($),
      children: mapPathConfigToRoute(pathConfig),
    },
  ];
}

const routeConfig = generateRouteConfig();



const routerEle = [
  {
    path: "/", element: <Login />,
  },
  {
    ...routeConfig?.[0]?.children?.[0]
  },
  { path: '*', element: <NotFound /> },
]

export default function PageRoutes() {
  return useRoutes(routerEle);
}
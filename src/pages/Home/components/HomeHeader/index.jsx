import React, { memo, useState, useEffect } from 'react'
import { Layout, Menu } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";

const { Header } = Layout;

const HomeHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.userInfo);
  const userInfo = user ?? JSON.parse(localStorage.getItem('userInfo'));
  const { meunList, curMenu } = userInfo;

  // 两种情况选中菜单
  // 1.初始化 根据路由 反选 如果是home 就默认第一个
  // 2.点击菜单
  const { pathname } = useLocation();
  const routerArr = pathname.split('/').filter(f => !!f)
  const initRouter = [routerArr?.[0]]
  const [menuSelectedKey, setMenuSelectedKey] = useState(initRouter)

  useEffect(() => {
    if (curMenu?.length) {
      setMenuSelectedKey(curMenu.map(m => m.path))
    }
  }, [user])

  useEffect(() => {
    saveCurInfo();
  }, [pathname])

  const handleSelect = ({ key }) => {
    const cMenu = meunList.filter(f => f.path === key);
    const cSubMenu = cMenu[0]?.children;
    userInfo.curMenu = cMenu;
    userInfo.curSubMenu = cSubMenu;
    const firstUrl = getFirstUrl(cMenu?.[0], cMenu?.[0]?.path);

    navigate(`/${firstUrl}`)
    saveCurInfo({ cMenu, cSubMenu })
  }

  const saveCurInfo = (info) => {
    const curPath = routerArr?.[1]
    const cMenu = meunList.filter(f => f.path === curPath)
    const cSubMenu = cMenu[0]?.children;
    userInfo.curMenu = info ? info.cMenu : cMenu;
    userInfo.curSubMenu = info ? info.cSubMenu : cSubMenu;
    dispatch({
      type: 'UPDATE_USER_INFO',
      userInfo: { ...userInfo }
    })
    localStorage.setItem('userInfo', JSON.stringify({ ...userInfo }))
  }

  const getFirstUrl = (menu, url) => {
    const childPath = menu.children?.[0]?.path
    return menu.children ? getFirstUrl(menu.children?.[0], `${url}/${childPath}`) : `home/${url}`;
  }

  return <Header className="header">
    <div className="logo">logo</div>
    <Menu theme="dark" mode="horizontal" selectedKeys={menuSelectedKey} onSelect={handleSelect}>
      {
        meunList.map(m => (<Menu.Item
          key={m.path}
        >
          {m.menuName}
        </Menu.Item>))
      }
    </Menu>
  </Header>
}

export default memo(HomeHeader)
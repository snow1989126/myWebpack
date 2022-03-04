import React, { memo, useState, useEffect } from 'react'
import { Menu } from 'antd';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from "react-router-dom";
// import Couter from '../../../WeatherForecast/couter'



const { SubMenu } = Menu;
const { Sider } = Layout;
const menuNode = { SubMenu, Item: Menu.Item }

const HomeLeft = () => {
  const { pathname } = useLocation();
  const routerArr = pathname.split('/').filter(f => !!f)
  const user = useSelector(state => state.userInfo);
  const userInfo = user ?? JSON.parse(localStorage.getItem('userInfo'));
  const { curSubMenu, curMenu } = userInfo;
  const [curMenuList, setCurMenuList] = useState(curSubMenu);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);

  useEffect(() => {
    if (curSubMenu?.length) {
      setCurMenuList(curSubMenu);
      setOpenKeys(routerArr.slice(0, routerArr.length - 1))
      setSelectedKeys(routerArr.slice(routerArr.length - 1))
    }
  }, [user])
  const handleOnOpenChange = (keys) => {
    console.log("keys", keys);
    setOpenKeys(keys)
  }
  const loopMenuList = (list = [], url) => {
    const SubMenuList = list.map(m => {
      const pPath = curMenu?.[0]?.path;  // 一级菜单路径
      const uri = url ? `${pPath}/${url}/${m.path}` : `${pPath}/${m.path}`;

      const MenuNode = m.children ? menuNode.SubMenu : menuNode.Item;
      const subNode = m.children ? loopMenuList(m.children, m.path) : <NavLink to={`${uri}`}>{m.menuName}</NavLink>
      return <MenuNode key={m.path} title={m.menuName}>{subNode}</MenuNode>
    })
    return SubMenuList
  }
  return <Sider width={220} className="site-layout-background menuLeft-box" >
    <Menu
      mode="inline"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={handleOnOpenChange}
      style={{ height: '100%', borderRight: 0 }}
    >
      {
        loopMenuList(curMenuList)
      }
    </Menu>
  </Sider>
}

export default memo(HomeLeft)
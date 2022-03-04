import React from "react";
import { Layout } from 'antd';
import {
  useOutlet,
  useLocation,
} from "react-router-dom";
import { useSelector } from 'react-redux';
import KeepingTabs from './components/KeepingTabs'
import HomeHeader from './components/HomeHeader'
import HomeLeft from './components/HomeLeft'
import './home.less'

const { Content } = Layout;
const Home = () => {
  const { pathname } = useLocation();
  const outlet = useOutlet()
  const user = useSelector(state => state.userInfo);
  const userInfo = user ?? JSON.parse(localStorage.getItem('userInfo'));

  const { curSubMenu } = userInfo;
  const routerArr = pathname.split('/').filter(f => !!f)
  const curItem = routerArr.slice(routerArr.length - 1) + '';
  return <Layout>
    <HomeHeader />
    {
      curSubMenu?.length
        ? <Layout className="mian-box">
          <HomeLeft />
          <Layout style={{ padding: '0 10px 10px 10px' }}>
            <KeepingTabs curItem={curItem} />
            <Content
              className="site-layout-background"
              style={{
                padding: 20,
                margin: 0,
                overflowY: 'auto',
                flex: 1
              }}
            >
              {outlet}
            </Content>
          </Layout>
        </Layout>
        : <div>欢迎</div>
    }
  </Layout >
}

export default Home;
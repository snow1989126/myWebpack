import React, { memo, forwardRef, useImperativeHandle } from 'react'
import KeepAlive from 'react-activation'
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';



const HocKeepAlive = (Component) => {

  let MemoKeepAlive = (props) => {
    const { myRef } = props;
    const { pathname } = useLocation();
    const routerArr = pathname.split('/').filter(f => !!f)
    const user = useSelector(state => state.userInfo);
    const userInfo = user ?? JSON.parse(localStorage.getItem('userInfo'));
    const { meunList } = userInfo;

    useImperativeHandle(myRef, () => ({
      // 可提供直接给父级调用的方法
    }));

    const getCurRouterItem = (curSubMenu, keys) => {
      const curParentItem = curSubMenu?.filter(f => keys.includes(f.path))?.[0];
      return curParentItem?.children?.length ? getCurRouterItem(curParentItem.children, keys) : curParentItem;
    }
    const curRouterItem = getCurRouterItem(meunList, routerArr);

    console.log(routerArr, meunList, pathname, curRouterItem);


    return <KeepAlive title={curRouterItem.menuName} name={curRouterItem.path} path={pathname} saveScrollPosition="screen">
      <Component />
    </KeepAlive>
  }

  MemoKeepAlive = memo(MemoKeepAlive)
  return forwardRef((props, ref) => <MemoKeepAlive {...props} hocRef={ref} />);
}

export default HocKeepAlive
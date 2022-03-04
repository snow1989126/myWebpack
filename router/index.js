import { useMemo } from 'react'
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import routerEle from '@/utils/getRouter'

export default function PageRoutes() {
  const user = useSelector(state => state.userInfo);
  const userInfo = user ?? JSON.parse(localStorage.getItem('userInfo'));
  const meunList = userInfo?.meunList;
  const routeTree = useMemo(() => routerEle(meunList), [meunList]);
  return useRoutes(routeTree);
}
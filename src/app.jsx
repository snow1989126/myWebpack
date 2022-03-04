import React, { Suspense } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { BrowserRouter as Router } from 'react-router-dom';
import PageRoutes from '../router/index';
import { AliveScope } from 'react-activation';

const appState = {
  userInfo: undefined
}

function reducers(state, action) {
  if (!state) return appState

  switch (action.type) {
    case 'UPDATE_USER_INFO':
      return {
        ...state,
        userInfo: {
          ...action.userInfo
        }
      }
    default:
      return state
  }
}


const store = createStore(reducers, applyMiddleware(thunk));


const App = () => {

  return <Provider store={store}>
    <ConfigProvider local={zhCN}>
      <Suspense fallback={<div>loading...</div>}>
        <Router>
          <AliveScope>
            <PageRoutes />
          </AliveScope>
        </Router>
      </Suspense>
    </ConfigProvider>
  </Provider>
}

export default App
import React from "react";
// import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from "antd";
import { useSelector, useDispatch, } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './login.less'


const mockUserInfo = {
  userName: 'admin',
  userId: '001',
  token: "xiangxue9527",
  meunList: [
    {
      menuName: '一级菜单一',
      menuId: '00101',
      isShow: true,
      path: 'new',
      children: [
        {
          menuName: '预报服务',
          menuId: '0010101',
          path: 'forecast',
          isShow: true,
          children: [
            {
              menuName: '天气预报',
              menuId: '001010101',
              path: 'weatherForecast',
              isShow: true,
            },
          ]
        },

        {
          menuName: '订单管理',
          menuId: '0010102',
          isShow: true,
          path: 'pollutionMsg',
        },
        {
          menuName: '突发事件管理',
          menuId: '0010103',
          isShow: true,
          path: 'tf',
        }
      ]
    },
    {
      menuName: '一级菜单二',
      menuId: '00102',
      isShow: true,
      path: 'oneMap',
      children: [
        {
          menuName: '预警',
          menuId: '0010201',
          path: 'EarlyWarning',
          isShow: true,
        }
      ]
    }
  ]
}

const Login = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userInfo)
  const navigate = useNavigate();

  const onFinish = (values) => {
    // 假装这里发送了一个请求 并获取到了用户信息
    dispatch({
      type: 'UPDATE_USER_INFO',
      userInfo: mockUserInfo
    })
    localStorage.setItem('userInfo', JSON.stringify(mockUserInfo))
    navigate('/home')
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return <div className="login">
    <div className="box">
      <h1 className="box-title">登录</h1>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>记住账号及密码</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
}

export default Login;
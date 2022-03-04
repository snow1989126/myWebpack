import React, { useState } from "react";

import { Table, Form, Button, DatePicker, InputNumber, Select } from 'antd';
// import Couter from './couter'

const { Option } = Select;
const WeatherForecast = () => {
  // const [show, setShow] = useState(true);

  const [form] = Form.useForm();

  const dataSource = [
    {
      key: '1',
      date: '2月12',
    },
    {
      key: '2',
      date: '2月12',
    },
    {
      key: '3',
      date: '2月12',
    },
    {
      key: '4',
      date: '2月12',
    },
    {
      key: '5',
      date: '2月12',
    },
    {
      key: '6',
      date: '2月12',
    },
    {
      key: '7',
      date: '2月12',
    },
    {
      key: '8',
      date: '2月12',
    },
    {
      key: '9',
      date: '2月12',
    },

  ];

  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    }
  ];

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  return  <div>
      {/* <Button onClick={() => { setShow(!show) }}>{show ? "隐藏" : "展示"}</Button>
      <Couter /> */}
      <Form layout="inline" onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <Form.Item
          label="年份"
          name="username"
          colon={false}
        >
          <DatePicker picker="year" width={100} />
        </Form.Item>
        <Form.Item
          label="气象专报（期） 第"
          name="qx"
          colon={false}
        >
          <InputNumber />
        </Form.Item>
        <div style={{ lineHeight: '32px' }}>期
          <span style={{ fontSize: '12px', color: '#ccc' }}>(更新至112期，即当前页面数据)</span>
        </div>
        <Form.Item
          label="流域"
          name="ly"
          style={{ marginLeft: '16px' }}
          colon={false}
        >
          <Select style={{ width: '150px' }}>
            <Option value={null}>全部</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginLeft: '16px', color: '#fff', }}>
            查询
          </Button>
        </Form.Item>
        <div style={{ flex: 1, textAlign: 'right' }}>
          <Button style={{ backgroundColor: '#DF783A', color: '#fff' }} >
            新增
          </Button>
          <Button style={{ marginLeft: '16px' }}>
            导出
          </Button>
        </div>
      </Form>
      <Table dataSource={dataSource} columns={[...columns]} rowKey="key" />
    </div>
}

export default WeatherForecast;
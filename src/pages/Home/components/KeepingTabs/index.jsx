import React, { useState } from 'react'
import { useAliveController } from 'react-activation'
import { Tabs } from 'antd';
import './KeepingTabs.less'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const { TabPane } = Tabs;

export default function KeepingTabs({ curItem }) {
  const [activeKey, setActiveKey] = useState()

  const { getCachingNodes,
    drop,
    // refresh
  } = useAliveController()
  const cachingNodes = getCachingNodes();
  const navigate = useNavigate();


  useEffect(() => {
    setActiveKey(curItem)
  }, [curItem])

  const handleOnChange = (activeKey) => {
    const curPath = cachingNodes.filter(f => f.name === activeKey)?.[0]?.path;
    setActiveKey(activeKey);
    navigate(curPath)
  }
  const handleOnEdit = (targetKey, action) => {
    switch (action) {
      case 'remove':
        return drop(targetKey)
      default:
        break;
    }
  }

  return (


    <Tabs
      type="editable-card"
      onChange={handleOnChange}
      activeKey={activeKey}
      onEdit={handleOnEdit}
      style={{ height: '45px', marginTop: '5px' }}
      hideAdd
    >
      {cachingNodes.map(node => (
        <TabPane tab={node.title} key={node.name} />
      ))}
    </Tabs>
  )
}

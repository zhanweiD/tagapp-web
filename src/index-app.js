import React from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import Group from './page-group'
import Search from './page-search'
import Scene from './page-scene'

import Frame from './frame'


const quickEntrance = [
  {
    tip: '审批管理',
    icon: 'approver',
    url: '/tag-model/index.html#/common/approval',
  },
  {
    tip: '后台配置',
    icon: 'setting',
    url: '/tag-model/index.html#/config/environment',
  },
  {
    tip: '项目管理',
    url: '/project/index.html#/project',
    icon: 'project',
  },
]


export default () => {
  return (
    <Frame
      productCode="tag_app"
      theme="ocean"
      logoText="标签中心"
      showAllProduct
      showSider
      showHeaderNav
      showProject
      quickEntrance={quickEntrance}
      onUserChange={() => window.location.href = '/tag-model/index.html#/overview'}
    >
      <Switch>
        {/* 数据查询 */}
        <Route path="/search" component={Search} />

        {/* 场景管理 */}
        <Route path="/scene" component={Scene} />

        {/* 群体洞察 */}
        <Route path="/group" component={Group} />

        <Redirect to="/group" />
      </Switch>
    </Frame>
  )
}

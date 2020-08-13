import React from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import * as dict from './common/dict'

import Group from './page-group'
import Search from './page-search'
import Scene from './page-scene'
import Config from './page-config'

import Frame from './frame'


const njkData = {
  dict,
}

window.njkData = njkData

const quickEntrance = [
  {
    label: '后台配置',
    icon: 'setting',
    url: '/tag-model/index.html#/config/environment',
  },
  {
    label: '审批管理',
    icon: 'approver',
    url: '/tag-model/index.html#/common/approval',
  },
  {
    tip: '项目管理',
    url: '/project/index.html',
    icon: 'project',
  },
]
function Entry() {
  return (
    <Frame 
      productCode="be_tag" 
      theme="ocean" 
      logoText="标签中心" 
      showAllProduct 
      showSider
      showHeaderNav 
      showProject
      quickEntrance={quickEntrance}
    >
      <Router>
        <Switch>
          {/* 数据查询 */}
          <Route path="/search" component={Search} />

          {/* 场景管理 */}
          <Route path="/scene" component={Scene} />

          {/* 群体洞察 */}
          <Route path="/group" component={Group} />

          {/* 群体洞察 */}
          <Route path="/config" component={Config} />

          <Redirect to="/group" />

        </Switch>
      </Router>

    </Frame>
  )
}


ReactDOM.render(<Entry />, document.getElementById('root'))

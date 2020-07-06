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

import Frame from './frame'


const njkData = {
  dict,
}

window.njkData = njkData

const quickEntrance = [
  {
    tip: '后台配置',
    icon: 'setting',
  },
]


function Entry() {
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
    >
      <Router>
        <Switch>
          {/* 数据查询 */}
          <Route path="/search" component={Search} />

          {/* 场景管理 */}
          <Route path="/scene" component={Scene} />

          {/* 群体洞察 */}
          <Route path="/group" component={Group} />

          <Redirect to="/group" />

        </Switch>
      </Router>

    </Frame>
  )
}


ReactDOM.render(<Entry />, document.getElementById('root'))

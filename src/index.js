import React from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import * as dict from './common/dict'

// import Group from './page-group'
// import Search from './page-search'
// import Scene from './page-scene'
import Config from './page-config'
import App from './index-app'

import Frame from './frame'


const njkData = {
  dict,
}

window.njkData = njkData

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

const commonConfig = {
  productCode: 'tag_app',
  theme: 'ocean', 
  logoText: '标签中心', 
  showAllProduct: true,
  showSider: true,
  showHeaderNav: true,
  showProject: true,
  quickEntrance,
  onUserChange: () => window.location.href = '/tag-model/index.html#/overview',
}

const urlHea = window.location.hash.split('/')[1]
let title = '标签中心'
if (urlHea === 'config') {
  title = '后台配置'
} else {
  title = '标签应用'
}
document.title = title

const frameComp = (Comp, cofig) => {
  return function frameHocComp() {
    return (
      <Frame
        {...commonConfig}
        {...cofig}
      >
        <Comp />
      </Frame>
    )
  }
}

function Entry() {
  return (
    <Router>
      <Switch>
        {/* 群体洞察 */}
        <Route path="/config" component={frameComp(Config, {productCode: 'tag_config'})} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  )
}


ReactDOM.render(<Entry />, document.getElementById('root'))

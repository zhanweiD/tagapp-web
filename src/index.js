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
import Search from './page-search'

// import GroupConfig from './page-group-config'
// import GroupManage from './page-group-manage'
// import PortrayalLabel from './page-portrayal'
// import GroupAnalyze from './page-group-analyze'
// import Scene from './page-scene'

import Frame from './frame'


const njkData = {
  dict,
}

window.njkData = njkData

function Entry() {
  return (
    <Frame 
      productCode="tag_app" 
      theme="ocean" 
      logoText="标签应用" 
      showAllProduct 
      showSider
      showHeaderNav 
      showProject
    >
      <Router>
        <Switch>
          {/* 数据查询 */}
          <Route path="/search" component={Search} />

          {/* 场景管理 */}
          {/* <Route path="/scene" component={Scene} /> */}

          {/* 群体洞察 */}
          {/* <Route path="/group" component={Group} /> */}


          {/* <Route path="/data-search" component={DataSearch} />
          <Route path="/group-config" component={GroupConfig} />
          <Route path="/group" component={GroupManage} />
          <Route path="/portrayal" component={PortrayalLabel} />
          {/* <Route exact path="/portrayal/:objId/:mainLabel" component={PortrayalLabel} /> */}
        
          {/* <Route path="/group-analyze" component={GroupAnalyze} /> */}
          {/* <Redirect to="/group" /> */}
          <Route
            render={() => {
              window.location.href = '/404'
            }}
          />
        </Switch>
      </Router>

    </Frame>
  )
}


ReactDOM.render(<Entry />, document.getElementById('root'))

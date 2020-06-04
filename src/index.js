import React from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import * as dict from './common/dict'

import MySearch from './page-my-search'
import DataSearch from './page-data-search'

import GroupConfig from './page-group-config'
import GroupManage from './page-group-manage'
import Scene from './page-scene'
import Project from './page-project'

const njkData = {
  dict,
}

window.njkData = njkData

export default class Entry extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/my-search" component={MySearch} />
          <Route path="/data-search" component={DataSearch} />
          <Route path="/group-config" component={GroupConfig} />
          <Route path="/group" component={GroupManage} />
          <Route path="/scene" component={Scene} />
          <Route path="/project" component={Project} />
          <Redirect to="/project" />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(<Entry />, document.getElementById('root'))

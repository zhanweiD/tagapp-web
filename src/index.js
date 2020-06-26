import React from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import * as dict from './common/dict'

import DataSearch from './page-data-search'
import GroupConfig from './page-group-config'
import GroupManage from './page-group-manage'
import PortrayalLabel from './page-portrayal'
import GroupAnalyze from './page-group-analyze'
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
          <Route path="/data-search" component={DataSearch} />
          <Route path="/group-config" component={GroupConfig} />
          <Route path="/group" component={GroupManage} />
          <Route path="/portrayal" component={PortrayalLabel} />
          <Route path="/scene" component={Scene} />
          <Route path="/project" component={Project} />
          <Route path="/group-analyze" component={GroupAnalyze} />
          <Redirect to="/project" />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(<Entry />, document.getElementById('root'))

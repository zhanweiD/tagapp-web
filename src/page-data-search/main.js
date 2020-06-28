
// 数据查询
import {Component} from 'react'
import {
  HashRouter as Router, Route, Switch,
} from 'react-router-dom'

import Frame from '../frame'

import DataSearch from './data-search'

export default class Page extends Component {
  render() {
    return (
      <Router>
        <Frame page="space" roductCode="stream" theme="ocean" logoText="数据开发" showAllProduct showSider showHeaderNav showProject>
          <Switch>
            <Route exact path="/data-search" component={DataSearch} />
            <Route
              render={() => {
                window.location.href = '/404'
              }}
            />
          </Switch>
        </Frame>
      </Router>
    )
  }
}

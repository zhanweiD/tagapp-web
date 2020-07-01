import {Component} from 'react'
import {
  HashRouter as Router, Route, Switch,
} from 'react-router-dom'

import Frame from '../frame'
import GroupAnalyze from './group-analyze'

export default class Page extends Component {
  render() {
    return (
      <Router>
        <Frame page="space" productCode="tag_app" theme="ocean" logoText="标签应用" showAllProduct showSider showHeaderNav showProject>
          <Switch>
            <Route exact path="/group-analyze/:groupId?/:time?" component={GroupAnalyze} />
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

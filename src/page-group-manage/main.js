import {Component} from 'react'
import {observer} from 'mobx-react'
import {
  HashRouter as Router, Route, Switch,
} from 'react-router-dom'

import Frame from '../frame'
import GroupConfig from './group-manage'
import UnitList from './unit-list'
import './main.styl'

@observer
export default class Page extends Component {
  render() {
    return (
      <Router>
        <Frame page="space">
          <Switch>
            <Route exact path="/group/manage" component={GroupConfig} />
            <Route exact path="/group/unit" component={UnitList} />
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

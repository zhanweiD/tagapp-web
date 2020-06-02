import {Component} from 'react'
import {observer} from 'mobx-react'
import {
  HashRouter as Router, Route, Switch,
} from 'react-router-dom'

import Frame from '../frame'
import GroupConfig from './config'
// import GroupBackConfig from './config/back-config'

@observer
export default class Page extends Component {
  render() {
    return (
      <Router>
        <Frame>
          <Switch>
            <Route exact path="/group-config" component={GroupConfig} />
            {/* <Route exact path="/group-back-config" component={GroupBackConfig} /> */}
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

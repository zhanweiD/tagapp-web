import {Component} from 'react'
import {observer} from 'mobx-react'
import {
  HashRouter as Router, Route, Switch,
} from 'react-router-dom'

import Frame from '../frame'

import MySearch from './my-search'
import Tql from './search-detail-tql'
import Visual from './search-detail-visual'

@observer
export default class Page extends Component {
  render() {
    return (
      <Router>
        <Frame page="space">
          <Switch>
            <Route exact path="/my-search" component={MySearch} />
            <Route exact path="/my-search/tql/:id" component={Tql} />
            <Route exact path="/my-search/visual/:id" component={Visual} />
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

import {Component} from 'react'
import {observer} from 'mobx-react'
import {
  HashRouter as Router, Route, Switch,
} from 'react-router-dom'

import Frame from '../frame'
import PortrayalLabel from './label'
import './main.styl'
@observer
export default class Page extends Component {
  render() {
    return (
      <Router>
        <Frame page="space" roductCode="stream" theme="ocean" logoText="数据开发" showAllProduct showSider showHeaderNav showProject>
          <Switch>
            <Route exact path="/portrayal" component={PortrayalLabel} />
            <Route exact path="/portrayal/:objId/:mainLabel" component={PortrayalLabel} />
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

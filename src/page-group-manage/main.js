import {Component} from 'react'
import {observer} from 'mobx-react'
import {
  HashRouter as Router, Route, Switch,
} from 'react-router-dom'

import Frame from '../frame'
import GroupConfig from './group-manage'
import GroupDetail from './group-detail'
import UnitList from './unit-list'
import RuleCreate from './rule-create'
import './main.styl'

@observer
export default class Page extends Component {
  render() {
    return (
      <Router>
        <Frame page="space" roductCode="stream" theme="ocean" logoText="数据开发" showAllProduct showSider showHeaderNav showProject>
          <Switch>
            <Route exact path="/group" component={GroupConfig} />
            <Route exact path="/group/manage/:id/:objId" component={GroupDetail} />
            {/* <Route exact path="/group/unit" component={UnitList} /> */}
            <Route exact path="/group/unit/:objId/:id/:queryDate" component={UnitList} />
            <Route exact path="/group/rule-create/:type?/:groupId?" component={RuleCreate} />
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

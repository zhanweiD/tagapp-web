import {useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import OnerFrame from '@dtwave/oner-frame' 

import GroupConfig from './group-manage'
import GroupDetail from './group-detail'
import UnitList from './unit-list'
import RuleCreate from './rule-create'
import './main.styl'

export default () => {
  const ctx = OnerFrame.useFrame()
  useEffect(() => {
    ctx.querySiderMenus({
      productCode: 'tag_app',
      parentId: 0,
    })
  }, [])

  return (
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
  )
}

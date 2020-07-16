import {useEffect} from 'react'
import OnerFrame from '@dtwave/oner-frame' 
import {Route, Switch, Redirect} from 'react-router-dom'

import GroupManage from './group-manage'
import GroupDetail from './group-detail'
import UnitList from './unit-list'
import RuleCreate from './rule-create'
import RuleDetail from './rule-detail'

import GroupAnalyze from './group-analyze'

import PortrayalLabel from './portrayal'

const prePath = '/group'

export default () => {
  const ctx = OnerFrame.useFrame()

  useEffect(() => {
    ctx.querySiderMenus({
      productCode: 'tag_app',
    })
  }, [])

  return (
    <Switch>
      {/* 群体管理 */}
      <Route exact path={`${prePath}/manage`} component={GroupManage} />

      {/* 群体详情 */}
      <Route exact path={`${prePath}/manage/:id/:objId`} component={GroupDetail} /> 

      {/* 查看规则详情 */}
      <Route exact path={`${prePath}/manage/rule/:groupId/:objId`} component={RuleDetail} /> 

      {/* 个体列表 */}
      <Route exact path={`${prePath}/unit/:id/:objId/:queryDate`} component={UnitList} />
      
      {/* 实时/离线 群体创建/编辑 */}
      <Route exact path={`${prePath}/rule-create/:type?/:groupId?`} component={RuleCreate} />

      {/* 群体分析 */}
      <Route exact path={`${prePath}/analyze/:groupId?/:objId?/:time?`} component={GroupAnalyze} />

      {/* 微观画像 */}
      <Route exact path={`${prePath}/portrayal/:objId?/:mainLabel?`} component={PortrayalLabel} />

      {/* 群体配置 */}
      {/* <Route exact path={`${prePath}/config`} component={GroupConfig} /> */}

      <Redirect strict to={`${prePath}/manage`} />
    </Switch>
  )
}

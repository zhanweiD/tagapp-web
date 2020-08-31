import {useEffect} from 'react'
import OnerFrame from '@dtwave/oner-frame' 
import {Route, Switch, Redirect} from 'react-router-dom'

import GroupManage from './group-manage'
import GroupDetail from './group-detail'
import UnitList from './unit-list'
import RuleCreate from './rule-create'
import RuleDetail from './rule-detail'

import GroupAnalyze from './group-analyze'
import GroupContrast from './group-contrast'

import PortrayalLabel from './portrayal'
import Explain from './config-explain'

const prePath = '/group'

export default () => {
  const ctx = OnerFrame.useFrame()
  const projectId = ctx.useProjectId()
  useEffect(() => {
    ctx.useProject(true)
    if(projectId) {
      ctx.querySiderMenus({
        productCode: 'tag_app',
        projectId
      })
    }
  }, [projectId])

  return (
    <Switch>
      {/* 群体管理 */}
      <Route exact path={`${prePath}/manage`} component={GroupManage} />

      {/* 群体详情 */}
      <Route exact path={`${prePath}/manage/:id/:objId/:projectId`} component={GroupDetail} /> 

      {/* 查看规则详情 */}
      <Route exact path={`${prePath}/manage/rule/:groupId/:objId/:projectId`} component={RuleDetail} /> 

      {/* 个体列表 */}
      <Route exact path={`${prePath}/unit/:id/:objId/:queryDate/:projectId?`} component={UnitList} />
      
      {/* 实时/离线 群体创建/编辑 */}
      <Route exact path={`${prePath}/rule-create/:type?/:projectId?/:groupId?`} component={RuleCreate} />

      {/* 群体分析 */}
      <Route exact path={`${prePath}/analyze/:groupId?/:objId?/:projectId?/:time?`} component={GroupAnalyze} />

      {/* 群体对比 */}
      <Route exact path={`${prePath}/contrast`} component={GroupContrast} />

      {/* 微观画像 */}
      <Route exact path={`${prePath}/portrayal/:objId?/:mainLabel?/:projectId?`} component={PortrayalLabel} />

      {/* 配置说明 */}
      <Route exact path={`${prePath}/explain`} component={Explain} />

      <Redirect strict to={`${prePath}/manage`} />
    </Switch>
  )
}

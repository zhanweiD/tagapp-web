import {useEffect} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import OnerFrame from '@dtwave/oner-frame' 
// 我的查询
import MySearch from './page-my-search/my-search'
import Tql from './page-my-search/search-detail-tql'
import Visual from './page-my-search/search-detail-visual'

// 数据查询
import DataSearch from './page-data-search'

const prePath = '/search'

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
      {/* 我的查询 */}
      <Route exact path={`${prePath}/my-search`} component={MySearch} />
      <Route exact path={`${prePath}/my-search/tql/:id`} component={Tql} />
      <Route exact path={`${prePath}/my-search/visual/:id`} component={Visual} />
      {/* 数据查询 */}
      <Route exact path={`${prePath}/data-search`} component={DataSearch} />

      <Redirect strict to={`${prePath}/my-search`} />
    </Switch>
  )
}

/**
 * @description  后台配置
 */
import {useEffect} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import OnerFrame from '@dtwave/oner-frame' 

import GroupConfig from './group-config'
import SearchConfig from './search-config'

const prePath = '/config'

export default () => {
  const ctx = OnerFrame.useFrame()
  useEffect(() => {
    ctx.querySiderMenus({
      productCode: 'tag_config',
    })
  }, [])
  return (
    <Switch>
      <Route exact path={`${prePath}/group`} component={GroupConfig} />
      <Route exact path={`${prePath}/search`} component={SearchConfig} />
      <Redirect strict to={`${prePath}/group`} />
    </Switch>
  )
}

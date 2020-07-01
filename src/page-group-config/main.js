import {useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import OnerFrame from '@dtwave/oner-frame' 
import GroupConfig from './config'
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
      <Route exact path="/group-config" component={GroupConfig} />
      <Route
        render={() => {
          window.location.href = '/404'
        }}
      />
    </Switch>
  )
}

import {useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import OnerFrame from '@dtwave/oner-frame' 

import PortrayalLabel from './label'

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
      <Route exact path="/portrayal" component={PortrayalLabel} />
      <Route exact path="/portrayal/:objId/:mainLabel" component={PortrayalLabel} />
      <Route
        render={() => {
          window.location.href = '/404'
        }}
      />
    </Switch>
  )
}

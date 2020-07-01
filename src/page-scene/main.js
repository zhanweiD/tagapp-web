import {useEffect} from 'react'
import OnerFrame from '@dtwave/oner-frame' 
import {Route, Switch, Redirect} from 'react-router-dom'
import SceneList from './scene'
import SceneDetail from './scene-detail'
import TagList from './tag-list'

const prePath = '/scene'

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
      <Route exact path={`${prePath}`} component={SceneList} />
      <Route exact path={`${prePath}/:sceneId`} component={SceneDetail} /> 
      <Route exact strict path={`${prePath}/:sceneId/tags`} component={TagList} />
      <Redirect strict to={`${prePath}`} />
    </Switch>
  )
}

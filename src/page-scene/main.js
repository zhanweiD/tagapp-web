import {useEffect} from 'react'
import OnerFrame from '@dtwave/oner-frame' 
import {Route, Switch, Redirect} from 'react-router-dom'
import SceneList from './scene'
import SceneDetail from './scene-detail'
import TagList from './tag-list'

const prePath = '/scene'

export default () => {
  const ctx = OnerFrame.useFrame()
  const projectId = ctx.useProjectId()
  useEffect(() => {
    if (projectId) {
      ctx.querySiderMenus({
        productCode: 'tag_app',
        projectId,
      })
    }
  }, [projectId])
  return (
    <Switch>
      <Route exact path={`${prePath}`} component={SceneList} />
      <Route exact path={`${prePath}/:sceneId/:projectId?`} component={SceneDetail} /> 
      <Route exact strict path={`${prePath}/:sceneId/tags/:projectId?`} component={TagList} />
      <Redirect strict to={`${prePath}`} />
    </Switch>
  )
}

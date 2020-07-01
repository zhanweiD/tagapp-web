import {Route, Switch} from 'react-router-dom'
import SceneList from './scene'
import SceneDetail from './scene-detail'
import TagList from './tag-list'

export default () => {
  return (
    <Switch>
      <Route exact path="/scene" component={SceneList} />
      <Route exact path="/scene/:sceneId" component={SceneDetail} /> 
      <Route exact strict path="/scene/:sceneId/tags" component={TagList} />
      <Route
        render={() => {
          window.location.href = '/404'
        }}
      />
    </Switch>
  )
}

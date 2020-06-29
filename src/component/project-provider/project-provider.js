
/**
 * @description 项目组件
 */

import OnerFrame from '@dtwave/oner-frame'
import NoData from '../no-data'

export default PageComponent => {
  function ProjectProvider(props) {
    const ctx = OnerFrame.useFrame()
    const projectId = ctx.useProjectId()
  
    const noProjectDataConfig = {
      text: '没有任何项目，去创建项目吧！',
    }
    
    if (!projectId) {
      return (
        <NoData
          {...noProjectDataConfig}
        />
      )
    }

    return (
      <div style={{height: '100%'}}>
        <PageComponent key={projectId} projectId={projectId} {...props} />
      </div>
    )
  }
  return ProjectProvider
}

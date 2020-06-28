
/**
 * @description 项目组件
 */

import {Component, useEffect} from 'react'
import OnerFrame from '@dtwave/oner-frame'
import NoData from '../no-data'
import Loading from '../loading'

export default PageComponent => {
  function ProjectProvider() {
    const ctx = OnerFrame.useFrame()
    const projectId = ctx.useProjectId()
  
    // useEffect(() => {
    //   console.log(123)
    //   // DipperStore.getEnvList({projectId})
    //   // getUserList()
    //   // // TODO: 获取项目功能点列表
    // }, [projectId])

    // // 跳转到项目列表
    // goProjectList = () => {
    //   window.location.href = `${window.__keeper.pathHrefPrefix || '/'}/project`
    // }

    // renderNodata = () => {
    //   const {spaceInfo} = window
  
    //   const noProjectDataConfig = {
    //     btnText: '去创建项目',
    //     onClick: this.goProjectList,
    //     text: '没有任何项目，去项目列表页创建项目吧！',
    //     code: 'asset_tag_project_add',
    //     noAuthText: '没有任何项目',
    //   }
  
    //   if (spaceInfo && spaceInfo.finish && !spaceInfo.projectList.length) {
    //     return (
    //       <NoData
    //         {...noProjectDataConfig}
    //       />
    //     )
    //   }
    //   return <Loading mode="block" height={200} />
    // }  

    // render() {
    //   const {spaceInfo} = window
    //   return (
    //     <div style={{height: '100%'}}>

    //       {
    //         spaceInfo && spaceInfo.projectId && spaceInfo.projectList && spaceInfo.projectList.length
    //           ? (
    //             <PageComponent {...this.props} />
    //           ) : this.renderNodata()
    //       }
    //     </div>
    //   )
    // }
    console.log(projectId)
    return (
      <div style={{height: '100%'}}>
        <PageComponent key={projectId} projectId={projectId} />
      </div>
    )
  }
  return ProjectProvider
}

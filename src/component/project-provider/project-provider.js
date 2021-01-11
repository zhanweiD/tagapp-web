import intl from 'react-intl-universal'

/**
 * @description 项目组件
 */

import { useEffect, useState, Fragment } from 'react'
import OnerFrame from '@dtwave/oner-frame'
import { message } from 'antd'
import NoData from '../no-data'
import io from './io'
import { changeToOptions } from '../../common/util'
import ConfigModal from './configModal'
import Loading from '../loading'

export default PageComponent => {
  function ProjectProvider(props) {
    const ctx = OnerFrame.useFrame()
    const projectId = ctx.useProjectId()
    const [hasInit, changeHasInit] = useState(1)
    const [loading, changeLoading] = useState(true)
    const [visible, changeVisible] = useState(false)
    const [workspace, changeWorkspace] = useState([])

    const noProjectDataConfig = {
      text: (
        <span>
          {intl
            .get(
              'ide.src.component.project-provider.project-provider.x8ayz8ix51a'
            )
            .d('无可用项目 去')}

          <a
            target="_blank"
            className="a-href-color"
            onClick={() =>
              window.open('/project/index.html#/project', '_blank')
            }
          >
            {intl
              .get(
                'ide.src.component.project-provider.project-provider.84zbj029egm'
              )
              .d('项目管理')}
          </a>
          {/* <a target="_blank" className="a-href-color" rel="noopener noreferrer" href="/project/index.html#/project">项目管理</a> */}
          {intl
            .get(
              'ide.src.component.project-provider.project-provider.qog26xt8bxg'
            )
            .d('添加')}
        </span>
      ),
    }

    // 判断项目是否初始化
    async function judgeInit(id) {
      const res = await io.judgeInit({
        projectId: id,
      })

      changeLoading(false)
      changeHasInit(res)
    }

    // 获取环境列表
    async function getWorkspaceList(id) {
      const res = await io.getWorkspaceList({
        projectId: id,
      })

      let workspaceList = []
      if (res) {
        workspaceList = changeToOptions(res || [])(
          'workspaceName',
          'workspaceId'
        )
      }
      changeWorkspace(workspaceList)
    }

    // 初始化项目
    async function initProject(params) {
      const res = await io.initProject({
        ...params,
        projectId,
      })

      if (res) {
        changeVisible(false)
        changeHasInit(2)
        message.success(
          intl
            .get(
              'ide.src.component.project-provider.project-provider.0hn8wcvzdnii'
            )
            .d('环境初始化成功')
        )
      } else {
        message.error(
          intl
            .get(
              'ide.src.component.project-provider.project-provider.29e0pertctk'
            )
            .d('环境初始化失败')
        )
      }
    }

    useEffect(() => {
      ctx.useProject(true)
      if (projectId) {
        judgeInit(projectId)
      }
    }, [projectId])

    const noDataConfig = {
      text: (
        <span>
          {intl
            .get(
              'ide.src.component.project-provider.project-provider.pa9oowbxkvd'
            )
            .d('该项目下，标签中心的环境未初始化，请到')}

          <a target="_blank" href="/tag-model/index.html#/config/environment">
            {intl
              .get(
                'ide.src.component.project-provider.project-provider.dxoovna00oh'
              )
              .d('后台配置-环境配置')}
          </a>
          {intl
            .get(
              'ide.src.component.project-provider.project-provider.qhjnicwcrh'
            )
            .d('中初始化标签中心的环境')}
        </span>
      ),
    }

    const noDataConfigC = {
      btnText: intl
        .get('ide.src.component.project-provider.project-provider.f3kjoyslsl')
        .d('初始化环境'),
      onClick: () => {
        getWorkspaceList(projectId)
        changeVisible(true)
      },
      text: intl
        .get('ide.src.component.project-provider.project-provider.q4iyhbe3bh')
        .d('该项目下，标签中心的环境未初始化'),
      code: 'tag_config:environment_config[u]',
      noAuthText: intl
        .get('ide.src.component.project-provider.project-provider.q4iyhbe3bh')
        .d('该项目下，标签中心的环境未初始化'),
    }

    const noDataConfig0 = {
      text: intl
        .get('ide.src.component.project-provider.project-provider.xota0gyuq4')
        .d('标签中心仅适配Hadoop集群'),
      noAuthText: intl
        .get('ide.src.component.project-provider.project-provider.xota0gyuq4')
        .d('标签中心仅适配Hadoop集群'),
    }

    if (!projectId) {
      return <NoData {...noProjectDataConfig} />
    }

    if (loading) {
      return <Loading mode="block" height={300} />
    }

    // 可配置未配置
    if (hasInit === 1) {
      return (
        <div className="h-100">
          <div className="content-header">
            {intl
              .get('ide.src.component.project-provider.back-config.xk10s1d4w8')
              .d('环境配置')}
          </div>
          <div
            className="header-page"
            style={{ minHeight: 'calc(100vh - 137px)', paddingTop: '15%' }}
          >
            {props.match.path === '/config/environment' ? (
              <NoData {...noDataConfigC} />
            ) : (
              <NoData {...noDataConfig} />
            )}

            <ConfigModal
              visible={visible}
              workspace={workspace}
              handleCancel={() => changeVisible(false)}
              submit={params => initProject(params)}
            />
          </div>
        </div>
      )
    }

    // 不可配置
    if (hasInit === 0) {
      return (
        <div className="h-100">
          <div className="content-header">
            {intl
              .get('ide.src.component.project-provider.back-config.xk10s1d4w8')
              .d('环境配置')}
          </div>
          <div
            className="header-page"
            style={{ minHeight: 'calc(100vh - 137px)', paddingTop: '15%' }}
          >
            <NoData {...noDataConfig0} />
          </div>
        </div>
      )
    }
    return (
      <div style={{ height: '100%' }}>
        <PageComponent key={projectId} projectId={projectId} {...props} />
      </div>
    )
  }
  return ProjectProvider
}

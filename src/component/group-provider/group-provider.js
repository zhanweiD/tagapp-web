

/**
 * @description 群体初始化
 */

import {useEffect, useState, Fragment} from 'react'
import OnerFrame from '@dtwave/oner-frame'
import {message} from 'antd'
import NoData from '../no-data'
import io from './io'
import ConfigModal from './configModal'
import Loading from '../loading'

export default PageComponent => {
  function GroupProvider(props) {
    const ctx = OnerFrame.useFrame()
    const projectId = ctx.useProjectId()
    const [hasInit, changeHasInit] = useState(false)
    const [loading, changeLoading] = useState(true)
    const [visible, changeVisible] = useState(false)
    const [dataType, changeDataType] = useState([])
    const [dataSource, changedataSource] = useState([])

    // 判断项目是否初始化
    async function judgeInit(id) {
      const res = await io.judgeInit({
        projectId: id,
      })
      changeLoading(false)
      changeHasInit(res)
    }

    // 获取数据源类型
    async function getDataTypeSource() {
      const res = await io.getDataTypeSource({
        projectId,
      })

      const result = res || []

      changeDataType(result)
    }

    // 获取数据源
    async function getDataSource(type) {
      const res = await io.getDataSource({
        projectId,
        dataStorageType: type,
      })

      const result = res || []

      changedataSource(result)
    }

    // 初始化项目
    async function groupInit(params) {
      const res = await io.groupInit({
        ...params,
        projectId,
      })

      if (res) {
        changeVisible(false)
        changeHasInit(true)
        message.success('初始化成功, 正在前往群体洞察配置')
        // 跳转至群体配置页面
        window.location.href = `${window.__keeper.pathHrefPrefix}/config/group`
      } else {
        message.error('初始化失败')
      }
    } 

    useEffect(() => {
      judgeInit(projectId)
    }, [projectId])
    

    const selectDataType = type => {
      getDataSource(type)
    }

    const noDataConfig = {
      text: '该项目下，群体洞察的数据源未初始化',
      btnText: '初始化数据源',
      onClick: () => {
        getDataTypeSource(projectId)
        changeVisible(true)
      },
      code: 'tag_config:group_config[u]',
      noAuthText: '该项目下，群体洞察的数据源未初始化',
    }

    if (loading) {
      return (
        <Loading mode="block" height={300} /> 
      )
    }

    if (!hasInit) {
      return (
        <Fragment>
          <div className="content-header">群体洞察</div>
          <div className="header-page" style={{paddingTop: '15%'}}>
            <NoData
              {...noDataConfig}
            />
          </div>
          <ConfigModal 
            visible={visible}
            dataType={dataType}
            dataSource={dataSource}
            selectDataType={selectDataType}
            onCancel={() => changeVisible(false)}
            onCreate={params => groupInit(params)}
            projectId={projectId}
          />
        </Fragment>
       
      )
    }

    return (
      <div style={{height: '100%'}}>
        <PageComponent key={projectId} projectId={projectId} {...props} />
      </div>
    )
  }
  return GroupProvider
}

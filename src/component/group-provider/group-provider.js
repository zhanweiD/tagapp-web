

/**
 * @description 群体初始化
 */

import {useEffect, useState, Fragment} from 'react'
import OnerFrame from '@dtwave/oner-frame'
import {message} from 'antd'
import NoData from '../no-data'
import io from './io'
import ConfigModal from './configModal'

export default PageComponent => {
  function GroupProvider(props) {
    const ctx = OnerFrame.useFrame()
    const projectId = ctx.useProjectId()
    const [hasInit, changeHasInit] = useState(false)
    const [visible, changeVisible] = useState(false)
    const [dataType, changeDataType] = useState([])
    const [dataSource, changedataSource] = useState([])

    // 判断项目是否初始化
    async function judgeInit(id) {
      // const res = await io.judgeInit({
      //   projectId: id,
      // })
      const res = true
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
        message.success('初始化成功')
        // 跳转至群体配置页面
        window.location.href = `${window.__keeper.pathHrefPrefix}/config/group-config`
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
      btnText: '去初始化',
      onClick: () => {
        getDataTypeSource(projectId)
        changeVisible(true)
      },
    }

    if (!hasInit) {
      return (
        <Fragment>
          <NoData
            {...noDataConfig}
          />
          <ConfigModal 
            visible={visible}
            dataType={dataType}
            dataSource={dataSource}
            selectDataType={selectDataType}
            onCancel={() => changeVisible(false)}
            onCreate={params => groupInit(params)}
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

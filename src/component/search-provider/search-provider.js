

/**
 * @description 数查询初始化
 */

import {useEffect, useState, Fragment} from 'react'
import OnerFrame from '@dtwave/oner-frame'
import NoData from '../no-data'
import io from './io'
import ConfigModal from './configModal'

export default PageComponent => {
  function GroupProvider(props) {
    const ctx = OnerFrame.useFrame()
    const projectId = ctx.useProjectId()
    const [hasInit, changeHasInit] = useState(true)
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
    async function getStorageType() {
      const res = await io.getStorageType({
        projectId,
      })

      const result = res || []

      changeDataType(result)
    }

    // 获取数据源
    async function getStorageList(type) {
      // const res = await io.getStorageList({
      //   projectId,
      //   dataStorageType: type,
      // })

      const res = [{
        storageId: 111,
        storageName: '111',
      }]

      const result = res || []

      changedataSource(result)
    }

    // 初始化项目
    async function initSearch(params) {
      const res = await io.initSearch({
        ...params,
        projectId,
      })

      if (res) {
        changeVisible(false)
        changeHasInit(true)
      }
    }

    useEffect(() => {
      judgeInit(projectId)
    }, [projectId])
    

    const selectDataType = type => {
      getStorageList(type)
    }

    const noDataConfig = {
      btnText: '去初始化',
      onClick: () => {
        getStorageType(projectId)
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
            onCreate={params => initSearch(params)}
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



/**
 * @description 数查询初始化
 */

import {useEffect, useState, Fragment} from 'react'
import OnerFrame from '@dtwave/oner-frame'
import {message} from 'antd'
import NoData from '../no-data'
import io from './io'
import ConfigModal from './configModal'
import Loading from '../loading'

export default PageComponent => {
  function SearchProvider(props) {
    const ctx = OnerFrame.useFrame()
    const projectId = ctx.useProjectId()
    const [hasInit, changeHasInit] = useState(false)
    const [loading, changeLoading] = useState(true)
    const [visible, changeVisible] = useState(false)
    const [dataType, changeDataType] = useState([])
    const [dataSource, changedataSource] = useState([])
    const [detailSource, changeDetailSource] = useState({})

    // 判断项目是否初始化
    async function judgeInit(id) {
      const res = await io.judgeInit({
        projectId: id,
      })
      changeLoading(false)
      changeHasInit(res)
    }

    // 获取数据源
    async function getStorageList(type) {
      const res = await io.getStorageList({
        projectId,
        storageType: type,
      })

      const result = res || []

      changedataSource(result)
    }

    // @observable defaultStorage = {}
    // @observable getDefaultLogin = true
    // @observable selecStorageType
    // 判断是否单一数据源
    async function getDefaultStorage() {
    // this.getDefaultLogin = true
      try {
        const res = await io.getDefaultStorage({
          projectId,
        })
      
        changeDetailSource(res || {})

        if (res) {
        // this.selecStorageType(res.storageType)
          getStorageList(res.storageType)
        }
      } catch (e) {
        console.log(e)
      } 
    }

    // 获取数据源类型
    async function getStorageType() {
      const res = await io.getStorageType({
        projectId,
      })

      const result = res || []

      changeDataType(result)
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
        message.success('初始化成功')
      } else {
        message.error('初始化失败')
      }
    }

    useEffect(() => {
      judgeInit(projectId)
      getDefaultStorage()
    }, [projectId])
    
    const noDataConfig = {
      text: <span>
      该项目下，数据分析的数据源未初始化，请到
        <a target="_blank" href="/tag-app/index.html#/config/search">后台配置-数据查询配置</a>
      中初始化数据分析的数据源
            </span>,
    }

    const noDataConfigC = {
      text: '该项目下，数据分析的数据源未初始化',
      btnText: '初始化数据源',
      onClick: () => {
        getStorageType(projectId)
        changeVisible(true)
      },
      code: 'tag_config:group_config[u]',
      noAuthText: '该项目下，数据分析的数据源未初始化',
    }

    if (loading) {
      return (
        <Loading mode="block" height={300} /> 
      )
    }

    if (!hasInit) {
      return (
        <div className="h-100">
          <div className="content-header">数据查询配置</div>
          <div className="header-page" style={{minHeight: 'calc(100vh - 137px)', paddingTop: '15%'}}>
            {
              props.match.path === '/config/search' ? (
                <NoData
                  {...noDataConfigC}
                />
              ) : (
                <NoData
                  {...noDataConfig}
                />
              )
            }
          </div>
          <ConfigModal 
            visible={visible}
            dataType={dataType}
            dataSource={dataSource}
            selectDataType={type => getStorageList(type)}
            onCancel={() => changeVisible(false)}
            onCreate={params => initSearch(params)}
            projectId={projectId}
            detailSource={detailSource}
          />
        </div>
       
      )
    }

    return (
      <div style={{height: '100%'}}>
        <PageComponent key={projectId} projectId={projectId} {...props} />
      </div>
    )
  }
  return SearchProvider
}

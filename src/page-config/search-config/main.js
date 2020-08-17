/**
 * @description 群体洞察配置
 */

import {useEffect, useState} from 'react'
import {FormOutlined} from '@ant-design/icons'
import {message, Button, Popconfirm} from 'antd'
import {projectProvider, searchProvider, Authority} from '../../component'
import ConfigModal from './modal'
import io from './io'
import {successTip, errorTip} from '../../common/util'

const GroupConfig = ({projectId}) => {
  const [config, changeConfig] = useState({})
  const [hasInit, changeHasInit] = useState(true)
  const [visible, changeVisible] = useState(false)
  const [dataType, changeDataType] = useState([])
  const [dataSource, changedataSource] = useState([])
  const [isInit, changeIsInit] = useState(true)

  // 获取配置信息
  async function searchConfig() {
    try {
      const res = await io.searchConfig({
        projectId,
      })
    
      changeConfig(res)
    } catch (error) {
      errorTip(error.message)
    }
  }

  // 获取数据源类型
  async function getStorageType() {
    try {
      const res = await io.getStorageType({
        projectId,
      })
  
      const result = res || []
  
      changeDataType(result)
    } catch (error) {
      errorTip(error.message)
    }
  }

  // 获取数据源
  async function getStorageList(type) {
    try {
      const res = await io.getStorageList({
        projectId,
        dataStorageType: type,
      })
  
      const result = res || []
  
      changedataSource(result)
    } catch (error) {
      errorTip(error.message)
    }
  }

  // 初始化项目
  async function initSearch(params) {
    try {
      const res = await io.initSearch({
        ...params,
        projectId,
      })
  
      if (res) {
        successTip('初始化成功')
        changeVisible(false)
        changeHasInit(true)
      }
    } catch (error) {
      errorTip(error.message)
    }
  }

  // 修改初始化项目
  async function updateSearch(params) {
    try {
      const res = await io.updateSearch({
        ...params,
        projectId,
        id: config.id,
      })
  
      if (res) {
        successTip('修改成功')
        changeVisible(false)
        changeIsInit(true)
        searchConfig()
      }
    } catch (error) {
      console.log(error)
      errorTip(error.message)
    }
  }

  useEffect(() => {
    searchConfig(projectId)
    getStorageType()
  }, [projectId])
  
  const editClick = () => {
    getStorageList(config.storageTypeId)
    changeVisible(true)
    changeIsInit(false)
  }

  const onCancel = () => {
    changeVisible(false)
    changeIsInit(true)
  }

  const onUpdate = params => {
    updateSearch(params)
  }

  const selectDataType = type => {
    getStorageList(type)
  }

  return (
    <div>
      <div className="content-header">数据查询配置</div> 
      <div className="header-page p24">
        <div className="config-data">
          <span>数据源配置</span>
          <Authority authCode="tag_config:search_config[u]">
            {/* <Popconfirm
              title="更改后原数据源中的“我的查询”将会失效，请谨慎操作。"
              onConfirm={editClick}
              onCancel={() => {}}
              okText="确认"
              cancelText="取消"
            >
              <Button type="primary">编辑</Button>
            </Popconfirm> */}
            <Button type="primary" onClick={editClick}>编辑</Button>
          </Authority>
        </div>
        {/* <h3>
          数据源配置
          <FormOutlined className="ml8" onClick={editClick} />
        </h3> */}
        <div className="search-config-item">
          <div className="search-config-label">数据源类型：</div>
          <div className="search-config-value">{config.storageType}</div>
        </div>
        <div className="search-config-item">
          <div className="search-config-label">数据源：</div>
          <div className="search-config-value">{config.storageName}</div>
        </div>
      </div>
      <ConfigModal 
        visible={visible}
        isInit={isInit}
        dataType={dataType}
        dataSource={dataSource}
        projectId={projectId}
        selectDataType={selectDataType}
        onCancel={onCancel}
        onUpdate={onUpdate}
        onCreate={params => initSearch(params)}
        config={config}
      />
    </div>
  )
}

export default projectProvider(searchProvider(GroupConfig))

/**
 * @description 群体洞察配置
 */

import {useEffect, useState} from 'react'
import {FormOutlined} from '@ant-design/icons'
import {message} from 'antd'
import {projectProvider, searchProvider, Authority} from '../../component'
import ConfigModal from './modal'
import io from './io'

const GroupConfig = ({projectId}) => {
  const [config, changeConfig] = useState({})
  const [hasInit, changeHasInit] = useState(true)
  const [visible, changeVisible] = useState(false)
  const [dataType, changeDataType] = useState([])
  const [dataSource, changedataSource] = useState([])

  async function searchConfig() {
    const res = await io.searchConfig({
      projectId,
    })
  
    changeConfig(res)
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
    const res = await io.getStorageList({
      projectId,
      dataStorageType: type,
    })

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
    searchConfig(projectId)
  }, [projectId])
  
  const editClick = () => {
    changeVisible(true)
    message.warning('不建议修改，修改后会影响之前的使用！')
    getStorageType()
    // getStorageList()
  }

  const onCancel = () => {
    changeVisible(false)
  }

  const selectDataType = type => {
    getStorageList(type)
  }

  return (
    <div>
      <div className="content-header">数据查询配置</div> 
      <div className="header-page p24">
        <h3>
          数据源配置
          <Authority authCode="tag_config:search_config[u]">
            <FormOutlined className="ml8" onClick={editClick} />
          </Authority>
        </h3>
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
        dataType={dataType}
        dataSource={dataSource}
        selectDataType={selectDataType}
        onCancel={onCancel}
        onCreate={params => initSearch(params)}
        config={config}
      />
    </div>
  )
}

export default projectProvider(searchProvider(GroupConfig))

import intl from 'react-intl-universal'
/**
 * @description 群体洞察配置
 */

import { useEffect, useState } from 'react'
import { FormOutlined } from '@ant-design/icons'
import { message, Button, Popconfirm } from 'antd'
import { projectProvider, searchProvider, Authority } from '../../component'
import ConfigModal from './modal'
import io from './io'
import { successTip, errorTip } from '../../common/util'

const SearchConfig = ({ projectId }) => {
  const [config, changeConfig] = useState({})
  const [hasInit, changeHasInit] = useState(true)
  const [visible, changeVisible] = useState(false)
  const [dataType, changeDataType] = useState([])
  const [dataSource, changedataSource] = useState([])
  const [detailSource, changeDetailSource] = useState({})
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
  async function getStorageList(type, cb) {
    try {
      const res = await io.getStorageList({
        projectId,
        storageType: type,
      })

      const result = res || []
      changedataSource(() => result)
      if (cb) cb(res[0] && res[0].storageId)
    } catch (error) {
      errorTip(error.message)
    }
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

  // 初始化项目
  async function initSearch(params) {
    try {
      const res = await io.initSearch({
        ...params,
        projectId,
      })

      if (res) {
        successTip(
          intl
            .get('ide.src.component.project-provider.store.9in28eyw43')
            .d('初始化成功')
        )
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
        successTip(
          intl
            .get('ide.src.page-config.group-config.store.087mgwwi2r64')
            .d('修改成功')
        )
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
    getDefaultStorage()
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

  const selectDataType = (type, cb) => {
    getStorageList(type, cb)
  }

  return (
    <div>
      <div className="content-header">
        {intl
          .get('ide.src.component.search-provider.search-provider.25z04aqqa0r')
          .d('数据查询配置')}
      </div>
      <div className="header-page p24">
        <div className="config-data">
          <span>
            {intl
              .get('ide.src.page-config.group-config.back-config.o8x5qevsg0e')
              .d('数据源配置')}
          </span>
          <Authority authCode="tag_config:search_config[u]">
            <Button type="primary" onClick={editClick}>
              {intl
                .get('ide.src.component.label-item.label-item.hemrpkpmmb8')
                .d('编辑')}
            </Button>
          </Authority>
        </div>
        <div className="search-config-item">
          <div className="search-config-label">
            {intl
              .get('ide.src.page-config.search-config.main.xc7371o87s')
              .d('数据源类型：')}
          </div>
          <div className="search-config-value">{config.storageType}</div>
        </div>
        <div className="search-config-item">
          <div className="search-config-label">
            {intl
              .get('ide.src.page-config.search-config.main.ocjxq7j8hm')
              .d('数据源：')}
          </div>
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
        detailSource={detailSource}
      />
    </div>
  )
}

// export default projectProvider(SearchConfig)
export default projectProvider(searchProvider(SearchConfig))

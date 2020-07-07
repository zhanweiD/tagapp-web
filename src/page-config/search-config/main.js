/**
 * @description 群体洞察配置
 */

import {useEffect, useState} from 'react'
import {projectProvider} from '../../component'

const GroupConfig = ({projectId}) => {
  const [config, changeConfig] = useState({})

  // 判断项目是否初始化
  async function searchConfig(id) {
    // const res = await io.searchConfig({
    //   projectId: id,
    // })

    const res = {
      storageName: 'ssssss',
      storageType: 'hive',
    }

    changeConfig(res)
  }

  useEffect(() => {
    searchConfig(projectId)
  }, [projectId])
  

  return (
    <div>
      <div className="content-header">数据查询配置</div> 
      <div className="header-page p24">
        <h3>数据源配置</h3>
        <div className="search-config-item">
          <div className="search-config-label">数据源类型：</div>
          <div className="search-config-value">{config.storageType}</div>
        </div>
        <div className="search-config-item">
          <div className="search-config-label">数据源：</div>
          <div className="search-config-value">{config.storageName}</div>
        </div>
      </div>
    </div>
  )
}

export default projectProvider(GroupConfig)

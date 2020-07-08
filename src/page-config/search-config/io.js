import ioContext from '../../common/io-context'
import {get, baseApi, post, dataSearch} from '../../common/util'

const api = {
  searchConfig: get(`${dataSearch}/search_config`), // 数据查询配置
  getStorageType: get(`${baseApi}/relGroup/storage_type`), // 获取数据源类型
  getStorageList: get(`${baseApi}/relGroup/storage_list`), // 获取数据源列表
  initSearch: post(`${dataSearch}/init`), // 初始化查询
} 

ioContext.create('searchConfig', api) 

export default ioContext.api.searchConfig

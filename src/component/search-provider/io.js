import ioContext from '../../common/io-context'
import {get, post, baseApi, dataSearch} from '../../common/util'

const api = {
  // 初始化
  getStorageType: get(`${baseApi}/relGroup/storage_type`), // 获取数据源类型
  getStorageList: get(`${baseApi}/relGroup/storage_list`), // 获取数据源列表
  initSearch: post(`${dataSearch}/init`), // 初始化查询
  judgeInit: get(`${dataSearch}/has_init`), // 是否初始化
} 

ioContext.create('searchInit', api) 

export default ioContext.api.searchInit

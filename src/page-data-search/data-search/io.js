import ioContext from '../../common/io-context'
import {get, post, baseApi, dataSearch} from '../../common/util'

const api = {
  // 初始化
  // initSearch: get(`${baseApi}/task/instance/result`),
  getStorageType: get(`${baseApi}/relGroup/storage_type`), // 获取数据源类型
  getStorageList: get(`${baseApi}/relGroup/storage_list`), // 获取数据源列表
  initSearch: post(`${dataSearch}/init`), // 初始化查询
  queryInstanceResult: post(`${baseApi}/task/instance/result`),
} 

ioContext.create('mySearch', api) 

export default ioContext.api.mySearch

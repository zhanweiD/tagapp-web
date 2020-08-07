import ioContext from '../../../common/io-context'
import {dataSearch, get, post, baseApi} from '../../../common/util'

const api = {
  getTagTree: get(`${dataSearch}/tql_tag_tree`), // 对象标签树（TQL）
  searchTree: get(`${dataSearch}/tql_tag_tree_search`), // 对象标签树（搜索）
  getFunTree: get(`${dataSearch}/function_list`), // 函数树
  runSearch: post(`${dataSearch}/run_search`), // 运行查询
  saveSearch: post(`${dataSearch}/save_search`), // 保存数据查询
  checkName: post(`${dataSearch}/checkName`), // 查询重名校验

  queryInstanceResult: post(`${baseApi}/task/instance/result`),

  getApiParams: post(`${dataSearch}/visual_api_param`), // 获取api请求返回参数
  getApiGroup: get(`${dataSearch}/api_group_list`), // 获取api分组列表
  createApi: post(`${dataSearch}/create_api`), // 创建api

  apiNameCheck: get(`${baseApi}/groupApi/existApiName`),
  apiPathCheck: get(`${baseApi}/groupApi/existApiPath`),
} 

ioContext.create('mySearchTql', api) 

export default ioContext.api.mySearchTql

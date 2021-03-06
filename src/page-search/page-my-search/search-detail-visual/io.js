import ioContext from '../../../common/io-context'
import {dataSearch, get, post, baseApi} from '../../../common/util'

const api = {
  getObjList: get(`${dataSearch}/visual_objs`), // 获取对象列表（可视化）
  getTagTree: get(`${dataSearch}/visual_tag_tree`), // 对象标签树（可视化）
  searchTree: get(`${dataSearch}/visual_tag_tree_search`), // 对象标签树（搜索）
  getObjectList: post(`${dataSearch}/visual_objs`), // 获取对象列表（可视化）

  getExpressionTag: get(`${dataSearch}/tag_list`), // 获取表达式标签

  runSearch: post(`${dataSearch}/run_search`), // 运行查询
  saveSearch: post(`${dataSearch}/update_search`), // 修改数据查询
  checkName: post(`${dataSearch}/checkName`), // 查询重名校验
  getApiParams: post(`${dataSearch}/visual_api_param`), // 获取api请求返回参数
  getApiGroup: get(`${dataSearch}/api_group_list`), // 获取api分组列表
  createApi: post(`${dataSearch}/create_api`), // 创建api
  getDetail: get(`${dataSearch}/search_info`), // 详情

  apiNameCheck: get(`${baseApi}/groupApi/existApiName`),
  apiPathCheck: get(`${baseApi}/groupApi/existApiPath`),
}

ioContext.create('mySearchVisaul', api) 

export default ioContext.api.mySearchVisaul

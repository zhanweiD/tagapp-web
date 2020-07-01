import ioContext from '../../../common/io-context'
import {dataSearch, get, post} from '../../../common/util'

const api = {
  // getObjList: get(`${dataSearch}/visual_objs`), // 获取对象列表（可视化）
  getTagTree: get(`${dataSearch}/tql_tag_tree`), // 对象标签树（TQL）
  getFunTree: get(`${dataSearch}/function_list`), // 函数树

  runSearch: post(`${dataSearch}/run_search`), // 运行查询
  saveSearch: post(`${dataSearch}/save_search`), // 保存数据查询
  checkName: post(`${dataSearch}/checkName`), // 查询重名校验
} 

ioContext.create('mySearchTql', api) 

export default ioContext.api.mySearchTql
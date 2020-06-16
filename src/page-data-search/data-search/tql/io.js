import ioContext from '../../../common/io-context'
import {dataSearch, get, post} from '../../../common/util'

const api = {
  getTagTree: get(`${dataSearch}/tql_tag_tree`), // 对象标签树（TQL）
  getFunTree: get(`${dataSearch}/function_list`), // 函数树

  // // 运行相关
  // runInstance: post(`${derivativeApi}/schema/runTql`), // 启动运行任务
  // searchLog: get(`${baseApi}/task/instance/log`), // 查询任务实例运行日志
  // queryInstanceResult: post(`${baseApi}/task/instance/result`), // 查询运行结果
} 

ioContext.create('mySearchTql', api) 

export default ioContext.api.mySearchTql

import ioContext from '../../common/io-context'
import {get, groupConfigApi, post} from '../../common/util'

// const baseApi = '/api/tagmodel/1_0_0'

const api = {
  judgeInit: get(`${groupConfigApi}/has_init`), // 项目是否初始化
  groupInit: post(`${groupConfigApi}/init`), // 初始化
  getDataTypeSource: get(`${groupConfigApi}/storage_type`), // 数据源类型列表
  getDataSource: get(`${groupConfigApi}/storage_list`), // 数据源列表
} 

ioContext.create('groupInit', api) 

export default ioContext.api.groupInit

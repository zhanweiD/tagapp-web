import ioContext from '../../common/io-context'
import {groupConfigApi, get, post} from '../../common/util'

const api = {
  getDataTypeSource: get(`${groupConfigApi}/relGroup/storage_type`), // 数据源类型下拉列表
  getDataSource: get(`${groupConfigApi}/relGroup/storage_list`), // 数据源列表
  delList: post(`${groupConfigApi}/relGroup/remove_entity`), // 移除实体
} 

ioContext.create('groupConfig', api) 

export default ioContext.api.groupConfig

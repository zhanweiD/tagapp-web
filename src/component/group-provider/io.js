import ioContext from '../../common/io-context'
import {get, post, groupConfigApi} from '../../common/util'

const baseApi = '/api/tagmodel/1_0_0'

const api = {
  judgeInit: get(`${baseApi}/oneProject/hasInit`), // 项目是否初始化
  groupInit: post('http://192.168.90.129:3000/mock/119/relGroup/init'), // 初始化云资源
  getDataTypeSource: get(`${groupConfigApi}/storage_type`), // 数据源类型列表
  getDataSource: get(`${groupConfigApi}/storage_list`), // 数据源列表
} 

ioContext.create('projectInit', api) 

export default ioContext.api.projectInit

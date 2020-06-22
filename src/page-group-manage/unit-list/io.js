import ioContext from '../../common/io-context'
import {get, post, groupApi, baseApi} from '../../common/util'

const api = {
  // getUnitList: get(`${groupApi}/individuals_list`), // 获取个体列表
  // outputUnitList: get(`${baseApi}/export/individuals`), // 导出个体列表
  // saveUnitList: post(`${groupApi}/add_individuals_group`), // 保存群体
  groupCheckName: post(`${groupApi}/checkName`), // 群体名称查重
  getUnitList: get('http://192.168.90.129:3000/mock/119/group/individuals_list'), // 获取个体列表
  outputUnitList: get('http://192.168.90.129:3000/mock/119/export/individuals'), // 导出个体列表
  saveUnitList: post('http://192.168.90.129:3000/mock/119/group/add_individuals_group'), // 保存群体
} 

ioContext.create('groupUnit', api) 

export default ioContext.api.groupUnit

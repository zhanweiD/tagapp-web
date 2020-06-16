import ioContext from '../../common/io-context'
import {get, post, unitListApi} from '../../common/util'

const api = {
  groupCheckName: get(`${unitListApi}/group/checkName`), // 个体列表
  outputUnitList: get(`${unitListApi}/group/checkName`), // 导出个体列表
} 

ioContext.create('unitList', api) 

export default ioContext.api.unitList

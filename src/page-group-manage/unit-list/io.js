import ioContext from '../../common/io-context'
import {get, post, groupApi} from '../../common/util'

const api = {
  groupCheckName: get(`${groupApi}/checkName`), // 个体列表
  outputUnitList: get(`${groupApi}/checkName`), // 导出个体列表
} 

ioContext.create('group', api) 

export default ioContext.api.group

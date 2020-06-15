import ioContext from '../../common/io-context'
import {get, post, groupManageApi} from '../../common/util'

const api = {
  groupCheckName: get(`${groupManageApi}/checkName`), // 个体列表
  outputUnitList: get(`${groupManageApi}/checkName`), // 导出个体列表
} 

ioContext.create('groupManage', api) 

export default ioContext.api.groupManage

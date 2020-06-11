import ioContext from '../../common/io-context'
import {get, post, groupManageApi} from '../../common/util'

const api = {
  groupCheckName: get(`${groupManageApi}/group/checkName`), // 个体列表
  outputUnitList: get(`${groupManageApi}/group/checkName`), // 导出个体列表
} 

ioContext.create('groupManage', api) 

export default ioContext.api.groupManage

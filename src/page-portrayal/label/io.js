import ioContext from '../../common/io-context'
import {groupConfigApi, get, post} from '../../common/util'

const api = {
  getEntityList: get(`${groupConfigApi}/obj_list`), // 实体列表
} 

ioContext.create('unitPortrait', api) 

export default ioContext.api.unitPortrait

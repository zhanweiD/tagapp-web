import ioContext from '../../common/io-context'
import {get, post, groupApi} from '../../common/util'

const api = {
  getEntityList: get(`${groupApi}/obj_list`), // 实体列表
  addGroup: post(`${groupApi}/add_group`), // 新建群体
  editGroup: post(`${groupApi}/edit_group`), // 编辑群体
  checkName: post(`${groupApi}/checkName`), // 群体名称查重
} 

ioContext.create('groupRule', api) 

export default ioContext.api.groupRule

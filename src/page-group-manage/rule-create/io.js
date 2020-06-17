import ioContext from '../../common/io-context'
import {get, post, groupApi} from '../../common/util'

const api = {
  getEntityList: get(`${groupApi}/group/obj_list`), // 实体列表
  addGroup: post(`${groupApi}/group/add_group`), // 新建群体
  editGroup: post(`${groupApi}/group/edit_group`), // 编辑群体
  checkName: post(`${groupApi}/group/checkName`), // 群体名称查重
} 

ioContext.create('groupRule', api) 

export default ioContext.api.groupRule

import ioContext from '../../common/io-context'
import {get, post, groupManageApi} from '../../common/util'

const api = {
  getEntityList: get(`${groupManageApi}/group/obj_list`), // 实体列表
  addGroup: post(`${groupManageApi}/group/add_group`), // 新建群体
  editGroup: post(`${groupManageApi}/group/edit_group`), // 编辑群体
  checkName: post(`${groupManageApi}/group/checkName`), // 群体名称查重
} 

ioContext.create('groupManage', api) 

export default ioContext.api.groupManage

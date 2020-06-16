import ioContext from '../../common/io-context'
import {get, post, groupManageApi} from '../../common/util'

const api = {
  getGroupList: get(`${groupManageApi}/group/group_page`), // 群体分页列表
  getEntityList: get(`${groupManageApi}/group/obj_list`), // 实体列表
  recheckName: post(`${groupManageApi}/group/checkName`), // 群体名称查重
} 

ioContext.create('groupManage', api) 

export default ioContext.api.groupManage

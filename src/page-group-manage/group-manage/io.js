import ioContext from '../../common/io-context'
import {get, post, groupApi, baseApi} from '../../common/util'

const api = {
  getGroupList: get(`${groupApi}/group_page`), // 群体分页列表
  getEntityList: get(`${groupApi}/obj_list`), // 实体列表
  getTagList: get(`${baseApi}/relGroup/tag_list`), // 标签列表
  recheckName: post(`${groupApi}/checkName`), // 群体名称查重
  addGroup: post(`${groupApi}/add_group`), // 新建群体
  editGroup: post(`${groupApi}/edit_group`), // 编辑群体
} 

ioContext.create('group', api) 

export default ioContext.api.group

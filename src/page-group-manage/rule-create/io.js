import ioContext from '../../common/io-context'
import {get, post, groupApi} from '../../common/util'

const api = {
  getEntityList: get(`${groupApi}/obj_list`), // 实体列表
  addGroup: post(`${groupApi}/add_group`), // 新建群体
  editGroup: post(`${groupApi}/edit_group`), // 编辑群体
  
  getDetail: get(`${groupApi}/get_group_edit`), // 编辑群体详情信息

  checkName: post(`${groupApi}/checkName`), // 群体名称查重

  getConfigTagList: get(`${groupApi}/obj_target_tag_list`), // 获取对象对应已同步的标签列表
  getRelList: get(`${groupApi}/relation_list`), // 获取对象对应的关系列表
  getOtherEntity: get(`${groupApi}/other_entity`), // 获取另一个实体对象
} 

ioContext.create('groupRule', api) 

export default ioContext.api.groupRule

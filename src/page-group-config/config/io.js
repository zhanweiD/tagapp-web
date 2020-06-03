import ioContext from '../../common/io-context'
import {groupConfigApi, get, post} from '../../common/util'

const api = {
  getPortrayal: get(`${groupConfigApi}/relGroup/project_storage`), // 获取画像信息
  groupInit: post(`${groupConfigApi}/relGroup/init`), // 初始化云资源
  getDataTypeSource: get(`${groupConfigApi}/relGroup/storage_type`), // 数据源类型下拉列表
  getDataSource: get(`${groupConfigApi}/relGroup/storage_list`), // 数据源列表
  getEntityList: get(`${groupConfigApi}/relGroup/obj_list`), // 实体列表
  getTagList: get(`${groupConfigApi}/relGroup/tag_list`), // 标签列表
  getEntityPage: get(`${groupConfigApi}/relGroup/entity_page`), // 实体分页列表
  getEntityInfo: get(`${groupConfigApi}/relGroup/entity_info`), // 实体配置信息
  addEntity: post(`${groupConfigApi}/relGroup/add_entity`), // 添加实体
  editEntity: post(`${groupConfigApi}/relGroup/edit_entity`), // 编辑实体
  delEntity: post(`${groupConfigApi}/relGroup/remove_entity`), // 移除实体
} 

ioContext.create('groupConfig', api) 

export default ioContext.api.groupConfig

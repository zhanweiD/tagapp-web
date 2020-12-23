import ioContext from '../../common/io-context'
import {relGroupApi, baseApi, get, post} from '../../common/util'

const api = {
  getPortrayal: get(`${relGroupApi}/project_storage`), // 获取画像信息
  groupInit: post(`${relGroupApi}/init`), // 初始化云资源
  hasInit: get(`${relGroupApi}/has_init`), // 是否初始化云资源
  updateInit: post(`${relGroupApi}/update_group_config`), // 初始化云资源
  getDataTypeSource: get(`${relGroupApi}/storage_type`), // 数据源类型列表
  getDataSource: get(`${relGroupApi}/storage_list`), // 数据源列表
  getEntityList: get(`${relGroupApi}/obj_list`), // 实体列表
  getTagList: get(`${relGroupApi}/tag_list`), // 标签列表
  getEntityPage: get(`${relGroupApi}/entity_page`), // 实体分页列表
  getEntityInfo: get(`${relGroupApi}/entity_info`), // 实体配置信息
  addEntity: post(`${relGroupApi}/add_entity`), // 添加实体
  editEntity: post(`${relGroupApi}/edit_entity`), // 编辑实体
  delEntity: post(`${relGroupApi}/remove_entity`), // 移除实体
  getAnalyzeTags: get(`${baseApi}/groupAnalysis/tags`), // 获取标签列表(无主标签)
  // getCompareTags: get(`${baseApi}/groupAnalysis/tags`), // 获取群体对比默认标签列表
} 

ioContext.create('groupConfig', api) 

export default ioContext.api.groupConfig

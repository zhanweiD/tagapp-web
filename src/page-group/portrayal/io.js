import ioContext from '../../common/io-context'
import {baseApi, get, post, groupApi} from '../../common/util'

const api = {
  getLabel: get(`${baseApi}/personalityAnalysis/features`), // 获取基本+显著特征
  getAllTags: get(`${baseApi}/personalityAnalysis/allTags`), // 获取全部标签
  tagAnalysis: get(`${baseApi}/personalityAnalysis/tag`), // 获取单个标签分析
  getAnalysis: get(`${baseApi}/personalityAnalysis/statistics`), // 获取特征分析
  getEntityList: get(`${groupApi}/obj_list`), // 实体列表
  getSearchList: get(`${baseApi}/personalityAnalysis/searchList`), // 搜索条件
  getPageList: get(`${baseApi}/personalityAnalysis/pageList`), // 个体列表
} 

ioContext.create('unitPortrait', api) 

export default ioContext.api.unitPortrait

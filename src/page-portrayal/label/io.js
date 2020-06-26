import ioContext from '../../common/io-context'
import {groupConfigApi, get, post, baseApi} from '../../common/util'

const api = {
  getEntityList: get(`${groupConfigApi}/obj_list`), // 实体列表
  getStatistics: get(`${baseApi}/personalityAnalysis/features`),
  getStatistics: get(`${baseApi}/personalityAnalysis/statistics`), // 显著特征分析
} 

ioContext.create('groupConfig', api) 

export default ioContext.api.groupConfig

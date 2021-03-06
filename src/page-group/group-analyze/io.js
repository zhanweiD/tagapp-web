import ioContext from '../../common/io-context'
import {get, groupAnalysis} from '../../common/util'

const api = {
  getObj: get(`${groupAnalysis}/cloudStorageObjs`), // 云资源对象下拉
  getGroup: get(`${groupAnalysis}/groups`), // 群体下拉列表
  getTags: get(`${groupAnalysis}/tags`), // 标签下拉
  getRoportion: get(`${groupAnalysis}/groupProportion`), // 群体占比
  getChart: get(`${groupAnalysis}/chart`), // 图统计
  getAnalyzeTag: get(`${groupAnalysis}/analyzeTags`), // 默认标签显示
} 

ioContext.create('groupAnalyze', api) 

export default ioContext.api.groupAnalyze

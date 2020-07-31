import ioContext from '../../common/io-context'
import {get, post, groupAnalysis, baseApi} from '../../common/util'

const api = {
  getObj: get(`${groupAnalysis}/cloudStorageObjs`), // 云资源对象下拉
  getGroup: get(`${groupAnalysis}/groups`), // 群体下拉列表
  getTags: get(`${groupAnalysis}/tags`), // 标签下拉
  getGroupCount: get(`${groupAnalysis}/groupCount`), // 群体个数
  groupOverlapCount: post(`${baseApi}/groupAnalysisComparison/groupOverlapCount`), // 群体个数
  getChart: post(`${baseApi}/groupAnalysisComparison/chart`), // 图统计
} 

ioContext.create('groupContrast', api) 

export default ioContext.api.groupContrast

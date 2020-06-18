import ioContext from '../../common/io-context'
import {baseApi, get, post} from '../../common/util'

const api = {
  getLabel: get(`${baseApi}/personalityAnalysis/features`), // 获取特征
  getAnalysis: get(`${baseApi}/personalityAnalysis/statistics`), // 获取特征分析
} 

ioContext.create('unitPortrait', api) 

export default ioContext.api.unitPortrait

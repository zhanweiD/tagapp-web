import ioContext from '../../common/io-context'
import {
  groupDetailsApi, get, post,
} from '../../common/util'

const api = {
  // getDetail: get(`${groupDetailsApi}/details`), // 群体详情
  // getHistoryBar: get(`${groupDetailsApi}/historyCount`), // 群体历史记录柱状图
  // getHistoryList: get(`${groupDetailsApi}/history`), // 群体历史记录列表
  getHistoryList: get('http://192.168.90.129:3000/mock/119/groupDetails/history'), // 群体历史记录列表
  getHistoryBar: get('http://192.168.90.129:3000/mock/119/groupDetails/historyCount'), // 群体历史记录柱状图
  getDetail: get('http://192.168.90.129:3000/mock/119/groupDetails/details'), // 群体历史记录列表
}

ioContext.create('groupDetails', api)

export default ioContext.api.groupDetails

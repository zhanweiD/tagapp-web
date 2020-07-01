import ioContext from '../../common/io-context'
import {
  groupDetailsApi, get, post, groupApi, groupConfigApi,
} from '../../common/util'

const api = {
  // getDetail: get(`${groupDetailsApi}/details`), // 群体详情
  getTagList: get(`${groupConfigApi}/tag_list`), // 标签列表
  // getHistoryBar: get(`${groupDetailsApi}/historyCount`), // 群体历史记录柱状图
  // getHistoryList: get(`${groupDetailsApi}/history`), // 群体历史记录列表
  getDetail: get('http://192.168.90.129:3000/mock/119/groupDetails/details'), // 群体详情
  getHistoryList: get('http://192.168.90.129:3000/mock/119/groupDetails/history'), // 群体历史记录列表
  getHistoryBar: get('http://192.168.90.129:3000/mock/119/groupDetails/historyCount'), // 群体历史记录柱状图
  // getApiList: get(`${groupApi}/api`), // 获取API列表
  // createApi: get(`${groupApi}/createApi`), // 创建API
  getApiList: get('http://192.168.90.129:3000/mock/119/group/api'), // 获取API列表
  createApi: get('http://192.168.90.129:3000/mock/119/group/createAPI'), // 创建API
}

ioContext.create('groupDetails', api)

export default ioContext.api.groupDetails

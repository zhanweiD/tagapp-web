import ioContext from '../../common/io-context'
import {
  groupDetailsApi, get, groupConfigApi, baseApi,
} from '../../common/util'

const api = {
  getDetail: get(`${groupDetailsApi}/details`), // 群体详情
  getTagList: get(`${groupConfigApi}/tag_list`), // 标签列表
  getHistoryBar: get(`${groupDetailsApi}/historyCount`), // 群体历史记录柱状图
  getHistoryList: get(`${groupDetailsApi}/history`), // 群体历史记录列表
  
  getApiList: get(`${baseApi}/groupApi/list`), // 获取API列表
  createApi: get(`${baseApi}/groupApi/create`), // 创建API
  getApiGroup: get(`${baseApi}/groupApi/groups`), // 分组信息
  checkName: get(`${baseApi}/groupApi/existApiName`), // api名称查重
  checkPath: get(`${baseApi}/groupApi/existApiPath`), // api路径查重
  // getApiTags: get(`${baseApi}/groupApi/outputTags`), // 输出标签
}

ioContext.create('groupDetails', api)

export default ioContext.api.groupDetails

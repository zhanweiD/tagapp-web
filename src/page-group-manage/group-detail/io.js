import ioContext from '../../common/io-context'
import {
  groupDetailsApi, get, post,
} from '../../common/util'

const api = {
  getDetail: get(`${groupDetailsApi}/detail`), // 场景详情
}

ioContext.create('groupDetails', api)

export default ioContext.api.groupDetails

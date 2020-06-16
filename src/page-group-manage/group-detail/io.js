import ioContext from '../../common/io-context'
import {
  groupManageApi, get, post,
} from '../../common/util'

const api = {
  getDetail: get(`${groupManageApi}/detail`), // 场景详情
}

ioContext.create('groupDetail', api)

export default ioContext.api.groupDetail

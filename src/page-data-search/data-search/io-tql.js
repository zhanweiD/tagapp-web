import ioContext from '../../common/io-context'
import {derivativeApi, get, post} from '../../common/util'

const api = {
  getTagTree: post(`${derivativeApi}/schema/tagsTreeSearch`), // 逻辑配置 - 标签树
  getFunTree: get(`${derivativeApi}/schema/functionTree`), // 逻辑配置 - 函数树
} 

ioContext.create('mySearchTql', api) 

export default ioContext.api.mySearchTql

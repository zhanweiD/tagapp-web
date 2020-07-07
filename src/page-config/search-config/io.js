import ioContext from '../../common/io-context'
import {groupConfigApi, get} from '../../common/util'

const api = {
  searchConfig: get(`${groupConfigApi}/search_config`), // 数据查询配置
} 

ioContext.create('searchConfig', api) 

export default ioContext.api.searchConfig

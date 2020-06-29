import ioContext from '../common/io-context'
import {get} from '../common/util'

const api = {
  getProjectList: get('/api/be-t/1_0_0/project/list'), // 项目列表
} 

ioContext.create('frame', api) 

export default ioContext.api.frame

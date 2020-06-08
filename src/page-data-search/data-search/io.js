import ioContext from '../../common/io-context'
import {get, post, baseApi} from '../../common/util'

const api = {
  queryInstanceResult: post(`${baseApi}/task/instance/result`),
} 

ioContext.create('mySearch', api) 

export default ioContext.api.mySearch

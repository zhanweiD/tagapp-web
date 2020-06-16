import ioContext from '../../common/io-context'
import {get, post, dataSearch} from '../../common/util'

const api = {
  getsearchList: get(`${dataSearch}/search_list`), // 获取查询列表
  
  edit: post(`${dataSearch}/get_search`), // 编辑查询
}   

ioContext.create('mySearch', api) 

export default ioContext.api.mySearch

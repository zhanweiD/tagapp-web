import ioContext from '../../../common/io-context'
import {get, post, dataSearch} from '../../../common/util'

const api = {
  getsearchList: get(`${dataSearch}/search_list`), // 获取查询列表
  edit: post(`${dataSearch}/edit_search`), // 编辑查询
  del: post(`${dataSearch}/delete_search`), // 删除查询
  checkName: post(`${dataSearch}/checkName`), // 查询重名校验
}   

ioContext.create('mySearch', api) 

export default ioContext.api.mySearch

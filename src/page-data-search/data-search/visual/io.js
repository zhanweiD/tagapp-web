import ioContext from '../../../common/io-context'
import {dataSearch, get, post} from '../../../common/util'

const api = {
  getObjList: get(`${dataSearch}/visual_objs`), // 获取对象列表（可视化）
  getTagTree: get(`${dataSearch}/visual_tag_tree`), // 对象标签树（可视化）
  getObjectList: post(`${dataSearch}/visual_objs`), // 获取对象列表（可视化）

  
}

ioContext.create('dataSearchVisaul', api) 

export default ioContext.api.dataSearchVisaul

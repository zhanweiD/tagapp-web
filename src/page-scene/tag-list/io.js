import ioContext from '../../common/io-context'
import {sceneApi, get} from '../../common/util'

const api = {
  getList: get(`${sceneApi}/tagList`), // 标签列表
  getObjList: get(`${sceneApi}/objs`), // 对象下拉
}

ioContext.create('sceneTags', api)

export default ioContext.api.sceneTags

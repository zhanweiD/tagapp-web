import ioContext from '../../../common/io-context'
import {
  sceneApi, get, post,
} from '../../../common/util'

const api = {
  getCategoryList: get(`${sceneApi}/tree/list`), // 获取类目列表
  searchCategory: get(`${sceneApi}/tree/search`), // 搜索
  
  //* ------------------------------ 对象-相关接口 ------------------------------*//
  getSelectObj: get(`${sceneApi}/selectObj`), // 选择对象-下拉框内容 
  saveObj: get(`${sceneApi}/saveObj`), // 选择对象-保存
  deleteObject: get(`${sceneApi}/tree/obj/delObj`), // 对象-移除对象

  //* ------------------------------ 类目-相关接口 ------------------------------*//
  getCategoryDetail: get(`${sceneApi}/treeCat/obj/catDetail`), // 类目详情
  addObjCategory: get(`${sceneApi}/tree/obj/addCat`), // 对象-添加类目
  addCategory: get(`${sceneApi}/treeCat/obj/cat/addCat`), // 类目-添加类目
  editCategory: get(`${sceneApi}/treeCat/obj/cat/edit`), //  类目-编辑类目
  deleteCategory: get(`${sceneApi}/treeCat/obj/catDel`), // 类目-删除类目

  //* ------------------------------ 标签-相关接口 ------------------------------*//
  selectTag: get(`${sceneApi}/selectTags`), // 选择标签-树
  saveTag: post(`${sceneApi}/treeCat/obj/catSaveTag`), // 选择标签-保存
  deleteTag: get(`${sceneApi}/treeCat/tag/del`), // 标签 - 移除
  checkIsExist: get(`${sceneApi}/check_cat_name`), // 重名校验
}

ioContext.create('sceneTagCategory', api)

export default ioContext.api.sceneTagCategory

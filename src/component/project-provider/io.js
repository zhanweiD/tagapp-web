import ioContext from '../../common/io-context'
import {get, post} from '../../common/util'

const baseApi = '/api/tagmodel/current'

const api = {
  judgeInit: get(`${baseApi}/oneProject/hasInit`), // 项目是否初始化
  initProject: post(`${baseApi}/oneProject/initProjectWorkspace`), // 项目初始化
  getWorkspace: get(`${baseApi}/oneProject/getWorkspace`), // 查询工作控件
  getWorkspaceList: get(`${baseApi}/oneProject/workspaceList`), // 查询工作控件 获取环境列表
} 

ioContext.create('projectInit', api) 

export default ioContext.api.projectInit

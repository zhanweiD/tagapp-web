import {action, runInAction, observable} from 'mobx'
import {ErrorEater} from '@dtwave/uikit'
import {errorTip, listToTree} from '../../../common/util'

import io from './io'

class Store {
  // ************************* 函数树 & 标签树 start ************************* //
  @observable treeLoading = false

  @observable searchKey = undefined
  @observable expandAll = false
  @observable treeData = [] // 类目树数据
  @observable searchExpandedKeys = [] // 关键字搜索展开的树节点

  @action findParentId(id, data, expandedKeys) {
    data.forEach(item => {
      if (item.parentId !== 0 && item.id === id) {
        expandedKeys.push(item.parentId)
        this.findParentId(item.parentId, data, this.searchExpandedKeys)
      }
    })
  }

  // 获取 逻辑配置-标签树
  @action async getTagTree(cb) {
    this.treeLoading = true
    try {
      const res = await io.getTagTree({
        projectId: this.projectId,
        searchKey: this.searchKey,
      })
      runInAction(() => {
        this.treeLoading = false
        this.searchExpandedKeys.clear()

        let data = res

        // 判断是否进行搜索
        if (this.searchKey) {
          data = res.map(item => {
            // 关键字搜索定位
            if (this.searchKey && item.name.includes(this.searchKey)) {
              this.findParentId(item.id, res, this.searchExpandedKeys)
            }
            return item
          })
        }

        this.treeData = listToTree(data)

        if (cb)cb()
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      runInAction(() => {
        this.treeLoading = false
      })
    }
  }

  // 获取 逻辑配置-函数树
  @action async getFunTree() {
    this.treeLoading = true
    try {
      const res = await io.getFunTree()
      runInAction(() => {
        // this.treeData = listToTree(res)
        this.treeData = res.map(d => ({
          id: d,
          aId: d,
          name: d,
          parentId: 0,
        }))
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      runInAction(() => {
        this.treeLoading = false
      })
    }
  }

  // ************************* 函数树 & 标签树 end ************************* //

  @observable editor = null
  @observable codeRunSuccess = false
  @observable tqlDetail = {}

  // ************************* 代码编辑 & 日志 start *********************** //

  @observable taskInstanceId // 实例ID
  @observable usedTagIds // 提交需要
  
  // 是否显示日志，是否运行过
  @observable isRuned = false

  // ************************* 日志相关值 start************************* //
  @observable taskId = 'tag' // 配合组建 离线中存在多个人任务tab

  @observable isShowLog = true // 是否展示日志
  // 运行日志
  @observable runLog = ''
  // 清空日志
  @action clearLog = () => {
    this.runLog = ''
    this.runStatusMessage.message = ''
  }

  // 运行日志的最终状态的
  @observable runStatusMessage = {
    status: '',
    message: '',
    download: false,
  }

  // 日志是增量获取的，
  @observable logIndex = 0
  // 是否显示日志，是否运行过
  @observable isRuned = false

  // 运行结果 日志的arry
  @observable tableData = [{title: '运行日志', resultId: 'running_log'}]

  // 运行结果的tab key
  @observable resultActiveKey = 'running_log'

  // 运行日志是否全屏
  @observable logBoxToAllFlag = false
  @observable instanceStore = {}

  @action logBoxToAll = () => {
    const totalHeight = $('body').height()
    this.logBoxToAllFlag = !this.logBoxToAllFlag
    if (this.logBoxToAllFlag) {
      this.changeResultHeight(totalHeight - 30)
      this.logBoxDom.width($('body').width())
    } else {
      this.changeResultHeight(this.logBoxHeight)
      this.logBoxDom.width(640)
    }
  }

  @observable isMinLog = false
  beforeLogHeight = 0
  // 缩小日志，方便开发代码
  @action zoomInLogFun = () => {
    this.isMinLog = !this.isMinLog
    if (this.isMinLog) {
      this.beforeLogHeight = this.logBoxHeight
      this.logBoxHeight = 30
    } else {
      this.logBoxHeight = this.beforeLogHeight
      this.changeResultHeight(this.logBoxHeight)
    }
    this.setHeight()
  }
  // ************************* 日志相关值 end************************* //

  @observable contentBoxH = 0
  @observable codeBoxH = 0
  @observable logBoxHeight = 0

  // 获取高度
  @action getHeight = () => {
    this.contentBoxH = $('.processe-content').height() - 38 // 内容总高度（除去操作栏）
    this.codeBoxDom = $('#code_area')
    this.logBoxDom = $(`#log_${this.taskId}`)
    // 日志高度
    this.logBoxHeight = this.logBoxDom.height()

    this.codeBoxDom.height(this.contentBoxH - this.logBoxHeight)

    this.logBoxDom.height(this.logBoxHeight)
  }

  // // 获取code_area 的高度
  // @action getHeight = () => {
  //   const dom = document.getElementById(`new_codearea${this.taskItemInfo.taskId}`)
  //   const height = dom.clientHeight
  //   this.codeContentHeight = height
  //   this.codeBoxDom = $(`#new_codearea${this.taskItemInfo.taskId}`)
  //   this.logBoxDom = $(`#log_${this.taskItemInfo.taskId}`)
  // }

  // 日志拖拽
  @action changeHeight = (height, totalHeight) => {
    if (height < 400) return
    if (totalHeight - 168 < 200) return

    this.logBoxHeight = totalHeight - height - 50
    this.setHeight()
    this.changeResultHeight(totalHeight - height)
  }

  // 当日志框，resize时， 活着全屏的时候，去改变table的高度
  changeResultHeight = height => {
    this.tableData.map(item => {
      if (this[`resultTableHeight${item.taskInstance}${item.resultId}`]) {
        this[`resultTableHeight${item.taskInstance}${item.resultId}`].setHeight(height - 30)
      }
      return undefined
    })
  }

  // 设置高度
  @action setHeight() {
    if (this.logBoxHeight && this.contentBoxH) {
      const height = this.contentBoxH - this.logBoxHeight
      this.codeBoxDom.height(height)
      this.logBoxDom.height(this.logBoxHeight)
    }
  }

  // 日志的拖拽
  @action onDraggableLogMouseDown = () => {
    if (this.isMinLog) return
    const $body = $('body')
    let dragableCover = $('.dragable_cover')
    if (dragableCover.length > 0) {
      dragableCover.css('display', 'block')
    } else {
      dragableCover = $('<div class="dragable_cover"></div>')
      $('body').append(dragableCover)
    }
    dragableCover.css('cursor', 'ns-resize')
    $body.on('mousemove', ev => {
      this.changeHeight(ev.clientY, $body.height())
    })
    $body.on('mouseup', () => {
      dragableCover.css('display', 'none')
      $body.off('mousemove')
      $body.off('mouseup')
    })
  }

  // 运行结果的tab 删除
  @action onTabEdit = targetKey => {
    this.deleteResult(targetKey)
  }

  @action deleteResult = targetKey => {
    this.tableData = this.tableData.filter(item => `${item.taskInstance}${item.resultId}` !== targetKey)
    if (this.resultActiveKey === targetKey) {
      this.resultActiveKey = 'running_log'
    }
  }

  // 运行结果的tab的切换
  @action resultTabChange = activeKey => {
    this.resultActiveKey = activeKey
  }

  @observable fieldInfo = [] // 运行成功返回标签字段信息

  // 启动任务
  @action runTask = async (params, cb) => {
    try {
      const data = await io.runInstance({
        projectId: this.projectId,
        ...params,
      })

      runInAction(() => {
        if (data.type === 1) {
          this.runLog = 'TQL语法校验...\nwaiting...TQL语法校验成功\n 正在提交...\nwaiting...\n'
          this.fieldInfo = data.fieldInfo
          this.taskInstanceId = data.instanceId
          this.usedTagIds = data.usedTagIds
          this.runStatusMessage.message = ''
          this.logIndex = 0
          this.currentResultIndex = 0
          if (!this.isRuned) {
            this.logBoxHeight = 200
            this.setHeight()
          }
          this.isRuned = true
          this.getLog(this.taskInstanceId)
        } else {
          if (!this.isRuned) {
            this.logBoxHeight = 200
            this.setHeight()
          }
          this.isRuned = true
          this.runLog = `TQL语法校验...\nwaiting...\n \n错误信息：\n${data.log}`
          this.runStatusMessage.status = 'error'
          this.runStatusMessage.message = 'TQL语法校验失败'
        }
      })
     

      if (cb) cb(data)
    } catch (e) {
      ErrorEater({
        code: 0,
        message: e.message,
      }, '运行TQL失败')
    }
  }


  /**
  * @description 查询任务实例运行日志
  */

  @action getLog = async taskInstanceId => {
    try {
      const dataLog = await io.searchLog({
        taskInstanceId,
        nodeLogCurrentLine: this.logIndex,
      })
      // 判断是否下拉日志
      const $dom = $(`#content${this.taskId}`)
      // $dom如果不存在的话，估计是改标签被关闭了
      if (!$dom[0]) {
        return
      }
      const $dom2 = $(`#content2${this.taskId}`)
      let LogScrollFlag = false
      let LogScrollFlag2 = false

      runInAction(() => {
        if (dataLog.logContent) {
          // const logLimit = window.__keeper.logLimit || 1e4
          // readType 日志读取策略 0:覆盖1:追加
          if (dataLog.readType && dataLog.currentLine > this.logIndex) {
            // this.runLog = (dataLog.log && this.runLog.length > 5e5) ? dataLog.log : (this.runLog + dataLog.log)
            // this.runLog += dataLog.log
            const newLog = this.runLog + dataLog.logContent
            // if (newLog.length > logLimit) {
            //   newLog = newLog.slice(-logLimit)
            //   this.runStatusMessage.download = true
            // }
            this.runLog = newLog
          } else {
            const newLog = `正在提交...\nwaiting...\n${dataLog.logContent}`
            // if (newLog.length > logLimit) {
            //   newLog = newLog.slice(-logLimit)
            //   this.runStatusMessage.download = true
            // }
            this.runLog = newLog
          }
          this.logIndex = dataLog.currentLine
        }
        if (dataLog.resultList.length > this.currentResultIndex) {
          const uniqResultList = _.uniqBy(this.tableData.concat(dataLog.resultList),
            item => `${item.resultId}$$${item.taskInstance}`)
          this.tableData = uniqResultList
          this.currentResultIndex = dataLog.resultList.length
        }
        if (dataLog.isEnd) {
          // 运行终止
          let status = ''
          if (dataLog.resultList.length || dataLog.status === 0) {
            // 运行成功
            status = 'success'
            // if (this.taskItemInfo.type === 'task') {
            //   this.updateConfig()
            // }
          } else {
            // 运行失败
            status = 'error'
          }
          // _store.setCodeareaItemAttr(this.taskItemInfo.taskId, {
          //   isRunning: false,
          //   status,
          // })
          this.runStatusMessage.status = status

          if (dataLog.resultList.length) {
            this.runStatusMessage.message = '作业运行成功(Finished)\n\n\n'
          } else if ((dataLog.status < 0 && dataLog.status !== -4) || dataLog.status === 0) {
            // 当任务终止时，但是dataLog.status 不在这几个状态中 就显示 系统异常！
            this.runStatusMessage.message = `${dataLog.statusMessage}\n\n\n`
          } else {
            this.runStatusMessage.message = '系统异常！\n\n\n'
          }
        } else {
          // 运行未终止
          setTimeout(() => {
            this.getLog(taskInstanceId)
          }, 3000) // 这里变成3s 这是个临时方案，为了帮后端解决获取状态不对的bug，千万千万要督促后端去改。
        }
        if ($dom[0].clientHeight + $dom[0].scrollTop >= $dom[0].scrollHeight - 20) {
          LogScrollFlag = true
        }
        if ($dom2.length > 0 && $dom2[0].clientHeight + $dom2[0].scrollTop >= $dom2[0].scrollHeight - 20) {
          LogScrollFlag2 = true
        }
      })
      if (LogScrollFlag) {
        $dom.animate({scrollTop: $dom[0].scrollHeight}, 'fast')
      }
      if (LogScrollFlag2) {
        $dom2.animate({scrollTop: $dom2[0].scrollHeight}, 'fast')
      }
    } catch (e) {
      runInAction(() => {
        // _store.setCodeareaItemAttr(this.taskItemInfo.taskId, {
        //   isRunning: false,
        //   status: 'error',
        // })
        this.runStatusMessage.status = 'error'
        this.runStatusMessage.message = '网络不稳定，日志获取失败！'
      })
      ErrorEater(e, '获取日志')
    }
  }
}

export default new Store()

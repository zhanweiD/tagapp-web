import intl from 'react-intl-universal'
import { action, runInAction, observable } from 'mobx'
import { errorTip, successTip, failureTip } from '../../../common/util'
import io from './io'

class Store {
  projectId
  @observable cardList = []
  @observable loading = false
  @observable confirmLoading = false

  // 编辑数据查询
  @observable visibleEdit = false
  @observable detail = {}

  // 获取查询列表
  @action async getsearchList(params) {
    this.loading = true
    try {
      const res = await io.getsearchList({
        projectId: this.projectId,
        ...params,
      })

      runInAction(() => {
        this.cardList = res
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      this.loading = false
    }
  }

  // 编辑
  @action async edit(params, cb) {
    try {
      const res = await io.edit({
        ...params,
        projectId: this.projectId,
      })

      runInAction(() => {
        if (res) {
          successTip(
            intl
              .get('ide.src.page-config.group-config.store.hn8i6himken')
              .d('编辑成功')
          )
          if (cb) {
            cb()
          }
        } else {
          failureTip(
            intl
              .get(
                'ide.src.page-search.page-my-search.my-search.store.22lgsug52b5'
              )
              .d('编辑失败')
          )
        }
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      this.confirmLoading = false
    }
  }

  // 删除
  @action async del(params, cb) {
    try {
      const res = await io.del({
        ...params,
        projectId: this.projectId,
      })

      runInAction(() => {
        if (res) {
          successTip(
            intl
              .get('ide.src.page-config.group-config.store.w7vs6nlcpyc')
              .d('删除成功')
          )

          if (cb) cb()
        } else {
          failureTip(
            intl
              .get(
                'ide.src.page-search.page-my-search.my-search.store.2pwrzdkqafl'
              )
              .d('删除失败')
          )
        }
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 克隆
  @action async clone(id, cb) {
    try {
      const res = await io.clone({
        id,
        projectId: this.projectId,
      })

      runInAction(() => {
        if (res) {
          successTip(
            intl
              .get(
                'ide.src.page-search.page-my-search.my-search.store.7wa7tofvuvf'
              )
              .d('克隆成功')
          )
          if (cb) cb()
        } else {
          failureTip(
            intl
              .get(
                'ide.src.page-search.page-my-search.my-search.store.d8hml8wh2fh'
              )
              .d('克隆失败')
          )
        }
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 名称校验
  @action async checkName(params, cb) {
    try {
      const res = await io.checkName({
        projectId: this.projectId,
        ...params,
      })

      if (res.isExist) {
        cb(
          intl.get('ide.src.page-scene.scene.store.o9dgle1dglj').d('名称已存在')
        )
      } else {
        cb()
      }
    } catch (e) {
      errorTip(e.message)
    }
  }
}

export default new Store()

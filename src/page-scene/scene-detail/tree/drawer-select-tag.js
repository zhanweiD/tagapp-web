import intl from 'react-intl-universal'
/**
 * @description 选择标签
 */
import { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import { Drawer, Button, message } from 'antd'

import Tree from './select-tag-tree'
import List from './select-tag-list'

@inject('bigStore')
@inject('sceneDetail')
@observer
class SelectTag extends Component {
  constructor(props) {
    super(props)
    this.bigStore = props.bigStore
    this.store = this.bigStore.categoryStore
    this.sceneDetailStore = props.sceneDetail
  }

  @observable listRemoveItem

  @action destroy() {
    this.removeListItem = undefined
    this.store.selectTagData.clear()
    this.store.selectTagTreeData.clear()
    this.store.selectTagTableData.clear()
  }

  @action.bound closeDrawer() {
    const { modalVisible } = this.store
    modalVisible.selectTag = false
    this.removeListItem = undefined
    this.destroy()
  }

  @action.bound rightToTable(tagData) {
    this.store.selectTagTableData = tagData
  }

  @action.bound removeList(item) {
    this.store.selectTagTableData = this.store.selectTagTableData.filter(
      d => +d.id !== +item.id
    )
    this.listRemoveItem = item
  }

  @action.bound handleSubmit() {
    const { selectTagTableData } = this.store
    if (!selectTagTableData.length) {
      message.warning(
        intl
          .get('ide.src.page-group.component.ruleItem.7lfmm8bv64')
          .d('请选择标签')
      )
      return
    }

    const keys = selectTagTableData.map(d => d.id)

    this.store.saveTag(keys, () => {
      this.destroy()
      // 为了场景的标签数 大费周折
      this.sceneDetailStore.getDetail()
    })
  }

  render() {
    const {
      modalVisible: { selectTag },

      confirmLoading,
    } = this.store

    const drawerConfig = {
      title: intl
        .get('ide.src.page-group.component.fixedValue.4mptstd0fum')
        .d('选择标签'),
      visible: selectTag,
      width: 1120,
      closable: true,
      maskClosable: false,
      destroyOnClose: true,
      onClose: this.closeDrawer,
    }

    const treeConfig = {
      listRemoveItem: this.listRemoveItem,
      rightToTable: this.rightToTable,
      store: this.store,
    }

    const listConfig = {
      remove: this.removeList,
      store: this.store,
    }

    return (
      <Drawer {...drawerConfig}>
        <div className="select-tag-box">
          <div className="mb8">
            <span className="ml4 fs12">
              {intl
                .get(
                  'ide.src.page-scene.scene-detail.tree.drawer-select-tag.kcf6pg5cxgk'
                )
                .d('（若需要的标签不可选择，请先去“标签同步”模块完成')}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="/tag-model/index.html#/manage/tag-sync"
              >
                {intl
                  .get(
                    'ide.src.page-scene.scene-detail.tree.drawer-select-tag.cidtaucj1tb'
                  )
                  .d('标签数据的同步')}
              </a>
              ）
            </span>
          </div>
          <div className="select-tag-modal">
            <Tree {...treeConfig} />
            <List {...listConfig} />
            <div
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                background: '#fff',
                textAlign: 'right',
                padding: '10px 16px',
              }}
            >
              <Button onClick={this.closeDrawer} className="mr8">
                {intl
                  .get(
                    'ide.src.page-config.group-config.configModal.y7eepkatpi'
                  )
                  .d('取消')}
              </Button>
              <Button
                onClick={this.handleSubmit}
                type="primary"
                loading={confirmLoading}
              >
                {intl
                  .get(
                    'ide.src.page-config.group-config.configModal.pub6abalqca'
                  )
                  .d('确定')}
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
    )
  }
}
export default SelectTag

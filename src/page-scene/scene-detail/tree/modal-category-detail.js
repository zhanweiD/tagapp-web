import intl from 'react-intl-universal'
import { Component } from 'react'
import { Modal, Spin, Button } from 'antd'
import { action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Time } from '../../../common/util'
import { LabelItem } from '../../../component'

@inject('bigStore')
@observer
class ModalCategoryDetail extends Component {
  constructor(props) {
    super(props)
    this.bigStore = props.bigStore
    this.store = this.bigStore.categoryStore
  }

  @action.bound handleOnCancel() {
    this.store.modalVisible.readCategory = false
  }

  render() {
    const { cateDetail, modalVisible, detailLoading } = this.store
    const modalProps = {
      title: intl
        .get(
          'ide.src.page-scene.scene-detail.tree.modal-category-detail.ieu90fjl69a'
        )
        .d('类目详情'),
      visible: modalVisible.readCategory,
      maskClosable: false,
      width: 520,
      destroyOnClose: true,
      onCancel: this.handleOnCancel,
      footer: [
        <Button type="primary" onClick={this.handleOnCancel}>
          {intl
            .get('ide.src.component.modal-stroage-detail.main.i5xu8eg0n4')
            .d('关闭')}
        </Button>,
      ],
    }

    return (
      <Modal {...modalProps}>
        <Spin spinning={detailLoading}>
          <LabelItem
            labelWidth={90}
            label={intl
              .get(
                'ide.src.page-scene.scene-detail.tree.modal-category-detail.x19u2ktz0u8'
              )
              .d('类目名称')}
            value={cateDetail.name}
          />
          <LabelItem
            labelWidth={90}
            label={intl
              .get(
                'ide.src.page-scene.scene-detail.tree.modal-category-detail.mvsl0jh3vv'
              )
              .d('所属类目')}
            value={cateDetail.fullName || '--'}
          />
          <LabelItem
            labelWidth={90}
            label={intl
              .get('ide.src.page-scene.scene-detail.main.13xru7vjhjuj')
              .d('创建者')}
            value={cateDetail.cuser}
          />
          <LabelItem
            labelWidth={90}
            label={intl
              .get('ide.src.page-group.group-detail.main.z2pk6fwpxdm')
              .d('创建时间')}
            value={<Time timestamp={cateDetail.cdate} />}
          />
          <LabelItem
            labelWidth={90}
            label={intl
              .get('ide.src.component.modal-stroage-detail.main.m75jykdqa6')
              .d('描述')}
            value={cateDetail.descr}
          />
        </Spin>
      </Modal>
    )
  }
}

export default ModalCategoryDetail

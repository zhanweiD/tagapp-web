import intl from 'react-intl-universal'
import { Component } from 'react'
import { Modal, Button, Spin } from 'antd'
import ModalDetail from '../modal-detail'

export default class ModalStotageDetail extends Component {
  render() {
    const { visible, detail, loading = false, handleCancel } = this.props

    const content = [
      {
        name: intl
          .get('ide.src.component.modal-stroage-detail.main.edltvfgaao8')
          .d('名称'),
        value: detail.storageName,
      },
      {
        name: intl
          .get('ide.src.component.modal-stroage-detail.main.ue87prjax1')
          .d('资源组'),
        value: detail.relGroupName,
      },
      {
        name: intl
          .get('ide.src.component.modal-stroage-detail.main.8x99ox7ywd9')
          .d('类型'),
        value: detail.storageType,
      },
      {
        name: intl
          .get('ide.src.component.modal-stroage-detail.main.cauogtlry5m')
          .d('地址'),
        value: detail.connectUrl,
      },
      {
        name: intl
          .get('ide.src.component.modal-stroage-detail.main.chqxnbmf1fw')
          .d('数据库'),
        value: detail.dbName,
      },
      {
        name: intl
          .get('ide.src.component.modal-stroage-detail.main.tvk1cd0215')
          .d('用户名'),
        value: detail.userName,
      },
      {
        name: intl
          .get('ide.src.component.modal-stroage-detail.main.m75jykdqa6')
          .d('描述'),
        value: detail.descr,
      },
    ]

    const modalConfig = {
      title: intl
        .get('ide.src.component.modal-stroage-detail.main.uydkmt0e7a8')
        .d('查看数据源'),
      visible,
      onCancel: () => handleCancel(),
      maskClosable: false,
      width: 525,
      destroyOnClose: true,
      footer: [
        <Button onClick={() => handleCancel()}>
          {intl
            .get('ide.src.component.modal-stroage-detail.main.i5xu8eg0n4')
            .d('关闭')}
        </Button>,
      ],
    }

    return (
      <Modal {...modalConfig}>
        <Spin spinning={loading}>
          <ModalDetail data={content} />
        </Spin>
      </Modal>
    )
  }
}

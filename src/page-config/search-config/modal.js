import intl from 'react-intl-universal'
import React, { useState, useEffect } from 'react'
import { Modal, Form, Select, Input, Button, Popconfirm } from 'antd'

const { Option } = Select
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

const ConfigModal = ({
  visible,
  onCreate,
  onCancel,
  onUpdate,
  selectDataType,
  dataType,
  config,
  isInit,
  projectId,
  detailSource,
  dataSource,
}) => {
  const [form] = Form.useForm()

  const onChange = e => {
    selectDataType(e)
    // selectDataType(e, v => form.setFieldsValue({ dataStorageId: v }))
    // form.setFieldsValue({dataStorageId: undefined})
  }
  const modalConfig = {
    visible,
    title: isInit
      ? intl
          .get('ide.src.component.group-provider.configModal.bfrmtpmvxw')
          .d('初始化')
      : intl
          .get('ide.src.page-config.group-config.configModal.ei8tqkc9hsq')
          .d('修改初始化'),
    onCancel: () => {
      onCancel()
      form.resetFields()
    },
    destroyOnClose: true,
    maskClosable: false,
    footer: isInit
      ? [
          <Button
            style={{ marginRight: '8px' }}
            onClick={() => {
              onCancel()
              form.resetFields()
            }}
          >
            {intl
              .get('ide.src.page-config.group-config.configModal.y7eepkatpi')
              .d('取消')}
          </Button>,
          <Button
            type="primary"
            disabled={detailSource.storageId}
            onClick={() => {
              form
                .validateFields()
                .then(values => {
                  form.resetFields()
                  isInit ? onCreate(values) : onUpdate(values)
                })
                .catch(info => {
                  console.log('Validate Failed:', info)
                })
            }}
          >
            {intl
              .get('ide.src.page-config.group-config.configModal.pub6abalqca')
              .d('确定')}
          </Button>,
        ]
      : [
          <Button
            style={{ marginRight: '8px' }}
            onClick={() => {
              onCancel()
              form.resetFields()
            }}
          >
            {intl
              .get('ide.src.page-config.group-config.configModal.y7eepkatpi')
              .d('取消')}
          </Button>,
          <Popconfirm
            title={intl
              .get('ide.src.page-config.search-config.modal.7ai9msastp7')
              .d('更改后原数据源中的“我的查询”将会失效，请谨慎操作。')}
            disabled={detailSource.storageId}
            onCancel={() => {}}
            onConfirm={() => {
              form
                .validateFields()
                .then(values => {
                  form.resetFields()
                  isInit ? onCreate(values) : onUpdate(values)
                })
                .catch(info => {
                  console.log('Validate Failed:', info)
                })
            }}
            okText={intl
              .get('ide.src.page-config.group-config.configModal.ib8g44r6o1')
              .d('确认')}
            cancelText={intl
              .get('ide.src.page-config.group-config.configModal.y7eepkatpi')
              .d('取消')}
          >
            <Button disabled={detailSource.storageId} type="primary">
              {intl
                .get('ide.src.page-config.group-config.configModal.pub6abalqca')
                .d('确定')}
            </Button>
          </Popconfirm>,
        ],
  }

  return (
    <Modal
      {...modalConfig}
      // visible={visible}
      // title={isInit ? '初始化' : '修改初始化'}
      // onCancel={() => {
      //   onCancel()
      //   form.resetFields()
      // }}
      // destroyOnClose
      // maskClosable={false}
      // footer={[
      //   <Button onClick={() => {
      //     onCancel()
      //     form.resetFields()
      //   }}
      //   >
      //     取消
      //   </Button>,
      //   <Popconfirm
      //     title="更改后原数据源中的“我的查询”将会失效，请谨慎操作。"
      //     onCancel={() => {}}
      //     onConfirm={() => {
      //       form
      //         .validateFields()
      //         .then(values => {
      //           form.resetFields()
      //           isInit ? onCreate(values) : onUpdate(values)
      //         })
      //         .catch(info => {
      //           console.log('Validate Failed:', info)
      //         })
      //     }}
      //     okText="确认"
      //     cancelText="取消"
      //   >
      //     <Button type="primary">确定</Button>
      //   </Popconfirm>,
      // ]}
    >
      <Form form={form} name="form" {...formItemLayout}>
        <Form.Item
          name="dataStorageType"
          label={intl
            .get('ide.src.component.group-provider.configModal.lr6a4qimbzk')
            .d('数据源类型')}
          initialValue={config.storageTypeId || detailSource.storageType}
          rules={[
            {
              required: true,
              message: intl
                .get('ide.src.component.group-provider.configModal.x5ywhfokrrs')
                .d('请选择数据源类型'),
            },
          ]}
        >
          <Select
            placeholder={intl
              .get('ide.src.component.group-provider.configModal.x5ywhfokrrs')
              .d('请选择数据源类型')}
            disabled={detailSource.storageType}
            onChange={onChange}
            size="small"
            showSearch
            optionFilterProp="children"
            getPopupContainer={triggerNode => triggerNode.parentElement}
          >
            {dataType.map(d => (
              <Option value={d.type}>{d.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="dataStorageId"
          label={intl
            .get('ide.src.component.group-provider.configModal.emv6widuog')
            .d('数据源')}
          initialValue={config.storageId || detailSource.storageId}
          rules={[
            {
              required: true,
              message: intl
                .get('ide.src.component.group-provider.configModal.89ru2hsr0an')
                .d('请选择数据源'),
            },
          ]}
          extra={
            <span>
              {intl
                .get(
                  'ide.src.component.group-provider.configModal.0mwcc6wfg5wg'
                )
                .d('若无可用的数据源，请到')}

              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`/project/index.html?projectId=${projectId}#/detail/env`}
              >
                {intl
                  .get(
                    'ide.src.component.group-provider.configModal.q91fhtwldmm'
                  )
                  .d('项目管理-环境配置')}
              </a>
              {intl
                .get('ide.src.component.group-provider.configModal.q8xp8rn929s')
                .d('中添加数据源')}
            </span>
          }
        >
          <Select
            placeholder={intl
              .get('ide.src.component.group-provider.configModal.89ru2hsr0an')
              .d('请选择数据源')}
            disabled={detailSource.storageId}
            showSearch
            size="small"
            optionFilterProp="children"
            getPopupContainer={triggerNode => triggerNode.parentElement}
          >
            {dataSource.map(d => (
              <Option value={d.storageId}>{d.storageName}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default ConfigModal

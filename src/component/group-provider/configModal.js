import intl from 'react-intl-universal'
import React, { useState } from 'react'
import { Modal, Form, Select, Input } from 'antd'

const { Option } = Select
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

const ConfigModal = ({
  visible,
  onCreate,
  onCancel,
  selectDataType,
  dataType,
  projectId,
  dataSource,
}) => {
  const [form] = Form.useForm()

  const onChange = e => {
    selectDataType(e)
  }

  return (
    <Modal
      visible={visible}
      title={intl
        .get('ide.src.component.group-provider.configModal.bfrmtpmvxw')
        .d('初始化')}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            // form.resetFields()
            onCreate(values)
          })
          .catch(info => {
            console.log('Validate Failed:', info)
          })
      }}
      destroyOnClose
      maskClosable={false}
    >
      <Form form={form} name="form" {...formItemLayout}>
        <Form.Item
          name="dataStorageType"
          label={intl
            .get('ide.src.component.group-provider.configModal.lr6a4qimbzk')
            .d('数据源类型')}
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
            onChange={onChange}
            showSearch
            optionFilterProp="children"
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
            showSearch
            optionFilterProp="children"
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

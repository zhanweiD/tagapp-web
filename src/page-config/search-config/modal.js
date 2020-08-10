import React, {useState} from 'react'
import {Modal, Form, Select, Input} from 'antd'

const {Option} = Select
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
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
  dataSource}) => {
  const [form] = Form.useForm()

  const onChange = e => {
    selectDataType(e)
    form.setFieldsValue({dataStorageId: undefined})
  }

  return (
    <Modal
      visible={visible}
      title={isInit ? '初始化' : '修改初始化'}
      onCancel={onCancel}
      onOk={() => {
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
      destroyOnClose
      maskClosable={false}
    >
      <Form
        form={form}
        name="form"

        {...formItemLayout}
      >
        <Form.Item
          name="dataStorageType"
          label="数据源类型"
          initialValue={config.storageTypeId}
          rules={[
            {
              required: true,
              message: '请选择数据源类型',
            },
          ]}
        >
          <Select 
            placeholder="请选择数据源类型"
            onChange={onChange} 
            size="small"
            showSearch 
            optionFilterProp="children"
            getPopupContainer={triggerNode => triggerNode.parentElement}
          >
            {
              dataType.map(d => <Option value={d.type}>{d.name}</Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item 
          name="dataStorageId" 
          label="数据源"
          initialValue={config.storageId}
          rules={[
            {
              required: true,
              message: '请选择数据源',
            },
          ]}
        >
          <Select 
            placeholder="请选择数据源" 
            showSearch 
            size="small"
            optionFilterProp="children"
            getPopupContainer={triggerNode => triggerNode.parentElement}
          >
            {
              dataSource.map(d => <Option value={d.storageId}>{d.storageName}</Option>)
            }
          </Select>
        </Form.Item>
  
      </Form>
    </Modal>
  )
}
export default ConfigModal

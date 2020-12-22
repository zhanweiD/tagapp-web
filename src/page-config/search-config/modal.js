import React, {useState} from 'react'
import {Modal, Form, Select, Input, Button, Popconfirm} from 'antd'

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
  projectId,
  dataSource}) => {
  const [form] = Form.useForm()

  const onChange = e => {
    selectDataType(e, v => form.setFieldsValue({dataStorageId: v}))
    // form.setFieldsValue({dataStorageId: undefined})
  }
  const modalConfig = {
    visible,
    title: isInit ? '初始化' : '修改初始化',
    onCancel: () => {
      onCancel()
      form.resetFields()
    },
    destroyOnClose: true,
    maskClosable: false,
    footer: isInit ? (
      [
        <Button onClick={() => {
          onCancel()
          form.resetFields()
        }}
        >
          取消
        </Button>,
        <Button 
          type="primary"
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
            确定
        </Button>,
      ]
    ) : ([
      <Button onClick={() => {
        onCancel()
        form.resetFields()
      }}
      >
        取消
      </Button>,
      <Popconfirm
        title="更改后原数据源中的“我的查询”将会失效，请谨慎操作。"
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
        okText="确认"
        cancelText="取消"
      >
        <Button type="primary">确定</Button>
      </Popconfirm>,
    ]),
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
          extra={(
            <span>
              若无可用的数据源，请到
              <a target="_blank" rel="noopener noreferrer" href={`/project/index.html?projectId=${projectId}#/detail/env`}>项目管理-环境配置</a>
              中添加数据源
            </span>
          )}
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

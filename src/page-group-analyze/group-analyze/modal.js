import React, {Fragment} from 'react'
import {Modal, Select, Form, Radio} from 'antd'
import {action, observable} from 'mobx'
import {inject, observer} from 'mobx-react'

const {Option} = Select

@inject('store')
@observer
class ModalAdd extends React.Component {
  constructor(props) {
    super(props)
    this.store = props.store
    this.formRef = React.createRef()
  }

  @observable type = 0 // 0 文本 1 枚举 2 数值 3 日期

  @action.bound handleOk() {
    this.formRef.current
      .validateFields()
      .then(values => {
        // this.formRef.current.resetFields()
        this.props.add(values) 
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }

  @action.bound handleCancel() {
    this.store.modalVis = false
  }

  @action.bound onSelect(e) {
    const {tagList} = this.store
    
    const obj = tagList.filter(d => d.tagId === e)[0]

    this.type = obj.type
  }

  render() {
    const {modalVis, tagList} = this.store
    return (
      <Modal
        title="添加分析维度"
        visible={modalVis}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
        destroyOnClose
      >
        <Form
          layout="vertical"
          ref={this.formRef}
        >
          <Form.Item 
            label="标签" 
            name="tagId"
            rules={[{required: true, message: '请选择标签'}]}
          >
            <Select
              showSearch
              placeholder="请选择"
              allowClear
              style={{width: '100%'}}
              onSelect={this.onSelect}
            >
              {
                tagList.map(d => <Option value={d.tagId}>{d.columnName}</Option>)
              }
            </Select>
          </Form.Item>

          {
            this.type === 2 ? (
              <Form.Item 
                label="分组方式" 
                name="groupType"
                initialValue="3"
                rules={[{required: true, message: '请选择分组方式'}]}
              >
                <Radio.Group>
                  <Radio value="3">使用离散数字</Radio>
                  <Radio value="4">使用默认区间</Radio>
                </Radio.Group>
              </Form.Item>
            ) : null
          }

          {
            this.type === 3 ? (
              <Form.Item 
                label="分组方式" 
                name="groupType"
                initialValue="0"
                rules={[{required: true, message: '请选择分组方式'}]}
              >
                <Radio.Group>
                  <Radio value="0">不汇总</Radio>
                  <Radio value="1">按月汇总</Radio>
                  <Radio value="2">按年汇总</Radio>
                </Radio.Group>
              </Form.Item>
            ) : null
          }

          <Form.Item 
            label="图标" 
            name="chartType"
            initialValue="bar"
            rules={[{required: true, message: '请选择图标'}]}
          >
            <Radio.Group>
              <Radio value="bar">柱状图</Radio>

              {
                this.type !== 3 ? (
                  <Fragment>
                    <Radio value="loop">环形图</Radio>
                    <Radio value="acrossBar">条形图</Radio>
                    {/* <Radio value="pie">环形图</Radio> */}
                  </Fragment>
                ) : null
              }
              <Radio value="line">折线图</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default ModalAdd

import React from 'react'
import {Form, Button, Select, Input} from 'antd'
import {action} from 'mobx'
import {inject, observer} from 'mobx-react'

const {Option} = Select

@inject('store')
@observer
class Search extends React.Component {
  constructor(props) {
    super(props)
    this.store = props.store
    this.formRef = React.createRef()
  }
  
  @action.bound onFinish = values => {
    // if (values.mainLabel === this.store.mainLabel && values.objId === this.store.objId) return
    this.store.mainLabel = values.mainLabel
    this.store.objId = values.objId

    this.store.getLabel()
    this.store.getAnalysis()
    this.store.getAllTags()
  }

  @action.bound selectObj(e) {
    this.formRef.current.setFieldsValue({
      mainLabel: null,
    })
  }

  render() {
    const {entityList, objId, mainLabel} = this.store
    if (objId && this.formRef.current) {
      this.formRef.current.setFieldsValue({
        objId,
      })
    }

    return (
      <div>
        <Form
          layout="inline"
          hideRequiredMark
          ref={this.formRef}
          onFinish={this.onFinish}
          style={{marginTop: '12px'}}
        >
          <Form.Item 
            label="实体" 
            name="objId"
            initialValue={objId}
            rules={[{required: true, message: '请选择'}]}
          >
            <Select 
              style={{width: '196px'}} 
              placeholder="请选择实体"
              onChange={value => this.selectObj(value)}
              showSearch
              optionFilterProp="children"
            >
              {
                entityList.map(d => <Option key={d.objId}>{d.objName}</Option>)
              }
            </Select>
          </Form.Item>
          <Form.Item 
            label="实体主标签"
            name="mainLabel" 
            initialValue={mainLabel}
            rules={[{required: true, message: '请输入'}]}
          >
            <Input 
              style={{width: '196px'}} 
              placeholder="请输入" 
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">查询</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Search

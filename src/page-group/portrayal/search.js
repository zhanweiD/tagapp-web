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
    if (values.mainLabel === this.store.mainLabel && values.objId === this.store.objId) return
    this.store.mainLabel = values.mainLabel
    this.store.objId = values.objId
    this.props.search(values)
  }

  @action.bound selectObj(e) {
    this.formRef.current.resetFields(['mainLabel'])
  }

  render() {
    const {entityList} = this.store

    return (
      <div>
        <Form
          layout="inline"
          ref={this.formRef}
          onFinish={this.onFinish}
          style={{marginTop: '12px'}}
        >
          <Form.Item 
            label="实体" 
            name="objId"
            rules={[{required: true, message: '请选择'}]}
          >
            <Select 
              style={{width: '196px'}} 
              placeholder="请选择实体" 
              onChange={value => this.selectObj(value)}
            >
              {
                entityList.map(d => <Option value={d.objId}>{d.objName}</Option>)
              }
            </Select>
          </Form.Item>
          <Form.Item 
            label="实体主标签"
            name="mainLabel" 
            rules={[{required: true, message: '请输入'}]}
          >
            <Input 
              style={{width: '196px'}} 
              placeholder="请输入" 
              // disabled={!objId}
              // value={mainLabel} 
              // onChange={value => this.inputValue(value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">查询</Button>
            {/* <Button onClick={this.reset}>重置</Button> */}
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Search

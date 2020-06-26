import React from 'react'
import {Form, Input, Button, Radio, Select} from 'antd'
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
    this.props.search(values)
  }

  @action.bound selectObj(e) {
    this.store.objId = e
    this.formRef.current.resetFields(['id'])
    this.store.getGroup({
      objId: +this.store.objId, 
    })
  }

  @action.bound selectGroup(e) {
    this.store.groupId = e
  }

  // @action.bound reset() {
  //   this.formRef.current.resetFields()
  //   this.store.objId = undefined
  //   this.store.groupId = undefined
  // }

  render() {
    const {objList, groupList} = this.store

    return (
      <div>
        <Form
          layout="inline"
          ref={this.formRef}
          onFinish={this.onFinish}
        >
          <Form.Item 
            label="实体" 
            name="objId"
          >
            <Select
              showSearch
              placeholder="请选择"
              style={{width: 200}}
              onSelect={this.selectObj}
            >
              {
                objList.map(d => <Option value={d.objId}>{d.objName}</Option>)
              }
            </Select>
          </Form.Item>
          <Form.Item label="群体名称" name="id">
            <Select
              showSearch
              placeholder="请选择"
              style={{width: 200}}
              onSelect={this.selectGroup}
            >
              {
                groupList.map(d => <Option value={d.groupId}>{d.groupName}</Option>)
              }
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="mr8">查询</Button>
            {/* <Button onClick={this.reset}>重置</Button> */}
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Search

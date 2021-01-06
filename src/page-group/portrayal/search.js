import React from 'react'
import {Form, Button, Select, Input} from 'antd'
import {action} from 'mobx'
import {inject, observer} from 'mobx-react'

import {OmitTooltip} from '../../component'

const {Option} = Select

@inject('store')
@observer
class Search extends React.Component {
  constructor(props) {
    super(props)
    this.store = props.store
    this.formRef = React.createRef()
  }

  componentDidMount() {
    this.store.searchForm = this.formRef.current
  }
  
  @action.bound onFinish = values => {
    // if (values.mainLabel === this.store.mainLabel && values.objId === this.store.objId) return
    // this.store.mainLabel = values.mainLabel
    // this.store.objId = +values.objId
    // this.store.getLabel()
    // this.store.getAnalysis()
    // this.store.getAllTags()
    this.store.getPageList(values)
  }

  @action.bound selectObj(e) {
    this.store.objId = e
    this.formRef.current.setFieldsValue({
      tagId: undefined,
      keyword: undefined,
    })
    this.store.unitList = []
    this.store.mainLabel = null
    this.store.getSearchList()
  }

  render() {
    const {entityList, objId, mainLabel, searchList} = this.store
    if (objId && this.formRef.current) {
      this.formRef.current.resetFields(['objId'])
    }
    
    return (
      <div>
        <Form
          layout="inline"
          hideRequiredMark
          ref={this.formRef}
          onFinish={this.onFinish}
          style={{width: '523px', marginTop: '16px', display: 'flex'}}
        >
          <Form.Item 
            label="实体" 
            name="objId"
            initialValue={objId}
            rules={[{required: true, message: '请选择'}]}
          >
            <Select 
              style={{width: '156px'}} 
              placeholder="请选择实体"
              onChange={this.selectObj}
              showSearch
              optionFilterProp="children"
            >
              {
                entityList.map(d => <Option key={d.objId}>{d.objName}</Option>)
              }
            </Select>
          </Form.Item>
          <Input.Group style={{width: '239px'}} compact>
            <Form.Item 
              name="tagId" 
              // initialValue={searchList[0] ? searchList[0].tagId.toString() : undefined}
              rules={[{required: true, message: '请选择条件'}]}
            >
              <Select
                placeholder="请选择条件"
                style={{width: '96px'}} 
              >
                {
                  searchList.map(item => <Option key={item.tagId}><OmitTooltip maxWidth={128} text={item.tagName} /></Option>)
                }
              </Select>
            </Form.Item>
            <Form.Item 
              name="keyword" 
              rules={[{required: true, message: '请输入搜索内容'}]}
            >
              <Input 
                size="small"
                style={{width: '128px'}} 
                placeholder="请输入搜索内容" 
              />
            </Form.Item>
          </Input.Group>
          <Form.Item>
            <Button type="primary" htmlType="submit">查询</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Search

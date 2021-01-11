import intl from 'react-intl-universal'
import React from 'react'
import { Form, Button, Select } from 'antd'
import { action } from 'mobx'
import { inject, observer } from 'mobx-react'

const { Option } = Select

@inject('store')
@observer
class Search extends React.Component {
  constructor(props) {
    super(props)
    this.store = props.store
    this.formRef = React.createRef()
  }

  @action.bound onFinish = values => {
    // if (+values.id === +this.store.groupId && +values.objId === +this.store.objId) {
    //   return
    // }
    this.store.info.clear()
    this.store.chartTypeList = {}
    this.store.roportion = {}

    this.store.objId = values.objId
    this.store.groupId = values.id
    this.props.search(values)
  }

  @action.bound selectObj(e) {
    this.formRef.current.resetFields(['id'])
    this.store.getGroup({
      objId: +e,
    })
  }

  // @action.bound selectGroup(e) {
  //   this.store.groupId = e
  // }

  // @action.bound reset() {
  //   this.formRef.current.resetFields()
  //   this.store.objId = undefined
  //   this.store.groupId = undefined
  // }

  render() {
    const { objList, groupList } = this.store

    return (
      <div>
        <Form layout="inline" ref={this.formRef} onFinish={this.onFinish}>
          <Form.Item
            label={intl.get('ide.src.common.dict.eppgpvyn3fp').d('实体')}
            name="objId"
            rules={[
              {
                required: true,
                message: intl
                  .get(
                    'ide.src.component.project-provider.configModal.weidrlhbqho'
                  )
                  .d('请选择'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={intl
                .get(
                  'ide.src.component.project-provider.configModal.weidrlhbqho'
                )
                .d('请选择')}
              style={{ width: 200 }}
              onSelect={this.selectObj}
              optionFilterProp="children"
            >
              {objList.map(d => (
                <Option value={d.objId}>{d.objName}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={intl
              .get('ide.src.page-group.group-analyze.search.2ll7wsjzshl')
              .d('群体名称')}
            name="id"
            rules={[
              {
                required: true,
                message: intl
                  .get(
                    'ide.src.component.project-provider.configModal.weidrlhbqho'
                  )
                  .d('请选择'),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={intl
                .get(
                  'ide.src.component.project-provider.configModal.weidrlhbqho'
                )
                .d('请选择')}
              style={{ width: 200 }}
              // onSelect={this.selectGroup}
              optionFilterProp="children"
            >
              {groupList.map(d => (
                <Option value={d.groupId}>{d.groupName}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {intl
                .get('ide.src.component.list-content.search.rk9cxers0fj')
                .d('查询')}
            </Button>
            {/* <Button onClick={this.reset}>重置</Button> */}
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Search

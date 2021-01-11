import intl from 'react-intl-universal'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Input, Row, Col, Button, Select } from 'antd'

const FormItem = Form.Item
const { Option } = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 7 },
    // md: {span: 7},
    xl: { span: 6 },
    xxl: { span: 5 },
  },

  wrapperCol: {
    xs: { span: 17 }, // >=575
    // md: {span: 17}, // >=768
    xl: { span: 18 }, // >=1200
    xxl: { span: 19 }, // >=1600
  },
}

// const status = [{
//   key: 1,
//   label: '使用中',
// }, {
//   key: 2,
//   label: '未使用',
// }]

exports.SearchForm = Form.create({
  onFieldsChange: props => {
    props.onChange()
  },
})(props => {
  const {
    form: { getFieldDecorator },
    onSearch,
    onReset,
    objList,
  } = props

  return (
    <Form className="dt-form-column bgf mb16 p16">
      <Row>
        <Col span={8}>
          <FormItem
            {...formItemLayout}
            label={intl
              .get(
                'ide.src.page-scene.scene-detail.tree.select-tag-list.fa7jkcvn23a'
              )
              .d('标签名称')}
          >
            {getFieldDecorator('tagName')(
              <Input
                size="small"
                placeholder={intl
                  .get('ide.src.page-group.component.fixedValue.yf8vz03yizo')
                  .d('请输入')}
              />
            )}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem
            {...formItemLayout}
            label={intl
              .get('ide.src.page-scene.scene.modal.j1g9cmsu22g')
              .d('对象')}
          >
            {getFieldDecorator('objId')(
              <Select
                showSearch
                optionFilterProp="children"
                placeholder={intl
                  .get('ide.src.page-scene.tag-list.search-form.9e8kl3ohzv7')
                  .d('请下拉选择')}
              >
                <Option value="">
                  {intl
                    .get('ide.src.component.comp.search.r6a65smbvr')
                    .d('全部')}
                </Option>
                {objList.map(({ objId, objName }) => (
                  <Option key={objId} value={objId}>
                    {objName}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={8} style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={() => onSearch()}>
            {intl
              .get('ide.src.component.list-content.search.rk9cxers0fj')
              .d('查询')}
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => onReset()}>
            {intl
              .get('ide.src.component.list-content.search.zyghyo3clsq')
              .d('重置')}
          </Button>
        </Col>
      </Row>
    </Form>
  )
})

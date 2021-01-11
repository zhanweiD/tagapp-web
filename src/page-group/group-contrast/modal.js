import intl from 'react-intl-universal'
import React, { Fragment } from 'react'
import { Modal, Select, Form, Radio } from 'antd'
import { action, observable, toJS } from 'mobx'
import { inject, observer } from 'mobx-react'

const { Option } = Select

@inject('store')
@observer
class ModalAdd extends React.Component {
  constructor(props) {
    super(props)
    this.store = props.store
    this.formRef = React.createRef()
  }

  @observable type = 0 // 0 文本 1 枚举 2 数值 3 日期
  @observable tagId

  @action.bound handleOk() {
    const { modalEditInfo } = this.store

    this.formRef.current
      .validateFields()
      .then(values => {
        let { type } = this

        if (+modalEditInfo.tagId === +values.tagId) {
          type = modalEditInfo.type || this.type
        }
        const params = {
          ...values,
          type,
          tagId: values.tagId,
          chartType: values.chartType,
        }

        this.props.add(params, () => {
          this.handleCancel()
        })
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }

  @action.bound handleCancel() {
    this.store.modalVis = false
    this.store.modalEditInfo = {}
    this.tagId = undefined
    this.type = 0
  }

  @action.bound onSelect(e) {
    const { tagList } = this.store

    this.formRef.current.resetFields(['groupType', 'chartType'])
    this.store.modalEditInfo.type = 0
    this.store.modalEditInfo.chartType = 'bar'
    this.store.modalEditInfo.groupType = undefined

    const [obj] = tagList.filter(d => d.tagId === e)

    this.type = obj.type
    this.tagId = e
  }

  render() {
    const { modalVis, tagList, modalEditInfo, selectTagList } = this.store

    return (
      <Modal
        title={
          modalEditInfo.modalType === 'edit'
            ? intl
                .get('ide.src.page-group.group-analyze.modal.tdkb40cvj3r')
                .d('编辑分析维度')
            : intl
                .get('ide.src.page-group.group-analyze.modal.a3ms5c7myr')
                .d('添加分析维度')
        }
        visible={modalVis}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
        destroyOnClose
      >
        <Form layout="vertical" ref={this.formRef}>
          <Form.Item
            label={intl
              .get('ide.src.page-group.group-analyze.modal.fub10i07574')
              .d('标签')}
            name="tagId"
            rules={[
              {
                required: true,
                message: intl
                  .get('ide.src.page-group.component.ruleItem.7lfmm8bv64')
                  .d('请选择标签'),
              },
            ]}
            initialValue={modalEditInfo.tagId}
          >
            <Select
              showSearch
              placeholder={intl
                .get(
                  'ide.src.component.project-provider.configModal.weidrlhbqho'
                )
                .d('请选择')}
              allowClear
              style={{ width: '100%' }}
              onSelect={this.onSelect}
              optionFilterProp="children"
            >
              {tagList.map(d => (
                <Option
                  value={d.tagId}
                  disabled={
                    selectTagList.includes(d.tagId) &&
                    +d.tagId !== +modalEditInfo.tagId
                  }
                >
                  {d.tagName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {+modalEditInfo.type === 2 || +this.type === 2 ? (
            <Form.Item
              label={intl
                .get('ide.src.page-group.group-analyze.modal.c2vw1k7iotl')
                .d('分组方式')}
              name="groupType"
              initialValue={
                modalEditInfo.groupType
                  ? modalEditInfo.groupType.toString()
                  : '3'
              }
              rules={[
                {
                  required: true,
                  message: intl
                    .get('ide.src.page-group.group-analyze.modal.rjigzr4onwn')
                    .d('请选择分组方式'),
                },
              ]}
            >
              <Radio.Group>
                <Radio value="3">
                  {intl
                    .get('ide.src.page-group.group-analyze.modal.8uecqsp768u')
                    .d('使用离散数字')}
                </Radio>
                <Radio value="4">
                  {intl
                    .get('ide.src.page-group.group-analyze.modal.cyvi64w01k')
                    .d('使用默认区间')}
                </Radio>
              </Radio.Group>
            </Form.Item>
          ) : null}

          {+modalEditInfo.type === 3 || +this.type === 3 ? (
            <Form.Item
              label={intl
                .get('ide.src.page-group.group-analyze.modal.c2vw1k7iotl')
                .d('分组方式')}
              name="groupType"
              initialValue={
                modalEditInfo.groupType
                  ? modalEditInfo.groupType.toString()
                  : '0'
              }
              rules={[
                {
                  required: true,
                  message: intl
                    .get('ide.src.page-group.group-analyze.modal.rjigzr4onwn')
                    .d('请选择分组方式'),
                },
              ]}
            >
              <Radio.Group>
                <Radio value="0">
                  {intl
                    .get('ide.src.page-group.group-analyze.modal.u9osqeh0u1a')
                    .d('不汇总')}
                </Radio>
                <Radio value="1">
                  {intl
                    .get('ide.src.page-group.group-analyze.modal.ee4p9o3bo5p')
                    .d('按月汇总')}
                </Radio>
                <Radio value="2">
                  {intl
                    .get('ide.src.page-group.group-analyze.modal.3mc0n7d9z7l')
                    .d('按年汇总')}
                </Radio>
              </Radio.Group>
            </Form.Item>
          ) : null}

          <Form.Item
            label={intl
              .get('ide.src.page-group.group-analyze.modal.3wgddv4ed1x')
              .d('图表')}
            name="chartType"
            initialValue={modalEditInfo.chartType || 'bar'}
            rules={[
              {
                required: true,
                message: intl
                  .get('ide.src.page-group.group-analyze.modal.xwmglzbgys8')
                  .d('请选择图表'),
              },
            ]}
          >
            <Radio.Group>
              <Radio value="bar">
                {intl
                  .get('ide.src.page-group.group-analyze.modal.jqsq9v2y557')
                  .d('柱状图')}
              </Radio>

              {+modalEditInfo.type !== 3 || +this.type !== 3 ? (
                <Fragment>
                  {/* <Radio value="loop">环形图</Radio> */}
                  <Radio value="acrossBar">
                    {intl
                      .get('ide.src.page-group.group-analyze.modal.k6h63vqcem')
                      .d('条形图')}
                  </Radio>
                  {/* <Radio value="pie">环形图</Radio> */}
                </Fragment>
              ) : null}

              {+modalEditInfo.type === 3 || +this.type === 3 ? (
                <Radio value="line">
                  {intl
                    .get('ide.src.page-group.group-analyze.modal.kdrqybmqfrm')
                    .d('折线图')}
                </Radio>
              ) : null}
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default ModalAdd

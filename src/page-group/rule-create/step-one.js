import intl from 'react-intl-universal'
import React, { Component } from 'react'
import { Button } from 'antd'
import { observer, inject } from 'mobx-react'
import { action, toJS } from 'mobx'
import { ModalForm } from '../../component'
import { debounce } from '../../common/util'

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 10 },
  colon: false,
}

@inject('store')
@observer
class StepOne extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  selectContent = () => {
    const { entityList = [], objId, groupId, detail } = this.store

    return [
      {
        label: intl
          .get('ide.src.page-group.group-manage.id-create.pygrkxwrk4n')
          .d('所属实体'),
        key: 'objId',
        initialValue: detail.objId,
        rules: ['@requiredSelect'],

        disabled: groupId,
        control: {
          options: toJS(entityList),
          onSelect: v => this.selectEntity(v),
        },

        component: 'select',
      },
      {
        label: intl
          .get('ide.src.page-group.group-analyze.search.2ll7wsjzshl')
          .d('群体名称'),
        key: 'name',
        initialValue: detail.name,
        rules: [
          '@namePattern',
          '@nameUnderline',
          '@nameShuQi',
          '@transformTrim',
          '@required',
          '@max32',
          { validator: this.checkName },
        ],

        disabled: !objId || groupId,
        component: 'input',
      },
      {
        label: intl
          .get('ide.src.component.modal-stroage-detail.main.m75jykdqa6')
          .d('描述'),
        key: 'descr',
        initialValue: detail.descr,
        rules: ['@max128'],

        component: 'textArea',
      },
    ]
  }

  @action.bound selectEntity(e) {
    this.store.objId = e
    this.form.resetFields(['name'])
  }

  @action close = () => {
    window.location.href = `${window.__keeper.pathHrefPrefix ||
      '/'}/group/manage`
  }

  @action next = () => {
    this.form
      .validateFields()
      .then(value => {
        this.store.current += 1
        this.store.getConfigTagList()
        this.store.getRelList()
        this.store.oneForm = value
      })
      .catch(err => {
        console.log(err)
      })
  }

  @action checkName = (rule, value, callback) => {
    const params = {
      name: value,
      objId: this.store.objId,
    }

    if (this.store.detail.id) {
      params.id = this.store.detail.id
    }

    // 防抖
    debounce(() => this.store.checkName(params, callback), 500)

    // this.store.checkName(params, callback)
  }

  render() {
    const { current } = this.store
    const formConfig = {
      selectContent: this.selectContent(),
      formItemLayout,
      wrappedComponentRef: form => {
        this.form = form ? form.props.form : form
      },
    }

    return (
      <div
        className="step-one"
        style={{ display: current === 0 ? 'block' : 'none' }}
      >
        <ModalForm {...formConfig} />
        <div className="steps-action">
          <Button style={{ marginRight: 16 }} onClick={this.close}>
            {intl
              .get('ide.src.page-group.rule-create.step-one.j4qhvy1h30p')
              .d('返回')}
          </Button>
          <Button type="primary" onClick={this.next}>
            {intl
              .get('ide.src.page-group.rule-create.step-one.ekvr4opnmvg')
              .d('下一步')}
          </Button>
        </div>
      </div>
    )
  }
}
export default StepOne

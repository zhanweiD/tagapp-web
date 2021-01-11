import intl from 'react-intl-universal'
import React, { Component } from 'react'
import { Drawer, Button } from 'antd'
import { action, toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { RuleContent } from '../component'
import { getRenderData, formatData } from '../component/util'

@inject('store')
@observer
class SetRule extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
    this.formRef = React.createRef()
    this.ruleContentRef = React.createRef()
  }

  @action submit = () => {
    const { submit } = this.props

    this.formRef.current
      .validateFields()
      .then(values => {
        if (Object.keys(values).length) {
          submit(
            getRenderData(values, this.ruleContentRef),
            formatData(values, this.ruleContentRef)
          )
        } else {
          submit()
        }
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }

  render() {
    const { visible, onClose, posList } = this.props
    const {
      configTagList,
      relList,
      otherEntity,
      drawerConfigTagList,
    } = this.store

    const drawerConfig = {
      title: intl
        .get('ide.src.page-group.config-explain.main.mlanc59gq8')
        .d('设置筛选条件'),
      visible,
      closable: true,
      width: 1120,
      maskClosable: false,
      destroyOnClose: true,
      onClose,
      className: 'set-rule',
    }

    return (
      <Drawer {...drawerConfig}>
        <RuleContent
          formRef={this.formRef}
          onRef={ref => {
            this.ruleContentRef = ref
          }}
          configTagList={toJS(configTagList)}
          drawerConfigTagList={toJS(drawerConfigTagList)}
          relList={toJS(relList)}
          otherEntity={toJS(otherEntity)}
          posList={posList}
          type="set-rule"
        />

        <div className="bottom-button">
          <Button style={{ marginRight: 8 }} onClick={() => onClose()}>
            {intl
              .get('ide.src.component.modal-stroage-detail.main.i5xu8eg0n4')
              .d('关闭')}
          </Button>
          <Button
            type="primary"
            style={{ marginRight: 8 }}
            onClick={this.submit}
            // loading={confirmLoading}
          >
            {intl
              .get('ide.src.page-config.group-config.configModal.pub6abalqca')
              .d('确定')}
          </Button>
        </div>
      </Drawer>
    )
  }
}
export default SetRule

import React, {Component} from 'react'
import {Drawer, Button} from 'antd'
import {action, toJS} from 'mobx'
import {inject, observer} from 'mobx-react'
import {RuleContent} from '../component'
import {formatData} from '../component/util'

@inject('store')
@observer
export default class SetRule extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
    this.formRef = React.createRef()
    this.ruleContentRef = React.createRef()
  }

  @action submit = () => {
    const {submit} = this.props

    this.formRef.current
      .validateFields()
      .then(values => {
        submit(formatData(values, this.ruleContentRef))
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }


  @action next = () => {
    console.log()
    this.formRef.current
      .validateFields()
      .then(values => {
        formatData(values, this.ruleContentRef)
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }


  render() {
    const {visible, onClose} = this.props
    const {configTagList, relList, otherEntity} = this.store

    const drawerConfig = {
      title: '设置筛选条件',
      visible,
      width: 1120,
      maskClosable: false,
      destroyOnClose: true,
      onClose,
      className: 'set-rule',
    }
  
    return (
      <Drawer
        {...drawerConfig}
      >
        <RuleContent 
          formRef={this.formRef} 
          // changeCondition={this.changeCondition} 
          onRef={ref => { this.ruleContentRef = ref }}
          configTagList={toJS(configTagList)}
          relList={toJS(relList)}
          otherEntity={toJS(otherEntity)}
          type="set-rule"
        />
        <div className="bottom-button">
          <Button style={{marginRight: 8}} onClick={() => onClose()}>关闭</Button>
          <Button
            type="primary"
            style={{marginRight: 8}}
            onClick={this.submit}
          // loading={confirmLoading}
          >
            确定
          </Button>
        </div>
      </Drawer>
    )
  }
}

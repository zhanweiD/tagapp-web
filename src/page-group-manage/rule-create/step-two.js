import React, {Component} from 'react'
import {action, toJS, observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import {Button} from 'antd'
import {RuleContent} from '../component'
import {formatData, getRenderData} from '../component/util'
import SetRule from './drawer'

@inject('store')
@observer
export default class StepTwo extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
    this.formRef = React.createRef()
    this.ruleContentRef = React.createRef()
  }

  @observable visible = false

  whereMap = {}

  @action pre = () => {
    this.store.current -= 1
  }

  @action next = () => {
    this.formRef.current
      .validateFields()
      .then(values => {
        this.store.logicExper = formatData(values, this.ruleContentRef, this.whereMap)
        getRenderData(values, this.ruleContentRef, this.whereMap)
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }


  @action openDrawer = (flag, relId) => {
    this.store.getOtherEntity({
      relationId: relId,
    })
    this.visible = true
    this.drawerFlag = flag
  }

  @action submitRule = data => {
    this.whereList[this.drawerFlag] = data
  }

  @action onClose = () => {
    this.visible = false
    this.drawerFlag = undefined
  }


  render() {
    const {current, configTagList, relList} = this.store
    return (
      <div className="step-two" style={{display: current === 1 ? 'block' : 'none'}}>
        <RuleContent 
          formRef={this.formRef} 
          // changeCondition={this.changeCondition} 
          onRef={ref => { this.ruleContentRef = ref }}
          configTagList={toJS(configTagList)}
          relList={toJS(relList)}
          openDrawer={this.openDrawer}
          type="config"
          // objId={+objId}
        />
        <SetRule 
          visible={this.visible} 
          onClose={this.onClose}
          submit={this.submitRule} 
        />
        <div className="steps-action">
          <Button style={{marginRight: 16}} onClick={this.pre}>上一步</Button>
          <Button
            type="primary"
            onClick={this.next}
          >
            下一步
          </Button>
        </div>
      </div>
    )
  }
}

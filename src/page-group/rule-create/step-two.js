import React, {Component} from 'react'
import {action, toJS, observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import {Button} from 'antd'
import {RuleContent} from '../component'
import SetRule from './drawer'
import {formatData, getRenderData} from '../component/util'

@inject('store')
@observer
export default class StepTwo extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
    this.formRef = React.createRef()
    this.ruleContentRef = React.createRef()

    this.wherePosMap = toJS(props.store.wherePosMap) || {}
    this.whereMap = toJS(props.store.whereMap) || {}
  }

  @observable visible = false


  @action pre = () => {
    this.store.current -= 1
  }

  @action next = () => {
    this.formRef.current
      .validateFields()
      .then(values => {
        this.store.logicExper = formatData(values, this.ruleContentRef, this.whereMap)
        this.store.posList = getRenderData(values, this.ruleContentRef, this.wherePosMap)

        this.store.whereMap = this.whereMap
        this.store.wherePosMap = this.wherePosMap
        this.store.getOutputTags()
        this.store.current += 1
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }

  @action openDrawer = (flag, relId) => {
    this.store.getOtherEntity({
      relationId: relId,
    })

    this.store.getConfigTagList({
      objId: relId,
    })

    this.drawerFlag = flag
    this.visible = true
  }

  @action submitRule = (posData, data) => {
    this.wherePosMap[this.drawerFlag] = posData
    this.whereMap[this.drawerFlag] = data
    this.onClose()
  }

  @action onClose = () => {
    this.visible = false
    this.drawerFlag = undefined

    this.store.getConfigTagList()
  }

  @action reset = () => {
    this.store.posList = {}
    this.store.whereMap = {}
    this.store.wherePosMap = {}
  }

  render() {
    const {current, configTagList, relList, posList} = this.store

    return (
      <div className="step-two" style={{display: current === 1 ? 'block' : 'none'}}>
        <RuleContent 
          formRef={this.formRef} 
          onRef={ref => { this.ruleContentRef = ref }}
          configTagList={toJS(configTagList)}
          relList={toJS(relList)}
          openDrawer={this.openDrawer}
          posList={toJS(posList)}
          reset={this.reset}
          type="config"
        />
        <SetRule 
          visible={this.visible} 
          onClose={this.onClose}
          submit={this.submitRule} 
          posList={this.wherePosMap[this.drawerFlag]}
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

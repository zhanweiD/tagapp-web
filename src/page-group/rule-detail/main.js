import React, {Component, useEffect} from 'react'
import {action, toJS, observable} from 'mobx'
import {inject, observer, Provider} from 'mobx-react'
import {Button} from 'antd'
import OnerFrame from '@dtwave/oner-frame'
import {RuleContent} from '../component'
import SetRule from './drawer'
// import {formatData, getRenderData} from '../component/util'

import store from './store'

// @inject('store')
@observer
class RuleDetail extends Component {
  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    this.ruleContentRef = React.createRef()

    const {match: {params}} = props
    store.groupId = params.groupId
    store.objId = params.objId
  }

  @observable visible = false

  wherePosMap = {}
  whereMap = {}

  componentWillMount() {
    if (store.groupId) {
      store.getDetail(store.groupId, () => {
        this.wherePosMap = store.wherePosMap || {}
        this.whereMap = toJS(store.whereMap) || {}
      })
    }
  }

  @action goBack = () => {
    // 返回规则详情
    window.location.href = `${window.__keeper.pathHrefPrefix}/group/manage/${store.groupId}/${store.objId}`
  }

  @action openDrawer = (flag, relId) => {
    store.getOtherEntity({
      relationId: relId,
    })
    this.drawerFlag = flag
    this.visible = true
  }

  @action submitRule = (posData, data) => {
    this.wherePosMap[this.drawerFlag] = posData
    this.whereMap[this.drawerFlag] = data
    this.visible = false
  }

  @action onClose = () => {
    this.visible = false
    this.drawerFlag = undefined
  }

  // @action reset = () => {
  //   this.store.posList = {}
  //   this.store.whereMap = {}
  //   this.store.wherePosMap = {}
  // }

  render() {
    const {configTagList, relList, posList} = store

    return (
      <div>
        <div className="content-header">规则配置详情</div>
        <div className="rule-detail header-page">
      
          <RuleContent 
            // formRef={this.formRef} 
            // onRef={ref => { this.ruleContentRef = ref }}
            configTagList={toJS(configTagList)}
            relList={toJS(relList)}
            openDrawer={this.openDrawer}
            posList={toJS(posList)}
            // reset={this.reset}
            type="config"
            page="detail"
          />
          <SetRule 
            visible={this.visible} 
            onClose={this.onClose}
            // submit={this.submitRule} 
            posList={this.wherePosMap[this.drawerFlag]}
            store={store}
          />
          <div className="steps-action">
            <Button
              type="primary"
              onClick={this.goBack}
            >
          返回
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default props => {
  const ctx = OnerFrame.useFrame()
  const projectId = ctx.useProjectId()

  useEffect(() => {
    ctx.useProject(false)
  }, [])

  return (
    <RuleDetail {...props} projectId={projectId} />
  )
}

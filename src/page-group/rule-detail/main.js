import React, {Component, useEffect, Fragment} from 'react'
import {action, toJS, observable} from 'mobx'
import {observer} from 'mobx-react'
import {Button, Spin} from 'antd'
import OnerFrame from '@dtwave/oner-frame'
import {RuleContent} from '../component'
import SetRule from './drawer'

import store from './store'

@observer
class RuleDetail extends Component {
  constructor(props) {
    super(props)
    store.projectId = props.projectId

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

    store.getConfigTagList({
      objId: relId,
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
    store.getConfigTagList()
  }

  render() {
    const {configTagList, relList, posList, detailLoading} = store
  
    return (
      <div>
        <div className="content-header">规则配置详情</div>
        <Spin spinning={detailLoading}>
          <div className="rule-detail header-page">
      
            {
              posList ? (
                <Fragment>
                  <RuleContent 
                    configTagList={toJS(configTagList)}
                    relList={toJS(relList)}
                    openDrawer={this.openDrawer}
                    posList={toJS(posList)}
                    type="config"
                    page="detail"
                  />
                  <SetRule 
                    visible={this.visible} 
                    onClose={this.onClose}
                    posList={this.wherePosMap[this.drawerFlag]}
                    store={store}
                  />
                </Fragment>
              ) : null
            }
         
            <div className="steps-action">
              <Button
                type="primary"
                onClick={this.goBack}
              >
          返回
              </Button>
            </div>
          </div>
        </Spin>
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

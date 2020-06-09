import React, {Component, Fragment} from 'react'
import {Tabs} from 'antd'
import {action, observe} from 'mobx'
import {observer, inject} from 'mobx-react'

import AnalyzeTab from './analyze-tab'
import LabelTab from './label-tab'

const {TabPane} = Tabs
@inject('store')
@observer
export default class ShowLabel extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }
  conponentWillMount() {

  }
  @action tabSwitch = value => {
    this.store.nowTab = value    
  } 
  render() {
    return (
      <Fragment>
        <Tabs defaultActiveKey="2" onChange={value => this.tabSwitch(value)} className="label-tab">
          <TabPane tab="标签分析" key="1" className="fz14">
            <AnalyzeTab />
          </TabPane>
          <TabPane tab="全部标签" key="2" className="fz14">
            <LabelTab />
          </TabPane>
        </Tabs>
      </Fragment>
    )
  }
}

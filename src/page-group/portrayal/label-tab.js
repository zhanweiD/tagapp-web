import React, {Component, Fragment} from 'react'
import {action, observe, toJS} from 'mobx'
import {observer, inject} from 'mobx-react'
import {Select, Button, Tooltip, Progress, Spin} from 'antd'
import {TagFilled} from '@ant-design/icons'

import {NoData} from '../../component'

@inject('store')
@observer
export default class LabelTab extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  // 生成dom结构
  @action getDom = (x, y) => {
    const domList = []
    const {labelRes} = this.store
    for (let i = 0; i < labelRes.length; i++) {
      const nowRes = labelRes[i].tags || []
      const nowCategoryName = labelRes[i].categoryName || []
      
      // 生成单个提示标签
      this.store.itemLabels = toJS(nowRes).map((item, index) => {
        return (
          <Tooltip 
            key={item} 
            title={(
              <div>
                <div>
                  <span>{x}</span>
                </div>
                <Progress 
                  showInfo
                  status="active"
                  strokeWidth={4} 
                  strokeColor="#00d5af" 
                  percent={parseInt(y)} 
                  // color="#fff"
                  style={{color: '#fff', width: '96px', marginRight: '8px'}}
                />
              </div>
            )}
            color="#639dd1" 
            onMouseEnter={() => this.store.tagAnalysis(nowRes[index])}
          >
            <Button className="label-btn">{item.value}</Button>
          </Tooltip>
        )
      })

      // 生成标签标题
      domList.push(
        <div className="tab-content">
          <div>
            <TagFilled rotate={270} style={{color: 'rgba(0,0,0,.65)', marginRight: '12px'}} />
            <span>{`${nowCategoryName}（${nowRes.length}）`}</span>
          </div>
          {this.store.itemLabels}
        </div>
      )
    }
    return domList
  }

  render() {
    const {labelRes, tooltipX, tooltipY, markedLoading} = this.store
    return (
      <Spin spinning={markedLoading}>
        <div className="pl24 pt-0">
          {
            labelRes.length ? (
              toJS(this.getDom(tooltipX, tooltipY))
            ) : (
              <NoData />
            )
          }
        </div>
      </Spin>
    )
  }
}

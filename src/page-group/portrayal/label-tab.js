import React, {Component, Fragment} from 'react'
import {action, observe, toJS} from 'mobx'
import {observer, inject} from 'mobx-react'
import {Select, Button, Tooltip, Progress, Spin} from 'antd'
import {TagFilled} from '@ant-design/icons'

import {NoData} from '../../component'
import {debounce} from '../../common/util'

@inject('store')
@observer
export default class LabelTab extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }
  // componentWillUpdate() {

  // }

  componentDidUpdate(prevProps) {
    if (prevProps.store.tooltipX !== this.props.tooltipX) {
      const {tooltipX, tooltipY} = this.store
      // this.getDom(tooltipX, tooltipY)
      console.log(tooltipX, tooltipY)
    }
  }

  // 判断是否是重复的请求
  @action isRepeat = nowTag => {
    const {prevTag, tagAnalysis} = this.store
    if (nowTag === prevTag) {
      return
    }
    this.store.prevTag = nowTag
    tagAnalysis(nowTag)
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
                  {/* <span>{toJS(this.store.tooltipX)}</span> */}
                  <span>{x}</span>
                </div>
                <Progress 
                  showInfo
                  status="active"
                  strokeWidth={4} 
                  strokeColor="#00d5af" 
                  // percent={parseInt(toJS(this.store.tooltipY), 10)} 
                  percent={parseInt(y, 10)} 
                  color="#fff"
                  style={{color: '#fff', width: '96px', marginRight: '8px'}}
                />
              </div>
            )}
            color="rgba(0,0,0,.65)" 
          >
            <Button 
              className="label-btn"
              // onMouseEnter={() => this.isRepeat(nowRes[index])}
              onMouseEnter={() => debounce(() => this.isRepeat(nowRes[index]), 200)}
            >
              {item.value}
            </Button>
          </Tooltip>
        )
      })

      // 生成段落标签标题
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
    const {labelRes, tooltipX, tooltipY, markedLoading, domList} = this.store
    console.log(toJS(labelRes))
    return (
      // <Spin spinning={markedLoading}>
      <div className="pl24 pt-0">
        {
          labelRes.length ? (
            domList
          ) : (
            <NoData />
          )
        }
        {/* {
          labelRes.length ? (
            this.getDom(tooltipX, tooltipY)
          ) : (
            <NoData />
          )
        } */}
      </div>
      // </Spin>
    )
  }
}

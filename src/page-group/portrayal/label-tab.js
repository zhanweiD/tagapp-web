import React, {Component} from 'react'
import {toJS, action} from 'mobx'
import {observer, inject} from 'mobx-react'
import {Button, Tooltip, Progress, Spin} from 'antd'
import {TagFilled} from '@ant-design/icons'

import {NoData} from '../../component'
import {debounce} from '../../common/util'

@inject('store')
@observer
export default class LabelTab extends Component {
  constructor(props) {
    super(props)
    this.store = props.store

    this.store.getAllTags()
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

  render() {
    const {labelRes, tooltipX, tooltipY, allTagLoading} = this.store
    return (
      <div className="pl24 pt16 h-100">
        <Spin spinning={allTagLoading}>
          {
            labelRes.length ? (
              labelRes.map(now => {
                const nowRes = now.tags || []
                const nowCategoryName = now.categoryName || []
              
                // 生成单个提示标签
                this.itemLabels = toJS(nowRes).map((item, index) => {
                  return (
                    <Tooltip 
                      key={item.value} 
                      title={(
                        <div style={{padding: '0xp 4px'}}>
                          <div>
                            <span>{tooltipX}</span>
                          </div>
                          <Progress 
                            showInfo
                            status="active"
                            strokeWidth={4} 
                            strokeColor="#00d5af" 
                            percent={parseFloat(tooltipY, 10).toFixed(2)} 
                            // percent={parseFloat(tooltipY, 10)} 
                            color="#fff"
                            style={{color: '#fff', width: '96px', marginRight: '20px'}}
                          />
                        </div>
                      )}
                      color="rgba(0,0,0,.65)" 
                    >
                      <Button 
                        className="label-btn"
                        onMouseEnter={() => debounce(() => this.isRepeat(nowRes[index]), 200)}
                      >
                        {item.value === '' ? '-' : item.value}
                        {/* {item.value} */}
                      </Button>
                    </Tooltip>
                  )
                })
        
                // 生成段落标签标题
                return (
                  <div className="tab-content">
                    <div>
                      <TagFilled rotate={270} style={{color: 'rgba(0,0,0,.65)', marginRight: '8px'}} />
                      <span>{`${nowCategoryName}（${nowRes.length}）`}</span>
                    </div>
                    {this.itemLabels}
                  </div>
                )
              })
            ) : (
              <NoData text="暂无数据" size="small" />
            )
          }
        </Spin>
      </div>
    )
  }
}

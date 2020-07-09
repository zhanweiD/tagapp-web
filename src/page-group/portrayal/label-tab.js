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
  // @action getDom = () => {
  //   console.log(111)
  //   const {labelRes, itemLabels, tooltipTitle, tooltipX, tooltipY} = this.store
  //   this.store.allLabels.clear()
  //   for (let i = 0; i < labelRes.length; i++) {
  //     const nowRes = labelRes[i].tags || []
  //     const nowCategoryName = labelRes[i].categoryName || []
  //     console.log(nowRes)
     
  //     // 生成单个提示标签
  //     this.store.itemLabels = nowRes.map((item, index) => {
  //       return (
  //         <Tooltip 
  //           key={item} 
  //           // title={this.tooltipTitle} 
  //           title={(
  //             <div>
  //               <div>
  //                 <span>{tooltipX}</span>
  //               </div>
  //               <Progress 
  //                 showInfo 
  //                 strokeWidth={4} 
  //                 strokeColor="#00d5af" 
  //                 percent={parseInt(tooltipY)} 
  //                 color="#fff"
  //                 style={{color: '#fff', width: '96px'}}
  //               />
  //             </div>
  //           )}
  //           color="#639dd1" 
  //           onMouseEnter={() => this.tagAnalysis(nowRes[index])}
  //         >
  //           <Button className="label-btn">{item.value}</Button>
  //         </Tooltip>
  //       )
  //     })

  //     // 生成标签标题
  //     this.store.allLabels.push(
  //       <div className="tab-content">
  //         <div>
  //           <TagFilled rotate={270} style={{color: 'rgba(0,0,0,.65)', marginRight: '12px'}} />
  //           <span>{`${nowCategoryName}（${nowRes.length}）`}</span>
  //         </div>
  //         {itemLabels}
  //       </div>
  //     )
  //   }
  // }

  render() {
    const {allLabels, allLabelsLoading} = this.store
    return (
      <Spin spinning={allLabelsLoading}>
        <div className="pl24 pt-0">
          {
            allLabels.length ? (
              toJS(allLabels)
            ) : (
              <NoData />
            )
          }
        </div>
      </Spin>
    )
  }
}

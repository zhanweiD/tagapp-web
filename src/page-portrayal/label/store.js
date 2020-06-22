import {
  observable, action, runInAction, toJS, observe,
} from 'mobx'
import {Select, Button, Tooltip, Progress} from 'antd'
import {TagFilled} from '@ant-design/icons'
import {
  successTip, errorTip, changeToOptions, trimFormValues,
} from '../../common/util'
import io from './io'

const {Option} = Select
class Store {
  @observable nowTab = '1' // 当前tab页面
  @observable objId = null // 实体id
  @observable projectId = null // 项目id
  // @observable personalityUniqueKey = null // 主标签id
  @observable entityList = [] // 实体option列表
  @observable mainLabel = '' // 实体主标签
  @observable markedLabel = [] // 显著特征
  @observable basicLabel = [] // 基本特征
  @observable allLabels = [] // 全部标签
  @observable tooltipTitle = [] // 单个标签分析提示
  @observable defaultObjId = null // 实体列表

  // 获取实体列表
  @action async getEntityList() {
    try {
      const res = await io.getEntityList({
        projectId: this.projectId,
      })
      runInAction(() => {
        this.defaultObjId = res[0].objId.toString()
        this.entityList = res.map(item => {
          return (<Option key={item.objId}>{item.objName}</Option>)
        })
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取全部标签 
  @action async getAllTags() {
    try {
      const res = await io.getAllTags({
        objId: this.objId || this.defaultObjId,
        projectId: this.projectId,
        personalityUniqueKey: this.mainLabel,
      })
      const labelRes = res || []
      runInAction(() => {
        for (let i = 0; i < labelRes.length; i++) {
          const nowRes = res[i].tags || []
          const nowCategoryName = res[i].categoryName || []
          this.itemLabels = nowRes.map((item, index) => {
            return (
              <Tooltip 
                key={item} 
                title={this.tooltipTitle} 
                color="#639dd1" 
                onMouseEnter={() => this.tagAnalysis(nowRes[index])}
              >
                <Button className="label-btn">{item.value}</Button>
              </Tooltip>
            )
          })
          this.allLabels.push(
            <div className="tab-content">
              <div>
                <TagFilled rotate={270} style={{color: 'rgba(0,0,0,.65)', marginRight: '12px'}} />
                <span>{`${nowCategoryName}(${nowRes.length})`}</span>
              </div>
              {this.itemLabels}
            </div>
          )
        }
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取单个标签分析信息
  @action async tagAnalysis(obj) {
    const res = await io.tagAnalysis({
      objId: this.objId || this.defaultObjId,
      projectId: this.projectId,
      value: obj.value,
      tagName: obj.tagName,
      fieldName: obj.fieldName,
    })
    
    if (this.tooltipTitle.length > 0) {
      this.tooltipTitle = []
    }
    this.tooltipTitle.push(
      <div>
        <div>
          <span>{res.x}</span>
        </div>
        <Progress 
          showInfo 
          strokeWidth={4} 
          strokeColor="#00d5af" 
          percent={parseInt(res.y2)} 
          color="#fff"
          style={{color: '#fff'}}
        />
      </div>
    )
  }

  // tooltipTitle(i) {
  //   const {tooltipLabel} = this
  //   return (
  //     <div>
  //       <div>
  //         <span>{tooltipLabel[i].x}</span>
  //       </div>
  //       <Progress 
  //         showInfo 
  //         strokeWidth={4} 
  //         strokeColor="#00d5af" 
  //         percent={parseInt(tooltipLabel[i].y2)} 
  //         color="#fff"
  //         style={{color: '#fff'}}
  //       />
  //     </div>
  //   )
  // }

  // 获取基本+显著特征
  @action async getLabel() {
    try {
      const res = await io.getLabel({
        objId: this.objId || this.defaultObjId,
        projectId: this.projectId,
        personalityUniqueKey: this.mainLabel,
      })
      const basicRes = res.basic_feature || []
      const markedRes = res.marked_feature || []
      runInAction(() => {
        this.basicLabel = basicRes.map(item => {
          return (
            <p>
              <span className="basicName">{`${item.tagName}：`}</span>
              <span>{`${item.value}`}</span>
            </p>
          )
        })
      //   this.markedLabel = markedRes.map((item, index) => {
      //     return (
      //       <Tooltip title={this.tooltipTitle(index)} color="#639dd1">
      //         <Button className="label-btn">{item.value}</Button>
      //       </Tooltip>
      //     )
      //   })
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 特征分析
  @action async getAnalysis() {
    try {
      const res = await io.getAnalysis({
        objId: this.objId || this.defaultObjId,
        projectId: this.projectId,
        personalityUniqueKey: this.mainLabel,
      })
      const labelRes = res || []
      runInAction(() => {
        // this.tooltipLabel = labelRes
        this.getLabel()
      })
    } catch (e) {
      errorTip(e.message)
    }
  }
}

export default new Store()

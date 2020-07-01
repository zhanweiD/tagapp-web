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
  // @observable nowTab = '1' // 当前tab页面
  @observable objId = undefined // 当前实体id
  // @observable defaultObjId = undefined // 默认实体ID
  @observable projectId = null // 项目id
  @observable mainLabel = '' // 实体主标签

  @observable entityList = [] // 实体option列表
  @observable basicLabel = [] // 基本特征
  @observable allLabels = [] // 全部标签
  @observable tooltipTitle = [] // 单个标签分析提示

  @observable markedFeature = []// 显著特征
  @observable statistics = [] // 显著特征分析(百分比)

  // 获取实体列表
  @action async getEntityList() {
    try {
      const res = await io.getEntityList({
        projectId: this.projectId,
      })
      runInAction(() => {
        if (res.length === 0) return
        this.objId = res[0].objId.toString()
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
        objId: this.objId,
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
                <span>{`${nowCategoryName}（${nowRes.length}）`}</span>
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
      objId: this.objId,
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

  // 获取基本+显著特征
  @action async getLabel() {
    try {
      const res = await io.getLabel({
        objId: this.objId,
        projectId: this.projectId,
        personalityUniqueKey: this.mainLabel,
      })
      const basicRes = res.basic_feature || []
      
      runInAction(() => {
        this.basicLabel = basicRes.map(item => {
          return (
            <p>
              <span className="basicName">{`${item.tagName}：`}</span>
              <span>{`${item.value}`}</span>
            </p>
          )
        })
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 显著特征
  @action async getMarkedFeature(cb) {
    try {
      // const res = await io.getLabel({
      //   objId: this.objId,
      //   projectId: this.projectId,
      //   personalityUniqueKey: this.mainLabel,
      // })

      const res = {
        // 基本特征
        basic_feature: [
          {
            tagId: 34214213213,
            tagName: '会员id',
            value: '20202020',
          },
          {
            tagId: 34214213213,
            tagName: '姓名',
            value: '张三',
          },
        ],
        // 显著特征
        marked_feature: [
          {
            tagId: 34214213213,
            tagName: '会员id',
            value: '20202020',
          },
          {
            tagId: 34214213213,
            tagName: '姓名',
            value: '张三',
          }, {
            tagId: 34214213213,
            tagName: '会员id',
            value: '20202020',
          },
          {
            tagId: 34214213213,
            tagName: '姓名',
            value: '张三',
          }, {
            tagId: 34214213213,
            tagName: '会员id',
            value: '20202020',
          },
          {
            tagId: 34214213213,
            tagName: '姓名',
            value: '张三',
          },
        ],
        // 个体图片url
        pic_url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592397292085&di=32091bf850b5c52fea0d76fbb26ac776&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg',
      }
      runInAction(() => {
        // 显著特征
        const markedFeature = this.getMarkedFeatureData(res.marked_feature || [])

        cb(markedFeature)
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 特征分析
  @action async getAnalysis() {
    try {
      // const res = await io.getAnalysis({
      //   projectId: this.projectId,
      //   objId: this.objId,
      //   personalityUniqueKey: this.mainLabel,
      // })

      const res = [
        {
          x: '性别：男',
          y1: '100',
          y2: '24%',
        },
        {
          x: '城市：杭州',
          y1: '100',
          y2: '24%',
        },
      ]

      runInAction(() => {
        this.statistics = res
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  @action.bound getMarkedFeatureData(data) {
    if (!data.length) {
      return {
        nodes: [],
        links: [],
      }
    }
    const nodes = []
    const links = []

    for (let i = 0; i < data.length; i++) {
      nodes.push({
        id: i,
        name: `${data[i].tagName}:${data[i].value}`,
      })

      if (i) {
        links.push({
          id: i,
          source: i,
          target: 0,
        })
      }
    }

    console.log(nodes, links)
    return {
      nodes,
      links,
    }
  }
}

export default new Store()

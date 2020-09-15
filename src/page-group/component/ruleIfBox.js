import {Component} from 'react'
import {Button} from 'antd'
import RuleItem from './ruleItem'
import RuleCondition from './ruleCondition'
import './index.styl'

export default class RuleIfBox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: props.pos || [],
    }

    if (document.getElementById(props.id) && props.detail) {
      const height = props.detail.filter(d => d.type !== 1).length * 64
      document.getElementById(props.id).style.height = `${height > 50 ? height : 50}px`
    }
  }

  componentDidUpdate(preProps, preState) {
    const {data} = this.state
    if (preState.data !== data) {
      const {ruleIfBoxKey, refreshLineH} = this.props
      refreshLineH(data, ruleIfBoxKey)
    }
  }
  // 绘制连线
  renderLine = () => {
    const {data} = this.state

    if (data.length === 1) {
      return null
    }

    return data.map(d => {
      if (d.source && d.source) {
        const height = +d.target[1] - +d.source[1]
        const points = `${+d.source[0]}, ${+d.source[1]} ${+d.source[0]} ${+d.source[1] + height}, ${+d.target[0]} ${+d.target[1]}`
      
        return (
          <polyline 
            key={`path${d.flag}`}
            points={points}
            stroke="#d9d9d9"
            fill="none"
            strokeWidth="1"
          />
        )
      }
      return null
    })
  }

  // 且/或条件
  renderRuleCondition = () => {
    const {data} = this.state
    const {page} = this.props

    return data.map((d, i) => {
      if (d.type === 1) {
        return (
          <RuleCondition 
            key={`ruleCondition${d.flag}`}
            pos={[d.x, d.y]} 
            delCon={() => this.delCombineCon(d, i)} 
            changeCondition={d => this.changeCondition(d, i)}
            info={d}
            page={page}
          />
        ) 
      }
      return null
    })
  }

  // 绘制可视化配置条件
  renderRuleItem = () => {
    const {data} = this.state

    const {
      ruleIfBoxKey,
      configTagList,
      drawerConfigTagList,
      otherEntity,
      relList,
      openDrawer,
      type,
      page,
      changeRelWithRuleConfig,
      stepOneObjId,
    } = this.props

    return (
      data.map((d, i) => {
        if (d.type === 2) {
          return (
            <RuleItem 
              ruleIfBoxKey={ruleIfBoxKey}
              key={`ruleItem${ruleIfBoxKey}-${d.flag}`}  
              pos={[d.x, d.y]} 
              delCon={() => this.delCon(d, i)}
              addCombineCon={() => this.addCombineCon(d, i)}
              addCombineItem={() => this.addCombineItem(d, i)}
              configTagList={configTagList}
              drawerConfigTagList={drawerConfigTagList}
              otherEntity={otherEntity}
              relList={relList}
              openDrawer={openDrawer}
              ruleType={type}
              page={page}
              {...d}
              len={data.length}
              formRef={this.props.formRef}
              stepOneObjId={stepOneObjId}
              changeRelWithRuleConfig={() => changeRelWithRuleConfig(`${ruleIfBoxKey}-${d.flag}`)}
            />
          ) 
        }
        return null
      })
    )
  }

  changeCondition = (sdata, index) => {
    const {data} = this.state
    const newData = _.cloneDeep(data)
    newData[index] = sdata

    this.setState({
      data: newData,
    })

    this.props.changeCondition(sdata)
  }

  // 添加条件
  addCon = (d, i) => {
    let data = _.cloneDeep(this.state.data)
    const len = data.length

    if (len === 0) {
      data = [{
        type: 2,
        flag: '0',
        level: [0],
        x: 20,
        y: 0,
        source: null,
        target: null,
      }]
    } else if (len === 1) {
      const itemKey = `${this.props.ruleIfBoxKey}-0`

      const formContent = this.props.formRef.current.getFieldValue(itemKey)
      data = [{
        type: 1,
        flag: '0',
        level: [0],
        x: 0,
        y: 32,
        source: null,
        target: null,
        logic: 1,
      }, {
        ...data[0],
        type: 2,
        flag: '0-0',
        level: [0, 0],
        x: 88,
        y: 0,
        source: [22, 48],
        target: [88, 16],
        ...formContent,
      }, {
        type: 2,
        flag: '0-1',
        level: [0, 1],
        x: 88,
        y: 64,
        source: [22, 48],
        target: [88, 80],
      }]
      this.props.formRef.current.resetFields([itemKey])

      if( this.props.type === 'config') {
        this.props.changeRuleConfig(itemKey, `${this.props.ruleIfBoxKey}-0-0`)
      }
      
    } else {
      const itemArr = data.filter(item => item.type === 2)  

      const levelTwoArr = data.filter(item => item.level.length === 2)   

      const lastIndex = _.findIndex(data, d => d.flag === `0-${levelTwoArr.length - 1}`)
   
      const lastItem = data[lastIndex]

      const level = [0, levelTwoArr.length]
      const newItem = {
        type: 2,
        flag: level.join('-'),
        level,
        x: 88,
        y: itemArr.length * 64,
        source: [22, lastItem.y + 16],
        target: [88, itemArr.length * 64 + 16],
      }
      data.push(newItem)
    }
    this.setState({data})
  }

  addCombineItem = (itemData, i) => {

    const data = _.cloneDeep(this.state.data)

    data[i].isEnd = false

    // const brotherNode = data.filter(d => d.type === 2 && itemData.flag.slice(0, -2) === d.flag.slice(0, -2))

    // const current = brotherNode[brotherNode.length - 1]

    const newData = data.map(d => {
      if (d.y > itemData.y && d.level.length === 3) {
        return {
          flag: d.flag,
          level: d.level,
          source: d.source ? [d.source[0], d.source[1] + 64] : null,
          target: d.target ? [d.target[0], d.target[1] + 64] : null,
          type: d.type,
          x: d.x,
          y: d.y + 64,
          isEnd: d.isEnd 
        }
      }

      if (d.y > itemData.y && d.level.length === 2 && d.level[1] === itemData.level[1] + 1) {
        return {
          flag: d.flag,
          level: d.level,
          source: d.source,
          target: d.target ? [d.target[0], d.target[1] + 64] : null,
          type: d.type,
          x: d.x,
          y: d.y + 64,
          isEnd: d.isEnd 
        }
      }

      if (d.y > itemData.y && d.level.length === 2 && d.level[1] !== itemData.level[1] + 1) {
        return {
          flag: d.flag,
          level: d.level,
          source: d.source ? [d.source[0], d.source[1] + 64] : null,
          target: d.target ? [d.target[0], d.target[1] + 64] : null,
          type: d.type,
          x: d.x,
          y: d.y + 64,
          isEnd: d.isEnd 
        }
      }

      return d
    })

    // itemData.level[itemData.level.length - 1] = brotherNode.length

    const newItemLevel = itemData.level
    newItemLevel[2] = itemData.level[2] + 1

    const newItem = {
      type: 2,
      flag: newItemLevel.join('-'),
      level: newItemLevel,
      source: [itemData.source[0], itemData.target[1]],
      target: [itemData.target[0], itemData.target[1] + 64 ],
      x: itemData.x,
      y: itemData.y + 64,
      isEnd: true,
    }

    newData.push(newItem)
    this.setState({data: newData})
  }

  // 添加联合条件
  addCombineCon = (itemData, i) => {
    const data = _.cloneDeep(this.state.data)
    
    const current = _.cloneDeep(itemData) 
    
    const itemKey = `${this.props.ruleIfBoxKey}-${current.flag}`
    const formContent = this.props.formRef.current.getFieldValue(itemKey)
    const newData = data.map(d => {
      if (d.y > current.y && d.level.length === 2 && d.level[1] === current.level[1] + 1) {
        return {
          flag: d.flag,
          level: d.level,
          source: d.source ? [d.source[0], d.source[1] + 32] : null,
          target: d.target ? [d.target[0], d.target[1] + 64] : null,
          type: d.type,
          x: d.x,
          y: d.y + 64,
          isEnd: d.isEnd 
        }
      }

      if (d.y > current.y) {
        return {
          flag: d.flag,
          level: d.level,
          source: d.source ? [d.source[0], d.source[1] + 64] : null,
          target: d.target ? [d.target[0], d.target[1] + 64] : null,
          type: d.type,
          x: d.x,
          y: d.y + 64,
          isEnd: d.isEnd 
        }
      }

      return d
    })

    const newItemAction = {
      flag: current.flag,
      level: current.level,
      source: [current.source[0], current.source[0] > current.y ? current.source[1] + 64 : current.source[1]],
      target: [current.target[0], current.target[1] + 32],
      type: 1,
      logic: 1,
      x: current.x,
      y: current.y + 32,
    } 

    const updateItemLevel = current.level.concat([0])

    const updateItem = {
      flag: updateItemLevel.join('-'),
      level: updateItemLevel,
      source: [current.x + 22, current.y + 32 + 16],
      target: [current.x + 88, current.y + 16],
      type: 2,
      x: current.x + 88,
      y: current.y,
      ...formContent,
      isEnd: false,
    }

    const newChildrenItemLevel = current.level.concat([1])

    const newChildrenItem = {
      flag: newChildrenItemLevel.join('-'),
      level: newChildrenItemLevel,
      source: [current.x + 22, current.y + 64 - 16],
      target: [current.x + 88, current.y + 64 + 16],
      type: 2,
      x: current.x + 88,
      y: current.y + 64, // 32 + 32
      isEnd: true,
    }

    newData.splice(i, 1, newItemAction)
    newData.push(updateItem)
    newData.push(newChildrenItem)

    this.setState({data: newData})
    this.props.formRef.current.resetFields([itemKey])

    if (this.props.type === 'config') {
      this.props.changeRuleConfig(itemKey, `${this.props.ruleIfBoxKey}-${updateItemLevel.join('-')}`)
    }
  }

  // 删除单个条件
  delCon = (current, i) => {
    const data = _.cloneDeep(this.state.data)
    data.splice(i, 1)
    const itemKey = `${this.props.ruleIfBoxKey}-${current.flag}`

    let newData = []
    let bortherNode = []
    if(current.level.length === 2) {
      bortherNode = data.filter(d => d.level.length === 2 && d.level[0] === current.level[0])
    } 

    if(current.level.length === 3) {
      bortherNode = data.filter(d => d.level.length === 3 && d.level[0] === current.level[0] && d.level[1] === current.level[1])
    }
    if (bortherNode.length > 1) {
      // 删除三层最后一个  添加按钮移动至上一位
      newData = data.map(d => {
        if (
          d.level.length === 3
          && current.level.length === 3
          && d.level[0] === current.level[0]
          && d.level[1] === current.level[1]
          && d.level[2] === current.level[2] - 1
          && current.isEnd
        ) {
          return {
            ...d,
            isEnd: true
          }
        }

        // 同级(二层 level.length === 2)
        if(
          d.y > current.y 
          && d.level.length === 2
          && current.level.length === 2
          && d.level[0] === current.level[0]
        ) {
          
          if (d.level[1] === current.level[1] + 1) {
            const {level} = d

            level[1] = d.level[1] - 1

            return {
              flag: level.join('-'),
              level: level,
              source: current.source,
              target: [d.target[0], d.target[1] - 64],
              type: d.type,
              x: d.x,
              y: d.y - 64,
            }
          }

          const {level} = d
          level[1] = d.level[1] - 1
          return {
            flag: level.join('-'),
            level,
            source: [d.source[0], d.source[1] - 64],
            target: [d.target[0], d.target[1] - 64],
            type: d.type,
            x: d.x,
            y: d.y - 64,
          }
        }

        // 同级(三层 level.length === 3)
        if (
          d.y > current.y
          && d.level.length === 3
          && current.level.length === 3
          && d.level[0] === current.level[0]
          && d.level[1] === current.level[1]
          ) {
          
          const { level } = d

          level[2] = d.level[2] - 1

          return {
            flag: level.join('-'),
            level,
            source: [d.source[0], d.source[1] - 64],
            target: [d.target[0], d.target[1] - 64],
            type: d.type,
            x: d.x,
            y: d.y - 64,
            isEnd: d.isEnd
          }
        }
      
        // 删除二层 更新三层子节点flag
        if (
          d.y > current.y
          && current.level.length === 2 
          && d.level.length === 3
        ) {
          
          const {level} = d
          const index = level[1]
      
          level[1] = index - 1

          return {
            flag: level.join('-'),
            level,
            source: [d.source[0], d.source[1] - 64],
            target: [d.target[0], d.target[1] - 64],
            type: d.type,
            x: d.x,
            y: d.y - 64,
            isEnd: d.isEnd 
          }
        }
        // 删除三层 更新二层子节点flag
        if (
          d.y > current.y
          && current.level.length === 3
          && d.level.length === 2
          && d.level[1] === current.level[1] + 1
        ) {
          return {
            flag: d.flag,
            level: d.level,
            source: d.source,
            target: [d.target[0], d.target[1] - 64],
            type: d.type,
            x: d.x,
            y: d.y - 64,
          }
        }
      
        if (d.y > current.y && d.level.length > 1) {
          
          return {
            flag: d.flag,
            level: d.level,
            source: d.source ? [d.source[0], d.source[1] - 64] : null,
            target: d.target ? [d.target[0], d.target[1] - 64] : null,
            type: d.type,
            x: d.x,
            y: d.y - 64,
            isEnd: d.isEnd 
          }
        }
      
        return d
      })

      if (this.props.type === 'config') {
        this.props.changeRuleConfig(itemKey, null)
      }
    }

    if (bortherNode.length === 1) {
      const formContent = this.props.formRef.current.getFieldValue(itemKey)
      const len = current.level.length
      
      const bortherIndex = _.findIndex(data, d => d.flag === `${current.flag.slice(0, -1)}0`)
      const borderOriginFlag =  data[bortherIndex].flag

      this.props.formRef.current.resetFields([`${this.props.ruleIfBoxKey}-${borderOriginFlag}`]) 

      const fatherIndex = _.findIndex(data, d => d.flag === current.flag.slice(0, -2))
      const {x, y, level} = data[bortherIndex]

      data[bortherIndex].x = x - 88
      if (data[bortherIndex].flag === '0-0-0') {
        data[bortherIndex].source = [data[fatherIndex].source[0], data[fatherIndex].source[1] - 64]
      } else {
        data[bortherIndex].source = data[fatherIndex].source
      }
     
      data[bortherIndex].target = [x - 88, y + 16]
      level.splice(level.length - 1, 1)
      data[bortherIndex].level = level
      
      data[bortherIndex].flag = level.join('-')

      data[bortherIndex] = {...data[bortherIndex], ...formContent}

      newData = data.map(d => {
        // 2层2
        if (d.y > current.y && d.level.length === 2 && d.level[1] === current.level[1] + 1) {
          return {
            flag: d.flag,
            level: d.level,
            source: d.source ? [d.source[0], data[bortherIndex].y + 16] : null,
            target: d.target ? [d.target[0], d.target[1] - 64] : null,
            type: d.type,
            x: d.x,
            y: d.y - 64,
            isEnd: d.isEnd 
          }
        }

        if (d.y > current.y) {
          return {
            flag: d.flag,
            level: d.level,
            source: d.source ? [d.source[0], d.source[1] - 64] : null,
            target: d.target ? [d.target[0], d.target[1] - 64] : null,
            type: d.type,
            x: d.x,
            y: d.y - 64,
            isEnd: d.isEnd 
          }
        }

        return d
      })

      newData.splice(fatherIndex, 1)

      if (this.props.type === 'config') {
        this.props.changeRuleConfig(`${this.props.ruleIfBoxKey}-${borderOriginFlag}`, `${this.props.ruleIfBoxKey}-${level.join('-')}`)
      }
    }

    if (bortherNode.length === 0) {
      if (this.props.type === 'config') {
        this.props.changeRuleConfig(itemKey, null)
      }
    }
    this.setState({data: newData})
    this.props.formRef.current.resetFields([itemKey]) 
  }

  render() {
    const {data} = this.state

    const {id, page} = this.props
    const height = data ? data.filter(d => d.type !== 1).length * 64 : 0

    return (
      <div className="rule-if-box" id={id} style={{height}}>
        
        {
          page === 'detail' ? null : <Button onClick={() => this.addCon()} className="rule-add-btn mt4">添加</Button>
        }
   
        <svg style={{height: '100%', width: '100%', margin: '16px 0 0 16px'}}>
          {
            this.renderLine()
          }

        </svg>
        <div className="rule-if-content">

          {
            this.renderRuleCondition()
          }

          {
            this.renderRuleItem()
          }

        </div>
      </div>
    )
  }
}

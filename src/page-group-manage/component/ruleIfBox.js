import {Component} from 'react'
import {Button} from 'antd'
import RuleCondition from './ruleCondition'
import RuleItem from './ruleItem'
import RuleAction from './ruleAction'
import './index.styl'

const originalData = [
  {
    type: 2,
    flag: '0',
    level: [0],
    x: 20,
    y: 0,
    source: null,
    target: null,
  }, 
]

export default class RuleIfBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.detail || originalData,
    }

    if (document.getElementById(props.id) && props.detail) {
      const height = props.detail.filter(d => d.type !== 1).length * 60
      document.getElementById(props.id).style.height = `${height > 130 ? height : 130}px`
    }
  }

  refreshLineH = data => {
    const {ruleIfBoxKey, refreshLineH} = this.props
    refreshLineH(data, ruleIfBoxKey)
  }

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

  renderRuleCondition = () => {
    const {data} = this.state
    const {type, ruleIfBoxKey} = this.props

    return data.map((d, i) => {
      if (d.type === 1) {
        return (
          <RuleCondition 
            key={`ruleCondition${d.flag}`}
            pos={[d.x, d.y]} 
            delCon={() => this.delCombineCon(d, i)} 
            changeCondition={d => this.changeCondition(d, i)}
            info={d}
            type={type}
          />
        ) 
      }
      return null
    })
  }

  renderRuleItem = () => {
    const {data} = this.state
    const {type} = this.props
    
    const {
      // funcList, 
      tagList,
      ruleIfBoxKey,
    } = this.props
    console.log(this.props)
    return (
      data.map((d, i) => {
        if (d.type === 2) {
          return (
            <RuleItem 
              ruleIfBoxKey={ruleIfBoxKey}
              key={`ruleItem${d.flag}`} 
              pos={[d.x, d.y]} 
              delCon={() => this.delCon(d, i)}
              addCombineCon={() => this.addCombineCon(d, i)}
              addCombineItem={() => this.addCombineItem(d, i)}
              tagList={tagList}
              {...d}
            />
          ) 
        }
        return null
      })
    )
  }

  renderRuleAction = () => {
    const {data} = this.state

    return data.map((d, i) => {
      if (d.type === 3) {
        return (
          <RuleAction 
            pos={[d.x, d.y]}
            addCon={() => this.addCon(d, i)}
            addCombineCon={() => this.addCombineCon(d, i)}
            key={`ruleAction${d.flag}`}
            {...d} 
          />
        ) 
      }
      return null
    })
  }

  changeCondition = (sdata, index) => {
    const {data} = this.state
    const newData = _.cloneDeep(data)
    newData[index] = sdata

    this.props.changeCondition(sdata)
    this.setState({
      data: newData,
    })
  }

  // 添加条件
  addCon = (d, i) => {
    const data = _.cloneDeep(this.state.data)
    const len = data.length

    if (len === 1) {
      data[0] = {
        type: 2,
        flag: '0-0',
        level: [0, 0],
        x: 88,
        y: 0,
        source: [22, 48],
        target: [88, 16],
      }

      const newItem = {
        type: 2,
        flag: '0-1',
        level: [0, 1],
        x: 88,
        y: 64,
        source: [22, 48],
        target: [88, 80],
      }

      const firstAction = {
        type: 1,
        flag: '0',
        level: [0],
        x: 0,
        y: 32,
        source: null,
        target: null,
      }

      data.push(firstAction)
      data.push(newItem)
    } else {
      const itemArr = data.filter(item => item.type === 2)  
      const levelTwoArr = data.filter(item => item.level.length === 2)  
      
      const lastItem = levelTwoArr[levelTwoArr.length - 1] 

      const level = [0, lastItem.level[1] + 1]

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


    this.setState({data}, () => {
      this.refreshLineH(data)
    })
  }

  addCombineItem = (itemData, i) => {
    const data = _.cloneDeep(this.state.data)

    const brotherNode = data.filter(d => d.type === 2 && d.source[0] === itemData.source[0] && d.source[1] === itemData.source[1])

    const current = brotherNode[brotherNode.length - 1]

    const newData = data.map(d => {
      if (d.y > current.y && d.level.length === 3) {
        return {
          flag: d.flag,
          level: d.level,
          source: d.source ? [d.source[0], d.source[1] + 64] : null,
          target: d.target ? [d.target[0], d.target[1] + 64] : null,
          type: d.type,
          x: d.x,
          y: d.y + 64,
        }
      }

      if (d.y > current.y && d.level.length === 2 && current.source[1] !== d.y) {
        return {
          flag: d.flag,
          level: d.level,
          source: d.source,
          target: d.target ? [d.target[0], d.target[1] + 64] : null,
          type: d.type,
          x: d.x,
          y: d.y + 64,
        }
      }

      return d
    })

    current.level[itemData.level.length - 1] = brotherNode.length

    const newItem = {
      type: 2,
      flag: current.level.join('-'),
      level: current.level,
      source: [current.x - 66, brotherNode[0].y + brotherNode.length * 64 - 48],
      target: [current.x, brotherNode[0].y + brotherNode.length * 64 + 16],
      x: current.x,
      y: brotherNode[0].y + brotherNode.length * 64,
    }

    newData.push(newItem)

    this.setState({data: newData}, () => {
      this.refreshLineH(data)()
    })
  }

  // 添加联合条件
  addCombineCon = (itemData, i) => {
    const data = _.cloneDeep(this.state.data)
    
    const current = _.cloneDeep(itemData) 

    const newData = data.map(d => {
      if (d.y > current.y) {
        return {
          flag: d.flag,
          level: d.level,
          source: d.source ? [d.source[0], d.source[1] + 64] : null,
          target: d.target ? [d.target[0], d.target[1] + 64] : null,
          type: d.type,
          x: d.x,
          y: d.y + 64,
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

   
    this.setState({data: newData}, () => {
      this.refreshLineH(data)()
    })
  }

  // 删除单个条件
  delCon = (d, i) => {
    // this.updateLevel({...d}, 'subtract', i)
  }

  // 删除联合条件
  delCombineCon = (current, i) => {

  }

  render() {
    const {data} = this.state

    const {id} = this.props
    const heightComp = data.filter(d => d.type !== 1).length * 60
    const height = `${heightComp > 130 ? heightComp : 130}px`
    return (
      <div className="rule-if-box" id={id} style={{height}}>
        <Button onClick={() => this.addCon()} className="rule-add-btn">添加</Button>
        <svg style={{height: '100%', width: '100%'}}>
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

          {
            this.renderRuleAction()
          }
        </div>
      </div>
    )
  }
}

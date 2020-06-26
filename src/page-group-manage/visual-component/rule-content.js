import {Component} from 'react'
import {Button} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import Group from './group'
import WrapRuleCondition from './wrap-rule-condition'
import './index.styl'

const originalData = [{
  type: 0,
  flag: '0',
  level: [0],
  logic: 1,
}]

export default class RuleContent extends Component {
  state = {
    renderData: originalData,
    firstConditionH: 0,
    firstConditionT: 21,
  }

  componentDidMount() {
    const {renderData} = this.state

    this.refreshLineH(renderData)
  }

  refreshLineH = data => {
    const len = data.length

    this.heightFirst = document.getElementById('second-rule-condition0').getBoundingClientRect()
    this.heightEnd = document.getElementById(`second-rule-condition${len - 1}`).getBoundingClientRect()

    const firstConditionT = 21 + this.heightFirst.height / 2
    const firstConditionH = (this.heightEnd.top + this.heightEnd.height / 2) - (this.heightFirst.top + this.heightEnd.height / 2)

    this.setState({
      firstConditionT,
      firstConditionH,
    })
  }

  addGroup = () => {
    const {renderData} = this.state
    const current = _.cloneDeep(renderData)

    const obj = {
      type: 0,
      flag: renderData.length,
      logic: 1,
    }

    current.push(obj)

    this.setState({
      renderData: current,
    }, () => {
      this.refreshLineH(current)
    })
  }

  addGroupItem = (info, cb) => {
    
  }

  // addGroupItem = (info, cb) => {
  //   const {index, type} = info
  //   const {renderData} = this.state
  //   const current = _.cloneDeep(renderData)

  //   const len = current[index][type].length

  //   const obj = {
  //     flag: [index, len].join('-'),
  //     level: [index, len],
  //     logic: 1,
  //   }

  //   if (len === 1) {
  //     const conObj = {
  //       flag: '0-0',
  //       level: [0, 0],
  //       logic: 1,
  //       first: '0-0',
  //       end: '0-1',
  //     }
  //     current[index].entityCon.push(conObj)
  //   }

  //   current[index][type].push(obj)

  //   this.setState({
  //     renderData: current,
  //   }, () => {
  //     this.refreshLineH(current)
  //     cb()
  //   })
  // }

  // delGroupItem = (info, cb) => {
  //   const {index, type} = info
  //   const {renderData} = this.state
  //   const current = _.cloneDeep(renderData)

  //   const len = current[index][type].length

  //   if (len === 1) {
  //     current[index][type] = []
  //   } 

  //   if (len === 2) {
  //     current[index][type] = []
  //     current[index][`${type}Con`] = []
  //   }

  //   this.setState({
  //     renderData: current,
  //   }, () => {
  //     this.refreshLineH(current)
  //     cb()
  //   })
  // }

  render() {
    const {firstConditionH, firstConditionT, renderData} = this.state

    console.log(this.height1, this.height2)
    return (
      <div>
        <div className="mb24">
          <Button type="primary" icon={<PlusOutlined />} onClick={this.addGroup}>添加</Button>
          <Button className="ml8">重置条件</Button>
        </div>
        <div className="group">
          {
            renderData.map((d, i) => (
              <Group 
                ml={50} 
                id={`group-combine${d.flag}`}
                {...d} 
                index={i} 
                showLine={renderData.length > 1}
                // addGroupItem={this.addGroupItem}
                // delGroupItem={this.delGroupItem}
              />
            ))
          }

          {
            renderData.length > 1 ? <WrapRuleCondition pos={[4, firstConditionT, firstConditionH]} id="first-rule-condition" showLine={false} /> : null
          }
       
        </div>
      </div>
     
    )
  }
}

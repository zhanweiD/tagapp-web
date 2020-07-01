import {useState} from 'react'
import {Button} from 'antd'

const RuleCondition = ({
  logic = 1,
  changeCondition,
  pos = [],
  id,
  showLine,
}) => {
  const [isAnd, changeIsAnd] = useState(logic === 1)
  const change = () => {
    const data = !isAnd
    const result = data === false ? 2 : 1

    changeCondition(result)
    changeIsAnd(data)
  }

  const height = pos[2] || 120

  const posStyle = {
    left: pos[0],
    top: pos[1],
    height: `${height}px`,
  }

  const childPosStyle = {
    top: `${height / 2 - 16}px`,
  }

  return (
    <div style={posStyle} className="wrap-rule-condition" id={id}>
      <div style={childPosStyle} className="wrap-rule-condition-btn">
        <Button onClick={change}>
          {isAnd ? '且' : '或'}
        </Button>
      </div>
      {
        showLine ? <div className="wrap-rule-condition-line" style={{top: height / 2}} /> : null 
      }
    </div>
  )
}

export default RuleCondition

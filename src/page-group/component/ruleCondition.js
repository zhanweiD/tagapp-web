import {useState} from 'react'
import {Button} from 'antd'

const RuleCondition = ({
  info,
  changeCondition,
  pos = [],
}) => {
  const [isAnd, changeIsAnd] = useState(info.logic === 1)
  
  const change = () => {
    const data = !isAnd

    const result = {
      ...info,
      logic: data ? 1 : 2,
    }

    changeCondition(result)
    changeIsAnd(data)
  }

  const posStyle = {
    left: pos[0],
    top: pos[1],
  }
  return (
    <div style={posStyle} className="rule-condition">
      <Button onClick={change}>
        {isAnd ? '且' : '或'}
      </Button>
    </div>
  )
}

export default RuleCondition

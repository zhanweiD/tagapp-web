import intl from 'react-intl-universal'
import { useState } from 'react'
import { Button } from 'antd'

const RuleCondition = ({ info, changeCondition, pos = [], page }) => {
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
      {page === 'detail' ? (
        <Button>
          {isAnd
            ? intl
                .get('ide.src.page-group.component.ruleCondition.ai4iaravan')
                .d('且')
            : intl
                .get('ide.src.page-group.component.ruleCondition.w6wmqw9ee5')
                .d('或')}
        </Button>
      ) : (
        <Button onClick={change}>
          {isAnd
            ? intl
                .get('ide.src.page-group.component.ruleCondition.ai4iaravan')
                .d('且')
            : intl
                .get('ide.src.page-group.component.ruleCondition.w6wmqw9ee5')
                .d('或')}
        </Button>
      )}
    </div>
  )
}

export default RuleCondition

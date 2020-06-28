/**
 * @description 封装modol中常用form 适用于antd 4.0+
 */
import {Component, Fragment} from 'react'
import {Form} from 'antd'
import PropTypes from 'prop-types'
import QuestionTooltip from '../question-tooltip'
import ControlComponent, {mergeRules} from '../form-component-config'

const FormItem = Form.Item

export default class ModalForm extends Component {
  static propTypes = {
    selectContent: PropTypes.instanceOf(Array),
    formItemLayout: PropTypes.instanceOf(Object),
  }

  static defaultProps = {
    selectContent: [],
    formItemLayout: {
      labelCol: {span: 4},
      wrapperCol: {span: 20},
      colon: false,
    },
  }

  createItemContent = () => {
    const {selectContent, formItemLayout} = this.props
    if (!selectContent && !selectContent.length) return null

    return selectContent.map(({
      label,
      labelTooltip,
      key,
      initialValue,
      valuePropName = 'value', // 兼容Switch
      rules,
      component: type,
      control,
      hide,
      extra,
      ...rest
    }) => (
      <Fragment>
        {
          hide ? null : (
            <FormItem
              {...formItemLayout}
              key={key}
              label={labelTooltip ? (
                <span>
                  {label}
                  <QuestionTooltip tip={labelTooltip} />
                </span>
              ) : label}
              extra={extra}
              initialValue={initialValue}
              valuePropName={valuePropName}
              rules={mergeRules(rules, label)}
              validateFirst
            >
              <ControlComponent type={type} label={label} {...control} {...rest} />
            </FormItem>
          )
        }
      </Fragment>
     
    ))
  }

  render() {
    const {...rest} = this.props
    return (
      <Form {...rest}>
        {
          this.createItemContent()
        }
      </Form>
    )
  }
}

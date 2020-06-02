import {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {Button} from 'antd'

// const functionCodes = window.productFunctionCode || []

class AuthBox extends Component {
  static propTypes = {
    code: PropTypes.string, // 权限code
    isButton: PropTypes.bool, // 类型是否为按钮
  }

  static defaultProps = {
    code: '',
    isButton: true,
  }

  getAuth = () => {
    const {code, myFunctionCodes} = this.props
    const functionCodes = window.productFunctionCode || []

    if (!code) {
      console.error('需配置权限code')
      return false
    }

    if (myFunctionCodes) {
      return myFunctionCodes.includes(code)
    }

    return functionCodes.includes(code)
  }

  renderContent = () => {
    const isAuth = this.getAuth()
    if (!isAuth) {
      return null
    }

    const {children, isButton, ...rest} = this.props

    if (isButton) {
      return <Button {...rest}>{children}</Button>
    }
    return children
  }

  render() {
    return (
      <Fragment>
        {this.renderContent()}
      </Fragment>
    )
  }
}

export default AuthBox

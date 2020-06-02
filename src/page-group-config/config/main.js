/**
 * @description 后台配置
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import {projectProvider} from '../../component'

import store from './store'

@observer
class GroupConfig extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <div>后台配置</div>
    )
  }
}

export default projectProvider(GroupConfig)

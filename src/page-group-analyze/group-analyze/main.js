/**
 * @description 群体分析
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import {projectProvider} from '../../component'

import store from './store'

@observer
class GroupAnalyze extends Component {
  render() {
    return (
      <div>群体管理</div>
    )
  }
}

export default projectProvider(GroupAnalyze)

/**
 * @description 个体列表
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import {projectProvider} from '../../component'

import store from './store'

@observer
class UnitList extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <div>个体列表</div>
    )
  }
}

export default projectProvider(UnitList)

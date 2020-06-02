/**
 * @description 个体列表
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'

import store from './store'

@observer
export default class UnitList extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <div>个体列表</div>
    )
  }
}

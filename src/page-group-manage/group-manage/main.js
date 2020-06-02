/**
 * @description 群体管理
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'

import store from './store'

@observer
export default class GroupManage extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <div>群体管理</div>
    )
  }
}

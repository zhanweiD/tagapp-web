/**
 * @description 我的查询
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import {projectProvider} from '../../component'

import store from './store'

@observer
class MySearch extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <div>我的查询</div>
    )
  }
}

export default projectProvider(MySearch)

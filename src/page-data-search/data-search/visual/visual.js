/**
 * @description 可视化
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'

// import store from './store'
import './visual.styl'

@observer
export default class Visual extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <div className="visual">123</div>
    )
  }
}

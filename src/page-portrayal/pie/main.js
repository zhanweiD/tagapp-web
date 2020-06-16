/**
 * @description 微观画像
 */
import {Component} from 'react'
import {observer, Provider} from 'mobx-react'
import {action} from 'mobx'
import {Select, Input, Button, Layout} from 'antd'
import {
  projectProvider,
} from '../../component'
import ChartsPie from './charts-pie'
import store from './store'

@observer
export default class Pie extends Component {
  componentWillMount() {
    // store.getPortrayal()
    console.log()
  }

  render() {
    return (
      <div className="view-infos">
        <h3 className="overview-h3">元数据分布TOP5</h3>
        <p className="ab-lt">元数据分布top5</p>
        <ChartsPie store={store} />
      </div>
    )
  }
}

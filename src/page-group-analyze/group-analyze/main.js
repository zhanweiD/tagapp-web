/**
 * @description 群体分析
 */
import {Component} from 'react'
import {observer, Provider} from 'mobx-react'
import {action, observable, toJS} from 'mobx'
import {Button} from 'antd'
import {projectProvider, NoData} from '../../component'
import Search from './search'
import ModalAdd from './modal'
import {roportionOpt} from './util'

import store from './store'

// const chartMap = {
//   // bar: Bar,
//   pie: Pie,
// }

@observer
class GroupAnalyze extends Component {
  constructor(props) {
    super(props)
    const {spaceInfo} = window
    store.projectId = spaceInfo && spaceInfo.projectId
  }

  componentDidMount() {
    store.getObj()
  }

  @action.bound search(values) {
    store.getRoportion({
      id: values.id, 
    }, data => {
      if (!this.roportion) {
        this.roportion = echarts.init(this.roportionRef)
      }
      this.roportion.setOption(roportionOpt(
        data
      ))
    })
  }

  @action.bound showModal() {
    store.modalVis = true
    store.getTags()
  }

  @action.bound add(values) {
    store.getChart(values)
  }

  render() {
    const {roportion, info, groupId} = store

    return (
      <Provider store={store}>
        <div>
          <div className="analyze-search">
            <Search search={this.search} />
            <div style={{display: roportion.totalCount ? 'block' : 'none'}} className="analyze-roportion">
              <div ref={ref => this.roportionRef = ref} style={{height: '150px', width: '150px'}} />
              <div className="analyze-roportion-text">
                <div className="fs24">{roportion.groupCount}</div>
                <div>{`在全部实体${roportion.totalCount}中占比${(roportion.groupCount / roportion.totalCount * 100).toFixed(2)}`}</div>
              </div>
            </div>
           
          </div>
          <div className="group-analyze">
            <div className="chart-title">
              <span>群体画像</span>
              <Button type="primary" onClick={this.showModal} disabled={!groupId}>添加分析纬度</Button>
            </div>
            <div className="chart-content">

              {

                info.length
                  ? info.map(({
                    Comp,
                    ...rest
                  }) => <Comp data={rest} />)

                  : <NoData />
              }
            </div>
            <ModalAdd add={this.add} />
          </div>
        </div>
      </Provider>
    )
  }
}

export default projectProvider(GroupAnalyze)

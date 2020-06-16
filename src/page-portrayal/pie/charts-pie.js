import {Component} from 'react'
import {Divider, Progress} from 'antd'
import {observer, inject} from 'mobx-react'
import {
  observable, action, toJS, 
} from 'mobx'

import getPieOpt from './charts-options'

let chartsCount = 0
const data = []
const legendName = []
const colorList = ['#39A0FF', '#36CBCB', '#4DCB73', '#FAD338', '#F2637B', '#9760E4']
@inject('store')
@observer
export default class ChartsPie extends Component {
  myChart = null

  @action resize() {
    this.myChart && this.myChart.resize()
  }

  @action drawSaveTrend() {
    const {store} = this.props
    const {chartPieValues} = store
    for (let i = 0; i < store.chartPieValues.length; i++) {
      chartsCount += chartPieValues[i].metaCount
      const c = {
        value: chartPieValues[i].ratio,
        name: `${chartPieValues[i].treeName} ${chartPieValues[i].ratio}% ${chartPieValues[i].metaCount}`,
      }
      data[i] = c 
    }
    this.myChart.setOption(getPieOpt(chartsCount, data, legendName))
  }

  componentWillMount() {
    const {store} = this.props
    // store.getPieData(() => {
    //   this.drawSaveTrend()
    // })
    setTimeout(() => {
      this.drawSaveTrend()
    }, 10)
  }

  componentDidMount() {
    this.myChart = echarts.init(this.refs.chartsPie)
    window.addEventListener('resize', () => this.resize())
  }

  render() {
    const {store} = this.props
    return (
      <div className="chartPie-ad">
        <div ref="chartsPie" style={{height: '500px', width: '100%'}} />
        <div className="pie-tips FBH ablt">
          <ul className="mr-16">
            {
              store.chartPieValues.map((item, index) => (
                <li className="FBH FBAC mb4">
                  <span className="circle mb2 wh8" style={{backgroundColor: colorList[index]}} />
                  <span className="interval">{item.treeName}</span>
                </li>
              ))
            }
          </ul>
          <ul className="mr-16">
            {
              store.chartPieValues.map(item => (
                <li className="FBH FBAC mb4" style={{width: '150px'}}>
                  <Progress 
                    className="interval"
                    showInfo 
                    strokeWidth={4} 
                    strokeColor="#3187ff" 
                    percent={item.ratio} 
                  />
                  <Divider type="vertical" />
                </li>
              ))
            }
          </ul>
          <ul className="mr-16">
            {
              store.chartPieValues.map(item => (
                <li className="FBH FBAC mb4">
                  <span className="interval">{item.metaCount}</span>
                </li>
              ))
            }
          </ul>
        </div>
      </div> 
    )
  }
}

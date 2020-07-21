import {Component} from 'react'
import {acrossBarOpt} from './util'

export default class AcrossBar extends Component {
  componentDidMount() {
    this.chart = echarts.init(this.chartRef)
    console.log(this.props.data)
    this.drawChart(this.props.data)
  }

  drawChart = data => {
    this.chart.setOption(acrossBarOpt(
      data
    ))
  }

  render() {
    return (
      <div className="chart-item">
        <div style={{height: '300px', width: '100%'}} ref={ref => this.chartRef = ref} />
      </div>
    )
  }
}

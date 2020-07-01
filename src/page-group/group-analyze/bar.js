import {Component} from 'react'
import {barOpt} from './util'

export default class Bar extends Component {
  componentDidMount() {
    this.chart = echarts.init(this.chartRef)
    this.drawChart(this.props.data)
  }

  drawChart = data => {
    console.log(data)
    this.chart.setOption(barOpt(
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

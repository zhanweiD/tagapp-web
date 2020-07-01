import {Component} from 'react'
import {pieOpt} from './util'

export default class Pie extends Component {
  componentDidMount() {
    this.chart = echarts.init(this.chartRef)
    console.log(this.props.data)
    this.drawChart(this.props.data)
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.data !== nextProps.tagId) {
  //     this.getData()
  //   }
  // }

  drawChart = data => {
    this.chart.setOption(pieOpt(
      data
    ))
  }

  render() {
    console.log(this.props)
    return (
      <div className="chart-item">
        <div style={{height: '300px', width: '100%'}} ref={ref => this.chartRef = ref} />
      </div>
    )
  }
}

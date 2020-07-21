import {Component} from 'react'
import {lineOpt} from './util'

export default class Line extends Component {
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
    this.chart.setOption(lineOpt(
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

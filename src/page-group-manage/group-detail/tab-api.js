import {Component} from 'react'
import {action} from 'mobx'
import {TimeRange} from '../../component'
import {getApiTrendOpt} from './charts-options'

export default class TrendApi extends Component {
  defStartTime = moment().subtract(7, 'day').format('YYYY-MM-DD')
  defEndTime = moment().subtract(1, 'day').format('YYYY-MM-DD')
  chartLine = null

  componentDidMount() {
    this.chartLine = echarts.init(this.lineRef)
    this.getData()
    window.addEventListener('resize', () => this.resize())
  }

  componentWillReceiveProps(nextProps) {
    const {
      tagId,
    } = this.props
    
    if (tagId && tagId !== nextProps.tagId) {
      this.getData()
    }
  }

  drawChart = data => {
    this.chartLine.setOption(getApiTrendOpt(
      data
    ))
  }


  @action getData(gte = this.defStartTime, lte = this.defEndTime) {
    const {store} = this.props
    const params = {
      startDate: gte,
      endDate: lte,
    }

    store.getApiTrend(params, res => {
      if (res.length) this.drawChart(res)
    })
  }

  @action resize() {
    if (this.chartLine) this.chartLine.resize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.resize())
    if (this.chartLine) this.chartLine.dispose()
    this.chartLine = null
  }

  render() {
    const {tagId} = this.props

    return (
      <div className="bgf p24">
        
      </div>
    )
  }
}

import intl from 'react-intl-universal'
import {Component} from 'react'
import {action} from 'mobx'
import {TimeRange} from '../../component'
import {getTagTrendOpt} from './charts-options'

export default class TrendTag extends Component {
  defStartTime = moment()
    .subtract(7, 'day')
    .format('YYYY-MM-DD')
  defEndTime = moment()
    .subtract(1, 'day')
    .format('YYYY-MM-DD')
  chartLine = null

  componentDidMount() {
    this.chartLine = echarts.init(this.lineRef)
    this.getData()

    window.addEventListener('resize', () => this.resize())
  }

  componentWillReceiveProps(nextProps) {
    const {tagId} = this.props

    if (tagId && tagId !== nextProps.tagId) {
      this.getData()
    }
  }

  drawChart = (data, legend) => {
    this.chartLine.setOption(getTagTrendOpt(data, legend))
  }

  @action getData(gte = this.defStartTime, lte = this.defEndTime) {
    const {store} = this.props
    const params = {
      startDate: gte,
      endDate: lte,
    }

    store.getTagTrend(params, (data, legend) => {
      this.drawChart(data, legend)
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
      <div className="bgf pt16 pb16 pl24 pr24 mb16 mt16">
        <h3 className="chart-title">
          {intl
            .get('ide.src.page-scene.scene-detail.trend-tag.ykk61cuesgm')
            .d('标签调用次数趋势')}
        </h3>
        <div className="time-range-wrap">
          <TimeRange
            custom
            key={tagId}
            defaultRangeInx={0}
            rangeMap={[
              {
                value: 7,
                label: intl
                  .get('ide.src.component.time-range.time-range.a7eq693e4e5')
                  .d('最近7天'),
              },
              {
                value: 30,
                label: intl
                  .get('ide.src.component.time-range.time-range.c4c0sa9pymf')
                  .d('最近30天'),
              },
            ]}
            exportTimeRange={(gte, lte) => this.getData(gte, lte)}
          />
        </div>
        <div style={{height: '300px'}} ref={ref => (this.lineRef = ref)} />
      </div>
    )
  }
}

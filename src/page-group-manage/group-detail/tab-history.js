import {Component} from 'react'
import {action} from 'mobx'
import {TimeRange, ListContent, NoData} from '../../component'
import getOptions from './charts-options'
import {Time} from '../../common/util'

export default class TagHistory extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
  }
  defStartTime = moment().subtract(7, 'day').format('YYYY-MM-DD')
  defEndTime = moment().subtract(1, 'day').format('YYYY-MM-DD')
  chartBar = null

  columns = [
    {
      key: 'lastTime',
      title: '业务时间',
      dataIndex: 'lastTime',
      render: text => <Time timestamp={text} />,
    }, 
    {
      key: 'lastTime',
      title: '计算时间',
      dataIndex: 'lastTime',
      render: text => <Time timestamp={text} />,
    }, 
    {
      key: 'lastCount',
      title: '群体数量',
      dataIndex: 'lastCount',
    }, 
    {
      key: 'status',
      title: '群体状态',
      dataIndex: 'status',
      render: text => <a href>{text}</a>,
      // render: (text, record) => (record.config === 1
      //   ? (
      //     <Link to={`/project/${record.id}`}>
      //       <OmitTooltip maxWidth={100} text={text} />
      //     </Link>
      //   ) : <OmitTooltip maxWidth={100} text={text} />)
      // ,
    }, {
      key: 'objName',
      title: '姓名',
      dataIndex: 'objName',
    }, {
      key: 'type',
      title: '年龄',
      dataIndex: 'type',
    }, {
      key: 'lastCount',
      title: '性别',
      dataIndex: 'lastCount',
    }, {
      key: 'lastTime',
      title: '注册日期',
      dataIndex: 'lastTime',
      render: text => <Time timestamp={text} />,
    }, {
      key: 'mode',
      title: '省份',
      dataIndex: 'mode',
    }, {
      key: 'mode',
      title: '学历',
      dataIndex: 'mode',
    }, {
      key: 'mode',
      title: '会员等级',
      dataIndex: 'mode',
    }]

  componentDidMount() {
    this.chartBar = echarts.init(this.barRef)
    this.drawChart()

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

  drawChart = () => {
    this.chartBar.setOption(getOptions())
  }


  @action getData(gte = this.defStartTime, lte = this.defEndTime) {
    const {store} = this.props
    const params = {
      startDate: gte,
      endDate: lte,
    }
    
    // store.getTagTrend(params, (data, legend) => {
    //   this.drawChart(data, legend)
    // })
  }

  @action resize() {
    if (this.chartBar) this.chartBar.resize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.resize())
    if (this.chartBar) this.chartBar.dispose()
    this.chartBar = null
  }

  render() {
    const {tagId, store} = this.props
    const {list, tableLoading, searchParams} = store
    const listConfig = {
      columns: this.columns,
      initGetDataByParent: true, // 初始请求 在父层组件处理。列表组件componentWillMount内不再进行请求
      store, // 必填属性
    }

    return (
      <div className="bgf p24 mb16">
        <div className="time-range-wrap">
          <TimeRange
            custom
            key={tagId}
            defaultRangeInx={0}
            rangeMap={[{
              value: 7,
              label: '最近7天',
            }, {
              value: 30,
              label: '最近30天',
            }]}
            exportTimeRange={(gte, lte) => this.getData(gte, lte)}
          />
        </div>
        <div style={{height: '300px'}} ref={ref => this.barRef = ref} />
        {
          list.length || JSON.stringify(searchParams) !== '{}' ? (
            <div className="list-content">
              <ListContent {...listConfig} />
            </div>
          ) : (
            <NoData />
            // isLoading={tableLoading}
          )
        }
      </div>
    )
  }
}

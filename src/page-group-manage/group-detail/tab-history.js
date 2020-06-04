import {Component, Fragment} from 'react'
import {action} from 'mobx'
import {Badge} from 'antd'
import {TimeRange, ListContent, NoData} from '../../component'
import getOptions from './charts-options'
import {Time} from '../../common/util'
import storage from '../../common/nattyStorage'

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
      render: v => {
        if (v === 1) {
          return (<Badge color="green" text="正常" />)
        } else if (v === 2) {
          return (<Badge color="red" text="失败" />)
        }
        return (<Badge color="yellow" text="计算中" />)
      },
    },
    {
      key: 'action',
      title: '操作',
      width: 300,
      dataIndex: 'action',
      render: (text, record) => (
        <div className="FBH FBAC">
          <Fragment>
            {/* <Link to={`/project/${record.id}`}>群体分析</Link> */}
            <a disabled={record.status !== 1 ? true : false} href>群体分析</a>
            <span className="table-action-line" />
          </Fragment>
          <Fragment>
            <a disabled={record.status !== 1 ? true : false} href onClick={() => this.goUnitList(record.objId)}>个体列表</a>
            <span className="table-action-line" />
          </Fragment>
        </div>
      ),
    },
  ]

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

    /**
   * @description 跳转到个体列表
   */
  goUnitList = id => {
    storage.set('objId', id)
    window.location.href = `${window.__keeper.pathHrefPrefix}/group/unit`
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

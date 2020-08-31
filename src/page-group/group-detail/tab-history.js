import {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {action} from 'mobx'
import {Badge} from 'antd'
import {TimeRange, ListContent, Authority} from '../../component'
import getOptions from './charts-options'
import {Time} from '../../common/util'

export default class TagHistory extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }
  defStartTime = moment().subtract(7, 'day').format('YYYY-MM-DD')
  defEndTime = moment().subtract(1, 'day').format('YYYY-MM-DD')
  chartBar = null

  columns = [
    {
      key: 'recordDate',
      title: '业务时间',
      dataIndex: 'recordDate',
      // render: text => <Time timestamp={text} />,
    }, 
    {
      key: 'computeTime',
      title: '计算时间',
      dataIndex: 'computeTime',
      render: text => <Time timestamp={text} />,
    }, 
    {
      key: 'count',
      title: '群体数量',
      dataIndex: 'count',
    }, 
    {
      key: 'status',
      title: '群体状态',
      dataIndex: 'status',
      render: v => {
        if (v === 1) {
          return (<Badge color="green" text="正常" />)
        } 
        if (v === 2) {
          return (<Badge color="red" text="失败" />)
        }
        return (<Badge color="blue" text="计算中" />)
      },
    },
    {
      key: 'action',
      title: '操作',
      width: 200,
      dataIndex: 'action',
      render: (text, record) => (
        <div className="FBH FBAC">
          <Fragment>
            <Authority
              authCode="tag_app:detail_analyze_group[x]"
            >
              <Link to={`/group/analyze/${this.store.id}/${+this.store.objId}/${record.projectId}/${record.recordDate}`}>
                <a href className="mr16">群体分析</a>
              </Link>
            </Authority>
            {/* <span className="table-action-line" /> */}
          </Fragment>
          <Fragment>
            <Authority
              authCode="tag_app:detail_individuals_list[r]"
            >
              <Link to={`/group/unit/${this.store.id}/${this.store.objId}/${record.computeTime}/${record.projectId}`}>
                <a href>个体列表</a>
              </Link>
            </Authority>
          
          </Fragment>
        </div>
      ),
    },
  ]

  componentDidMount() {
    this.chartBar = echarts.init(this.barRef)
    if (this.store.modeType === 1) {
      this.getData()
    }
    // window.addEventListener('resize', () => this.resize())
  }

  @action getData(gte = this.defStartTime, lte = this.defEndTime) {
    const {store} = this.props
    const params = {
      startDate: gte,
      endDate: lte,
    }
    store.getHistoryBar(params, data => {
      this.chartBar.setOption(getOptions(data))
    })
  }

  // @action resize() {
  //   if (this.chartBar) this.chartBar.resize()
  // }

  componentWillUnmount() {
    // window.removeEventListener('resize', () => this.resize())
    // if (this.chartBar) this.chartBar.dispose()
    // this.chartBar = null
  }

  render() {
    const {tagId, store} = this.props
    const {id} = store
    const listConfig = {
      columns: this.columns,
      initParams: {id, projectId: this.store.projectId},
      store, // 必填属性
    }

    return (
      <div className="bgf mb16 set-time">
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
        <div className="list-content mt16">
          <ListContent {...listConfig} />
        </div>
      </div>
    )
  }
}

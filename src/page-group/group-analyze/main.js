/**
 * @description 群体分析
 */
import {Component} from 'react'
import {observer, Provider} from 'mobx-react'
import {action} from 'mobx'
import {Button, Popconfirm} from 'antd'
import {projectProvider, NoData, groupProvider} from '../../component'
import Search from './search'
import ModalAdd from './modal'
import {roportionOpt} from './util'
import {IconDel, IconEdit} from '../../icon-comp'

import store from './store'

@observer
class GroupAnalyze extends Component {
  constructor(props) {
    super(props)
    store.projectId = props.projectId

    const {match: {params}} = props
    store.groupId = params.groupId
    store.groupTime = params.time
  }

  componentDidMount() {
    store.getObj()

    if (store.groupId) {
      this.search({
        id: +store.groupId,
      })
    }
  }

  @action.bound search(values) {
    store.getRoportion({
      id: values.id, 
    }, data => {
      if (!this.roportion) {
        this.roportion = echarts.init(this.roportionRef)
      }
      this.roportion.setOption(roportionOpt(
        data
      ))
    })
  }

  @action.bound showModal() {
    store.modalVis = true
    store.getTags()
  }

  @action.bound add(values, cb) {
    const {modalEditInfo} = store

    if (modalEditInfo.type === 'edit') {
      store.editChart(values, modalEditInfo.index)
    } else {
      store.getChart(values)
    }

    cb()
  }

  @action.bound del(data, index) {
    store.delChart(data, index)
  }

  @action.bound edit(data, index) {
    store.modalVis = true
    store.modalEditInfo = {
      type: 'edit',
      index,
      ...data,
    }
  }

  render() {
    const {roportion, info, groupId} = store
    const {match: {params}} = this.props
    
    return (
      <Provider store={store}>
        <div>
          <div className="analyze-search">
            <span>群体分析</span>
            {
              !params.groupId ? <Search search={this.search} /> : null
            }
          </div>

          <div style={{display: roportion.time ? 'block' : 'none'}} className="analyze-roportion box-border">
            <div ref={ref => this.roportionRef = ref} style={{height: '150px', width: '150px'}} />
            <div className="analyze-roportion-text">
              <div className="fs24">{roportion.groupCount}</div>
              <div>{`在全部实体 ${roportion.totalCount} 中占比${roportion.totalCount ? (roportion.groupCount / roportion.totalCount * 100).toFixed(2) : 0}%`}</div>
            
            </div>
            <div className="analyze-roportion-time">
              <span>计算于：</span>
              {moment(+roportion.time).format('YYYY-MM-DD HH:mm:ss')}
            </div>
          </div>

          {
            groupId ? (
              <div className="analyze-action">
                <span>群体画像</span>
                <Button type="primary" onClick={this.showModal}>添加分析纬度</Button>
              </div>
            ) : null
          }
         
          <div className="group-analyze">
            <div className="chart-content">
              {

                info.length
                  ? info.map(({
                    Comp,
                    tagName,
                    ...rest
                  }, index) => (
                    <div className="chart-wrap">
                      <div className="chart-box">
                        <div className="chart-item-title">
                          <span>{tagName}</span>
                          <div className="FBH">
                            <IconEdit size="14" onClick={() => this.edit(rest, index)} className="mr8 mt8" />
                            <Popconfirm
                              placement="bottomLeft"
                              title="确定要删除吗？"
                              onConfirm={() => this.del(rest, index)}
                              okText="确认"
                              cancelText="取消"
                            >
                              <IconDel size="14" className="mt8" />
                            </Popconfirm>
                          
                          </div>
                        </div>
                        <Comp data={rest} />
                      </div>
                    </div>
                  ))

                  : <NoData text="暂无数据" />
              }
            </div>
            <ModalAdd add={this.add} />
          </div>
        </div>
      </Provider>
    )
  }
}

export default projectProvider(groupProvider(GroupAnalyze))

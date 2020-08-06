/**
 * @description 群体对比
 */
import {Component, Fragment} from 'react'
import {observer, Provider} from 'mobx-react'
import {action, toJS} from 'mobx'
import {Button, Popconfirm, Spin} from 'antd'
import * as venn from 'venn.js'
import * as d3 from 'd3'

import {projectProvider, NoData, groupProvider} from '../../component'
import Search from './search'
import ModalAdd from './modal'
import {IconDel, IconEdit} from '../../icon-comp'

import store from './store'

const chartOption = {
  svgW: 400,
  svgH: 60,
  bgH: 16,
  translateX: 4,
  // 动画延迟时间
  duration: 1000,
}

@observer
class GroupContrast extends Component {
  constructor(props) {
    super(props)
    store.projectId = props.projectId
    this.state = {
      showInfo: false,
    }
  }

  componentWillMount() {
    store.getObj()
  }

  componentWillUnmount() {
    store.destory()
  }

  componentDidMount() {
    this.venn = d3.select('#venn')
    this.svg = d3.select('#bullet').attr('width', chartOption.svgW).attr('height', chartOption.svgH)
  }

  drawVennChart(groupA, groupB, count) {
    const {groupAInfo, groupBInfo} = store
    const groupACount = groupAInfo.totalCount
    const groupBCount = groupBInfo.totalCount
 
    d3.select('#venn').selectAll('*').remove()

    const vennChart = d3.select('#venn')

    const sets = [{sets: [groupA], size: groupACount || 1},
      {sets: [groupB], size: groupBCount || 1},
      {sets: [groupA, groupB], size: count}]

    const chart = venn.VennDiagram().height(120).width(180)
    vennChart.datum(sets).call(chart)
    d3.selectAll('#venn .label').style('display', 'none') 
  }

  // 绘制子弹图
  drawBulletChart() {
    const {groupAInfo, groupBInfo} = store
    const groupACount = groupAInfo.totalCount
    const groupBCount = groupBInfo.totalCount

    d3.select('#bullet').selectAll('*').remove()

    const svg = d3.select('#bullet').attr('width', chartOption.svgW).attr('height', chartOption.svgH)
    const {
      svgW, duration, translateX,
    } = chartOption


    const MaxgroupBCount = Math.max(groupBCount, groupACount) || 1

    // 群体长度
    const fieldLen = String(MaxgroupBCount).length

    // 背景条宽度
    const bgW = svgW - fieldLen * 8 - translateX - 8

    const box = svg.append('g').attr('transform', `translate(${translateX},0)`)


    // 绘制进度条
    box.append('rect')
      .attr('width', 0)
      .attr('height', 16)
      .attr('y', 0)
      .attr('fill', 'rgb(31, 119, 180, .25)')
      .transition()
      .duration(duration)
      .attr('width', bgW * ((groupACount / MaxgroupBCount) || 1))

    // 绘制进度条
    box.append('rect')
      .attr('width', 0)
      .attr('height', 16)
      .attr('y', 36)
      .attr('fill', 'rgb(255, 127, 14, .25)')
      .transition()
      .duration(duration)
      .attr('width', bgW * ((groupBCount / MaxgroupBCount) || 1))

    // 绘制文字说明
    const countBox = svg.append('g').attr('transform', 'translate(4,16)')

    countBox.append('text')
      .attr('text-anchor', 'middle')
      .attr('x', svgW - (fieldLen * 8))
      .attr('y', -4)
      .text(groupACount)
      .style('fill', 'rgba(0,0,0, 0.65)')

    countBox.append('text')
      .attr('text-anchor', 'middle')
      .attr('x', svgW - (fieldLen * 8))
      .attr('y', 32)
      .text(groupBCount)
      .attr('fill', 'rgba(0,0,0, 0.65)')
  }
  
  draw = (groupA, groupB) => {
    this.drawBulletChart()

    store.groupOverlapCount([groupA, groupB].join(','), res => {
      this.drawVennChart(groupA, groupB, res)
    })
  }
  
  @action.bound search(groupA, groupB, objId) {
    this.setState({
      showInfo: true,
    }, () => {
      store.objId = objId
      store.tagList.clear()
      store.selectTagList.clear()
      store.info.clear()

      store.groupAInfo = {
        groupId: groupA,
      }
      store.groupBInfo = {
        groupId: groupB,
      }

      store.getGroupCount(groupA, 'A', () => {
        if (store.groupAInfo.groupName && store.groupBInfo.groupName) {
          this.draw(groupA, groupB)
        }
      })
    
      store.getGroupCount(groupB, 'B', () => {
        if (store.groupAInfo.groupName && store.groupBInfo.groupName) {
          this.draw(groupA, groupB)
        }
      })
    })
  }

  @action.bound showModal() {
    store.modalVis = true
    store.getTags()
  }

  @action.bound add(values, cb) {
    const {modalEditInfo} = store

    if (modalEditInfo.modalType === 'edit') {
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
      modalType: 'edit',
      index,
      ...data,
    }
  }

  render() {
    const {projectId, info, objList, groupAInfo, groupBInfo, overlapCount, loading} = store

    const {showInfo} = this.state
    return (
      <Provider store={store}>
        <div>
          <div className="contrast-header">群体对比</div>
          <Search
            projectId={projectId}
            objList={toJS(objList)}
            searchChart={this.search}
          />

          {
            showInfo
              ? (
                <Spin spinning={loading}>
                  <div className="contrast-venn box-border">
                    <div className="bullet"> 
                      <div className="bullet-name">
                        <div>{groupAInfo.groupName}</div>
                        <div className="mt16">
                          {groupBInfo.groupName}
                        </div>
                      </div>
                      <svg id="bullet" />
                    </div>

                    <div id="venn" />
                    {
                      groupAInfo.groupName && groupBInfo.groupName ? <span style={{marginTop: '80px', marginLeft: '-20px'}}>{`重叠个体：${overlapCount}`}</span> : null
                    }
                   
                  </div>
                  <div className="contrast-action">
                    <Button 
                      type="primary"
                      onClick={this.showModal}
                      disabled={info.length === 10}
                    >
                添加分析纬度  
                    </Button>
                  </div>
                </Spin>
              
              ) : null
          } 

          <div className="group-contrast">
            <div className="chart-content">
              {
                info.length
                  ? info.map(({
                    Comp,
                    tagName,
                    tagId,
                    ...rest
                  }, index) => (
                    <div className="chart-wrap">
                      <div className="chart-box">
                        <div className="chart-item-title">
                          <span>{tagName}</span>
                          <div className="FBH">
                            <IconEdit size="14" onClick={() => this.edit({tagId: tagId, ...rest}, index)} className="mr8 mt8 action" />
                            <Popconfirm
                              placement="bottomLeft"
                              title="确定要删除吗？"
                              onConfirm={() => this.del(rest, index)}
                              okText="确认"
                              cancelText="取消"
                            >
                              <IconDel size="14" className="mt8 action" />
                            </Popconfirm>

                          </div>
                        </div>
                        <Comp data={{tagName:tagName, ...rest}} key={`${tagId}${rest.chartType}${rest.groupType || 0}`}/>
                      </div>
                    </div>
                  ))
                  : <NoData text="暂无对比数据" />
              }
            </div>
            <ModalAdd add={this.add} />
          </div>
        </div>
      </Provider>
    )
  }
}

export default projectProvider(groupProvider(GroupContrast))

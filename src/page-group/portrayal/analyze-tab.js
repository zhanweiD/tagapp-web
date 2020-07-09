import React, {Component, Fragment} from 'react'
import {observer, inject} from 'mobx-react'
import {toJS} from 'mobx'
import * as d3 from 'd3'
import {Progress, Spin} from 'antd'
import personIcon from '../../icon/person.svg'
import {NoData, Loading} from '../../component'

import './analyze-tab.styl'
  
const height = 700
const width = 700

const colors = ['#00D5AF', '#00BAF7', '#2096FF']

@inject('store')
@observer
export default class AnalyzeTab extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }
  
  componentDidMount() {
    this.store.getAnalysis()
    this.store.getMarkedFeature(data => {
      if (data && data.links.length) {
        this.draw(data)
      }
    })
  }

  draw = data => {
    const {nodes, links} = data
    this.pic = d3.select('#pic')

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink()
        .id((d, i) => d.id)
        .distance(120))
      .force('charge', d3.forceManyBody().strength((d, i) => { return i === 0 ? -10 * 700 : -700 }))
      .force('center', d3.forceCenter(width / 2 + 25, height / 2))
      .force('collision', d3.forceCollide(30)) 

    simulation
      .nodes(nodes)

    simulation.force('link')
      .links(links)

    for (let i = nodes.length * nodes.length; i > 0; --i) simulation.tick()

    this.svg = d3.select('#box')
      .attr('width', width)
      .attr('height', height)


    const gnodes = this.svg.selectAll('g.gnode')
      .data(nodes).enter().append('g')
      .attr('class', (d, i) => {
        if (!d.name) {
          'gnode node-hidden'
        }
        return `gnode node-${d.id.toString()}`
      })
      .attr('transform', (d, i) => {
        if (i === 0) {
          this.pic
            .style('top', `${d.y}px`)
            .style('left', `${d.x}px`)
        }
        return `translate(${d.x},${d.y})`
      })

    d3.select('.node-0').classed('centered', true)

    gnodes.append('foreignObject')
      .attr('x', d => {
        if (d.x > 330 && d.x < 356 && d.y < 240) {
          return -60
        }

        if (d.x > 330 && d.x < 356 && d.y > 430) {
          return -60
        }

        if (d.x > 350) {
          return 0
        }


        return -120
      })
      .attr('y', d => {
        if (Math.abs(d.x - 343) < 40 && d.y < 240) {
          return -40
        }

        if (Math.abs(d.x - 343) < 40 && d.y > 430) {
          return 40
        }

        if (d.x > 333 && d.x < 410 && d.y < 350) {
          return -20
        }

        if (d.x > 333 && d.x < 410 && d.y > 350) {
          return 20
        }

        return 0
      })
      .attr('width', 120)
      .attr('height', 30)
      .append('xhtml:div')
      .html(d => {
        const color = colors[Math.floor((Math.random() * 3))]
        return `<div title=${d.name} class="node-rect" style="background:${color}"><div class="node-text">${d.name}</div></div>`
      })
  }
  render() {
    const {statistics, markedLoading} = this.store

    return (
      <div className="bgf">
        <Spin spinning={markedLoading}>
          <div className="analyze-content">
          
            <div className="person" id="person">
              <div className="svg-box"> 
                <svg id="box" />
                <img src={personIcon} alt="人" id="pic" />
              </div>      
            </div>

            {
              toJS(statistics).length ? (
                <div className="analyze-ratio">
                  {
                    statistics.map(d => (
                      <div>
                        <div>{d.x}</div>
                        <Progress percent={parseFloat(d.y2)} status="active" showInfo />
                      </div>
                    ))
                  }              
                </div>
              ) : null
            }
        
        
          </div>
        </Spin>
        
       
      </div>
    )
  }
}

import React, {Component} from 'react'
// import {Tooltip} from 'antd'
// import {action, observe} from 'mobx'
import {observer, inject} from 'mobx-react'
import * as d3 from 'd3'
import {Progress} from 'antd'
import personIcon from '../../icon/person.svg'

import './analyze-tab.styl'
  
const height = 700
const width = 700

const colors = ['#00D5AF', '#00BAF7', '#2096FF']

const dataset = {
  nodes: [
    {id: 0, name: '是够买保险：有保险'},
    {id: 1, name: '是够买保险：有保险'},
    {id: 2, name: '是够买保险：有保险'},
    {id: 3, name: '是够买保险：有保险'},
    {id: 4, name: '是够买保险：有保险'},
    {id: 5, name: '是够买保险：有保险'},
    {id: 6, name: '很长很长很长很长很长很长很长很长很长很长很长很长'},
    {id: 7, name: '1'},
    {id: 8, name: '1'},
    {id: 9, name: '1'},
    {id: 10, name: '1'},
    {id: 11, name: '1'},
    {id: 12, name: '1'},
    {id: 13, name: '1'},
    {id: 14, name: '1'},
    {id: 15, name: '1'},
    {id: 16, name: '1'},
    {id: 17, name: '1'},
    {id: 18, name: '1'},
    {id: 19, name: '1'},
    {id: 20, name: '1'},
    // {id: 7, name: ''},
    // {id: 8, name: ''},
    // {id: 9, name: ''},
    // {id: 10, name: ''},
    // {id: 11, name: ''},
    // {id: 12, name: ''},
    // {id: 13, name: ''},
    // {id: 14, name: ''},
    // {id: 15, name: ''},
    // {id: 16, name: ''},
    // {id: 17, name: ''},
    // {id: 18, name: ''},
    // {id: 19, name: ''},
    // {id: 20, name: ''},
  ],
  links: [
    {id: 1, source: 1, target: 0},
    {id: 2, source: 2, target: 0},
    {id: 3, source: 3, target: 0},
    {id: 4, source: 4, target: 0},
    {id: 5, source: 5, target: 0},
    {id: 6, source: 6, target: 0},
    {id: 7, source: 7, target: 0},
    {id: 8, source: 8, target: 0},
    {id: 9, source: 9, target: 0},
    {id: 10, source: 0, target: 0},
    {id: 11, source: 11, target: 0},
    {id: 12, source: 12, target: 0},
    {id: 13, source: 13, target: 0},
    {id: 14, source: 14, target: 0},
    {id: 15, source: 15, target: 0},
    {id: 16, source: 16, target: 0},
    {id: 17, source: 17, target: 0},
    {id: 18, source: 18, target: 0},
    {id: 19, source: 19, target: 0},
    {id: 20, source: 20, target: 0},
  ],
}

@inject('store')
@observer
export default class AnalyzeTab extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }
  
  componentDidMount() {
    this.store.getStatistics()
 
    this.draw()
  }

  draw = () => {
    const {nodes, links} = dataset

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
          console.log(d.x, d.y, this.pic)
          this.pic
            .style('top', `${d.y}px`)
            .style('left', `${d.x}px`)
        }
        return `translate(${d.x},${d.y})`
      })

    d3.select('.node-0').classed('centered', true)

    gnodes.append('foreignObject')
      .attr('x', d => {
        if (d.x > 350) {
          return 0
        }

        if (d.x > 330 && d.x < 356 && d.y < 240) {
          return -75
        }

        if (d.x > 330 && d.x < 356 && d.y > 430) {
          return -75
        }

        return -150
      })
      .attr('y', d => {
        if (Math.abs(d.x - 343) < 40 && d.y < 240) {
          return -40
        }

        if (Math.abs(d.x - 343) < 40 && d.y > 430) {
          return 40
        }

        return 0
      })
      .attr('width', 150)
      .attr('height', 30)
      .append('xhtml:div')
      .html(d => {
        const color = colors[Math.floor((Math.random() * 3))]
        return `<div title=${d.name} class="node-rect" style="background:${color}"><div class="node-text">${d.name}</div></div>`
      })
  }
  render() {
    const {statistics} = this.store

    return (
      <div className="bgf">
        <div className="analyze-content">
          <div className="person" id="person">
            <div className="svg-box"> 
              <svg id="box" />
              <img src={personIcon} alt="人" id="pic" />
            </div>      
          </div>
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
        </div>
       
      </div>
    )
  }
}

import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'
import {observable, toJS, action} from 'mobx'
import './dt-grid.styl'

@observer
export default class DtGrid extends Component {
  constructor(props) {
    super(props)
    this.originalData = props.children
    this.initRow = props.row 
    this.minWidth = props.minWidth
    this.maxWidth = props.maxWidth
  }

  // 源children会改变的
  originalData = []

  // 传进来的最小计算initRow
  @observable initRow = 2

  // 计算后的row
  @observable row = 2
  
  // 最小宽度
  @observable minWidth = 264

  // 最大宽度
  @observable maxWidth = 520

  // 组合的renderArr
  @observable renderArr = []

  componentDidMount() {
    this.init()
    window.addEventListener('resize', this.screenChange)
  }

  componentWillReceiveProps(nextProps) {
    const count = React.Children.count(nextProps.children)
    // const oldCount = React.Children.count(this.originalData)
    if (nextProps.children && (count > 0 || count > 1)) {
      this.originalData = nextProps.children
      this.init()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.screenChange)
  }

  // computed size
  @action getComputedSize = () => {
    const {initRow, minWidth, maxWidth} = this
    const parent = this.parent
    const parentWidth = parent.offsetWidth
    // row的值不会大于maxWidth/minWidth向上取整的最大值
    const maxRow = Math.ceil(maxWidth / minWidth)
    const limitRow = initRow <= maxRow ? initRow : maxRow
    
    const minSize = minWidth + (16 * (limitRow + 1)) 
    const maxSize = maxWidth + (16 * (limitRow + 1))

    // console.log('parent----', parent.offsetWidth)
 
    const minCount = parentWidth / maxSize
    const maxCount = parentWidth / minSize
    // console.log(minCount, maxCount)
    // const scale = parentWidth / minSize
    const computedRow = Math.ceil((Math.round(minCount) + Math.round(maxCount)) / 2)
  
    this.row = computedRow
  }

  @action getComputed = () => {
    const total = React.Children.count(this.originalData)

    const originalCloneData = React.Children.map(this.originalData, child => {
      if (child) {
        return React.cloneElement(
          child,
          {className: child.props.className ? `${child.props.className} dt-child` : 'dt-child'},
        )
      }
      return null
    })

    const renderArr = [] // 最后出来的数组
    let col
    // 算列
    if (total % this.row !== 0) {
      col = Math.trunc((total / this.row)) + 1
    } else {
      col = total / this.row
    }
    // 循环遍历拆分数组 进行补齐
    for (let i = 0; i < col; i += 1) {
      let arr = originalCloneData.slice(i * this.row, (i + 1) * this.row)
      if (arr.length < this.row) {
        const sArr = []
        for (let j = 0; j <= (this.row - arr.length); j += 1) {
          sArr[j - 1] = null
        }
        arr = arr.concat(sArr)
      }
      renderArr.push(arr)
    }
    this.renderArr.replace(renderArr)
  }

  @action screenChange = async () => {
    if (this.props.resize) {
      await this.getComputedSize()
    }
    await this.getComputed()
  }

  @action init = async () => {
    await this.getComputedSize()
    await this.getComputed()
  }

  renderHtml = () => {
    const {fixedHeight, percent} = this.props
    const renderArr = toJS(this.renderArr)
    const parentStyle = {
      height: 0,
      paddingBottom: percent,
    }
    const itemStyle = {
      height: fixedHeight,
    }
    let renderHtml
    if (fixedHeight) {
      renderHtml = (
        <Fragment>
          {
            renderArr.map((item, index) => (
              <div className="dt-row">
                {React.Children.map(renderArr[index], t => (
                  <div className={`dt-item dt-fixed ${t ? '' : 'dt-grid-empty'}`} style={itemStyle}>
                    {t}
                  </div>
                ))}
              </div>
            ))
          }
        </Fragment>
      )
    } else {
      renderHtml = (
        <Fragment>
          {
            renderArr.map((item, index) => (
              <div className="dt-row">
                {React.Children.map(renderArr[index], t => (
                  <div className={`dt-item ${t ? '' : 'dt-grid-empty'}`} style={itemStyle}>
                    <div style={parentStyle} />
                    {t}
                  </div>
                ))}
              </div>
            ))
          }
        </Fragment>
      )
    }
    return renderHtml
  }

  render() {
    return (
      <div className="dt-grid" ref={parent => this.parent = parent}>
        {this.renderHtml()}
      </div>
    )
  }
}

DtGrid.propTypes = {
  row: PropTypes.number,
  resize: PropTypes.bool,
  percent: PropTypes.string,
  fixedHeight: PropTypes.number,
  minWidth: PropTypes.number,
}

DtGrid.defaultProps = {
  row: 2,
  resize: true,
  minWidth: 264, 
  maxWidth: 520,
  originalData: [],
  renderArr: [],
  fixedHeight: undefined,
  percent: '50%',
}

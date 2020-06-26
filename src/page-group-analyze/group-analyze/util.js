const nameTextStyleColor = 'rgba(0, 0, 0, .45)'


const colors = [
  'rgba(0,197,122, 0.6)', 
  'rgba(10,192,220, 0.6)', 
  'rgba(57,167,255, 0.6)', 
  'rgba(90,106,254, 0.6)', 
  'rgba(149,51,255, 0.6)',
]

function randomColor() {
  const r = () => Math.floor(Math.random() * 256)
  return `rgb(${r()},${r()},${r()})`
}

function getColors(len) {
  if (len > 5) {
    randomColor()
    return [...Array(100)].map(() => randomColor())
  }
  return colors
}

export const roportionOpt = data => {
  const count = data.groupCount
  const other = data.totalCount - data.groupCount
  const percent = (count / data.totalCount * 100).toFixed(2)

  return {
    color: ['#0096FA', '#dddddd'],
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        hoverAnimation: false,
        legendHoverLink: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            textStyle: {
              fontSize: 14,
              // fontWeight: 'bold',
            },
            formatter: `${percent}%`,
          },
        },
        data: [
          {value: count, name: '实体'},
          {value: other, name: '全部'},
        ],
      },
    ],
  }
} 

export const pieOpt = info => {
  const data = info.xy

  // const legendData = data.map(d => d.x)
  const renderData = data.map(d => ({
    name: d.x,
    value: d.y1,
  }))
  console.log(getColors(data.length))
  return {
    // tooltip: {
    //   trigger: 'item',
    //   formatter: '{a} <br/>{b}: {c} ({d}%)',
    // },
    // legend: {
    //   orient: 'vertical',
    //   left: 10,
    //   data: legendData,
    // },
    color: getColors(data.length),
    series: [
      {
        // name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        // avoidLabelOverlap: true,
        // silent: false,
        // animation: false,
        // label: {
        //   show: false,
        //   position: 'center',
        // },
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: '30',
        //     fontWeight: 'bold',
        //   },
        // },
        labelLine: {
          show: false,
        },
        data: renderData,
      },
    ],
  }
} 

export const barOpt = data => {
  const xAxisData = data.xy.map(d => d.x)
  const yAxisData = data.xy.map(d => d.y1)

  return {
    grid: {
      left: 50,
      top: 10,
    },
    color: ['#3899FF'],
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLine: {
        lineStyle: {
          color: '#E9E9E9',
        },
      },
      axisLabel: {
        // formatter: '{value}',
        textStyle: {
          color: nameTextStyleColor,
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#E9E9E9',
        },
      },
      axisLabel: {
        // formatter: '{value}',
        textStyle: {
          color: nameTextStyleColor,
        },
      },
    },
    series: [{
      data: yAxisData,
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(220, 220, 220, 0.8)',
      },
    }],
  }
}

export const acrossBarOpt = data => {
  console.log(data)
  return {
    // title: {
    //   text: '世界人口总量',
    //   subtext: '数据来自网络',
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)'],
    },
    series: [
      {
        name: '2011年',
        type: 'bar',
        data: [18203, 23489, 29034, 104970, 131744, 630230],
      },
    ],
  }
}

export const lineOpt = data => {
  console.log(data)
  return {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
    }],
  }
}

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
  const percent = count ? (count / data.totalCount * 100).toFixed(2) : 0

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
              color: 'rgba(0, 0, 0, 0.45)',
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
  // const tooltip = info.xy.map(d => d.y2)

  const renderData = data.map(d => ({
    name: d.x,
    value: d.y1,
  }))

  return {
    color: getColors(data.length),
    tooltip: {
      trigger: 'item',
      formatter: params => {
        return `${params.name}<br />实体数: ${params.value}<br />占比: ${params.percent}%`
      },   
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: true,
        // silent: false,
        animation: false,
        
        // label: {
        //   show: true,
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
          show: true,
        },
        data: renderData,
      },
    ],
  }
} 

export const barOpt = data => {
  const xAxisData = data.xy.map(d => d.x)
  const yAxisData = data.xy.map(d => d.y1)
  const tooltip = data.xy.map(d => d.y2)
  return {
    grid: {
      top: 20,
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    color: colors,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: params => {
        return `${params[0].axisValue}<br />实体数: ${params[0].data}<br />占比: ${tooltip[params[0].dataIndex]}`
      },
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLine: {
        lineStyle: {
          color: '#E9E9E9',
        },
      },
      axisLabel: {
        formatter: '{value}',
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
      barMaxWidth: '30%',
    }],
  }
}

export const acrossBarOpt = data => {
  const xAxisData = data.xy.map(d => d.y1)
  const yAxisData = data.xy.map(d => d.x)
  const tooltip = data.xy.map(d => d.y2)

  return {
    color: colors,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: params => {
        return `${params[0].axisValue}<br />实体数: ${params[0].data}<br />占比: ${tooltip[params[0].dataIndex]}`
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '2%',
      bottom: '2%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#E9E9E9',
        },
      },
      axisLabel: {
        textStyle: {
          color: nameTextStyleColor,
        },
      },
    },
    yAxis: {
      type: 'category',
      data: yAxisData,
      axisLine: {
        lineStyle: {
          color: '#E9E9E9',
        },
      },
      axisLabel: {
        textStyle: {
          color: nameTextStyleColor,
        },
      },
    },
    series: [
      {
        type: 'bar',
        data: xAxisData,
        barMaxWidth: '30%',
      },
    ],
  }
}

export const lineOpt = data => {
  const xAxisData = data.xy.map(d => d.x)
  const yAxisData = data.xy.map(d => d.y1)
  const tooltip = data.xy.map(d => d.y2)

  return {
    color: colors,
    grid: {
      left: 50,
      right: 50,
      top: 30,
      bottom: 30,
    },
    tooltip: {
      trigger: 'axis',
      formatter: params => {
        return `${params[0].axisValue}<br />实体数: ${params[0].data}<br />占比: ${tooltip[params[0].dataIndex]}`
      },   
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLine: {
        lineStyle: {
          color: '#E9E9E9',
        },
      },
      axisLabel: {
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
        textStyle: {
          color: nameTextStyleColor,
        },
      },
    },
    series: [{
      data: yAxisData,
      type: 'line',
    }],
  }
}

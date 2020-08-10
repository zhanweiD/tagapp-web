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

export const barOpt = data => {
  const xAxisData = data.xy.map(d => d.x)
  const yAxisData = data.xy.map(d => d.y1)
  const yAxisData1 = data.xy.map(d => d.y3)
  const tooltip0 = data.xy.map(d => d.y2)
  const tooltip1 = data.xy.map(d => d.y4)

  return {
    grid: {
      top: 30,
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    color: colors,
    legend: {
      show: true,
      // top: 15,
		  right: 20,
      data: [data.groupAname, data.groupBname],
      selectedMode: false,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: params => {
        return `${data.tagName}：${params[0].axisValue}<br /> ${data.groupAname}：${params[0].data} (${tooltip0[params[0].dataIndex]}) <br /> ${data.groupBname}：${params[1].data} (${tooltip1[params[1].dataIndex]})`
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
      name: data.groupAname,
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(220, 220, 220, 0.8)',
      },
      barMaxWidth: '20%',
    }, {
      data: yAxisData1,
      type: 'bar',
      name: data.groupBname,
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(220, 220, 220, 0.8)',
      },
      barMaxWidth: '20%',
    }],
  }
}

export const acrossBarOpt = data => {
  const xAxisData = data.xy.map(d => d.y1)
  const xAxisData1 = data.xy.map(d => d.y3)
  const yAxisData = data.xy.map(d => d.x)
  const tooltip0 = data.xy.map(d => d.y2)
  const tooltip1 = data.xy.map(d => d.y4)

  return {
    color: colors,
    legend: {
      show: true,
      selectedMode: false,
      data: [data.groupAname, data.groupBname],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: params => {
        return `${data.tagName}：${params[0].axisValue}<br /> ${data.groupAname}：${params[0].data} (${tooltip0[params[0].dataIndex]}) <br /> ${data.groupBname}：${params[1].data} (${tooltip1[params[1].dataIndex]})`
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      top: 30,
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
        name: data.groupAname,
        data: xAxisData,
        barMaxWidth: '20%',
      },
      {
        type: 'bar',
        name: data.groupBname,
        data: xAxisData1,
        barMaxWidth: '20%',
      },
    ],
  }
}

export const lineOpt = data => {
  const xAxisData = data.xy.map(d => d.x)
  const yAxisData = data.xy.map(d => d.y1)
  const yAxisData1 = data.xy.map(d => d.y3)
  const tooltip0 = data.xy.map(d => d.y2)
  const tooltip1 = data.xy.map(d => d.y4)

  return {
    color: getColors(xAxisData.length),
    legend: {
      show: true,
      selectedMode: false,
      data: [data.groupAname, data.groupBname],
    },
    grid: {
      left: 50,
      right: 50,
      top: 30,
      bottom: 30,
    },
    tooltip: {
      trigger: 'axis',
      formatter: params => {
        return `${data.tagName}：${params[0].axisValue}<br /> ${data.groupAname}：${params[0].data} (${tooltip0[params[0].dataIndex]}) <br /> ${data.groupBname}：${params[1].data} (${tooltip1[params[1].dataIndex]})`
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
      name: data.groupAname,
      data: yAxisData,
      type: 'line',
    }, {
      name: data.groupBname,
      data: yAxisData1,
      type: 'line',
    }],
  }
}

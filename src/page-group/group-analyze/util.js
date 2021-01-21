import intl from 'react-intl-universal'

const nameTextStyleColor = 'rgba(0, 0, 0, .45)'

const colors = [
  '#1cd389',
  '#668eff',
  '#ffc751',
  '#ff6e73',
  '#8683e6',
  '#9692ff',
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
  const percent = count ? ((count / data.totalCount) * 100).toFixed(2) : 0

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
          {
            value: count,
            name: intl.get('ide.src.common.dict.eppgpvyn3fp').d('实体'),
          },
          {
            value: other,
            name: intl
              .get('ide.src.component.comp.search.r6a65smbvr')
              .d('全部'),
          },
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
    // color: getColors(renderData.length),
    color: colors,
    tooltip: {
      trigger: 'item',
      formatter: params => {
        const infoTagName = info.tagName
        const paramsName = params.name
        const paramsValue = params.value
        const paramsPercent = params.percent
        return intl
          .get('ide.src.page-group.group-analyze.util.jwe1m798m1', {
            infoTagName,
            paramsName,
            paramsValue,
            paramsPercent,
          })
          .d(
            '{infoTagName}:{paramsName}<br />实体数: {paramsValue}<br />占比: {paramsPercent}%'
          )
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
        const value3 = params[0].axisValue
        const value4 = params[0].data
        const name1 = data.tagName
        const index1 = tooltip[params[0].dataIndex]
        return intl
          .get('ide.src.page-group.group-analyze.util.br4691akdfr', {
            name1,
            value3,
            value4,
            index1,
          })
          .d(
            '{name1}:{value3}<br />实体数: {value4}<br />占比: {index1}'
          )
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

    series: [
      {
        data: yAxisData,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(220, 220, 220, 0.8)',
        },

        barMaxWidth: '30%',
      },
    ],
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
        const dataTagName = data.tagName
        const paramsAxisValue = params[0].axisValue
        const paramsData = params[0].data
        const paramsDataIndex = params[0].dataIndex
        const index1 = tooltip[paramsDataIndex]
        return intl
          .get('ide.src.page-group.group-analyze.util.c155uhstn9a', {
            dataTagName,
            paramsAxisValue,
            paramsData,
            index1,
          })
          .d(
            '{dataTagName}:{paramsAxisValue}<br />实体数: {paramsData}<br />占比: {index1}'
          )
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
        const value3 = params[0].axisValue
        const value4 = params[0].data
        const name1 = data.tagName
        const index1 = tooltip[params[0].dataIndex]
        return intl
          .get('ide.src.page-group.group-analyze.util.br4691akdfr', {
            name1,
            value3,
            value4,
            index1,
          })
          .d(
            '{name1}:{value3}<br />实体数: {value4}<br />占比: {index1}'
          )
        // return `${data.tagName}:${params[0].axisValue}<br />实体数: ${params[0].data}<br />占比: ${tooltip[params[0].dataIndex]}`
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

    series: [
      {
        data: yAxisData,
        type: 'line',
      },
    ],
  }
}

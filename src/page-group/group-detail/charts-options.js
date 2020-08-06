const nameTextStyleColor = 'rgba(0, 0, 0, .65)'

// 标签调用次数趋势图配置
export default function getOptions(data) {
  return {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '24px',
      right: '24px',
      bottom: '0px',
      top: '32px',
      containLabel: true,
    },
    xAxis: [{
      type: 'category',
      axisTick: {
        show: false,
        color: '#707070',
      },
      axisLabel: {
        textStyle: {
          fontSize: 12,
          color: nameTextStyleColor,
        },
      },
      axisLine: {
        lineStyle: {
          color: nameTextStyleColor,
        },
      },
      data: _.map(data, 'x'),
    }],
    yAxis: {
      show: true,
      type: 'value',
      min: 0,
      splitNumber: 4,
      axisTick: {// y轴刻度线
        show: false,  
      },
      axisLine: { // y轴
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    series: [
      {
        type: 'bar',
        symbol: 'none',
        itemStyle: {
          color: '#429ff7',
        },
        data: _.map(data, 'y'),
      },
    ],
  }
}

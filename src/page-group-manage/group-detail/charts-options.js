const nameTextStyleColor = 'rgba(0, 0, 0, .45)'

// 标签调用次数趋势图配置
export default function getOptions(dataX, dataY) {
  console.log(dataX, dataY)
  // data, legend = []
  return {
    tooltip: {
      // trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '5%',
      containLabel: true,
    },
    xAxis: [{
      // type: 'category',
      // axisTick: {
      //     show: false,
      //     color: '#707070'
      // },
      // axisLabel: {
      //     textStyle: {
      //         fontSize: 14,
      //         color: '#4D4D4D'
      //     }
      // },
      // axisLine: {
      //     lineStyle: {
      //         color: '#707070'
      //     }
      // },
      data: dataX,
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
        barWidth: '5%',
        itemStyle: {
          color: '#429ff7',
        },
        data: dataY,
      },
    ],
  }
}

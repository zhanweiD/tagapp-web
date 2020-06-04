const nameTextStyleColor = 'rgba(0, 0, 0, .45)'

// 标签调用次数趋势图配置
export default function getOptions() {
  // data, legend = []
  return {
    tooltip: {
      // trigger: 'axis',
    },
    // grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '5%',
    //     containLabel: true
    // },
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
      data: ['低能见度1', '低能见度2', '低能见度3', '低能见度4'],
    }],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '5%',
      containLabel: true,
    },
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
    series: [{
      name: '直接访问',
      type: 'bar',
      barWidth: '10%',
      data: [
        {
          name: '1',
          value: '70',
          symbol: 'none',
          itemStyle: {
            color: '#429ff7',
          },
        },
        {
          name: '2',
          value: '50',
          symbol: 'none',
          itemStyle: {
            color: '#429ff7',
          },
        },
        {
          name: '3',
          value: '30',
          symbol: 'none',
          itemStyle: {
            color: '#429ff7',
          },
        },
        {
          name: '4',
          value: '25',
          itemStyle: {
            color: '#429ff7',
          },
        },
      ],
    }],
  }
}

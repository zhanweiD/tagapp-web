const nameTextStyleColor = 'rgba(0, 0, 0, .65)'
const colors = [
  'rgba(0,197,122, 0.6)', 
  'rgba(10,192,220, 0.6)', 
  'rgba(57,167,255, 0.6)', 
  'rgba(90,106,254, 0.6)', 
  'rgba(149,51,255, 0.6)',
]
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
    // xAxis: [{
    //   type: 'category',
    //   axisTick: {
    //     show: false,
    //     color: '#707070',
    //   },
    //   axisLabel: {
    //     textStyle: {
    //       fontSize: 12,
    //       color: nameTextStyleColor,
    //     },
    //   },
    //   axisLine: {
    //     lineStyle: {
    //       color: nameTextStyleColor,
    //     },
    //   },
    //   data: _.map(data, 'x'),
    // }],
    xAxis: {
      type: 'category',
      data: _.map(data, 'x'),
      axisLabel: {
        // formatter: value => moment(+value).format('MM-DD'),
        textStyle: {
          color: nameTextStyleColor,
        },
      },
      axisLine: {
        lineStyle: {
          color: '#E9E9E9',
        },
      },
    },
    // yAxis: {
    //   show: true,
    //   type: 'value',
    //   min: 0,
    //   splitNumber: 5,
    //   axisTick: {// y轴刻度线
    //     show: false,  
    //   },
    //   axisLine: { // y轴
    //     show: false,
    //   },
    //   splitLine: {
    //     show: true,
    //     lineStyle: {
    //       type: 'dashed',
    //     },
    //   },
    // },
    yAxis: [
      {
        type: 'value',
        min: 0,
        splitNumber: 5,
        name: '',
        nameTextStyle: {
          padding: [0, 0, 0, 24],
          color: nameTextStyleColor,
        },
        minInterval: 1,
        // max: 250,
        // interval: 50,
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: nameTextStyleColor,
          },
        },
        axisLine: {
          lineStyle: {
            color: '#E9E9E9',
          },
        },
      },
    ],
    color: colors,
    series: [
      {
        barWidth: '50',
        type: 'bar',
        // symbol: 'none',
        // itemStyle: {
        //   color: '#429ff7',
        // },
        data: _.map(data, 'y'),
      },
    ],
  }
}

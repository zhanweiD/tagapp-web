// import {dateFormat} from '../../common/constants'

// 元数据分布饼图配置

export default function getPieOpt(chartsCount, data, legendName) {
  return {
    backgroundColor: '#fff',
    title: {
      text: '总计',
      subtext: `${chartsCount}个`,
      x: 'center',
      y: 'center',
      textStyle: {
        fontSize: 30,
        fontWeight: 'normal',
        color: ['#333'],
      },
      subtextStyle: {
        color: '#666',
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'item',
      // formatter: '类目：{b.treeName}\n占比{b}\n个数{c}',
      formatter: '{b}',
    },
    legend: {
      orient: 'vertical',
      x: '70%',
      y: 'center',
      itemWidth: 20,
      itemHeight: 20,
      align: 'left',
      textStyle: {
        fontSize: 12,
        color: '#333',
      },
      data: legendName,
    },
    series: [{
      type: 'pie',
      radius: ['35%', '45%'],
      center: ['50%', '50%'],
      color: ['#39A0FF', '#36CBCB', '#4DCB73', '#FAD338', '#F2637B', '#9760E4'],
      data,
      labelLine: {
        normal: {
          show: false,
          length: 20,
          length2: 20,
          lineStyle: {
            color: '#12EABE',
            width: 2,
          },
        },
      },
      label: {
        normal: {
          show: false,
          formatter: '{c|{c}}\n{hr|}\n{d|{d}%}',
          rich: {
            b: {
              fontSize: 20,
              color: '#12EABE',
              align: 'left',
              padding: 4,
            },
            hr: {
              borderColor: '#12EABE',
              width: '100%',
              borderWidth: 2,
              height: 0,
            },
            d: {
              fontSize: 20,
              color: '#fff',
              align: 'left',
              padding: 4,
            },
            c: {
              fontSize: 20,
              color: '#fff',
              align: 'left',
              padding: 4,
            },
          },
        },
      },
    }],
  }
}

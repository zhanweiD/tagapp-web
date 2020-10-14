export const outValueLogic = [{
  name: '标签值',
  value: '标签值',
  tagTypeList: [1, 2, 3, 4, 5, 6],
  type: 0, // 0:非聚合函数  1聚合函数
}, {
  name: '固定值',
  value: '固定值',
  tagTypeList: [1, 2, 3, 4, 5, 6],
  type: 0,
}, {
  name: '绝对值',
  value: 'abs',
  tagTypeList: [2, 3],
  type: 0,
}, {
  name: '年份',
  value: 'year',
  tagTypeList: [5],
  type: 0,
}, {
  name: '月份',
  value: 'month',
  tagTypeList: [5],
  type: 0,
}, {
  name: '日',
  value: 'day',
  tagTypeList: [5],
  type: 0,
}, {
  name: '距离今天',
  value: 'datediff',
  tagTypeList: [5],
  type: 0,
}, {
  name: '时间转换',
  value: 'date_format',
  tagTypeList: [5],
  type: 0,
}, {
  name: '总记录数',
  value: 'count',
  tagTypeList: [1, 2, 3, 4, 5, 6],
  type: 1,
}, {
  name: '求和',
  value: 'sum',
  tagTypeList: [2, 3],
  type: 1,
}, {
  name: '均值',
  value: 'avg',
  tagTypeList: [2, 3],
  type: 1,
}, {
  name: '最小值',
  value: 'min',
  tagTypeList: [2, 3],
  type: 1,
}, {
  name: '最大值',
  value: 'max',
  tagTypeList: [2, 3],
  type: 1,
}]

export const screenLogic = [{
  name: '标签值',
  value: '标签值',
  tagTypeList: [1, 2, 3, 4, 5, 6],
  type: 0, // 0:非聚合函数  1聚合函数
}, {
  name: '绝对值',
  value: 'abs',
  tagTypeList: [2, 3],
  type: 0,
}, {
  name: '年份',
  value: 'year',
  tagTypeList: [5],
  type: 0,
}, {
  name: '月份',
  value: 'month',
  tagTypeList: [5],
  type: 0,
}, {
  name: '日',
  value: 'day',
  tagTypeList: [5],
  type: 0,
}, {
  name: '距离今天',
  value: 'datediff',
  tagTypeList: [5],
  type: 0,
}, {
  name: '时间转换',
  value: 'date_format',
  tagTypeList: [5],
  type: 0,
}, {
  name: '总记录数',
  value: 'count',
  tagTypeList: [1, 2, 3, 4, 5, 6],
  type: 1,
}, {
  name: '求和',
  value: 'sum',
  tagTypeList: [2, 3],
  type: 1,
}, {
  name: '均值',
  value: 'avg',
  tagTypeList: [2, 3],
  type: 1,
}, {
  name: '最小值',
  value: 'min',
  tagTypeList: [2, 3],
  type: 1,
}, {
  name: '最大值',
  value: 'max',
  tagTypeList: [2, 3],
  type: 1,
}]

// 聚合函数
export const aggregation = ['count', 'sum', 'avg', 'min', 'max']

// 聚合函数
export const aggregationLogic = [{
  value: '固定值',
  name: '固定值',
}, {
  value: 'param',
  name: '参数',
}]

export const screenValueLogic = [{
  value: '固定值',
  name: '固定值',
}, {
  value: '标签值',
  name: '标签值',
}, {
  value: 'param',
  name: '参数',
}]

export const comparison = [{
  value: '=',
  name: '等于',
}, {
  value: '>',
  name: '大于',
}, {
  value: '>=',
  name: '大于等于',
}, {
  value: '<',
  name: '小于',
}, {
  value: '<=',
  name: '小于等于',
}, {
  value: '!=',
  name: '不等于',
}, 
// {
//   value: 'in',
//   name: '在集合',
// }, {
//   value: 'not in',
//   name: '不在集合',
// }, {
//   value: 'is null',
//   name: '为空',
// }
]

export const tagComparison = [{
  value: '=',
  name: '等于',
}, {
  value: '!=',
  name: '不等于',
}]

export const condition = [{
  value: '=',
  name: '等于',
}, {
  value: '>',
  name: '大于',
}, {
  value: '>=',
  name: '大于等于',
}, {
  value: '<',
  name: '小于',
}, {
  value: '<=',
  name: '小于等于',
}, {
  value: '!=',
  name: '不等于',
}]

// 获取聚合类型
export const getAggregateType = fun => {
  const [obj] = outValueLogic.filter(d => d.value === fun)

  return obj.type
}

// 输出设置信息数据处理
export const getOutConfig = (arg, ord) => {

  const order = ord.map(d => d.id)

  const data = order.map(d => arg[d])

  const arr = []
  for (let i = 0; i < data.length; i += 1) {
    const params = []

    if(data[i].params) {
      params.push(data[i].params)

      if(data[i].params1) {
        params.push(data[i].params1)
      }
    } 

    const obj = {
      aggregateType: getAggregateType(data[i].function),
      alias: data[i].alias,
      conditionUnit: {
        function: data[i].function,
        params: params
      },
    }

    arr.push(obj)
  }

  return arr
}

// 筛选设置信息数据处理
export const getScreenConfig = arg => {
  const result = {
    whereType: arg.whereType,
  }
  delete arg.whereType
  const data = Object.values(arg) 

  const arr = []
  for (let i = 0; i < data.length; i += 1) {
    const {comparision, leftFunction, leftParams, leftParams1, rightFunction, rightParams, rightParams1} = data[i]
    const resultLeftParams = []

    if(leftParams) {
      resultLeftParams.push(leftParams)

      if(leftParams1) {
        resultLeftParams.push(leftParams1)
      }
    } 
    
    const obj = {
      comparision,
      aggregateType: getAggregateType(leftFunction),
      left: {
        function: leftFunction,
        params: resultLeftParams,
      },
      right: {
        function: rightFunction,
        params: rightParams1 ? [rightParams, rightParams1] : [rightParams],
      },
    }

    arr.push(obj)
  }
  result.comparisionList = arr

  return result
}


export const getGroupItemData = (data, parentFlag, formItemData, logicMap, whereMap) => {
  const newData = _.cloneDeep(data)

  if (data.length === 1) {
    const sOnedata = formItemData[`${parentFlag}-${data[0].flag}`]

    if (whereMap && Object.keys(whereMap).length) {
      sOnedata.where = whereMap[`${parentFlag}-${data[0].flag}`] || {}
    }

    return sOnedata 
  }

  newData.forEach(d => {
    const comparisionList = newData.filter(
      sd => sd.type === 2 
      && sd.flag.slice(0, -2) === d.flag
    )

    const comparisionListResult = comparisionList.map(sd => {
      const sdata = formItemData[`${parentFlag}-${sd.flag}`]

      return ({
        comparision: sdata.comparision,
        left: {
          function: sdata.leftFunction,
          params: [
            sdata.leftTagId,
          ],
        },
        right: {
          function: sdata.rightFunction,
          params: [
            sdata.rightParams,
          ],
        },
        where: (whereMap && whereMap[`${parentFlag}-${sd.flag}`]) || {},
      })
    })

    d.comparisionList = comparisionListResult

    if (comparisionListResult.length) d.comparisionList = comparisionListResult

    if (typeof d.logic === 'undefined') d.logic = logicMap[parentFlag] || 1

    const childList = newData.filter(sd => sd.type === 1 
      && sd.source
      && sd.flag.slice(0, -2) === d.flag)
    
    if (childList.length && !d.childList) {
      d.childList = childList
    }

    if (d.type === 1) {
      delete d.flag
      delete d.level
      delete d.source
      delete d.target
      delete d.type
      delete d.rightFunction
      delete d.rightParams
      delete d.leftFunction
      delete d.leftTagId
      delete d.y
      delete d.comparision
    }
  })

  return newData.filter(d => d.x === 0)
}

export function formatData(formItemData, domRef, whereMap) {
  const {renderData, pos, selfCon, logicMap} = domRef

  if (renderData.length === 1) {
    const [current] = renderData

    const resultOne = {
      logic: current.logic,
    }

    const entity = getGroupItemData(pos['0-0'], '0-0', formItemData, logicMap)

    const rel = getGroupItemData(pos['0-1'], '0-1', formItemData, logicMap, whereMap)

    const comparisionList = []
    const childList = []

    if (pos['0-0'].length === 1) {
      comparisionList.push(entity)
    } else {
      childList.push(...entity)
    }

    if (pos['0-1'].length === 1) {
      comparisionList.push(rel)
    } else {
      childList.push(...rel)
    }

    resultOne.comparisionList = comparisionList
    resultOne.childList = childList
    console.log(resultOne)
    return resultOne
  } 

  const result = {
    logic: selfCon,
    comparisionList: [],
    childList: [],
  }
  
  for (let i = 0; i < renderData.length; i++) {
    const current = renderData[i]

    const currentFlagEntity = `${current.flag}-0`
    const currentFlagRel = `${current.flag}-1`
  
    const entityResult = getGroupItemData(pos[currentFlagEntity], currentFlagEntity, formItemData, logicMap)
    const relResult = getGroupItemData(pos[currentFlagRel], currentFlagRel, formItemData, logicMap, whereMap)

    const groupResult = {
      logic: current.logic,
      comparisionList: [],
      children: [],
    }
  
    if (pos[currentFlagEntity].length === 1) {
      groupResult.comparisionList.push(entityResult)
    } else {
      groupResult.children.push(...entityResult)
    }
  
    if (pos[currentFlagRel].length === 1) {
      groupResult.comparisionList.push(relResult)
    } else {
      groupResult.children.push(...relResult)
    }

    result.childList.push(groupResult)
  }

  return result
}

export const getRenderData = (formItemData, domRef, whereMap) => {
  const {renderData, pos, selfCon, logicMap} = domRef

  const rule = []
  for (let i = 0; i < renderData.length; i++) {
    const entityPos = pos[`${i}-0`].map(d => ({
      ...d,
      ...formItemData[`${i}-0-${d.flag}`],
      logic: logicMap[`${i}-0-${d.flag}`] || 1,
    }))

    const relPos = pos[`${i}-1`].map(d => ({
      ...d,
      ...formItemData[`${i}-1-${d.flag}`],
    }))

    const posInfo = {
      [`${i}-0`]: entityPos,
      [`${i}-1`]: relPos,
    }

    const result = {
      ...renderData[i],
      pos: posInfo,
    }

    rule.push(result)
  }

  const resule = {
    whereMap,
    selfCon,
    rule,
  }

  console.log(resule)
}

export const ruleFunctionList = [{
  name: '标签值',
  value: '标签值',
  tagTypeList: [1, 2, 3, 4, 5, 6],
}]

export const functionList = [{
  name: '标签值',
  value: '标签值',
  tagTypeList: [1, 2, 3, 4, 5, 6],
}, {
  name: '绝对值',
  value: 'abs',
  tagTypeList: [2, 3],
}, {
  name: '总记录数',
  value: 'count',
  tagTypeList: [1, 2, 3, 4, 5, 6],
}, {
  name: '求和',
  value: 'sum',
  tagTypeList: [2, 3],
}, {
  name: '平均数',
  value: 'avg',
  tagTypeList: [2, 3],
}, {
  name: '最小值',
  value: 'min',
  tagTypeList: [2, 3],
}, {
  name: '最大值',
  value: 'max',
  tagTypeList: [2, 3],
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
  value: '=<',
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

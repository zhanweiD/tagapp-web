import intl from 'react-intl-universal'

export const getGroupItemData = (
  data,
  parentFlag,
  formItemData,
  logicMap,
  whereMap
) => {
  if (!data) return false

  const newData = _.cloneDeep(data)

  if (data && data.length === 1) {
    const formData = formItemData[`${parentFlag}-${data[0].flag}`]

    const sOnedata = {
      comparision: formData.comparision,
      left: {
        function: formData.leftFunction,
        params: [formData.leftTagId],
      },

      right: {
        function: formData.rightFunction,
        params: [formData.rightParams],
      },
    }

    if (whereMap && Object.keys(whereMap).length) {
      sOnedata.where = whereMap[`${parentFlag}-${data[0].flag}`]
    }

    return sOnedata
  }

  newData.forEach(d => {
    const comparisionList = newData.filter(
      sd => sd.type === 2 && sd.flag.slice(0, -2) === d.flag
    )

    const comparisionListResult = comparisionList.map(sd => {
      const sdata = formItemData[`${parentFlag}-${sd.flag}`]
      const resultObj = {
        comparision: sdata.comparision,
        left: {
          function: sdata.leftFunction,
          params: [sdata.leftTagId],
        },

        right: {
          function: sdata.rightFunction,
          params: [sdata.rightParams],
        },
      }

      if (whereMap && whereMap[`${parentFlag}-${sd.flag}`]) {
        resultObj.where = whereMap && whereMap[`${parentFlag}-${sd.flag}`]
      }
      return resultObj
    })

    d.comparisionList = comparisionListResult

    if (comparisionListResult.length) d.comparisionList = comparisionListResult

    if (typeof d.logic === 'undefined') d.logic = logicMap[parentFlag] || 1

    const childList = newData.filter(
      sd => sd.type === 1 && sd.source && sd.flag.slice(0, -2) === d.flag
    )

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
  const { renderData, pos, selfCon, logicMap } = domRef

  if (renderData.length === 1) {
    const [current] = renderData

    const resultOne = {
      logic: current.logic,
    }

    const entity = getGroupItemData(pos['0-0'], '0-0', formItemData, logicMap)

    const rel = getGroupItemData(
      pos['0-1'],
      '0-1',
      formItemData,
      logicMap,
      whereMap
    )

    const comparisionList = []
    const childList = []

    if (pos['0-0'] && entity) {
      if (pos['0-0'].length === 1) {
        comparisionList.push(entity)
      } else {
        childList.push(...entity)
      }
    }

    if (pos['0-1'] && rel) {
      if (pos['0-1'].length === 1) {
        comparisionList.push(rel)
      } else {
        childList.push(...rel)
      }
    }

    resultOne.comparisionList = comparisionList
    resultOne.childList = childList

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

    if (!pos[currentFlagEntity] && !pos[currentFlagRel]) {
      break
    }
    const entityResult = getGroupItemData(
      pos[currentFlagEntity],
      currentFlagEntity,
      formItemData,
      logicMap
    )
    const relResult = getGroupItemData(
      pos[currentFlagRel],
      currentFlagRel,
      formItemData,
      logicMap,
      whereMap
    )

    const groupResult = {
      logic: current.logic,
      comparisionList: [],
      childList: [],
    }

    if (pos[currentFlagEntity] && entityResult) {
      if (pos[currentFlagEntity].length === 1) {
        groupResult.comparisionList.push(entityResult)
      } else {
        groupResult.childList.push(...entityResult)
      }
    }

    if (pos[currentFlagRel] && relResult) {
      if (pos[currentFlagRel].length === 1) {
        groupResult.comparisionList.push(relResult)
      } else {
        groupResult.childList.push(...relResult)
      }
    }

    result.childList.push(groupResult)
  }
  console.log(result)
  return result
}

export const getRenderData = (formItemData, domRef, wherePosMap, whereMap) => {
  const { renderData, pos, selfCon, logicMap } = domRef

  const rule = []
  for (let i = 0; i < renderData.length; i++) {
    const renderItem = renderData[i]
    const entityPos =
      pos[`${renderItem.flag}-0`] &&
      pos[`${renderItem.flag}-0`].map(d => ({
        ...d,
        ...formItemData[`${renderItem.flag}-0-${d.flag}`],
        logic: logicMap[`${renderItem.flag}-0-${d.flag}`] || 1,
      }))

    const relPos =
      pos[`${renderItem.flag}-1`] &&
      pos[`${renderItem.flag}-1`].map(d => ({
        ...d,
        ...formItemData[`${renderItem.flag}-1-${d.flag}`],
      }))

    const posInfo = {}

    if (entityPos) {
      posInfo[`${renderItem.flag}-0`] = entityPos
    }

    if (relPos) {
      posInfo[`${renderItem.flag}-1`] = relPos
    }

    const result = {
      ...renderData[i],
      pos: posInfo,
    }

    rule.push(result)
  }

  const resule = {
    wherePosMap,
    whereMap,
    selfCon,
    rule,
  }

  return resule
}

export const functionList = [
  {
    name: intl
      .get('ide.src.page-group.component.fixedValue.bgzr9cfl6hg')
      .d('?????????'),
    value: intl
      .get('ide.src.page-group.component.fixedValue.bgzr9cfl6hg')
      .d('?????????'),
    tagTypeList: [1, 2, 3, 4, 5, 6],
  },
  {
    name: intl
      .get('ide.src.page-group.component.fixedValue.7665zxf2f68')
      .d('?????????'),
    value: 'abs',
    tagTypeList: [2, 3],
  },

  {
    name: intl.get('ide.src.page-group.component.util.hri3swiwnqe').d('??????'),
    value: 'year',
    tagTypeList: [5],
  },

  {
    name: intl.get('ide.src.page-group.component.util.dem16wzhwpk').d('??????'),
    value: 'month',
    tagTypeList: [5],
  },
  {
    name: intl.get('ide.src.page-group.component.util.js5vxb7p77p').d('???'),
    value: 'day',
    tagTypeList: [5],
  },
  {
    name: intl
      .get('ide.src.page-group.component.util.qwuovtsktoh')
      .d('????????????'),
    value: 'datediff',
    tagTypeList: [5],
  },
  {
    name: intl
      .get('ide.src.page-group.component.util.v5iw5fg1bk')
      .d('????????????'),
    value: 'date_format',
    tagTypeList: [5],
  },
]

export const entityFunctionList = [
  // {
  //   name: '?????????',
  //   value: '?????????',
  //   tagTypeList: [1, 2, 3, 4, 5, 6],
  // }, {
  //   name: '?????????',
  //   value: 'abs',
  //   tagTypeList: [2, 3],
  // },
  {
    name: intl
      .get('ide.src.page-group.component.fixedValue.xf0gsfep3m')
      .d('????????????'),
    value: 'count',
    tagTypeList: [1, 2, 3, 4, 5, 6],
  },
  {
    name: intl
      .get('ide.src.page-group.component.fixedValue.tnkpwzg3lsq')
      .d('??????'),
    value: 'sum',
    tagTypeList: [2, 3],
  },
  {
    name: intl
      .get('ide.src.page-group.component.fixedValue.803qqhhz52f')
      .d('?????????'),
    value: 'avg',
    tagTypeList: [2, 3],
  },
  {
    name: intl
      .get('ide.src.page-group.component.fixedValue.mq3iampws3')
      .d('?????????'),
    value: 'min',
    tagTypeList: [2, 3],
  },
  {
    name: intl
      .get('ide.src.page-group.component.fixedValue.ieuuxsnlv1')
      .d('?????????'),
    value: 'max',
    tagTypeList: [2, 3],
  },
]

export const condition = [
  {
    value: '=',
    name: intl.get('ide.src.page-group.component.util.r9q9unmjuss').d('??????'),
  },
  {
    value: '>',
    name: intl.get('ide.src.page-group.component.util.me4pul68n1').d('??????'),
  },
  {
    value: '>=',
    name: intl
      .get('ide.src.page-group.component.util.zix85xqi6e')
      .d('????????????'),
  },
  {
    value: '<',
    name: intl.get('ide.src.page-group.component.util.3rf6n7at7r5').d('??????'),
  },
  {
    value: '<=',
    name: intl
      .get('ide.src.page-group.component.util.o1tendir57k')
      .d('????????????'),
  },
  {
    value: '!=',
    name: intl.get('ide.src.page-group.component.util.52rj9p9vsup').d('?????????'),
  },

  // {
  //   value: 'in',
  //   name: '?????????',
  // }, {
  //   value: 'not in',
  //   name: '????????????',
  // }, {
  //   value: 'is null',
  //   name: '??????',
  // }
]

export const textCondition = [
  {
    value: '=',
    name: intl.get('ide.src.page-group.component.util.r9q9unmjuss').d('??????'),
  },
  {
    value: '!=',
    name: intl.get('ide.src.page-group.component.util.52rj9p9vsup').d('?????????'),
  },
]

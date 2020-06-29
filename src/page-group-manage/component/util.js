
export const getGroupItemData = (data, parentFlag, formItemData) => {
  const newData = _.cloneDeep(data)

  if (data.length === 1) {
    return data 
  }

  newData.forEach(d => {
    const comparisionList = newData.filter(
      sd => sd.type === 2 
      && sd.flag.slice(0, -2) === d.flag
    )

    const comparisionListResult = comparisionList.map(sd => ({
      comparision: sd.comparision,
      left: {
        function: sd.leftFunction,
        params: [
          sd.leftTagId,
        ],
      },
      right: {
        function: sd.rightFunction,
        params: [
          sd.rightParams,
        ],
      },
    }))

    d.comparisionList = comparisionListResult

    if (comparisionListResult.length) d.comparisionList = comparisionListResult

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

export function formatData(formItemData, domRef) {
  const {renderData, pos, selfCon, logicMap} = domRef

  if (renderData.length === 1) {
    const [current] = renderData

    const resultOne = {
      logic: current.logic,
    }

    console.log(resultOne)
    const entity = getGroupItemData(pos['0-0'], ['0-0'], formItemData)
    const rel = getGroupItemData(pos['0-1'], ['0-1'], formItemData)

    const comparisionList = []
    const childList = []
    console.log(entity, rel)
    if (pos['0-0'].length === 1) {
      comparisionList.push(entity[0])
    } else {
      childList.push(...entity)
    }

    if (pos['0-1'].length === 1) {
      comparisionList.push(rel[0])
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
    // const currentFlag = current.flag
    const currentFlagEntity = `${current.flag}-0`
    const currentFlagRel = `${current.flag}-1`
  
    const entityResult = getGroupItemData(pos[currentFlagEntity], currentFlagEntity, formItemData)
    const relResult = getGroupItemData(pos[currentFlagRel], currentFlagRel, formItemData)
  
    if (pos[currentFlagEntity].length === 1) {
      result.comparisionList.push(entityResult)
    } else {
      result.comparisionList.push(...entityResult)
    }
  
    if (pos[currentFlagRel].length === 1) {
      result.comparisionList.push(relResult)
    } else {
      result.comparisionList.push(...relResult)
    }
  }
  
  console.log(result)
  return result
}

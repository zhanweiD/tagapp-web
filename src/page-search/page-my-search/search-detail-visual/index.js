import {asyncComponent} from '../../../common/util'

import './visual.styl'

export default asyncComponent(async () => {
  try {
    const module = await import('./visual')
    return module.default
  } catch (error) {
    console.log(error)
  }
  return null
})

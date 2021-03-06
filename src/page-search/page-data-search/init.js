import intl from 'react-intl-universal'
/**
 * @description 初始化
 */
import { Component } from 'react'
import { observer } from 'mobx-react'
import { action } from 'mobx'
import { NoData } from '../../component'
import ModalInit from './modal-init'

@observer
class DataSearchInit extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  @action.bound init() {
    this.store.visibleInit = true
    this.store.getStorageType()
  }

  render() {
    // const {loading} = this.store

    const noDataConfig = {
      btnText: intl
        .get('ide.src.page-search.page-data-search.init.exwgwgvfe1c')
        .d('去初始化'),
      onClick: () => this.init(),
    }

    return (
      <div>
        <NoData
          // isLoading={loading}
          {...noDataConfig}
        />

        <ModalInit store={this.store} />
      </div>
    )
  }
}
export default DataSearchInit

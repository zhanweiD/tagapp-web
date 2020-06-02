import {Component} from 'react'
import {action, toJS} from 'mobx'
import {observer} from 'mobx-react'
import {Modal, Spin} from 'antd'
import {ModalForm} from '../../component'

export default class GroupBackConfig extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }
  selectContent= () => {
    const {
      selectLoading, 
      dataSource = [], 
      dataTypeSource = [],
    } = this.store
    return [{
      label: '数据源类型',
      key: 'type',
      initialValue: 1,
      rules: [
        '@requiredSelect',
      ],
      control: {
        // options: dataTypeSource,
        options: [
          {
            value: 1,
            name: 'Mysql',
          },
          {
            value: 2,
            name: 'Oracle',
          },
          {
            value: 11,
            name: 'PostgreSQL',
          },
          {
            value: 10,
            name: 'Greenplum',
          },
          {
            value: 4,
            name: 'Hive',
          },
        ],
        onSelect: v => this.selectDataTypeSource(v),
        notFoundContent: selectLoading ? <Spin size="small" /> : null, 
      },
      component: 'select',
    }, {
      label: '数据源',
      key: 'storageId',
      initialValue: '1583289421353fdnk',
      rules: [
        '@requiredSelect',
      ],
      control: {
        // options: dataSource,
        options: [
          {
            value: "1583289421353fdnk",
            name: "testdatasource",
          },
          {
            value: "15839289253985ouc",
            name: "1234",
          },
        ],
        onSelect: v => this.selectDataSource(v),
        notFoundContent: selectLoading ? <Spin size="small" /> : null, 
      },
      selectLoading, // 下拉框loading效果
      component: 'select',
    }]
  }
  render() {
    const formConfig = {
      // selectContent: visible && this.selectContent(),
      selectContent: this.selectContent(),
      wrappedComponentRef: form => { this.form = form ? form.props.form : form },
    }
    return (
      <div>
        1
        <ModalForm {...formConfig} />
      </div>
    )
  }
}

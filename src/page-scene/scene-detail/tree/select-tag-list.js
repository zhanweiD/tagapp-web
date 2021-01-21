import intl from 'react-intl-universal'
/**
 * @description 场景-选择对象-对象列表
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {observable, action} from 'mobx'
import {Table, Input, Popconfirm, Tooltip} from 'antd'
import {SearchOutlined} from '@ant-design/icons'
import {OmitTooltip} from '../../../component'

const {Search} = Input

@observer
class TagList extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  @observable searchKey = undefined

  columns = [
    {
      title: intl
        .get('ide.src.page-scene.scene-detail.tree.select-tag-list.fa7jkcvn23a')
        .d('标签名称'),
      dataIndex: 'name',
      key: 'name',
      width: 80,
      // render: text => <OmitTooltip maxWidth={50} text={text} />,
    },
    {
      title: intl
        .get('ide.src.page-scene.scene-detail.select-tag.eba3w9n3h9e')
        .d('标签标识'),
      dataIndex: 'enName',
      key: 'enName',
      width: 80,
      // render: text => <OmitTooltip maxWidth={50} text={text} />,
    },
    {
      title: intl
        .get('ide.src.page-scene.scene-detail.select-tag.dcoug0r6pnj')
        .d('数据类型'),
      dataIndex: 'valueTypeName',
      key: 'valueTypeName',
      width: 80,
      // render: text => <OmitTooltip maxWidth={50} text={text} />,
    },
    {
      title: intl
        .get('ide.src.page-scene.scene-detail.select-tag.eddpjjmgvji')
        .d('是否枚举'),
      dataIndex: 'isEnum',
      key: 'isEnum',
      width: 80,
      render: text => (text
        ? intl.get('ide.src.component.form-component.qzk44dlnid').d('是')
        : intl.get('ide.src.component.form-component.5lxtuor5tix').d('否')),
      // render: text => <OmitTooltip maxWidth={50} text={text ? '是' : '否'} />,
    },
    {
      title: intl
        .get('ide.src.page-scene.scene-detail.tree.select-tag-list.3bdad5fb0te')
        .d('枚举显示值'),
      dataIndex: 'enumValue',
      key: 'enumValue',
      width: 80,
      // render: text => <OmitTooltip maxWidth={80} text={text} />,
    },
    {
      title: intl
        .get('ide.src.page-scene.scene-detail.tree.select-tag-list.b6j014xuwa')
        .d('业务逻辑'),
      dataIndex: 'descr',
      key: 'descr',
      width: 80,
      // render: text => <OmitTooltip maxWidth={100} text={text} />,
    },
    {
      title: intl
        .get('ide.src.page-config.group-config.back-config.0pwwx1kvm4p')
        .d('操作'),
      dataIndex: 'action',
      width: 80,
      render: (text, record) => {
        if (record.isUsed) {
          return (
            <Tooltip
              title={intl
                .get(
                  'ide.src.page-scene.scene-detail.tree.select-tag-list.wqmbjc9u1tm'
                )
                .d('标签使用中, 不可移除')}
            >
              <span className="disabled">
                {intl
                  .get(
                    'ide.src.page-config.group-config.back-config.kovby4adjrk'
                  )
                  .d('移除')}
              </span>
            </Tooltip>
          )
        }
        return (
          <Popconfirm
            placement="topRight"
            title={intl
              .get(
                'ide.src.page-scene.scene-detail.tree.select-tag-list.m2a72g7g1z'
              )
              .d('确定移除？')}
            onConfirm={() => this.remove(record)}
          >
            <a href>
              {intl
                .get('ide.src.page-config.group-config.back-config.kovby4adjrk')
                .d('移除')}
            </a>
          </Popconfirm>
        )
      },
    },
  ]

  @action.bound onChange(e) {
    const {value} = e.target
    this.searchKey = value
  }

  remove = d => {
    const {remove} = this.props

    remove(d)
  }

  getFilterData() {
    const {selectTagTableData} = this.store
    if (this.searchKey) {
      return selectTagTableData.filter(
        d => d.name.indexOf(this.searchKey) !== -1
      )
    }
    return selectTagTableData.slice()
  }

  render() {
    const listConfig = {
      dataSource: this.getFilterData(),
      rowKey: 'id',
      columns: this.columns,
      pagination: false,
      scroll: {y: 'calc(100% - 98)'},
    }

    return (
      <div className="FB1 select-tag-list">
        {/* <Search
           placeholder="请输入标签名称关键字"
           onChange={this.onChange}
           style={{width: 300}}
           className="select-tag-search"
          /> */}
        <Input
          onChange={this.onChange}
          style={{width: 156, marginBottom: '8px'}}
          size="small"
          placeholder={intl
            .get(
              'ide.src.page-scene.scene-detail.tree.select-tag-list.b57cc5hqnid'
            )
            .d('请输入标签名称关键字')}
          suffix={<SearchOutlined />}
        />

        <Table {...listConfig} />
      </div>
    )
  }
}
export default TagList

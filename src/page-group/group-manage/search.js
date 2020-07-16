import {toJS} from 'mobx'

const serach = store => [
  {
    label: '实体',
    key: 'objId',
    initialValue: '',
    control: {
      defaultAll: true,
      options: [
        {name: '全部', value: ''},
        ...toJS(store.entityList),
      ],
    },
    component: 'select',
  }, {
    label: '群体类型',
    key: 'type',
    initialValue: '',
    control: {
      defaultAll: true,
      options: [
        {name: '全部', value: ''},
        {name: '离线实体', value: 1},
        {name: '实时群体', value: 2},
      ],
    },
    component: 'select',
  }, 
  {
    label: '创建方式',
    key: 'mode',
    initialValue: '',
    control: {
      defaultAll: true,
      options: [
        {name: '全部', value: ''},
        {name: '规则创建', value: 1},
        {name: 'ID集合创建', value: 2},
      ],
    },
    component: 'select',
  },
  // {
  //   label: '更新方式',
  //   key: 'name',
  //   initialValue: '',
  //   control: {
  //     defaultAll: true,
  //     options: [{name: '全部', value: ''}],
  //   },
  //   component: 'select',
  // },
  {
    label: '最近更新状态',
    key: 'status',
    initialValue: '',
    control: {
      defaultAll: true,
      options: [
        {name: '全部', value: ''},
        {name: '正常', value: 1},
        {name: '失败', value: 2},
        {name: '计算中', value: 3},
      ],
    },
    component: 'select',
  },
  {
    label: '群体名称',
    key: 'keyword',
    control: {
      placeholder: '请输入项目名称关键字搜索',
    },
    component: 'input',
  },
]
export default serach

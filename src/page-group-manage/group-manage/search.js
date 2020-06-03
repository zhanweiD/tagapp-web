const serach = ({cUser = []}) => [
  {
    label: '实体',
    key: 'cUserId',
    initialValue: '',
    control: {
      defaultAll: true,
      options: cUser.length ? cUser : [{name: '全部', value: ''}],
    },
    component: 'select',
  }, {
    label: '群体类型',
    key: 'time',
    initialValue: '',
    control: {
      defaultAll: true,
      options: cUser.length ? cUser : [{name: '全部', value: ''}],
    },
    component: 'select',
  }, 
  {
    label: '创建方式',
    key: 'name',
    initialValue: '',
    control: {
      defaultAll: true,
      options: cUser.length ? cUser : [{name: '全部', value: ''}],
    },
    component: 'select',
  },
  {
    label: '更新方式',
    key: 'name',
    initialValue: '',
    control: {
      defaultAll: true,
      options: cUser.length ? cUser : [{name: '全部', value: ''}],
    },
    component: 'select',
  },
  {
    label: '最近更新状态',
    key: 'name',
    initialValue: '',
    control: {
      defaultAll: true,
      options: cUser.length ? cUser : [{name: '全部', value: ''}],
    },
    component: 'select',
  },
  {
    label: '群体名称',
    key: 'name',
    control: {
      placeholder: '请输入项目名称关键字搜索',
    },
    component: 'input',
  },
]
export default serach

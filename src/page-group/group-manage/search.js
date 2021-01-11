import intl from 'react-intl-universal'
import { toJS } from 'mobx'

const serach = store => [
  {
    label: intl.get('ide.src.common.dict.eppgpvyn3fp').d('实体'),
    key: 'objId',
    initialValue: '',
    control: {
      defaultAll: true,
      options: [
        {
          name: intl.get('ide.src.component.comp.search.r6a65smbvr').d('全部'),
          value: '',
        },
        ...toJS(store.entityList),
      ],
    },

    component: 'select',
  },
  {
    label: intl
      .get('ide.src.page-group.group-detail.main.dhufx44wnvm')
      .d('群体类型'),
    key: 'type',
    initialValue: '',
    control: {
      defaultAll: true,
      options: [
        {
          name: intl.get('ide.src.component.comp.search.r6a65smbvr').d('全部'),
          value: '',
        },
        {
          name: intl
            .get('ide.src.page-group.group-detail.main.lgff4rqo5h')
            .d('离线群体'),
          value: 1,
        },
        {
          name: intl
            .get('ide.src.page-group.group-detail.main.23jks5f432c')
            .d('实时群体'),
          value: 2,
        },
      ],
    },

    component: 'select',
  },

  {
    label: intl
      .get('ide.src.page-group.group-detail.main.nd04r8rg67c')
      .d('创建方式'),
    key: 'mode',
    initialValue: '',
    control: {
      defaultAll: true,
      options: [
        {
          name: intl.get('ide.src.component.comp.search.r6a65smbvr').d('全部'),
          value: '',
        },
        {
          name: intl
            .get('ide.src.page-group.group-detail.main.g7lv1owdkxp')
            .d('规则创建'),
          value: 1,
        },
        {
          name: intl
            .get('ide.src.page-group.group-detail.main.3swfo8itq8b')
            .d('ID集合创建'),
          value: 2,
        },
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
    label: intl
      .get('ide.src.page-group.group-manage.search.aqir0fwum9w')
      .d('最近更新状态'),
    key: 'status',
    initialValue: '',
    control: {
      defaultAll: true,
      options: [
        {
          name: intl.get('ide.src.component.comp.search.r6a65smbvr').d('全部'),
          value: '',
        },
        {
          name: intl
            .get('ide.src.page-group.group-detail.main.ulrohoasnsh')
            .d('正常'),
          value: 1,
        },
        {
          name: intl
            .get('ide.src.page-group.group-detail.main.atzzx8akyq6')
            .d('失败'),
          value: 2,
        },
        {
          name: intl
            .get('ide.src.page-group.group-detail.main.ldpbvdq4x7r')
            .d('计算中'),
          value: 3,
        },
      ],
    },

    component: 'select',
  },

  {
    label: intl
      .get('ide.src.page-group.group-analyze.search.2ll7wsjzshl')
      .d('群体名称'),
    key: 'keyword',
    control: {
      placeholder: intl
        .get('ide.src.page-group.group-manage.search.0ljy746s8gsc')
        .d('请输入群体名称关键字搜索'),
    },

    component: 'input',
  },
]

export default serach

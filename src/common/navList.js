import intl from 'react-intl-universal'

/*
 * @description 面包屑设置
 */

const pathPrefix = '/asset-tag/index.html#'
// 标签中心
const tagCenter = {
  tagCenter: {
    url: `${pathPrefix}/overview`,
    text: intl.get('ide.src.common.navList.57er8be0lrr').d('标签中心'),
  },
}

// 总览
const overview = {
  overview: {
    text: intl.get('ide.src.common.navList.yxe68hd3cm').d('总览'),
  },
}

// 标签集市
const market = {
  market: {
    text: intl.get('ide.src.common.navList.bisbm5o3glk').d('集市'),
  },
}

// 对象管理
const object = {
  object: {
    url: `${pathPrefix}/object-list`,
    text: intl.get('ide.src.common.navList.fmz6vifk57e').d('对象管理'),
  },

  objectList: {
    url: `${pathPrefix}/object-list`,
    text: intl.get('ide.src.common.navList.hhrmsuhzefs').d('对象列表'),
  },

  objectDetail: {
    text: intl.get('ide.src.common.navList.5s45uqv01t3').d('对象详情'),
  },

  objectModel: {
    text: intl.get('ide.src.common.navList.k3enzvqa2xb').d('对象模型'),
  },
}

// 标签管理
const tagManagement = {
  tagManagement: {
    url: `${pathPrefix}/tag-warehouse`,
    text: intl.get('ide.src.common.navList.rsrnj0c0b6').d('标签管理'),
  },

  objectConfig: {
    text: intl.get('ide.src.common.navList.nb2co7bflk').d('对象配置'),
  },

  tagWarehouse: {
    text: intl.get('ide.src.common.navList.dovjg9tnfw5').d('标签仓库'),
  },

  tagModel: {
    url: `${pathPrefix}/tag-model`,
    text: intl.get('ide.src.common.navList.z7cbrc4ob3f').d('标签模型'),
  },

  tagDetail: {
    text: intl.get('ide.src.common.navList.gy9u8c4zjpj').d('标签详情'),
  },
}

// 标签加工
const tagSchema = {
  tagSchema: {
    url: `${pathPrefix}/tag-schema`,
    text: intl.get('ide.src.common.navList.zixmybqyuja').d('标签加工'),
  },

  schemaList: {
    url: `${pathPrefix}/tag-schema`,
    text: intl.get('ide.src.common.navList.7deow4cnait').d('加工方案'),
  },

  schemaDetail: {
    text: intl.get('ide.src.common.navList.xnd9x87c1k').d('加工方案详情'),
  },
}

const application = {
  application: {
    url: `${pathPrefix}/scene`,
    text: intl.get('ide.src.common.navList.mkax9hax7mr').d('标签应用'),
  },

  scene: {
    url: `${pathPrefix}/scene`,
    text: intl.get('ide.src.common.navList.gp1e77mb1yn').d('场景管理'),
  },

  sceneDetail: {
    text: intl.get('ide.src.common.navList.8mgn71mhj0f').d('场景详情'),
  },

  sceneTags: {
    text: intl.get('ide.src.common.navList.vgo3kjy265').d('标签列表'),
  },
}

const sync = {
  tagSync: {
    url: `${pathPrefix}/tag-sync`,
    text: intl.get('ide.src.common.navList.309lneak6s').d('标签同步'),
  },

  syncPlan: {
    url: `${pathPrefix}/tag-sync`,
    text: intl.get('ide.src.common.navList.67vjmk5zb4d').d('同步计划'),
  },

  syncDetail: {
    text: intl.get('ide.src.common.navList.s1d70nrbl0j').d('同步详情'),
  },

  syncResult: {
    url: `${pathPrefix}/tag-sync/result`,
    text: intl.get('ide.src.common.navList.kjt43e8axh').d('同步结果'),
  },

  aimSource: {
    url: `${pathPrefix}/aim-source`,
    text: intl.get('ide.src.common.navList.vc207x9vx5').d('目的源管理'),
  },

  aimSourceDetail: {
    text: intl.get('ide.src.common.navList.pw89223xrih').d('目的源详情'),
  },
}

const common = {
  common: {
    url: `${pathPrefix}/project`,
    text: intl.get('ide.src.common.navList.afihc0crup').d('公共模块'),
  },
}

// 项目列表
const project = {
  project: {
    url: `${pathPrefix}/project`,
    text: intl.get('ide.src.common.navList.eyy7incc4b').d('项目列表'),
  },

  projectConfig: {
    text: intl.get('ide.src.common.navList.0b24e45o3e1').d('项目配置'),
  },
}

// 审批管理
const approval = {
  approval: {
    url: `${pathPrefix}/approval`,
    text: intl.get('ide.src.common.navList.3yreywjsc7t').d('审批管理'),
  },

  myRequests: {
    text: intl.get('ide.src.common.navList.b9cldejau8q').d('我的申请'),
  },

  pendingApproval: {
    text: intl.get('ide.src.common.navList.1na5id5vdj4').d('待我审批'),
  },

  approved: {
    text: intl.get('ide.src.common.navList.fqi1if4flr').d('我已审批'),
  },
}

// 可视化
const visual = {
  visual: {
    url: `${pathPrefix}/visual`,
    text: intl.get('ide.src.common.navList.hdqja659fcq').d('可视化方案'),
  },

  visualConfig: {
    text: intl.get('ide.src.common.navList.448b2w4cy35').d('方案配置'),
  },

  visualDetail: {
    text: intl.get('ide.src.common.navList.k5yt5d7s8qh').d('方案详情'),
  },

  visualTagList: {
    text: intl.get('ide.src.common.navList.4uztj71lulr').d('衍生标签列表'),
  },
}

const navListMap = {
  ...tagCenter,
  ...overview,
  ...market,
  ...object,
  ...project,
  ...tagManagement,
  ...approval,
  ...application,
  ...tagSchema,
  ...common,
  ...sync,
  ...visual,
}

module.exports = navListMap

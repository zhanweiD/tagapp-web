import intl from 'react-intl-universal'
import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import * as dict from './common/dict'

import i18nZh from '../lang/zh-CN'
import i18nEn from '../lang/en-US'
import {getCookie} from './common/util'

import Config from './page-config'
import App from './index-app'

import Frame from './frame'

require('intl/locale-data/jsonp/en.js')
require('intl/locale-data/jsonp/zh.js')

const njkData = {
  dict,
}

const language = getCookie('language') || 'zh-CN'
intl.init({
  currentLocale: language,
  locales: {
    'zh-CN': i18nZh,
    'en-US': i18nEn,
  },
  warningHandler: (message, detail) => {
    console.warn(detail)
  },
}).then(() => {})

window.njkData = njkData

const quickEntrance = [
  {
    tip: intl.get('ide.src.common.navList.3yreywjsc7t').d('审批管理'),
    icon: 'approver',
    url: '/tag-model/index.html#/common/approval',
  },

  {
    tip: intl.get('ide.src.index-app.wwd4ua1vfg').d('后台配置'),
    icon: 'setting',
    url: '/tag-model/index.html#/config/environment',
  },

  {
    tip: intl
      .get('ide.src.component.project-provider.project-provider.84zbj029egm')
      .d('项目管理'),
    url: '/project/index.html#/project',
    icon: 'project',
  },
]

const commonConfig = {
  productCode: 'tag_app',
  theme: 'ocean',
  logoText: intl.get('ide.src.common.navList.57er8be0lrr').d('标签中心'),
  showAllProduct: true,
  showSider: true,
  showHeaderNav: true,
  showProject: true,
  quickEntrance,
  onUserChange: () => (window.location.href = '/tag-model/index.html#/overview'),
}

const urlHea = window.location.hash.split('/')[1]
let title = intl.get('ide.src.common.navList.57er8be0lrr').d('标签中心')
if (urlHea === 'config') {
  title = intl.get('ide.src.index-app.wwd4ua1vfg').d('后台配置')
} else {
  title = intl.get('ide.src.common.navList.mkax9hax7mr').d('标签应用')
}
document.title = title

const frameComp = (Comp, cofig) => {
  return function frameHocComp() {
    return (
      <Frame {...commonConfig} {...cofig}>
        <Comp />
      </Frame>
    )
  }
}

function Entry() {
  return (
    <Router>
      <Switch>
        {/* 群体洞察 */}
        <Route
          path="/config"
          component={frameComp(Config, {productCode: 'tag_config'})}
        />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<Entry />, document.getElementById('root'))

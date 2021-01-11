import intl from 'react-intl-universal'
import { APPLY_TYPE, APPROVAL_STATUS } from '../common/comp-approval-status'

const serach = ({ projectList = [], applicant = [] }) => [
  {
    label: intl.get('ide.src.component.comp.search.3p4dqwcp1t6').d('申请类型'),
    key: 'type',
    initialValue: '',
    control: {
      options: APPLY_TYPE,
    },

    component: 'select',
  },
  {
    label: intl.get('ide.src.component.comp.search.7wfyr2h2g1s').d('所属项目'),
    key: 'projectId',
    initialValue: '',
    control: {
      defaultAll: true,
      options: projectList.length
        ? projectList
        : [
            {
              name: intl
                .get('ide.src.component.comp.search.r6a65smbvr')
                .d('全部'),
              value: '',
            },
          ],
    },

    component: 'select',
  },
  {
    label: intl.get('ide.src.component.comp.search.hs169ckac4').d('申请时间'),
    key: 'time',
    component: 'rangePicker',
  },
  {
    label: intl.get('ide.src.component.comp.search.sphkda1yf1c').d('申请人'),
    key: 'applyUserId',
    initialValue: '',
    control: {
      defaultAll: true,
      options: applicant.length
        ? applicant
        : [
            {
              name: intl
                .get('ide.src.component.comp.search.r6a65smbvr')
                .d('全部'),
              value: '',
            },
          ],
    },

    component: 'select',
  },
  {
    label: intl.get('ide.src.component.comp.search.uuv509gkqa').d('申请状态'),
    key: 'status',
    initialValue: '',
    control: {
      defaultAll: true,
      options: APPROVAL_STATUS,
    },

    component: 'select',
  },
  {
    label: intl.get('ide.src.component.comp.search.k1e8ygv54bg').d('申请内容'),
    key: 'keyWord',
    component: 'input',
  },
]

export default serach

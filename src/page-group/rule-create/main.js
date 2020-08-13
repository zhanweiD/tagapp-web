import {Component, useEffect, Fragment} from 'react'
import {observer, Provider} from 'mobx-react'
import {action, toJS} from 'mobx'
import OnerFrame from '@dtwave/oner-frame'
import {Steps, message, Modal} from 'antd'

import store from './store'
import StepOne from './step-one'
import StepTwo from './step-two'
import StepThree from './step-three'
import './main.styl'

const {Step} = Steps
let headerTitle = ''
@observer
class RuleCreate extends Component {
  constructor(props) {
    super(props)
    store.projectId = props.projectId

    const {match: {params}} = props

    store.type = params.type
    
    store.groupId = params.groupId

    if (params.groupId) {
      headerTitle = params.type === '1' ? '编辑规则离线群体' : '编辑规则实时群体'
    } else {
      headerTitle = params.type === '1' ? '新建规则离线群体' : '新建规则实时群体'
    }
  }

  componentWillMount() {
    store.getEntityList()
    
    if (store.groupId) {
      store.getDetail(store.groupId)
    }
  }

  componentWillUnmount() {
    store.destroy()
  }

  @action prev = () => {
    store.current -= 1
    store.submitLoading = false
  }

  @action save = values => {
    const {oneForm, submitLoading, groupId} = store

    if (groupId) {
      // message.loading({content: `群体 ${oneForm.name} 编辑中...`, duration: 1})
      store.editGroup(values, res => {
        this.showResult(res)
      })
    } else {
      // message.loading({content: `群体 ${oneForm.name} 创建中...`, duration: 1})
      store.addGroup(values, res => {
        this.showResult(res)
      })
    }
  }

  @action showResult = result => {
    const {oneForm, groupId} = store

    if (result) {
      message.success(`群体 ${oneForm.name} ${groupId ? '编辑' : '创建'}成功`)
      window.location.href = `${window.__keeper.pathHrefPrefix || '/'}/group/manage`
    } else {
      Modal.error({
        content: `群体 ${oneForm.name} 创建失败 您可以重新创建`,
      })
    }
  }

  render() {
    const {current, outputTags, submitLoading, detail, type} = store

    return (
      <Provider store={store}>
        <div>
          <div className="content-header">{headerTitle}</div>
          <div className="rule-create">
            <Steps current={current} style={{width: '80%', margin: '0 auto'}}>
              <Step title="设置基础信息" />
              <Step title="设置群体圈选规则" />
              <Step title="设置群体参数" />
            </Steps>
            <StepOne />
          
            {
              store.current === 1 ? <StepTwo /> : null
            }
         
            {
              store.current === 2 ? (
                <StepThree 
                  configTagList={toJS(outputTags)}
                  current={current} 
                  prev={this.prev}
                  save={this.save}
                  loading={submitLoading} 
                  detail={toJS(detail)}
                  type={+type}
                />
              ) : null
            }
         
          </div>
        </div>
      </Provider>
    )
  }
}

export default props => {
  const ctx = OnerFrame.useFrame()
  const projectId = ctx.useProjectId()

  useEffect(() => {
    ctx.useProject(false)
  }, [])

  return (
    <RuleCreate {...props} projectId={projectId} />
  )
}

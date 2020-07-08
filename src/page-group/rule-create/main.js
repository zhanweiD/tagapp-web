import {Component, useEffect} from 'react'
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
@observer
class RuleCreate extends Component {
  constructor(props) {
    super(props)
    store.projectId = props.projectId

    const {match: {params}} = props

    store.type = params.type
    console.log(params.groupId)
    store.groupId = params.groupId
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
      message.loading({content: `群体 ${oneForm.name} 编辑中...`, submitLoading})
      store.editGroup(values, res => {
        this.showResult(res)
      })
    } else {
      message.loading({content: `群体 ${oneForm.name} 创建中...`, submitLoading})
      store.addGroup(values, res => {
        this.showResult(res)
      })
    }
  }

  @action showResult = result => {
    const {oneForm, groupId} = store

    if (result) {
      message.success(`群体 ${oneForm.name} ${groupId ? '编辑' : '创建'}成功, 正在前往群体管理`)
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

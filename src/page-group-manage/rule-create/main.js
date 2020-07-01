import {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {observer, Provider} from 'mobx-react'
import {action, toJS} from 'mobx'
import {Steps, Button, message, Modal} from 'antd'

import store from './store'
import StepOne from './step-one'
import StepTwo from './step-two'
import StepThree from './step-three'
import './main.styl'

const {Step} = Steps
@observer
export default class RuleCreate extends Component {
  constructor(props) {
    super(props)
    store.projectId = props.projectId

    const {match: {params}} = props
    
    store.type = params.type
    store.groupId = params.groupId
  }

  @action prev = () => {
    store.current -= 1
    store.submitLoading = false
  }

  @action save = values => {
    const {oneForm, submitLoading} = store

    message.loading({content: `群体 ${oneForm.name} 创建中...`, submitLoading})

    store.addGroup(values, res => {
      this.showResult(res)
    })
  }

  @action showResult = result => {
    const {oneForm} = store

    if (result) {
      message.success(`群体 ${oneForm.name} 创建成功, 正在前往群体管理`)
      // window.location.href = `${window.__keeper.pathHrefPrefix || '/'}/group`
      // Modal.success({
      //   content: `群体 ${oneForm.name} 创建成功 您可以去 ${<Link to="/group/manage">群体管理</Link>} 中查看`,
      // })
    } else {
      Modal.error({
        content: `群体 ${oneForm.name} 创建失败 您可以重新创建`,
      })
    }
  }
  // @action submit = () => {
  //   store.modalVisible = true
  // }

  // @action oneValidate = () => {
  //   this.oneForm.form.validateFields().then(value => {
  //     console.log(value)
  //     store.current += 1
  //     store.oneForm = value
  //   }).catch(err => {
  //     errorTip(err)
  //   })
  // }

  // @action threeValidate = () => {
  //   this.threeForm.form.validateFields().then(value => {
  //     if (store.type === 1) {
  //       value.startTime = value.setTime[0].format(dateFormat)
  //       value.endTime = value.setTime[1].format(dateFormat)
  //     }
  //     value.outputTags = store.outputLabels // 替换输出标签集合
  //     console.log(value, 1)
  //     store.modalVisible = true
  //     store.threeForm = value
  //     // store.addGroup()
  //     // store.editGroup()
  //     this.oneForm.form.resetFields()
  //     this.threeForm.form.resetFields()
  //   }).catch(err => {
  //     errorTip(err)
  //   })
  // }
  render() {
    const {current, configTagList, submitLoading} = store

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
         
          <StepThree 
            configTagList={configTagList}
            current={current} 
            prev={this.prev}
            save={this.save}
            loading={submitLoading} 
          />
        </div>
      </Provider>
    )
  }
}

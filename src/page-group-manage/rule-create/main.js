import {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {observer, Provider} from 'mobx-react'
import {action} from 'mobx'
import {Steps, Button, message, Modal} from 'antd'
import {CheckCircleFilled, CloseCircleFilled} from '@ant-design/icons'


import store from './store'
import StepOne from './step-one'
import StepTwo from './step-two'
import StepThree from './step-three'
import './main.styl'

const {Step} = Steps
const dateFormat = 'YYYY/MM/DD'
@observer
export default class RuleCreate extends Component {
  constructor(props) {
    super(props)
    const {spaceInfo} = window
    store.projectId = spaceInfo && spaceInfo.projectId
    const {match: {params}} = props
    
    store.type = +params.type
    store.id = +params.id
  }

  // @action cancel = () => {
  //   store.current = 0
  // }

  @action prev = () => {
    store.current -= 1
  }
  // @action next = () => {
  //   store.current += 1
  // }
  @action submit = () => {
    store.modalVisible = true
    console.log(1)
  }

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
    const {current, oneForm, id} = store

    return (
      <Provider store={store}>
        <div className="rule-create">
          <Steps current={current} style={{width: '80%', margin: '0 auto'}}>
            <Step title="设置基础信息" />
            <Step title="设置群体圈选规则" />
            <Step title="设置群体参数" />
          </Steps>
          <StepOne />
          <StepTwo />
          <StepThree current={current} prev={this.prev} />
          {/* <div className="steps-action">
            {current === 0 && (
              <Button style={{margin: '0 8px'}} onClick={() => this.cancel()}>
                取消
              </Button>
            )}
            {current !== 0 && (
              <Button style={{margin: '0 8px'}} onClick={() => this.prev()}>
                上一步
              </Button>
            )}
            {current !== 2 && (
              <Button type="primary" onClick={() => this.oneValidate()}>
                下一步
              </Button>
            )}
            {current === 2 && (
              <Button type="primary" onClick={() => this.threeValidate()}>
                完成
              </Button>
            )}
          </div> */}
          <Modal
            title="圈定群体"
            className="create-modal"
            visible={store.modalVisible}
            onCancel={this.handleCancel}
            footer={[
              <Button type="primary">
                <Link to="/group/manage" onClick={this.handleCancel}>知道了</Link>
                {/* 知道了 */}
              </Button>,
            ]}
          >
            <div className="modal-content">
              <CheckCircleFilled style={{color: '#2096ff', fontSize: '24px'}} />
              <p className="tip-text">
                {`群体${oneForm.name}${id ? '编辑' : '创建'}成功您可以去`} 
                <Link to="/group/manage">群体管理</Link>
                中查看
              </p>
            </div>
            {/* <div className="modal-content">
              <CloseCircleFilled style={{color: 'red', fontSize: '24px'}} />
              <p className="tip-text">
                {`群体${oneForm.name}${id ? '编辑' : '创建'}失败`} 
                <br />
                <a>{`重新${id ? '编辑' : '创建'}`}</a>
              </p>
            </div> */}
          </Modal>
        </div>
      </Provider>
    )
  }
}

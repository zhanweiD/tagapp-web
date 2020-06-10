import {Component, Fragment} from 'react'
import {action, toJS} from 'mobx'
import {observer} from 'mobx-react'
import {PlusCircleFilled} from '@ant-design/icons'
import {Modal, Spin, Button} from 'antd' 

@observer
export default class ModalGroup extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  @action handleCancel = () => {
    this.store.visible = false
    this.store.createId = 0
  }

  @action createGroup = () => {
    if (this.store.createId === 3) {
      this.store.drawerVisible = true
      this.store.visible = false
      this.store.createId = 0
    } else if (this.store.createId === 2) {
      console.log(2)
    } else if (this.store.createId === 1) {
      console.log(1)
    }
  }

  @action createType = typeId => {
    this.store.createId = typeId
  }

  render() {
    const {
      visible,
      createId,
    } = this.store
    const modalConfig = {
      title: '群体创建方式',
      visible,
      maskClosable: false,
      closable: true,
      onCancel: this.handleCancel,
      onOk: this.createGroup,
      width: 576,
      destroyOnClose: true,
      footer: [
        <Button onClick={this.handleCancel} style={{fontSize: '12px'}}>
          取消
        </Button>,
        <Button 
          type="primary" 
          style={{color: createId ? '#fff' : 'rgba(0,0,0,.25)', fontSize: '12px'}} 
          disabled={!createId} 
          onClick={this.createGroup}
        >
          确定
        </Button>,
      ],
    }
    
    return (
      <Modal {...modalConfig} className="add-group">
        <Fragment>
          <Button className="create-flex" onClick={() => this.createType(1)}>
            <div className="create-icon">
              <PlusCircleFilled style={{fontSize: '85px', color: '#3396DB'}} />
            </div>
            <div className="create-type">
              <p className="create-group">
                标签规则创建离线群体
              </p>
              <p className="create-descr">
                使用群体的标签及群体关系的标签，离线筛选出符合条件的群体。如：“按天取出过去7天有刷卡记录的女性用户作为每日营销的人群”，则需要根据标签规则设置一个按日更新的离线群体。
              </p>
            </div>
          </Button>
          <Button className="create-flex" onClick={() => this.createType(2)}>
            <div className="create-icon">
              <PlusCircleFilled style={{fontSize: '85px', color: '#D49621'}} />
            </div>
            <div className="create-type">
              <p className="create-group">
                标签规则创建实时群体
              </p>
              <p className="create-descr">
                使用群体属性及群体关系数据，实时筛选出符合条件的群体。如：“有个不定期营销活动，有活动了才产生人群”，则需要根据标签规则设置实时群体，触发一次产出一批群体。
              </p>
            </div>
          </Button>
          <Button className="create-flex" onClick={() => this.createType(3)}>
            <div className="create-icon">
              <PlusCircleFilled style={{fontSize: '85px', color: '#33AE06'}} />
            </div>
            <div className="create-type">
              <p className="create-group">
                ID集合创建离线群体
              </p>
              <p className="create-descr">
              通过已有的实体ID集合，创建为一个群体。如“将业务人员线下梳理的白名单用户”的ID存放在一个文件中，将文件上传为“白名单”的群体。
              </p>
            </div>
          </Button>
        </Fragment>
      </Modal>
    )
  }
}

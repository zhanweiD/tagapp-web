import intl from 'react-intl-universal'
import React, { useContext } from 'react'
import { Table, Input, Form, Checkbox } from 'antd'

const EditableContext = React.createContext()

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

const EditableCell = ({
  // title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  compType,
  ...restProps
}) => {
  const form = useContext(EditableContext)

  const save = async e => {
    try {
      const values = await form.validateFields()

      handleSave({ ...record, ...values })
    } catch (errInfo) {
      console.log(errInfo)
    }
  }

  const saveCheck = e => {
    form.setFieldsValue({
      [dataIndex]: e.target.checked,
    })

    save()
  }

  let childNode = children

  if (editable && compType === 'input') {
    childNode = (
      <Form.Item name={dataIndex}>
        <Input size="small" onPressEnter={save} onBlur={save} />
      </Form.Item>
    )
  }

  if (editable && compType === 'check') {
    childNode = (
      <Form.Item name={dataIndex}>
        <Checkbox onChange={saveCheck} />
      </Form.Item>
    )
  }

  return <td {...restProps}>{childNode}</td>
}

class ApiResponseParams extends React.Component {
  constructor(props) {
    super(props)

    this.columns = [
      {
        title: intl
          .get(
            'ide.src.page-search.page-data-search.visual.api-request-params.wfaoupxlsca'
          )
          .d('参数名称'),
        dataIndex: 'fieldName',
      },
      {
        title: intl
          .get('ide.src.page-scene.scene-detail.select-tag.dcoug0r6pnj')
          .d('数据类型'),
        dataIndex: 'fieldType',
      },
      {
        title: intl
          .get(
            'ide.src.page-search.page-data-search.visual.api-response-params.ly415mq0jnj'
          )
          .d('示例值'),
        dataIndex: 'fieldValue',
        width: '20%',
        editable: true,
        compType: 'input',
      },
      {
        title: intl
          .get('ide.src.component.modal-stroage-detail.main.m75jykdqa6')
          .d('描述'),
        dataIndex: 'descr',
        width: '30%',
        editable: true,
        compType: 'input',
      },
    ]

    this.state = {
      dataSource: props.data,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        dataSource: this.props.data,
      })
    }
  }

  handleSave = row => {
    const newData = [...this.state.dataSource]
    const index = newData.findIndex(item => row.fieldName === item.fieldName)
    const item = newData[index]
    newData.splice(index, 1, { ...item, ...row })
    this.setState({
      dataSource: newData,
    })
  }

  render() {
    const { dataSource } = this.state

    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    }

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col
      }

      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          compType: col.compType,
          handleSave: this.handleSave,
        }),
      }
    })
    return (
      <Table
        ref={this.props.ref}
        components={components}
        rowClassName={() => 'editable-row'}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    )
  }
}

export default ApiResponseParams

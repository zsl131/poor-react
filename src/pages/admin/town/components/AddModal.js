import React from 'react';
import {Form, Input, Modal, Select} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

@Form.create()
export default class AddModal extends React.Component {
  state = {
    systemList:[],
    fetching: false,
    recordDate:'',
  }

  render() {
    const {
      onOk,
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
      },
      ...modalProps
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
      },
    };

    const handleOk = (e) => {
      e.preventDefault();

      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
          onOk(values);
        }
      });
    }

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    }

    return(
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          <FormItem {...formItemLayout} label="名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '名称不能为空'}]})(<Input placeholder="输入名称"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="级别">
            {getFieldDecorator('level', {rules: [{required: true, message: '请选择级别'}]})(
              <Select>
                <Option value="10">县级</Option>
                <Option value="11">乡镇级</Option>
              </Select>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

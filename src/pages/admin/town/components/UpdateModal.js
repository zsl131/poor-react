import React from 'react';
import {Form, Input, Modal, Select} from 'antd';
import request from "../../../../utils/request";

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

@Form.create()
export default class UpdateModal extends React.Component {

  state = {
    recordDate:'',
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.props.item);
  }

  render() {

    const { getFieldDecorator, validateFieldsAndScroll} = this.props.form;
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
         this.props.onOk(values);
        }
      });
    }

    return(
      <Modal {...this.props} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
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

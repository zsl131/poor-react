import React from 'react';
import {Form, Input, InputNumber, message, Modal, Select} from 'antd';
import PictureWall from '../../../../components/PictureWall';

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

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue({pid: this.props.pid, pname: this.props.pname});
  }

  render() {
    const {
      onOk,
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
        setFieldsValue
      },
      ...modalProps
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
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

    const onBeforeUpload = (file) => {
      // console.log("====", file);
      if(file.type.indexOf("image")<0) {
        message.error("只能上传图片格式文件");
        return false;
      }
      return true;
    }

    const onFileChange = (file) => {
      // console.log("onFileChange", file);
      if(file.status === 'done') {
        setFieldsValue({"picUrl": file.response});
      }
    }

    return(
      <Modal {...modalOpts} style={{ "minWidth": '80%', top: 20 }}>
        <Form layout="horizontal">
          {getFieldDecorator('picUrl')(<Input type="hidden" />)}
          {getFieldDecorator("pid")(<Input type="hidden"/>)}
          {getFieldDecorator("pname")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '名称不能为空'}]})(<Input placeholder="输入名称"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="序号">
            {getFieldDecorator('orderNo')(<InputNumber placeholder="序号" step={1}/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="图片">
            <PictureWall onBeforeUpload={onBeforeUpload} accept="image/png, image/jpeg, image/gif" showMsg="背景大图" data={{'extra':'w:3000_h:2400'}} onFileChange={onFileChange}/>
          </FormItem>
          <FormItem {...formItemLayout} label="介绍">
            {getFieldDecorator('remark', {rules: [{required: true, message: '介绍不能为空'}]})(<TextArea placeholder="输入介绍信息" autosize={{ minRows: 6, maxRows: 10 }}/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

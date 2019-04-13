import React from 'react';
import {Form, Input, Modal, Select, message} from 'antd';
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
          <FormItem {...formItemLayout} label="图片">
            <PictureWall onBeforeUpload={onBeforeUpload} accept="image/png, image/jpeg, image/gif" showMsg="背景大图" data={{'extra':'w:4000_h:2400'}} onFileChange={onFileChange}/>
          </FormItem>
          <FormItem {...formItemLayout} label="介绍">
            {getFieldDecorator('remark', {rules: [{required: true, message: '介绍不能为空'}]})(<TextArea placeholder="输入介绍信息" autosize={{ minRows: 6, maxRows: 10 }}/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

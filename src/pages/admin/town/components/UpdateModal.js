import React from 'react';
import {Form, Input, Modal, Select, message} from 'antd';
import PictureWall from '../../../../components/PictureWall';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

@Form.create()
export default class UpdateModal extends React.Component {

  state = {
    recordDate:'',
    fileList:[]
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.props.item);
    const curItem = this.props.item;
    if(curItem.picUrl) {
      const fileList = [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: curItem.picUrl,
        // url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }]
      this.setState({fileList: fileList, picUrl: curItem.picUrl});

      // console.log(fileList);
    }
  }

  render() {

    const { getFieldDecorator, validateFieldsAndScroll,setFieldsValue} = this.props.form;
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
         this.props.onOk(values);
        }
      });
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
      <Modal {...this.props}  style={{ "minWidth": '80%', top: 20 }} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
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
            <PictureWall onBeforeUpload={onBeforeUpload} accept="image/png, image/jpeg, image/gif" fileList={this.state.fileList} showMsg="背景大图" data={{'extra':'w:3000_h:2400'}} onFileChange={onFileChange}/>
          </FormItem>
          <FormItem {...formItemLayout} label="介绍">
            {getFieldDecorator('remark', {rules: [{required: true, message: '介绍不能为空'}]})(<TextArea placeholder="输入介绍信息" autosize={{ minRows: 6, maxRows: 10 }}/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

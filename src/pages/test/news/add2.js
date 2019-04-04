import React from 'react';
import ReactDOM from 'react-dom';
import {Form, Input} from 'antd';
import Editor from 'wangeditor2';

const FormItem = Form.Item;

@Form.create()
export default class Add2 extends React.Component {

  componentDidMount() {
    const editor = new Editor(ReactDOM.findDOMNode(this._div));
    editor.customConfig.onchange = (html) => {
      this.setState({
        editorHtml: html,
        editorText: editor.txt.text()
      })
      console.log("onChange", html, editor);
      //将html值设为form表单的desc属性值
      this.props.form.setFieldsValue({
        'content': html
      });
    }
    console.log("editor", editor.customConfig);
    // 上传图片（举例）
    editor.customConfig.uploadImgServer = '/api/upload/image';
    editor.customConfig.uploadFileName = 'files';
    editor.customConfig.uploadImgHeaders = {
      'auth-token': '1212121'
    };
    editor.customConfig.uploadImgHooks = {
      success: function (xhr, editor, result) {
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        console.log("success", result);
      },
      fail: function (xhr, editor, result) {
        // 图片上传并返回结果，但图片插入错误时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        console.log("fail", result);
      },
      error: function (xhr, editor) {
        // 图片上传出错时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        console.log("error", editor);
      },
    }
    editor.create();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="listContent">
        <Form>
          <FormItem>
            {getFieldDecorator("title", {rules: [{required: true, message: '标题不能为空'}]})(<Input placeholder="输入文章标题"/>)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("content")(<div ref={(ref) => this._div = ref}></div>)}
          </FormItem>
        </Form>
      </div>
    );
  }
}

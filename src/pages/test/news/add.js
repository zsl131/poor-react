import React from 'react';
import {Button, Form, Input} from 'antd';
import MyEditor from '../../../components/Editor/MyEditor';

const FormItem = Form.Item;
const Add = ({
  form: {
    getFieldDecorator,
    validateFields,
    getFieldValue,
    setFieldsValue,
    validateFieldsAndScroll,
  }
}) => {

  const handleChangeContent = (html) => {
    console.log("add===", html);
    setFieldsValue({"content": html});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((errors, values) => {
      console.log("submit", errors, values);
    });
  }

  return (
    <div className="listContent">
      <Form onSubmit={handleSubmit}>
        <FormItem>
          {getFieldDecorator("title", {rules: [{required: true, message: '标题不能为空'}]})(<Input placeholder="输入文章标题"/>)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("content")(<MyEditor onChangeContent={handleChangeContent} content="初始化内容"/>)}

        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" icon="check">提交</Button>
        </FormItem>
      </Form>

    </div>
  );
}

export default Form.create()(Add);

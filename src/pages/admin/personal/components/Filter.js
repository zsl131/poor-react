import React from 'react';
import {Button, Form, Input,Select} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const Filter = ({
  onFilter,
  form: {
    getFieldDecorator,
    validateFields,
  }
}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((errors, values) => {
      // console.log("filter", errors, values);
      onFilter(values);
    });
  }

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem>
        {getFieldDecorator("xzmc_like")(<Input placeholder="乡镇"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("hzxm_like")(<Input placeholder="户主姓名"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("hzsfzh_like")(<Input placeholder="户主身份证号"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("xm_like")(<Input placeholder="成员姓名"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("sfzh_like")(<Input placeholder="成员身份证号"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("mz_like")(<Input placeholder="民族"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("bqdd_like")(<Input placeholder="搬迁地点"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("xb")(
          <Select style={{width: 120}} defaultActiveFirstOption={true} placeholder="性别">
            <Option value="">==全部==</Option>
            <Option value="男">男</Option>
            <Option value="女">女</Option>
          </Select>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator("pksx")(
          <Select style={{width: 120}} defaultActiveFirstOption={true} placeholder="贫困属性">
            <Option value="">==全部==</Option>
            <Option value="未脱贫">未脱贫</Option>
            <Option value="已脱贫">已脱贫</Option>
          </Select>
        )}
      </FormItem>
      <FormItem>
        <Button type="dashed" htmlType="submit">筛选</Button>
      </FormItem>
    </Form>
  );
}

export default Form.create()(Filter);

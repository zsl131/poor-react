import React from 'react';
import {Button, Col, Form, Input, InputNumber, Row, Select, Tooltip} from 'antd';
import request from "../../../../utils/request";

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class UpdateIndustry extends React.Component {

  state = {
    fileList:[],
    zplj:'',
    zzpz:[]
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    const personal = this.props.personal;
    setFieldsValue(personal);

    request("dictionaryService.listByPcode", {"pcode":"DICT_PLANT"}, true).then((res)=> {
      this.setState({zzpz: res.list});
    });
  }

  render() {

    const { getFieldDecorator, validateFieldsAndScroll,setFieldsValue} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
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
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <Row>
            <Tooltip placement="top" title="输入宅基地面积" arrowPointAtLeft>
              <Col span={8}>
                <FormItem {...formItemLayout} label="宅基地，单位亩">
                  {getFieldDecorator('zjd')(<InputNumber placeholder="宅基地面积，亩"/>)}
                </FormItem>
              </Col>
            </Tooltip>
            <Tooltip placement="top" title="输入林地面积，单位亩" arrowPointAtLeft>
              <Col span={8}>
                <FormItem  {...formItemLayout} label="林地">
                  {getFieldDecorator('ld')(<InputNumber placeholder="输入林地面积，亩"/>)}
                </FormItem>
              </Col>
            </Tooltip>
            <Tooltip placement="top" title="输入耕地面积，单位亩" arrowPointAtLeft>
              <Col span={8}>
                <FormItem  {...formItemLayout} label="耕地">
                  {getFieldDecorator('gd')(<InputNumber placeholder="输入耕地面积，亩"/>)}
                </FormItem>
              </Col>
            </Tooltip>
          </Row>
          <Row>
            <Tooltip placement="top" title="种植品种" arrowPointAtLeft>
              <Col span={8}>
                <FormItem  {...formItemLayout} label="种植品种">
                  {getFieldDecorator('zzpz')(
                    <Select>
                      {this.state.zzpz.map((item) => {
                        return (<Option value={item.name}>{item.name}</Option>)
                      })}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Tooltip>
            <Tooltip placement="top" title="种植地面积，单位亩" arrowPointAtLeft>
            <Col span={8}>
              <FormItem  {...formItemLayout} label="种植地面积">
                {getFieldDecorator('zzdmj')(<InputNumber placeholder="种植地面积，亩"/>)}
              </FormItem>
            </Col>
            </Tooltip>
          </Row>

          <div style={{"textAlign":"center"}}>
          <Button type="primary" icon="save" onClick={handleOk}> 确定修改</Button>
          </div>
        </Form>
    );
  }
}

import React from 'react';
import {Button, Col, Form, Input, InputNumber, Row, Select, Tooltip} from 'antd';
import request from "../../../../utils/request";

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class UpdateStudy extends React.Component {

  state = {
    fileList:[],
    zplj:'',
    zzxm:[],
    zzxmId:[]
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    const personal = this.props.personal;
    setFieldsValue(personal);
    request("dictionaryService.listByPcode", {"pcode":"DICT_SUPPORT"}, true).then((res)=> {
      this.setState({zzxm: res.list});
    });
  }

  render() {

    const {personal} = this.props;

    let zzxmId = [];
    personal.zzxm.split(",").map((item) => {
      if(item) {
        zzxmId.push(item);
      }
    });

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

    const formItemLayout1 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
         this.props.onOk(values);
        }
      });
    };

    const onChange = (value) => {
      // console.log(value);
      let val = "";
      value.map((item)=> {val += item+","});
      setFieldsValue({"zzxm":val});
    }

    return(
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <Row>
            <Tooltip placement="top" title="是否在校" arrowPointAtLeft>
              <Col span={6}>
                <FormItem {...formItemLayout} label="是否在校">
                  {getFieldDecorator('sfzx')(
                    <Select>
                      <Option value="不在校">不在校</Option>
                      <Option value="在校">在校</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Tooltip>
            <Tooltip placement="top" title="教育阶段" arrowPointAtLeft>
              <Col span={6}>
                <FormItem  {...formItemLayout} label="教育阶段">
                  {getFieldDecorator('jyjd')(<Input placeholder="教育阶段"/>)}
                </FormItem>
              </Col>
            </Tooltip>
            <Tooltip placement="top" title="就读学校" arrowPointAtLeft>
              <Col span={6}>
                <FormItem  {...formItemLayout} label="就读学校">
                  {getFieldDecorator('jdxx')(<Input placeholder="就读学校"/>)}
                </FormItem>
              </Col>
            </Tooltip>
            <Tooltip placement="top" title="就读年级" arrowPointAtLeft>
              <Col span={6}>
                <FormItem  {...formItemLayout} label="就读年级">
                  {getFieldDecorator('jdnj')(<Input placeholder="就读年级"/>)}
                </FormItem>
              </Col>
            </Tooltip>
          </Row>
          <Row>
            <Tooltip placement="top" title="是否享受资助" arrowPointAtLeft>
            <Col span={6}>
              <FormItem  {...formItemLayout} label="是否享受资助">
                {getFieldDecorator('sfxszz')(
                  <Select>
                    <Option value="是">享受</Option>
                    <Option value="否">未享受</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            </Tooltip>

            <Tooltip placement="top" title="资助金额" arrowPointAtLeft>
              <Col span={6}>
                <FormItem  {...formItemLayout} label="资助金额">
                  {getFieldDecorator('zzje')(<InputNumber placeholder="资助金额"/>)}
                </FormItem>
              </Col>
            </Tooltip>

            <Tooltip placement="top" title="资助项目" arrowPointAtLeft>
              <Col span={12}>
                <FormItem  {...formItemLayout1} label="资助项目">
                  {getFieldDecorator('zzxm')(<Input type="hidden"/>)}
                  <Select mode="multiple" defaultValue={zzxmId} onChange={onChange}>
                    {this.state.zzxm.map((item) => {
                      return (<Option value={item.code}>{item.name}</Option>)
                    })}
                  </Select>
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

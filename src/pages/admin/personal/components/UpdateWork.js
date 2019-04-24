import React from 'react';
import {Button, Col, Form, Input, InputNumber, Row, Select, Tabs, Tooltip} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

@Form.create()
export default class UpdateWork extends React.Component {

  state = {
    fileList:[],
    zplj:''
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    const personal = this.props.personal;
    setFieldsValue(personal);
    setFieldsValue({"jylx":"1"}); //默认设置就业类型为：1
  }

  render() {

    const {personal} = this.props;

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

    const onChange = (key) => {
      console.log(key);
      setFieldsValue({"jylx": key});
    }

    return(
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          {getFieldDecorator("jylx")(<Input type="hidden"/>)}
          <Tabs defaultActiveKey="1"
                tabPosition="left"
                onChange={onChange}>

            <TabPane tab="外出务工" key="1">
              <Row>
                <Tooltip placement="top" title="企业名称" arrowPointAtLeft>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="企业名称">
                      {getFieldDecorator('qymc')(<Input placeholder="输入企业名称"/>)}
                    </FormItem>
                  </Col>
                </Tooltip>
                <Tooltip placement="top" title="岗位名称" arrowPointAtLeft>
                  <Col span={12}>
                    <FormItem  {...formItemLayout} label="岗位名称">
                      {getFieldDecorator('gwmc')(<Input placeholder="输入岗位名称"/>)}
                    </FormItem>
                  </Col>
                </Tooltip>
              </Row>
              <Row>
                <Tooltip placement="top" title="务工时间" arrowPointAtLeft>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="务工时间">
                      {getFieldDecorator('wgsj')(<Input placeholder="输入务工时间"/>)}
                    </FormItem>
                  </Col>
                </Tooltip>
                <Tooltip placement="top" title="月工资收入" arrowPointAtLeft>
                  <Col span={12}>
                    <FormItem  {...formItemLayout} label="月工资">
                      {getFieldDecorator('ygz')(<InputNumber placeholder="月工资"/>)}
                    </FormItem>
                  </Col>
                </Tooltip>
              </Row>
              <Row>
                <Tooltip placement="top" title="务工地点" arrowPointAtLeft>
                  <Col span={24}>
                    <FormItem  {...formItemLayout1} label="务工地点">
                      {getFieldDecorator('wgdd')(<Input placeholder="输入务工地点"/>)}
                    </FormItem>
                  </Col>
                </Tooltip>
              </Row>

            </TabPane>
            <TabPane tab="自主创业" key="2">

              <Row>
                <Tooltip placement="top" title="创业项目" arrowPointAtLeft>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="创业项目">
                      {getFieldDecorator('cyxm')(<Input placeholder="输入创业项目"/>)}
                    </FormItem>
                  </Col>
                </Tooltip>
                <Tooltip placement="top" title="创业地点" arrowPointAtLeft>
                  <Col span={12}>
                    <FormItem  {...formItemLayout} label="创业地点">
                      {getFieldDecorator('cydd')(<Input placeholder="输入创业地点"/>)}
                    </FormItem>
                  </Col>
                </Tooltip>
              </Row>
              <Row>
                <Tooltip placement="top" title="创业时间" arrowPointAtLeft>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="创业时间">
                      {getFieldDecorator('cysj')(<Input placeholder="输入创业时间"/>)}
                    </FormItem>
                  </Col>
                </Tooltip>
                <Tooltip placement="top" title="月收入" arrowPointAtLeft>
                  <Col span={12}>
                    <FormItem  {...formItemLayout} label="月收入">
                      {getFieldDecorator('ysr')(<InputNumber placeholder="月收入"/>)}
                    </FormItem>
                  </Col>
                </Tooltip>
              </Row>

            </TabPane>
            <TabPane tab="未就业" key="3">

              <Row>
                <Tooltip placement="top" title="务工去向" arrowPointAtLeft>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="务工去向">
                      {getFieldDecorator('wgqx')(<Input placeholder="输入务工去向"/>)}
                    </FormItem>
                  </Col>
                </Tooltip>
                <Tooltip placement="top" title="公益性岗位" arrowPointAtLeft>
                  <Col span={12}>
                    <FormItem  {...formItemLayout} label="公益性岗位">
                      {getFieldDecorator('gyxgw')(<Input placeholder="输入公益性岗位"/>)}
                    </FormItem>
                  </Col>
                </Tooltip>
              </Row>
              <Row>
                <Tooltip placement="top" title="自主创业" arrowPointAtLeft>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="自主创业">
                      {getFieldDecorator('zzcy')(<Input placeholder="输入自主创业"/>)}
                    </FormItem>
                  </Col>
                </Tooltip>
                <Tooltip placement="top" title="无法外出原因" arrowPointAtLeft>
                  <Col span={12}>
                    <FormItem  {...formItemLayout} label="无法外出原因">
                      {getFieldDecorator('wfwcyy')(<Input placeholder="无法外出原因"/>)}
                    </FormItem>
                  </Col>
                </Tooltip>
              </Row>

            </TabPane>
          </Tabs>

          <div style={{"textAlign":"center"}}>
          <Button type="primary" icon="save" onClick={handleOk}> 确定修改</Button>
          </div>
        </Form>
    );
  }
}

import React from 'react';
import {Button, Col, Form, Input, message, Row, Select, Tooltip} from 'antd';
import PictureWall from '../../../../components/PictureWall';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class UpdateSafe extends React.Component {

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    const personal = this.props.personal;
    setFieldsValue(personal);
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
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
      },
    };

    const formItemLayout2 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
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

    return(
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <Row>
            <Tooltip placement="top" title="健康状况" arrowPointAtLeft>
              <Col span={8}>
                <FormItem {...formItemLayout} label="健康状况">
                  {getFieldDecorator('jkzk')(
                    <Select>
                      <Option value="健康">健康</Option>
                      <Option value="患有大病">患有大病</Option>
                      <Option value="长期慢性病">长期慢性病</Option>
                      <Option value="残疾">残疾</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Tooltip>
            <Tooltip placement="top" title="养老保险" arrowPointAtLeft>
              <Col span={8}>
                <FormItem {...formItemLayout} label="养老保险">
                  {getFieldDecorator('sfylbx')(
                    <Select>
                      <Option value="是">参加养老保险</Option>
                      <Option value="否">未参加</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Tooltip>
            <Tooltip placement="top" title="医疗保险" arrowPointAtLeft>
              <Col span={8}>
                <FormItem  {...formItemLayout} label="医疗保险">
                  {getFieldDecorator('sfyb')(
                    <Select>
                      <Option value="是">参加医疗保险</Option>
                      <Option value="否">未参加</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Tooltip>
          </Row>

          <Row>
            <Tooltip placement="top" title="参保险种" arrowPointAtLeft>
              <Col span={8}>
                <FormItem  {...formItemLayout} label="参保险种">
                  {getFieldDecorator('cbxz')(
                    <Select>
                      <Option value="未参保">未参保</Option>
                      <Option value="居民医保">居民医保</Option>
                      <Option value="职工医保">职工医保</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Tooltip>

            <Tooltip placement="top" title="参保单位" arrowPointAtLeft>
              <Col span={8}>
                <FormItem  {...formItemLayout} label="参保单位">
                  {getFieldDecorator('cbdw')(<Input placeholder="输入参保单位"/>)}
                </FormItem>
              </Col>
            </Tooltip>

            <Tooltip placement="top" title="是否患特殊病慢性病或者9类15种重大疾病" arrowPointAtLeft>
              <Col span={8}>
                <FormItem  {...formItemLayout} label="是否患特殊病">
                  {getFieldDecorator('sfhb')(
                    <Select>
                      <Option value="是">患病</Option>
                      <Option value="否">未患病</Option>
                    </Select>
                  )}
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

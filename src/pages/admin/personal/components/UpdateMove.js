import React from 'react';
import {Button, Col, Form, Input, message, Row, Select, Tooltip} from 'antd';
import PictureWall from '../../../../components/PictureWall';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class UpdateMove extends React.Component {

  state = {
    fileList:[],
    zplj:''
  }

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
    }

    return(
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <Row>
            <Tooltip placement="top" title="输入搬迁时间" arrowPointAtLeft>
              <Col span={12}>
                <FormItem {...formItemLayout} label="搬迁时间">
                  {getFieldDecorator('bqsj')(<Input placeholder="输入搬迁时间"/>)}
                </FormItem>
              </Col>
            </Tooltip>
            <Tooltip placement="top" title="搬迁地点" arrowPointAtLeft>
              <Col span={12}>
                <FormItem  {...formItemLayout} label="搬迁地点">
                  {getFieldDecorator('bqdd')(<Input placeholder="输入搬迁地点"/>)}
                </FormItem>
              </Col>
            </Tooltip>
          </Row>
          <Row>
            <Tooltip placement="top" title="备注" arrowPointAtLeft>
            <Col span={24}>
              <FormItem  {...formItemLayout1} label="备注">
                {getFieldDecorator('bz')(<Input placeholder="输入备注"/>)}
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

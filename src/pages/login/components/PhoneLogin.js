import React from 'react';
import {Alert, Button, Form, Input, Row} from 'antd';
import styles from '../index.css';

const FormItem = Form.Item;

@Form.create()
export default class PhoneLogin extends React.Component {

  state = {
    canGetCode:false,
    btnName: "获取验证码",
    timer:null,
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    this.setState({
      suc: false,
      show: false,
    })
  }

  onClick = () => {
    const props = this.props;
    const {getFieldValue} = props.form;
    const phone = getFieldValue("phone");
    // console.log(phone)
    props.sendCode(phone);
    let second = 60;
    const that = this;
    const timer = setInterval(() => {
      that.setState({btnName: second + "s后重试"});
      if(second<=0) {
        that.setState({canGetCode: true, btnName: "重获验证码", timer: null});
        clearInterval(timer);
      }
      second--;
      if(!this.props.sendCodeSuc) {
        clearInterval(timer);
        this.setState({btnName: '重取验证码', canGetCode: true});
      }
    }, 1000)
    this.setState({timer: timer, canGetCode: false});
  }

  changePhone = (e) => {
    const value = e.target.value;
    if(value.length>=11) {
      e.target.value = value.substring(0,11);
      this.setState({canGetCode: true})
    } else {
      this.setState({canGetCode: false})
    }
  }

  changeCode = (e) => {
    const value = e.target.value;
    const code = this.props.code;
    this.setState({show: true})
    if(value===code) {
      this.setState({suc: true});
      this.props.loginByCode();
    } else {this.setState({suc: false})}
  }

  render() {
    const { getFieldDecorator} = this.props.form;

    const props = this.props;

    return (
      <div>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}

          <FormItem>
            {getFieldDecorator('phone', {rules: [{required: true, message: '手机号码不能为空'}]})(<Input type="number" onChange={this.changePhone} maxLength={11} placeholder="输入手机号码"/>)}
          </FormItem>

          <FormItem>
            {getFieldDecorator('code', {rules: [{required: true, message: '短信验证码不能为空'}]})(
              <Input placeholder="输入收到的验证码"
                     maxLength={4}
                     onChange={this.changeCode}
                     disabled={!props.canInputCode}
                     addonAfter={<Button size="small" disabled={!this.state.canGetCode} onClick={this.onClick}>{this.state.btnName}</Button>}/>
            )}
          </FormItem>

          { this.state.show?
            <FormItem>
              {
                this.state.suc?<Alert message="验证码正确，正在登陆……" type="success" showIcon/>:<Alert message="验证码输入错误" type="error" showIcon/>
              }
            </FormItem>:""
          }

          <Row>
            {/*<Button className={styles.loginBtn} type="primary" onClick={handleOk}>登   陆</Button>*/}
            <Alert message="输入手机验证码后自动登陆" type="info" showIcon />
          </Row>
        </Form>
      </div>
    )
  }
}

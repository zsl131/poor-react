import React from 'react';
import {Button, Col, Form, Input, message, Row, Select, Tooltip} from 'antd';
import PictureWall from '../../../../components/PictureWall';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class UpdateBasic extends React.Component {

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

    let fileList = [];
    if(personal.zplj) {
      fileList.push({
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: personal.zplj,
        // url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      });
    }

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
        setFieldsValue({"zplj": file.response});
      }
    }

    return(
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          {getFieldDecorator('zplj')(<Input type="hidden" />)}
          <Row>
            <Tooltip placement="top" title="输入姓名" arrowPointAtLeft>
              <Col span={6}>
                <FormItem {...formItemLayout} label="姓名">
                  {getFieldDecorator('xm', {rules: [{required: true, message: '姓名不能为空'}]})(<Input placeholder="输入姓名"/>)}
                </FormItem>
              </Col>
            </Tooltip>
            <Tooltip placement="top" title="输入身份证号" arrowPointAtLeft>
              <Col span={6}>
                <FormItem  {...formItemLayout} label="身份证号">
                  {getFieldDecorator('sfzh', {rules: [{required: true, message: '身份证号不能为空'}]})(<Input placeholder="输入身份证号"/>)}
                </FormItem>
              </Col>
            </Tooltip>
            <Tooltip placement="top" title="选择性别" arrowPointAtLeft>
              <Col span={6}>
                <FormItem  {...formItemLayout} label="性别">
                  {getFieldDecorator('xb', {rules: [{required: true, message: '选择性别'}]})(
                    <Select>
                      <Option value="男">男</Option>
                      <Option value="女">女</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Tooltip>
            <Tooltip placement="top" title="选择民族" arrowPointAtLeft>
              <Col span={6}>
                <FormItem  {...formItemLayout} label="民族">
                  {getFieldDecorator('mz', {rules: [{required: true, message: '选择民族'}]})(
                    <Select>
                      <Option value="汉族">汉族</Option>
                      <Option value="彝族">彝族</Option>
                      <Option value="苗族">苗族</Option>
                      <Option value="土家族">土家族</Option>
                      <Option value="藏族">藏族</Option>
                      <Option value="佤族">佤族</Option>
                      <Option value="哈尼族">哈尼族</Option>
                      <Option value="僳僳族">僳僳族</Option>
                      <Option value="白族">白族</Option>
                      <Option value="普米族">普米族</Option>
                      <Option value="回族">回族</Option>
                      <Option value="壮族">壮族</Option>
                      <Option value="裕固族">裕固族</Option>
                      <Option value="瑶族">瑶族</Option>
                      <Option value="锡伯族">锡伯族</Option>
                      <Option value="乌孜别克族">乌孜别克族</Option>
                      <Option value="维吾尔族">维吾尔族</Option>
                      <Option value="土族">土族</Option>
                      <Option value="塔塔尔族">塔塔尔族</Option>
                      <Option value="塔吉克族">塔吉克族</Option>
                      <Option value="水族">水族</Option>
                      <Option value="畲族">畲族</Option>
                      <Option value="撒拉族">撒拉族</Option>
                      <Option value="羌族">羌族</Option>
                      <Option value="怒族">怒族</Option>
                      <Option value="纳西族">纳西族</Option>
                      <Option value="仫佬族">仫佬族</Option>
                      <Option value="蒙古族">蒙古族</Option>
                      <Option value="门巴族">门巴族</Option>
                      <Option value="毛南族">毛南族</Option>
                      <Option value="满族">满族</Option>
                      <Option value="珞巴族">珞巴族</Option>
                      <Option value="黎族">黎族</Option>
                      <Option value="拉祜族">拉祜族</Option>
                      <Option value="柯尔克孜族">柯尔克孜族</Option>
                      <Option value="景颇族">景颇族</Option>
                      <Option value="京族">京族</Option>
                      <Option value="基诺族">基诺族</Option>
                      <Option value="赫哲族">赫哲族</Option>
                      <Option value="哈萨克族">哈萨克族</Option>
                      <Option value="仡佬族">仡佬族</Option>
                      <Option value="高山族">高山族</Option>
                      <Option value="鄂温克族">鄂温克族</Option>
                      <Option value="俄罗斯族">俄罗斯族</Option>
                      <Option value="鄂伦春族">鄂伦春族</Option>
                      <Option value="独龙族">独龙族</Option>
                      <Option value="东乡族">东乡族</Option>
                      <Option value="侗族">侗族</Option>
                      <Option value="德昂族">德昂族</Option>
                      <Option value="傣族">傣族</Option>
                      <Option value="达斡尔族">达斡尔族</Option>
                      <Option value="朝鲜族">朝鲜族</Option>
                      <Option value="布依族">布依族</Option>
                      <Option value="布朗族">布朗族</Option>
                      <Option value="保安族">保安族</Option>
                      <Option value="阿昌族">阿昌族</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Tooltip>
          </Row>

          <Row>
            <Tooltip placement="top" title="文化程度" arrowPointAtLeft>
              <Col span={6}>
                <FormItem {...formItemLayout} label="文化程度">
                  {getFieldDecorator('whcd')(<Input placeholder="输入文化程度"/>)}
                </FormItem>
              </Col>
            </Tooltip>
            <Tooltip placement="top" title="输入联系电话" arrowPointAtLeft>
              <Col span={6}>
                <FormItem  {...formItemLayout} label="联系电话">
                  {getFieldDecorator('lxdh')(<Input placeholder="输入联系电话"/>)}
                </FormItem>
              </Col>
            </Tooltip>
            <Tooltip placement="top" title="选择是否是劳动力" arrowPointAtLeft>
              <Col span={6}>
                <FormItem  {...formItemLayout} label="是否劳动力">
                  {getFieldDecorator('sfsldl', {rules: [{required: true, message: '选择是否劳动力'}]})(
                    <Select>
                      <Option value="是">是</Option>
                      <Option value="否">否</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Tooltip>
            <Tooltip placement="top" title="脱贫属性" arrowPointAtLeft>
              <Col span={6}>
                <FormItem  {...formItemLayout} label="脱贫属性">
                  {getFieldDecorator('pksx', {rules: [{required: true, message: '选择脱贫属性'}]})(
                    <Select>
                      <Option value="已脱贫">已脱贫</Option>
                      <Option value="未脱贫">未脱贫</Option>
                      <Option value="返贫">返贫</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Tooltip>
          </Row>
          <Row>
            <Tooltip placement="top" title="家庭地址" arrowPointAtLeft>
            <Col span={24}>
              <FormItem  {...formItemLayout1} label="家庭地址">
                {getFieldDecorator('jtdz', {rules: [{required: true, message: '输入家庭地址'}]})(<Input placeholder="输入家庭地址"/>)}
              </FormItem>
            </Col>
            </Tooltip>
          </Row>

          <Row>
            <Tooltip placement="top" title="参加何种培训" arrowPointAtLeft>
              <Col span={12}>
                <FormItem {...formItemLayout2} label="参加何种培训">
                  {getFieldDecorator('cjhzpx')(<Input placeholder="输入参加何种培训"/>)}
                </FormItem>
              </Col>
            </Tooltip>
            <Tooltip placement="top" title="培训需求" arrowPointAtLeft>
              <Col span={12}>
                <FormItem  {...formItemLayout2} label="培训需求">
                  {getFieldDecorator('pxxq')(<Input placeholder="输入培训需求"/>)}
                </FormItem>
              </Col>
            </Tooltip>
          </Row>

          <FormItem {...formItemLayout1} label="人员头像">
            <PictureWall onBeforeUpload={onBeforeUpload} accept="image/png, image/jpeg, image/gif" fileList={fileList} showMsg="选择头像" data={{'extra':'w:600_h:800'}} onFileChange={onFileChange}/>
          </FormItem>
          <div style={{"textAlign":"center"}}>
          <Button type="primary" icon="save" onClick={handleOk}> 确定修改</Button>
          </div>
        </Form>
    );
  }
}

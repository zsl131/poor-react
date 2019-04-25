import React from 'react';
import {Button, Typography, Form, Input, message, Row, Select, Tabs, Tooltip} from 'antd';
import PictureWall from "../../../../components/PictureWall";
import request from "../../../../utils/request";

const { Title } = Typography;

@Form.create()
export default class UpdateAssets extends React.Component {

  state = {
    loaded: false,
    fileList1:[],
    fileList2:[]
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    const personal = this.props.personal;
    // setFieldsValue(personal);
    setFieldsValue({"gsid": personal.id}); //默认设置就业类型为：1

    let fileList1 = [], fileList2 = [];
    let loaded = false;

    request("assetsService.list", {"id":personal.id}, true).then((res) => {
      res.list.map((item)=> {
        const pic = {
          uid: item.id,
          name: item.mc+"的图片",
          status: 'done',
          url: item.url,
        };
        if("房子"===item.mc) {fileList1.push(pic);}
        else {fileList2.push(pic);}
        // console.log(fileList1, fileList2, loaded);
      });
      loaded = true;
      this.setState({loaded: loaded, fileList1: fileList1, fileList2: fileList2});
    });
  }

  render() {

    const { getFieldDecorator, validateFieldsAndScroll,setFieldsValue} = this.props.form;

    const handleSave = () => {
      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
          this.props.onOk(values);
          // console.log(values);
        }
      });
    }

    const onBeforeUpload1 = (file) => {
      setFieldsValue({"mc": "房子"});
      return onBeforeUpload(file);
    };

    const onBeforeUpload2 = (file) => {
      setFieldsValue({"mc": "车子"});
      return onBeforeUpload(file);
    };

    const onBeforeUpload = (file) => {
      // console.log("====", file);
      if(file.type.indexOf("image")<0) {
        message.error("只能上传图片格式文件");
        return false;
      }
      return true;
    };

    const onFileChange = (file) => {
      console.log(file)
      if(file.status === 'done') {
        setFieldsValue({"url": file.response});
        handleSave();
      }
    };

    const removeFile = (file) => {
      console.log(file);
      return false;
    }

    const {loaded, fileList1, fileList2} = this.state;
    // console.log(fileList1, fileList2, loaded);
    return(
        <Form layout="horizontal">
          {getFieldDecorator("gsid")(<Input type="hidden"/>)}
          {getFieldDecorator("mc")(<Input type="hidden"/>)}
          {getFieldDecorator("url")(<Input type="hidden"/>)}

          <Typography>
            <Title level={4}>选择对应的资产图片上传即可：</Title>
          </Typography>

          {loaded && <PictureWall onRemove={removeFile} onBeforeUpload={onBeforeUpload1} accept="image/png, image/jpeg, image/gif" fileList={fileList1} fileListLength={10} showMsg="房子图片" data={{'extra':'w:1000_h:800'}} onFileChange={onFileChange}/>}
          {loaded && <PictureWall onRemove={removeFile} onBeforeUpload={onBeforeUpload2} accept="image/png, image/jpeg, image/gif" fileList={fileList2} fileListLength={12} showMsg="车子图片" data={{'extra':'w:1000_h:800'}} onFileChange={onFileChange}/>}

        </Form>
    );
  }
}

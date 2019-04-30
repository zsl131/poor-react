import React from 'react';
import {Col, Icon, message, Modal, Row, Upload, Select} from 'antd';
import request from "../../../../utils/request";

const Dragger = Upload.Dragger;
const Option = Select.Option;

export default class AddModal extends React.Component {
  state = {
    townList:[],
    showList:[],
    hqfs:'', //获取方式
    xzid:0, //乡镇id
  }

  componentDidMount() {
    request("townService.listNoPage", {}, true).then((res)=> {
      this.setState({townList: res.list, showList: res.list});
    });
  }

  render() {
    const {
      ...modalProps
    } = this.props;

    const modalOpts = {
      ...modalProps,
    }

    const props = {
      name: 'file',
      action: '/api/upload/uploadZipFile',
      onChange(info) {
        const status = info.file.status;
        if (status === 'done') {
          message.success(`${info.file.name} 文件上传成功，正在解析图片信息.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} 文件上传失败.`);
        }
      },
      beforeUpload: (file) => {
        // console.log(file);
        const {xzid, hqfs} = this.state;
        if(!xzid) {
          message.error("请先选择照片的命名方式"); return false;
        } else if(!hqfs) {
          message.error("请先选择对应的乡镇"); return false;
        } else if(file.type.indexOf("zip")<0) {
          message.error("只能上传.zip的压缩文件"); return false;
        }
        return true;
      },
      data: {'extra':'hqfs:'+this.state.hqfs+'_xzid:'+this.state.xzid}
    };

    const onTownChange = (val) => {
      this.setState({"xzid": val});
    };

    const onModeChange = (val) => {
      this.setState({"hqfs": val});
    };

    const onSearch = (val) => {
      const newList = this.state.townList.filter((item) => {if(item.name.indexOf(val)>=0) return item;});
      console.log(newList);
      this.setState({showList: newList});
    }

    return(
      <Modal {...modalOpts} style={{ "minWidth": '80%', top: 20 }}>
        <Row style={{"paddingBottom":"12px"}}>
          <Col span={24}>
            命名方式：
            <Select onChange={onModeChange} style={{"width":"140px"}}>
              <Option value="sfzh">身份证号</Option>
              <Option value="xm">姓名</Option>
            </Select>
            &nbsp;&nbsp;&nbsp;&nbsp;选择乡镇：
            <Select onChange={onTownChange} showSearch={true} onSearch={onSearch} style={{"width":"140px"}}>
              {this.state.showList.map((item) => {
                return (<Option value={item.id} key={item.id}>{item.name}</Option>)
              })}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">此处只能识别<span className="boldRed">人员头像</span>图片</p>
              <p className="ant-upload-text">点击或拖一个ZIP文件到这里上传</p>
              <p className="ant-upload-hint">必须是ZIP压缩文件，只能用姓名或身份证号命名照片。</p>
            </Dragger>
          </Col>
        </Row>
      </Modal>
    );
  }
}

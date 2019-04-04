import React from 'react';
import {Icon, Modal, Upload} from 'antd';

export default class PictureWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: this.props.fileList || [],
    fileListLength: this.props.fileListLength || 1,
    showMsg: this.props.showMsg || "选择文件",
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ file, fileList, event }) => {
    // console.log("file:"+file, "event:"+event);
    // console.log("file:::", file);
    // console.log("event::", event);
    this.setState({ fileList });
    this.props.onFileChange(file, this.props.extra);
  }

  handleBeforeUpload = (file) => {
    // console.log(file);
    if(!this.props.onBeforeUpload) {return true}
    return this.props.onBeforeUpload(file);
  }

  render() {
    const { previewVisible, previewImage, fileList, fileListLength,showMsg } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">{showMsg}</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          {...this.props}
          action="/api/upload/uploadFile"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          beforeUpload={this.handleBeforeUpload}
        >
          {fileList.length >= fileListLength ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

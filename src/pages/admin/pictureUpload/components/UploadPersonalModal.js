import React from 'react';
import {Button, Form, Icon, Input, message, Modal, Select, Upload} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const Dragger = Upload.Dragger;

@Form.create()
export default class UploadPersonalModal extends React.Component {

  render() {
    const {
      ...modalProps
    } = this.props;

    const modalOpts = {
      ...modalProps,
    }

    const props = {
      name: 'file',
      action: '/api/upload/uploadPersonalExcel',
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
        return true;
      }
    };

    const downloadModal = () => {
      const w=window.open('/api/download/index?from=1&filename=personal_template.xlsx');
      // w.document.write("<h1>数据正在准备，请耐心等待....</h1>");
      // w.location.href = "/api/download/index?from=1&filename=personal_template.xlsx";
    }

    return(
      <Modal {...modalOpts} style={{ "minWidth": '80%', top: 20 }}>
        <h3>
          <b>注意：</b>
          <ol>
            <li>此功能是通过Excel数据模板导入人员信息；</li>
            <li>若系统中存在相应人员，则将系统中的人员信息更新为Excel中的人员信息；</li>
            <li>若系统中不存在相应人员，则将Excel中人员信息新增入系统；</li>
            <li>导入之前必须确保数据格式是否正确，可<Button type="primary" onClick={()=>downloadModal()}>点击这里</Button>下载数据模板；</li>
            <li>必须上传后缀名为.xlsx的Excel文件；</li>
            <li>此操作风险及大，请谨慎使用，后果自负。</li>
          </ol>
        </h3>
        <Form layout="horizontal">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox"/>
            </p>
            <p className="ant-upload-text">请认真阅读上述注意事项再上传</p>
            <p className="ant-upload-hint">只能上传后缀为.xlsx的Excel模板，可先下载模板对照后再上传。</p>
            <p className="ant-upload-hint">上传数据越多所花费时间会越长，上传过程中请勿关闭此窗口</p>
          </Dragger>
        </Form>
      </Modal>
    );
  }
}

import React from 'react';
import {Form, Input, Modal, Select, Tabs} from 'antd';
import UpdateBasic from "./UpdateBasic";
import UpdateWork from "./UpdateWork";
import UpdateMove from "./UpdateMove";
import UpdateStudy from "./UpdateStudy";

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

@Form.create()
export default class UpdateModal extends React.Component {

  render() {

    const {item} = this.props;

    const basicOpts = {
      personal: item,
      onOk: (obj) => {
        this.props.updateBasic(obj);
      }
    };

    const workOpts = {
      personal: item,
      onOk: (obj) => {
        this.props.updateWork(obj);
      }
    };

    const moveOpts = {
      personal: item,
      onOk: (obj) => {
        this.props.updateMove(obj);
      }
    };

    const studyOpts = {
      personal: item,
      onOk: (obj) => {
        this.props.updateStudy(obj);
      }
    };

    return(
      <Modal {...this.props}  style={{ "minWidth": '96%', top: 10 }} footer={null}>
        <Tabs defaultActiveKey="5">
          <TabPane tab={"基本信息"} key="1"><UpdateBasic {...basicOpts}/></TabPane>
          <TabPane tab={"就业情况"} key="2"><UpdateWork {...workOpts}/></TabPane>
          <TabPane tab={"搬迁信息"} key="3"><UpdateMove {...moveOpts}/></TabPane>
          <TabPane tab={"搬迁信息"} key="4">Content of Tab Pane 3</TabPane>
          <TabPane tab={"就学情况"} key="5"><UpdateStudy {...studyOpts}/></TabPane>
          <TabPane tab={"保险情况"} key="6">Content of Tab Pane 3</TabPane>
          <TabPane tab={"资产信息"} key="7">Content of Tab Pane 3</TabPane>
          {item.sfzh===item.hzsfzh && <TabPane tab={"家庭成员"} key="8">Content of Tab Pane 3</TabPane>}
        </Tabs>
      </Modal>
    );
  }
}

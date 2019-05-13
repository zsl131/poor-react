import React from 'react';
import {Form, Input, Modal, Select, message} from 'antd';


export default class ShowDataModal extends React.Component {

  render() {

    return(
      <Modal {...this.props} style={{ "minWidth": '80%', top: 20 }}>
        {this.props.children}
      </Modal>
    );
  }
}

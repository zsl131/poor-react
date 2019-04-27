import React from 'react';
import {Modal} from 'antd';


export default class UpdateModal extends React.Component {

  render() {

    const { item, recordList} = this.props;

    const tbody = recordList.map((obj, index) => {
      return (<tr key={obj.id}>
        <td>{index+1}</td>
        <td>{obj.content}</td>
        <td>{obj.reason}</td>
      </tr>)
    });

    return(
      <Modal {...this.props}  style={{ "minWidth": '80%', top: 20 }}>
        <table>
          <thead>
            <tr>
              <td>序号</td>
              <td>出错内容</td>
              <td>出错原因</td>
            </tr>
          </thead>
          <tbody>
          {tbody}
          </tbody>
        </table>
      </Modal>
    );
  }
}

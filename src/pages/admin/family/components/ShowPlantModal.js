import React from 'react';
import {Modal,Row,Col} from 'antd';
import styles from './show.css';

export default class ShowPlantModal extends React.Component {
  state = {
    systemList:[],
    fetching: false,
    recordDate:'',
  }

  render() {
    const {
      plantList,
      ...modalProps
    } = this.props;

    const modalOpts = {
      ...modalProps,
    };

    return(
      <Modal {...modalOpts}>
        <Row>
        {
          plantList.map((item)=> {
            if(item.zzmj>0) {
              return (
                <Col span={12} key={item.id}><span className={styles.singleSpan}>{item.zzpzmc}: <b>{item.zzmj}</b> 亩 </span></Col>);
            }
          })
        }
        </Row>
      </Modal>
    );
  }
}

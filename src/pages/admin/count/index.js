import React from 'react';
import {connect} from 'dva';
import {Icon, Row, Col} from 'antd';
import Helmet from 'react-helmet';
import styles from './index.css';
import configApi from "../../../utils/configApi";
import PieXb from "./components/PieXb";
import PieLdl from "./components/PieLdl";
import PieMz from "./components/PieMz";
import PiePksx from "./components/PiePksx";
import PieLx from "./components/PieLx";
import PieSfyb from "./components/PieSfyb";
import PieCbxz from "./components/PieCbxz";
import PieSfhb from "./components/PieSfhb";

const Count = ({
  count,
}) => {
  return(
    <div>
      <Helmet><title>{configApi.appName}</title></Helmet>
      <div className="listHeader">
        <h3><Icon type="bars"/> 统计管理</h3>
      </div>
      <div className="listContent" style={{"padding":"12px"}}>
        <Row className={styles.row}>
          <Col span={24}>
            <PiePksx />
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={12}>
            <PieLx />
          </Col>
          <Col span={12}>
            <PieSfyb/>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={12}>
            <PieCbxz />
          </Col>
          <Col span={12}>
            <PieSfhb/>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={12}>
            <PieXb />
          </Col>
          <Col span={12}>
            <PieLdl/>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={24}>
            <PieMz />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default connect(({ loading, count }) => ({ loading, count }))(Count);

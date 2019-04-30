import React from 'react';
import {connect} from 'dva';
import {Col, Icon, Row} from 'antd';
import Helmet from 'react-helmet';
import styles from './index.css';
import configApi from "../../../utils/configApi";
import PieXb from "./components/PieXb";
import PieLdl from "./components/PieLdl";
import PieMz from "./components/PieMz";
import PiePksx from "./components/PiePksx";
import PieLx from "./components/PieLx";
import PieCbxz from "./components/PieCbxz";
import PieSfhb from "./components/PieSfhb";
import PieJylx from "./components/PieJylx";
import PersonalCount from "../../../components/PersonalCount";
import PieWgdy from "./components/PieWgdy";
import PieWgsf2 from "./components/PieWgsf2";
import PieWgsf from "./components/PieWgsf";
import PieSfyb from "./components/PieSfyb";

const Count = ({
  count,
}) => {
  const town = count.town;
  return(
    <div>
      <Helmet><title>{configApi.appName}</title></Helmet>
      <div className="listHeader" style={{"height":"auto"}}>
        <h3><Icon type="bars"/> 统计管理（<b className="boldBlue">{town.name}</b>）</h3>
        <PersonalCount townId={town.id}/>
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
            <PieLdl/>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={12}>
            <PieJylx/>
          </Col>
          <Col span={12}>
            <PieWgdy/>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={24}>
            <PieWgsf />
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
            <PieSfyb/>
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

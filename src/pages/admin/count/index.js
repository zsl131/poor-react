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
import PieWgsf from "./components/PieWgsf";
import PieSfyb from "./components/PieSfyb";
import ShowDataModal from "./components/ShowDataModal";
import ShowDataTable from "./components/ShowDataTable";

const Count = ({
  dispatch,
  count,
  location
}) => {
  const town = count.town;
  const query = location.query;

  const wgsfClick = (obj, name) => {
    dispatch({type: 'count/queryData', payload: obj});
    dispatch({type: 'count/modifyState', payload: {showDataTitle: name, showDataVisible: true}});
  };

  const showOpts = {
    maskClosable: false,
    title: count.showDataTitle,
    visible: count.showDataVisible,
    onOk: ()=> {
      dispatch({type: 'count/modifyState', payload: {showDataVisible: false}});
    },
    onCancel: ()=> {
      dispatch({type: 'count/modifyState', payload: {showDataVisible: false}});
    }
  };

  const dataOpts = {
    dataSource: count.personalList,
  };

  const showData = () => {
    return (
      <div>
        <h1><ShowDataTable {...dataOpts}/></h1>
      </div>
    )
  };

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
            <PiePksx query={query} />
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={12}>
            <PieLx query={query} />
          </Col>
          <Col span={12}>
            <PieLdl query={query}/>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={12}>
            <PieJylx query={query}/>
          </Col>
          <Col span={12}>
            <PieWgdy query={query}/>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={24}>
            <PieWgsf onClick={wgsfClick} query={query}/>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={12}>
            <PieCbxz query={query} />
          </Col>
          <Col span={12}>
            <PieSfhb query={query}/>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={12}>
            <PieXb query={query}/>
          </Col>
          <Col span={12}>
            <PieSfyb query={query}/>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col span={24}>
            <PieMz query={query}/>
          </Col>
        </Row>
      </div>
      {count.showDataVisible && <ShowDataModal {...showOpts}>{showData()}</ShowDataModal>}
    </div>
  );
}

export default connect(({ loading, count }) => ({ loading, count }))(Count);

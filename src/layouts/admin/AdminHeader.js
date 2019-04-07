import React from 'react';
import {Col, Icon, Layout, Popconfirm, Popover, Row} from 'antd';
import {Link} from 'react-router-dom';

import router from 'umi/router';

import styles from '../layout.css';
import Helmet from 'react-helmet';
import configApi from '../../utils/configApi';

const { Header } = Layout;

export default class AdminHeader extends React.Component {

  state = {
    loginUser:[]
  }

  UNSAFE_componentWillMount() {
    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
    this.setState({loginUser: loginUser || []});
  }

  render() {
    const confirmOpts = {
      title: '确定退出登陆吗？',
      okText: '确定退出',
      cancelText: '取消操作',
      onConfirm: () => {
        sessionStorage.clear();
        localStorage.clear();
        router.push("/login");
      }
    }

    const content = (
      <div>
        <p><Link to="/admin/users/updatePwd"><Icon type="setting"/> 用户配置</Link></p>
        {/*<Divider></Divider>*/}
        <p><Popconfirm {...confirmOpts}><Icon type="logout"/> 退出登陆</Popconfirm></p>
      </div>
    );

    return (
      <Header className={styles.adminHeader}>
        <Helmet><title>{configApi.appName} - 后台管理</title></Helmet>
        <Row>
          <Col span={20}>
            {/*<div className={styles.logo}></div>*/}
            {/*<Icon className={styles.icon} type="radar-chart"/>*/}
            <div className={styles.logoName}>{configApi.appName}</div>
          </Col>
          <Col span={4} style={{"textAlign": "right"}}>
            <Popover placement="bottomRight" content={content} trigger="hover">
              <Icon type="user"/> {this.state.loginUser.nickname}
            </Popover>
          </Col>
        </Row>
      </Header>
    );
  }
}

import React from 'react';
import styles from './error.css';
import Helmet from 'react-helmet';
import {Icon, Button} from 'antd';
import configApi from "../../utils/configApi";
import router from 'umi/router';

export default class ErrorModel extends React.Component {

  handleBack = () => {
    router.go(-2);
  }
  handleLock=()=> {
    router.push("/login");
  }

  render() {
    return (
      <div className={styles.mainContainer}>
        <Helmet><title>{configApi.appName} - 出现错误</title></Helmet>
        <div className={styles.errorContent}>
          <h1 className={styles.title}><Icon type="warning"/></h1>
          <p className={styles.errorMessage}>{this.props.children}</p>
          <p className={styles.operators}>
            <Button onClick={this.handleBack} icon="left" size="large">返回</Button>
            <Button onClick={this.handleLock} icon="unlock" type="primary" size="large">登陆</Button>
          </p>
        </div>
      </div>
    );
  }

}

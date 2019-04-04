import React from 'react';
import {Affix, Layout, LocaleProvider} from 'antd';
import {connect} from 'dva';

import AdminHeader from './admin/AdminHeader';
import AdminFooter from './admin/AdminFooter';
import AdminSideMenu from './admin/AdminSideMenu';
import ErrorModel from './errors/ErrorModel';
import router from 'umi/router';
import styles from './layout.css';

import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import {checkAuthByUrl, hideNoAuthContent} from '../utils/authUtils';

moment.locale('zh-cn');

const { Sider, Content } = Layout;

class MainLayout extends React.Component {


  // console.log("layoutIndex->path::", props);
  render() {

    const props = this.props;

    const pathname = props.location.pathname;

    const isWx = pathname.indexOf("/wx") === 0;
    const isWeixin = pathname.indexOf("/weixin") === 0;

    const user = JSON.parse(sessionStorage.getItem("loginUser"));
    if (isWeixin) {
      // console.log("/weixin开头");
    } else if (isWx) {
      // console.log(user)
    } else if(pathname.indexOf("/public")===0) {
      return (
        <LocaleProvider locale={zhCN}>
          <ErrorModel>
            {props.children}
          </ErrorModel>
        </LocaleProvider>
      );
    } else if ((pathname !== '/login' && pathname !== '/init') && user === null) {
      // console.log("loginUser is null", user);
      router.push("/login");
    } else if(pathname.indexOf("/admin")===0 || pathname.indexOf("/yard")===0) { //需要进行登陆验证
      const hasAuth = checkAuthByUrl(pathname); //通过url检测权限
      if(!hasAuth) { //无权限
        router.push("/public/noAuth");
      }
    }

    // console.log("layout::", props, dispatch);

    // console.log("layoutIndex:::", window.history);
    // console.log("layoutIndex:::", props);

    if (pathname === '/login' || pathname === '/init') {
      return (
        <LocaleProvider locale={zhCN}>
        <Layout>
          <Content>{props.children}</Content>
        </Layout>
        </LocaleProvider>
      );
    } else if (isWx || isWeixin) {
    } else if (pathname === '/weixin/root' || pathname === '/weixin/public/loadLoginAccount') {
      return (<p>{props.children}</p>);
    }


    return (
      <LocaleProvider locale={zhCN}>
      <Layout className={styles.adminLayout}>
        <Affix>
          <AdminHeader/>
        </Affix>
        <Layout className={styles.adminMenuSider}>
          <Affix offsetTop={60} style={{"overflow": "auto"}}>
            <Sider>
              <AdminSideMenu/>
            </Sider>
          </Affix>
          <Content style={{"background": "#f0f2f5"}}>{props.children}
            <AdminFooter/>
          </Content>
        </Layout>

      </Layout>
      </LocaleProvider>
    );
  }
}

export default connect()(MainLayout);

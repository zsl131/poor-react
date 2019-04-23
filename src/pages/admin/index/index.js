import React from 'react';
import {connect} from 'dva';
import Helmet from 'react-helmet';
import configApi from "../../../utils/configApi";

const Index = ({
  loading,
 adminIndex
}) => {

  // console.log(adminIndex);

  // console.log(alertMessage());

  return (
    <div style={{"padding":"15px"}} >
      <Helmet><title>{configApi.appName}</title></Helmet>
      <h2>· 后台首页</h2>
    </div>
  );
}

export default connect(({ loading, adminIndex }) => ({ loading, adminIndex }))(Index);

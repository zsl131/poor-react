import React from 'react';
import {connect} from 'dva';
import {Helmet} from 'react-helmet';
import WebPersonalBasic from "./components/WebPersonalBasic";
import WebPersonalWork from "./components/WebPersonalWork";
import WebPersonalMove from "./components/WebPersonalMove";
import WebPersonalIndustry from "./components/WebPersonalIndustry";
import WebPersonalStudy from "./components/WebPersonalStudy";
import WebPersonalSafe from "./components/WebPersonalSafe";
import WebPersonalFamily from "./components/WebPersonalFamily";

const ShowPersonal = ({
  webPersonal,
  dispatch,
}) => {

  const {family, personal, personalList} = webPersonal;

  console.log(family, personal);

  return (
    <div>
      <Helmet><title>家庭详情</title></Helmet>
      <WebPersonalBasic personal={personal}/>
      <WebPersonalWork personal={personal}/>
      <WebPersonalMove personal={personal}/>
      <WebPersonalIndustry personal={personal}/>
      <WebPersonalStudy personal={personal}/>
      <WebPersonalSafe personal={personal}/>
      <WebPersonalFamily family={family} personalList={personalList}/>
    </div>
  );
}

export default connect(({ webPersonal }) => ({ webPersonal }))(ShowPersonal);

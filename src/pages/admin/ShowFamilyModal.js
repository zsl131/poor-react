import React from 'react';
import {Modal} from 'antd';
import QRCode from 'qrcode.react';
import PersonalBasic from "./PersonalBasic";
import PersonalWork from "./PersonalWork";
import PersonalMove from "./PersonalMove";
import PersonalIndustry from "./PersonalIndustry";
import PersonalStudy from "./PersonalStudy";
import PersonalSafe from "./PersonalSafe";
import PersonalFamily from "./PersonalFamily";
import configApi from "../../utils/configApi";

export default class ShowFamilyModal extends React.Component {

  render() {

    const {family, personal, personalList} = this.props;

    return(
      <Modal {...this.props}  style={{ "minWidth": '90%', top: 10 }}>
        <PersonalBasic personal={personal}/>
        <PersonalWork personal={personal}/>
        <PersonalMove personal={personal}/>
        <PersonalIndustry personal={personal}/>
        <PersonalStudy personal={personal}/>
        <PersonalSafe personal={personal}/>
        <PersonalFamily family={family} personalList={personalList}/>
        <div style={{"width":"100%", "textAlign":"center"}}>
          <QRCode value={`${configApi.baseUrl}/web/personal/show?id=${personal.id}`} />
        </div>
      </Modal>
    );
  }
}

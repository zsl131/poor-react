import React from 'react';
import {Modal} from 'antd';
import PersonalBasic from "./PersonalBasic";
import PersonalWork from "./PersonalWork";
import PersonalMove from "./PersonalMove";
import PersonalIndustry from "./PersonalIndustry";
import PersonalStudy from "./PersonalStudy";
import PersonalSafe from "./PersonalSafe";
import PersonalFamily from "./PersonalFamily";

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
      </Modal>
    );
  }
}

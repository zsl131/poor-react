import React from 'react';
import request from "../utils/request";
import styles from './personalCount.css';
import {Tooltip} from 'antd';

export default class PersonalCount extends React.Component {
  state = {
    countList: [],
  }

  setCountList(countList) {
    const old = this.state.countList;
    if(old.length<=0) {
      this.setState({countList: countList});
    }
  }

  render() {

    const townId = this.props.townId;

    if(townId) {
      request("personalService.queryCountDto", {townId}, true).then((res) => {
        this.setCountList(res.countDto);
      });
    }

    const {countList} = this.state;

    const SingleCount = (dto) => {
      return (
        <p className={styles.singleCount}>
          <b className={styles.name}>{dto.name}</b>
          <span className={styles.label}>总户数：</span><b className={styles.value}>{dto.hs}</b>，
          <span className={styles.label}>总人数：</span><b className={styles.value}>{dto.rs}</b>，
          <span className={styles.label}>劳动力人数：</span><b className={styles.value}>{dto.ldls}</b>，
          <span className={styles.label}>就业人数：</span><b className={styles.value}>{dto.jys}</b>，
          <span className={styles.label}>就业人数占比：</span><b className={styles.value}>{dto.jybl + "%"}</b>
        </p>
      )
    };

    const datas = countList.map((item, index) => {
      return <SingleCount key={index} {...item}/>
    });

    return(
      <div className={styles.countMain}>
        <Tooltip title="最新统计">
          {datas}
        </Tooltip>
      </div>
    );
  }
}


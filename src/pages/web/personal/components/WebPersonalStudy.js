import React from 'react';
import {Icon} from 'antd';
import styles from './show.css';

//就学情况
export default class WebPersonalStudy extends React.Component {

  render() {

    const {personal} = this.props;

    return(
      <div className={styles.singleBlock}>
        <p className={styles.header}><h3><Icon className={styles.icon} type="smile"/> {personal.xm}就学情况</h3></p>
        <table>
          <tbody>
          <tr>
            <td className={styles.label}>是否在校</td>
            <td className={styles.value}>{personal.sfzx}</td>

            <td className={styles.label}>就读学校</td>
            <td className={styles.value}>{personal.jdxx}</td>
          </tr>
          <tr>
            <td className={styles.label}>就读年级</td>
            <td className={styles.value}>{personal.jdnj}</td>

            <td className={styles.label}>是否享受资助</td>
            <td className={styles.value}>{personal.sfxszz==='是'?<span className="boldBlue">享受</span>:<span className="boldRed">未享受</span>}</td>
          </tr>
          {personal.sfxszz==='是'?
            <tr>
              <td className={styles.label}>资助项目</td>
              <td className={styles.value}>{personal.zzxmmc}</td>

              <td className={styles.label}>资助金额</td>
              <td className={styles.value}>{personal.zzje}</td>
            </tr>:""
          }
          </tbody>
        </table>
      </div>
    );
  }
}

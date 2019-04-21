import React from 'react';
import {Icon} from 'antd';
import styles from './show.css';

//产业
export default class WebPersonalIndustry extends React.Component {

  render() {

    const {personal} = this.props;

    return(
      <div className={styles.singleBlock}>
        <p className={styles.header}><h3><Icon className={styles.icon} type="wallet"/> {personal.xm}产业情况</h3></p>
        <table>
          <tbody>
          {/*<tr>
            <td className={styles.label} colSpan={2} style={{"textAlign":"center"}}>三块地</td>
            <td className={styles.label} colSpan={2} style={{"textAlign":"center"}}>产业</td>
          </tr>*/}
          <tr>
            <td className={styles.label}>宅基地</td>
            <td className={styles.value}>{personal.zjd} 平米</td>

            <td className={styles.label}>耕地</td>
            <td className={styles.value}>{personal.gd} 亩</td>
          </tr>
          <tr>
            <td className={styles.label}>种植品种</td>
            <td className={styles.value}>{personal.zzpz}</td>

            <td className={styles.label}>种植面积</td>
            <td className={styles.value}>{personal.zzdmj} 亩</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

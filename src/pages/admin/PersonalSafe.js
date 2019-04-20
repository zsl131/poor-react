import React from 'react';
import {Icon} from 'antd';
import styles from './show.css';

//保险
export default class PersonalSafe extends React.Component {

  render() {

    const {personal} = this.props;

    return(
      <div className={styles.singleBlock}>
        <p className={styles.header}><h3><Icon className={styles.icon} type="insurance"/> {personal.xm}保险情况</h3></p>
        <table>
          <tbody>
          <tr>
            <td className={styles.label} colSpan={2} style={{"width":"auto"}}>健康状况</td>
            <td className={styles.value} colSpan={2}>{personal.jkzk}</td>

            <td className={styles.label} colSpan={2} style={{"width":"auto"}}>居民养老保险</td>
            <td className={styles.value} colSpan={2}>{personal.sfylbx}</td>
          </tr>
          <tr>
            <td className={styles.label}>医院保险</td>
            <td className={styles.value}>{personal.sfyb}</td>

            <td className={styles.label}>参保险种</td>
            <td className={styles.value}>{personal.cbxz}</td>

            <td className={styles.label}>参保单位</td>
            <td className={styles.value}>{personal.cbdw}</td>

            <td className={styles.label}>是否患病</td>
            <td className={styles.value}>{personal.sfhb}</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

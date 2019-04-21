import React from 'react';
import {Icon} from 'antd';
import styles from './show.css';

//搬迁
export default class WebPersonalMove extends React.Component {

  render() {

    const {personal} = this.props;

    return(
      <div className={styles.singleBlock}>
        <p className={styles.header}><h3><Icon className={styles.icon} type="export"/> {personal.xm}搬迁情况（{personal.bqsj?<span className="blue">已搬迁</span>:<span className="red">未搬迁</span>}）</h3></p>
        <table>
          <tbody>
          <tr>
            <td className={styles.label}>搬迁时间</td>
            <td className={styles.value}>{personal.bqsj}</td>

            <td className={styles.label}>搬迁地点</td>
            <td className={styles.value}>{personal.bqdd}</td>
          </tr>
          <tr>
            <td className={styles.label}>备注</td>
            <td className={styles.value} colSpan={3}>{personal.bz}</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

import React from 'react';
import {Icon} from 'antd';
import styles from './show.css';

export default class PersonalWork extends React.Component {

  render() {

    const {personal} = this.props;
    const type = personal.wgdd?"1":(personal.cyxm?"2":0); //0-未就业；1-外出务工；2-自主创业

    const base = ()=> {
      return (
        <tr>
          <td className={styles.label}>参加过的培训</td>
          <td className={styles.value} colSpan={3}>{personal.cjhzpx}</td>

          <td className={styles.label}>培训需求</td>
          <td className={styles.value} colSpan={3}>{personal.pxxj}</td>
        </tr>
      )
    }

    const body1 = ()=> { //外出务工
      return (
        <tbody>
        <tr>
          <td className={styles.label}>企业名称</td>
          <td className={styles.value}>{personal.qymc}</td>

          <td className={styles.label}>岗位名称</td>
          <td className={styles.value}>{personal.gwmc}</td>

          <td className={styles.label}>务工时间</td>
          <td className={styles.value}>{personal.wgsj}</td>

          <td className={styles.label}>月工资收入</td>
          <td className={styles.value}>{personal.ygz}</td>
        </tr>
        <tr>
          <td className={styles.label}>务工地点</td>
          <td className={styles.value} colSpan={7}>{personal.wgdd}</td>
        </tr>
        {base()}
        </tbody>
      )
    };

    const body2 = ()=> {
      return (
        <tbody>
          <tr>
            <td className={styles.label}>创业项目</td>
            <td className={styles.value}>{personal.cyxm}</td>

            <td className={styles.label}>创业地点</td>
            <td className={styles.value}>{personal.cydd}</td>

            <td className={styles.label}>创业时间</td>
            <td className={styles.value}>{personal.cysj}</td>

            <td className={styles.label}>月收入</td>
            <td className={styles.value}>{personal.ysr}</td>
          </tr>
        {base()}
        </tbody>
      )
    };

    const body0 = ()=> {
      return (
        <tbody>
          <tr>
            <td className={styles.label}>务工去向</td>
            <td className={styles.value}>{personal.wgqx}</td>

            <td className={styles.label}>公益性岗位</td>
            <td className={styles.value}>{personal.gyxgw}</td>

            <td className={styles.label}>自主创业</td>
            <td className={styles.value}>{personal.zzcy}</td>

            <td className={styles.label}>无法外出原因</td>
            <td className={styles.value}>{personal.wfwcyy}</td>
          </tr>
          {base()}
        </tbody>
      )
    };

    return(
      <div className={styles.singleBlock}>
        <p className={styles.header}><h3><Icon className={styles.icon} type="highlight"/> {personal.xm}就业情况
          （{type==='1'?'已就业·外出务工':(type==='2' ? '已就业·自主创业':<span className="boldRed">未就业</span>)}）
        </h3></p>
        <table>
          {type === '1'?body1(): (type === '2'?body2():body0())}
        </table>
      </div>
    );
  }
}

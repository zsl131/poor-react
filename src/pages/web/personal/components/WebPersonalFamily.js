import React from 'react';
import {Icon} from 'antd';
import styles from './show.css';

//家庭成员
export default class WebPersonalFamily extends React.Component {

  render() {

    const {personalList, family} = this.props;

    const data = ()=> {
      return (
        <tbody className={styles.dataTable}>
        {(personalList && personalList.length>0)? personalList.map((p)=> {
          return (
            <tr>
              <td>{p.yhzgx}</td>
              <td>{p.xm}</td>
              <td>{p.sfzh}</td>
              <td>{p.xb}</td>
              <td>{p.nl}</td>
              <td>{p.whcd}</td>
            </tr>
          )
        }):"无家庭成员"}
        </tbody>
      )
    }

    return(
      <div className={styles.singleBlock}>
        <p className={styles.header}><h3><Icon className={styles.icon} type="team"/> {family.hzxm}家庭成员情况（<b>{family.jtrs}</b> 人）</h3></p>
        <table>
          <thead>
            <tr>
              <td>关系</td>
              <td>姓名</td>
              <td>身份证号</td>
              <td>性别</td>
              <td>年龄</td>
              <td>文化程度</td>
            </tr>
          </thead>
          {data()}
        </table>
      </div>
    );
  }
}

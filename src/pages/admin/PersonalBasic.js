import React from 'react';
import {Icon} from 'antd';
import styles from './show.css';

export default class PersonalBasic extends React.Component {

  render() {

    const {personal} = this.props;

    return(
      <div className={styles.singleBlock}>
        <p className={styles.header}><h3><Icon className={styles.icon} type="idcard"/> {personal.xm}基本信息</h3></p>
        <table>
          <tbody>
          <tr>
            <td className={styles.label}>姓名</td>
            <td className={styles.value}>{personal.xzmc} {personal.xm}</td>

            <td className={styles.label}>性别</td>
            <td className={styles.value}>{personal.xb}</td>

            <td className={styles.label}>民族</td>
            <td className={styles.value}>{personal.mz}</td>

            <td className={styles.label}>年龄</td>
            <td className={styles.value}>{personal.nl}岁</td>
            <td rowSpan={3} className={styles.picture}>
              {personal.zplj ? <img src={personal.zplj} alt={personal.xm} style={{"width":"120px"}}/>:"无照片"}
            </td>
          </tr>
          <tr>
            <td className={styles.label}>身份证号</td>
            <td className={styles.value}>{personal.sfzh}</td>

            <td className={styles.label}>文化程度</td>
            <td className={styles.value}>{personal.whcd}</td>

            <td className={styles.label}>联系电话</td>
            <td className={styles.value}>{personal.lxdh}</td>

            <td className={styles.label}>家庭属性</td>
            <td className={styles.value}><span className="red">{personal.lx}</span></td>
          </tr>

          <tr>
            <td className={styles.label}>致贫原因</td>
            <td className={styles.value}>{personal.zpyy}</td>

            <td className={styles.label}>安置方式</td>
            <td className={styles.value}>{personal.azfs}</td>

            <td className={styles.label}>国办劳动力</td>
            <td className={styles.value}>{personal.gbldlqk}</td>

            <td className={styles.label}>人中自然增减</td>
            <td className={styles.value}>{personal.rkzrzj}</td>
          </tr>

          <tr>
            <td className={styles.label}>家庭地址</td>
            <td className={styles.value} colSpan={3}>{personal.jtdz}</td>

            <td className={styles.label}>是否是劳动力</td>
            <td className={styles.value}>{personal.sfsldl}</td>

            <td className={styles.label}>脱贫属性</td>
            <td className={styles.value}><span className="boldRed">{personal.pksx}</span></td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

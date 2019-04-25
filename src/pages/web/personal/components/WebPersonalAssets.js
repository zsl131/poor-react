import React from 'react';
import {Icon} from 'antd';
import styles from './show.css';

//资产
export default class WebPersonalAssets extends React.Component {

  render() {

    const {personal, assetsList} = this.props;

    const SingleAssets = assetsList.map((item)=> {
      return (
        <div className={styles.singleAssets} key={item.id}>
          <p><a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer"><img src={item.url} alt={item.mc} className={styles.avatarImg}/></a></p>
          <p className={styles.assetsLabel}>{item.gsxm}的{item.mc}图片</p>
        </div>
      )
    });

    return(
      <div className={styles.singleBlock}>
        <p className={styles.header}><h3><Icon className={styles.icon} type="export"/> {personal.xm}家庭资产情况</h3></p>
        <table>
          <tbody>
          <tr>
            <td>
              {(assetsList && assetsList.length>0)?
                <div>
                  {SingleAssets}
                </div>
                :
                <div className="boldRed">无任何资产信息</div>
              }

            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

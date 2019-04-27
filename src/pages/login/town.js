import React from 'react';
import {connect} from 'dva';
import styles from './town.css';
import {Button, Card, Carousel} from "antd";
import configApi from "../../utils/configApi";
import {Helmet} from 'react-helmet';

const Town = ({
  dispatch,
  loading,
  loginTown,
  location
}) => {

  // const picUrl = "http://localhost:8000"+loginTown.picList[0];

  const picList = loginTown.picList.map((item)=> {
    return <div key={item}><img src={configApi.baseUrl+item} style={{"width":"100vw", "height":"100vh"}}/></div>
  });

  if(picList.length<=0) {
    picList.push(<div key={0}><img src={require('../../../src/assets/default-bg.jpg')} style={{"width":"100vw", "height":"100vh"}}/></div>);
  }

  // console.log(picList);

  // const picList = <div><img src={configApi.baseUrl+loginTown.picList[0]} style={{"width":"100vw", "height":"100vh"}}/></div>;

  const isSingle = loginTown.townList.length<=1;

  const singleTown = loginTown.townList[0];

  // console.log(isSingle, singleTown);

  const townList = loginTown.townList.map((item)=> {
    return (
      <a key={item.id} href="/admin/count" rel="noopener noreferrer"><Button className={styles.townBtn} size="large">{item.name}</Button></a>
    )
  });

  // console.log(picUrl);

  return(
    <div className={styles.mainDiv}>
      <Helmet>
        <title>{configApi.appName}</title>
      </Helmet>
      {/*<Slider className={styles.sliderContainer} delay={1000} speed={3000}>
        {picList}
      </Slider>*/}
      <Carousel autoplay className={styles.sliderContainer} dots={false}>
        {picList}
      </Carousel>
      {isSingle?
        <div className={styles.singleContent}>{singleTown?
          <Card
            title={singleTown.name}
            extra={<a href="/admin/count">进入系统</a>}
            style={{"opacity":"0.8"}}
          >
            <div dangerouslySetInnerHTML={{__html: singleTown.remark}}></div>
          </Card>
          :<span>请先联系管理员授权</span>}</div>
        :<div className={styles.contentDiv}>
          {townList}
        </div>
      }

    </div>
  );
}

export default connect(({ loading, loginTown }) => ({ loading, loginTown }))(Town);


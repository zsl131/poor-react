import React from 'react';
import {connect} from 'dva';
import styles from './town.css';
import {Button, Card, Carousel} from "antd";
import configApi from "../../utils/configApi";
import {Helmet} from 'react-helmet';
import PersonalCount from "../../components/PersonalCount";

const Town = ({
  dispatch,
  loading,
  loginTown,
  location
}) => {

  // const picUrl = "http://localhost:8000"+loginTown.picList[0];

  const {town, picList, children} = loginTown;
  // console.log(town);

  const pictureList = picList.map((item)=> {
    return <div key={item}><img src={configApi.baseUrl+item} style={{"width":"100vw", "height":"100vh"}}/></div>
  });

  if(pictureList.length<=0) {
    pictureList.push(<div key={0}><img src={require('../../../src/assets/default-bg.jpg')} style={{"width":"100vw", "height":"100vh"}}/></div>);
  }

  // console.log(isSingle, singleTown);

  const allTownList = children.map((item)=> {
    // console.log(item.pid, (typeof(item.pid) =="undefined" || (!item.pid || item.pid<=0)));
    // console.log("=========");
    return (
      <a key={item.id} href={(typeof(item.pid) =="undefined" || (!item.pid || item.pid<=0))?"/login/town?townId="+item.id:"/admin/count?townId="+item.id} rel="noopener noreferrer"><Button className={styles.townBtn} size="large">{item.name}</Button></a>
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
        {pictureList}
      </Carousel>

      <div className={styles.mainContainer}>
        <div className={styles.singleContent}>{town?
          <Card
            title={town.name}
            extra={<a href={"/admin/count?townId="+town.id}>进入系统</a>}
            style={{"opacity":"0.8"}}
          >
            <div dangerouslySetInnerHTML={{__html: town.remark}} className={styles.townContent}></div>
            <div>
              <PersonalCount townId={town.id}/>
            </div>
          </Card>
          :<span>请先联系管理员授权</span>}</div>

        <div className={styles.contentDiv}>
          {allTownList}
        </div>
      </div>

    </div>
  );
}

export default connect(({ loading, loginTown }) => ({ loading, loginTown }))(Town);


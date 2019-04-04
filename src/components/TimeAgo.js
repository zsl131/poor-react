import React from 'react';

export default class TimeAgo extends React.Component {
  state = {
    showStr : '',
    timeLong : this.props.timeLong,
  }

  rebuildStr() {
    const date = new Date();
    // console.log(this.state.timeLong +"-"+date.getTime() + "=" + (this.state.timeLong - date.getTime()));
    const diffSec = parseInt(((date.getTime() - this.state.timeLong) / 1000)+"", 10); //相差秒数
    // console.log(diffSec, diffSec * 1000);
    // console.log(20<=diffSec && diffSec<(60*60));
    let showStr = '';
    if(diffSec<60) { showStr = "刚刚";} //20秒内
    else if(60<=diffSec && diffSec<(60*60)) {showStr = parseInt((diffSec/60)+"", 10) + "分钟前";}
    else if(60*60<=diffSec && diffSec<60*60*24) {showStr = parseInt((diffSec / (60*60))+"", 10) + " 小时前";}
    else if(60*60*24<=diffSec && diffSec<60*60*24*12) {showStr = parseInt((diffSec/(60*60*24))+"", 10) + " 天前";}
    else {
      let d = new Date(this.state.timeLong);
      //getFullYear获取的就是当前系统本地的年
      let year = d.getFullYear();

      //由于js的月份是从0开始的,所以月份加上1
      let month = d.getMonth()+1;

      //返回的是一个月中的某一天1-31
      let myDate = d.getDate();
      showStr = year + "-" + month + "-" + myDate;
    }

    this.setState({showStr : showStr});
    // return showStr;
  }

  UNSAFE_componentWillMount() {
    this.rebuildStr();
    setInterval(()=> {
      this.rebuildStr();
    }, 1000);
  }

  render() {
    return(
      <span style={{"fontSize":'12px'}}>{this.state.showStr}</span>
    );
  }
}


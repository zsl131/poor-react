import React from 'react';
import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import request from "../../../../utils/request";

//是否参保饼状图
export default class PieSfyb extends React.Component {

  componentDidMount() {
    const query = this.props.query || {};
    request("countService.sfybPie", query, true).then((res)=> {
      const data = res.data;

      let legend = [];
      data.map((d)=> {
        legend.push(d.name);
      });


      // 初始化
      const myChart = echarts.init(document.getElementById('sfyb'));
      // 绘制图表
      myChart.setOption({
        title : {
          text: '参加基本医疗保险统计',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: legend
        },
        series : [
          {
            name: '参加基本医疗保险',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              normal: {
                show: true,
                formatter: "{b} : {c}人 ({d}%)"
              }
            }
          }
        ]
      });
    });
  }

  render() {
    return(
      <div id="sfyb" style={{ width: '80%', height: '300px' }}>&nbsp;</div>
    );
  }
}

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

//参保险种饼状图
export default class PieCbxz extends React.Component {

  componentDidMount() {
    const query = this.props.query || {};
    // console.log(this.props.query);
    request("countService.cbxzPie", query, true).then((res)=> {
      const data = res.data;

      let legend = [];
      data.map((d)=> {
        legend.push(d.name);
      });


      // 初始化
      const myChart = echarts.init(document.getElementById('cbxz'));
      // 绘制图表
      myChart.setOption({
        title : {
          text: '参保险种统计',
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
            name: '参保险种',
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
      <div id="cbxz" style={{ width: '80%', height: '300px' }}>&nbsp;</div>
    );
  }
}

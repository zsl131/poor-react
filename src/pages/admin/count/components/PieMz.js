import React from 'react';
import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import request from "../../../../utils/request";

//民族饼状图
export default class PieMz extends React.Component {

  componentDidMount() {
    const query = this.props.query || {};
    request("countService.mzPie", query, true).then((res)=> {
      const data = res.data;

      let legend = [];
      let values = [];
      data.map((d)=> {
        legend.push(d.name);
        values.push(d.value);
      });


      // 初始化
      const myChart = echarts.init(document.getElementById('mz'));
      // 绘制图表
      myChart.setOption({
        title: { text: '人员民族统计（'+data.length+' 种）',
          "textStyle": {
            "fontSize": 24
          }},
        tooltip: {},
        xAxis: {
          data: legend,
          axisLabel: {
            fontSize:'18'
          }
        },
        yAxis: {
          "textStyle": {
            "fontSize": 18
          }
        },
        series: [{
          name: '民族',
          type: 'bar',
          data: values,
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: 'top', //在上方显示
                textStyle: { //数值样式
                  color: 'black',
                  fontSize: 18,
                }
              }
            }
          }
        }]
      });
    });
  }

  render() {
    return(
      <div id="mz" style={{ width: '100%', height: '300px' }}>&nbsp;</div>
    );
  }
}

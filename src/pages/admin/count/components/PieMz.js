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
    request("countService.mzPie", {}, true).then((res)=> {
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
        title: { text: '人员民族统计（'+data.length+' 种）' },
        tooltip: {},
        xAxis: {
          data: legend
        },
        yAxis: {},
        series: [{
          name: '民族',
          type: 'bar',
          data: values
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

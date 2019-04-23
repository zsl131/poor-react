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

//贫困属性
export default class PiePksx extends React.Component {

  componentDidMount() {
    request("countService.pksxPie", {}, true).then((res)=> {
      const data = res.data;

      let legend = [];
      let values = [];
      data.map((d)=> {
        legend.push(d.name);
        values.push(d.value);
      });


      // 初始化
      const myChart = echarts.init(document.getElementById('pksx'));
      // 绘制图表
      myChart.setOption({
        title: { text: '人员脱贫属性统计（'+data.length+' 种）' },
        tooltip: {},
        xAxis: {
          data: legend
        },
        yAxis: {},
        series: [{
          name: '脱贫属性',
          type: 'bar',
          data: values
        }]
      });
    });
  }

  render() {
    return(
      <div id="pksx" style={{ width: '100%', height: '300px' }}>&nbsp;</div>
    );
  }
}

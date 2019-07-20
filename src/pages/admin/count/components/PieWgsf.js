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

//务工省份
export default class PieWgsf extends React.Component {

  componentDidMount() {
    const query = this.props.query || {};
    const onClick = this.props.onClick;
    request("countService.wgsfPie", query, true).then((res)=> {
      const data = res.data;

      let legend = [];
      let values = [];
      data.map((d)=> {
        legend.push(d.name);
        values.push(d.value);
      });


      // 初始化
      const myChart = echarts.init(document.getElementById('wgsf'));

      myChart.on("click", function(params) {
        // console.log(onClick, params);
        if(onClick) {
          let obj = query;
          const name = params.name;
          const value = params.value;
          obj.field = "wgsf"; obj.value = name; obj.join = "=";
          onClick(obj, "务工去向统计-"+name+"（"+value+"）");
        }
      });

      // 绘制图表
      myChart.setOption({
        title: { text: '务工去向统计（'+data.length+' 种）',"textStyle": {
            "fontSize": 24
          } },
        tooltip: {show: true},
        xAxis: {
          data: legend
        },
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: '务工去向',
          type: 'bar',
          data: values,
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: 'top', //在上方显示
                textStyle: { //数值样式
                  color: 'black',
                  fontSize: 18
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
      <div id="wgsf" style={{ width: '100%', height: '300px' }}>&nbsp;</div>
    );
  }
}

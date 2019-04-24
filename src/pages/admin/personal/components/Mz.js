import React from 'react';
import {Form, Input, message, Select, Tabs, Row, Col, Tooltip, InputNumber} from 'antd';
import PictureWall from '../../../../components/PictureWall';

const Option = Select.Option;

export default class Mz extends React.Component {

  render() {
    return(
      <Select>
        <Option value="汉族">汉族</Option>
        <Option value="彝族">彝族</Option>
        <Option value="苗族">苗族</Option>
        <Option value="土家族">土家族</Option>
        <Option value="藏族">藏族</Option>
        <Option value="佤族">佤族</Option>
        <Option value="哈尼族">哈尼族</Option>
        <Option value="僳僳族">僳僳族</Option>
        <Option value="白族">白族</Option>
        <Option value="普米族">普米族</Option>
        <Option value="回族">回族</Option>
        <Option value="壮族">壮族</Option>
        <Option value="裕固族">裕固族</Option>
        <Option value="瑶族">瑶族</Option>
        <Option value="锡伯族">锡伯族</Option>
        <Option value="乌孜别克族">乌孜别克族</Option>
        <Option value="维吾尔族">维吾尔族</Option>
        <Option value="土族">土族</Option>
        <Option value="塔塔尔族">塔塔尔族</Option>
        <Option value="塔吉克族">塔吉克族</Option>
        <Option value="水族">水族</Option>
        <Option value="畲族">畲族</Option>
        <Option value="撒拉族">撒拉族</Option>
        <Option value="羌族">羌族</Option>
        <Option value="怒族">怒族</Option>
        <Option value="纳西族">纳西族</Option>
        <Option value="仫佬族">仫佬族</Option>
        <Option value="蒙古族">蒙古族</Option>
        <Option value="门巴族">门巴族</Option>
        <Option value="毛南族">毛南族</Option>
        <Option value="满族">满族</Option>
        <Option value="珞巴族">珞巴族</Option>
        <Option value="黎族">黎族</Option>
        <Option value="拉祜族">拉祜族</Option>
        <Option value="柯尔克孜族">柯尔克孜族</Option>
        <Option value="景颇族">景颇族</Option>
        <Option value="京族">京族</Option>
        <Option value="基诺族">基诺族</Option>
        <Option value="赫哲族">赫哲族</Option>
        <Option value="哈萨克族">哈萨克族</Option>
        <Option value="仡佬族">仡佬族</Option>
        <Option value="高山族">高山族</Option>
        <Option value="鄂温克族">鄂温克族</Option>
        <Option value="俄罗斯族">俄罗斯族</Option>
        <Option value="鄂伦春族">鄂伦春族</Option>
        <Option value="独龙族">独龙族</Option>
        <Option value="东乡族">东乡族</Option>
        <Option value="侗族">侗族</Option>
        <Option value="德昂族">德昂族</Option>
        <Option value="傣族">傣族</Option>
        <Option value="达斡尔族">达斡尔族</Option>
        <Option value="朝鲜族">朝鲜族</Option>
        <Option value="布依族">布依族</Option>
        <Option value="布朗族">布朗族</Option>
        <Option value="保安族">保安族</Option>
        <Option value="阿昌族">阿昌族</Option>
      </Select>
    );
  }
}

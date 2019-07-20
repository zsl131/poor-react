import React from 'react';
import { Button } from 'antd';

const Operator = ({
  onDownloadPersonal,
  onDownloadPlant
}) => {
  return(
    <div className="listOperator"><Button type="primary" icon="download" onClick={onDownloadPersonal}>下载易迁人员信息</Button>
      &nbsp;&nbsp;&nbsp;
      <Button type="primary" icon="download" onClick={onDownloadPlant}>下载种植品种</Button>
    </div>
  );
}

export default Operator;

import React from 'react';
import { Button } from 'antd';

const Operator = ({
  onDownloadPersonal,
  onDownloadPlant,
  onUploadPersonal
}) => {
  return(
    <div className="listOperator"><Button type="primary" icon="download" onClick={onDownloadPersonal}>下载人员</Button>
      &nbsp;&nbsp;
      <Button type="primary" icon="download" onClick={onDownloadPlant}>下载产业</Button>
    </div>
  );
}

export default Operator;

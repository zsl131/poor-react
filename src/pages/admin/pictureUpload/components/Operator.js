import React from 'react';
import { Button } from 'antd';

const Operator = ({
  onAdd,
  onUploadPersonal,
}) => {
  return(
    <div className="listOperator"><Button type="primary" icon="plus" onClick={onAdd}>上传图片</Button>
      &nbsp;&nbsp;
      <Button icon="upload" type="danger" onClick={onUploadPersonal}>上传人员</Button>
    </div>
  );
}

export default Operator;

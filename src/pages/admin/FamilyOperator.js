import React from 'react';
import {Dropdown, Icon, Menu} from 'antd';

const FamilyOperator = ({
      id,
      onUpdate,
      onShow,
      children,
    }) => {

  const handleUpdate = () => {
    onUpdate(id);
  };

  const handleShow = () => {
    onShow(id);
  }

  const dropdownMenu = (
    <Menu>
      {children}
      <Menu.Item key="0">
        <span onClick={handleShow}><Icon type="eye"/> 查看</span>
      </Menu.Item>
      <Menu.Item key="1">
        {/*<Popconfirm okType="danger" onConfirm={handleConfirm} title={`确定删除[${delName}]？此操作不可逆！`} {...opts}><Icon type="close"/> 删除</Popconfirm>*/}
        <span onClick={handleUpdate}><Icon type="edit"/> 修改</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={dropdownMenu}>
      <span className="ant-dropdown-link">
        操作 <Icon type="down" />
      </span>
    </Dropdown>
  );
}
export default FamilyOperator;

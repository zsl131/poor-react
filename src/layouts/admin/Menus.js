import React from 'react';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

const Menus = ({
}) => {
  const navMenus = JSON.parse(sessionStorage.getItem("navMenus"));
  const menus = navMenus.map((item) => {
    return (
      <SubMenu key={item.menu.sn} title={<span><Icon type={item.menu.icon || "appstore"} /><span>{item.menu.name}</span></span>}>
        {/*item.children.map( (subMenu) => {
              <Link to={subMenu.href}><Menu.Item key={subMenu.sn}>{subMenu.name}</Menu.Item></Link>
          });*/}

        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <Menu.Item key="7">Option 7</Menu.Item>
        <Menu.Item key="8">Option 8</Menu.Item>
      </SubMenu>
    );
  });
  return (
    <div>{menus}</div>
  );
}

export default Menus;

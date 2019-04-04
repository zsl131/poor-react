import React from 'react';
import {Icon, Menu} from 'antd';
import {Link} from 'react-router-dom';


const SubMenu = Menu.SubMenu;

class AdminSideMenu extends React.Component {

  state = {
    collapsed: false,
    defaultKey: sessionStorage.getItem("menuKey") || '1',
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  handlerClick = ({item, key, keyPath}) => {
    //console.log(item, key, keyPath);
    sessionStorage.setItem("menuKey", key+"");
    this.setState({defaultKey: key});
  }

  render() {

    const navMenus = JSON.parse(sessionStorage.getItem("navMenus"));


    const menus = navMenus!==null?navMenus.map((item) => {
      return (
        <SubMenu key={item.menu.sn} title={<span><Icon type={item.menu.icon || "appstore"} /><span>{item.menu.name}</span></span>}>
          {
            item.children.map((subMenu) => {
              return (<Menu.Item key={subMenu.id}><Link to={subMenu.href}>{subMenu.name}</Link></Menu.Item>)
            })
          }
        </SubMenu>
      );
    }):"";

    return (
      <div>
        {/*<Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>*/}
        <Menu
          defaultSelectedKeys={[this.state.defaultKey]}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
          onClick={this.handlerClick.bind(this)}
        >
          {menus}
        </Menu>
      </div>
    );
  }
}
export default AdminSideMenu;

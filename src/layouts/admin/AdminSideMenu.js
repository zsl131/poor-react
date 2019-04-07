import React from 'react';
import {Icon, Menu,Button,Tooltip} from 'antd';
import {Link} from 'react-router-dom';

import styles from '../layout.css';

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

    const collapsed = this.props.collapsed;

    return (
      <div style={{"position":"relative", "height":"100vh"}}>
        <div style={{"background":"rgb(6, 40, 72)","height":"60px", "textAlign":"center"}}>
          <Icon type="radar-chart" style={{"fontSize":"50px", "color":"#FFF","marginTop":"5px"}}/>
        {/*<Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16, "background":"#13497d" }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>*/}
        </div>
        <div className={styles.collapseDiv}>
          <Tooltip title={collapsed?"点击展开侧边导航":"点击收起侧边导航"} placement="right">
            {/*<Button type="primary" shape="circle" onClick={this.props.onCollapse} style={{ marginBottom: 16 }} icon={collapsed?"right-circle":"left-circle"}/>*/}
            <Icon className={styles.collapseIcon} onClick={this.props.onCollapse} type={collapsed?"right-circle":"left-circle"}/>
          </Tooltip>
        </div>
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
        {/*<Icon key="menu-menu" type="right" style={{"textAlign":"center", "width":"100%", "position":"absolute", "bottom":"10px"}}/>*/}
      </div>
    );
  }
}
export default AdminSideMenu;

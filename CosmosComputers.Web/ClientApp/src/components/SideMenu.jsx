import * as React from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';

const SideMenu = (props) => (
    <Menu 
    style={{ width: "100%", height: "100%" }} 
    mode="inline" 
    theme="dark" 
    defaultSelectedKeys={[props.location.pathname.substr(1)||"Computers"]}
    >
        <Menu.Item key="Computers">
            <Link to="/" onClick={()=>console.log(props)}>Computers</Link>
        </Menu.Item>
        <Menu.Item key="Cases">
            <Link to="/Cases">Cases</Link>
        </Menu.Item>
        <Menu.Item key="Coolers">
            <Link to="/Coolers">Coolers</Link>
        </Menu.Item>
        <Menu.Item key="Discs">
            <Link to="/Discs">Discs</Link>
        </Menu.Item>
        <Menu.Item key="GraphicCards">
            <Link to="/GraphicCards">Graphic Cards</Link>
        </Menu.Item>
        <Menu.Item key="MemoryModules">
            <Link to="/MemoryModules">Memory modules</Link>
        </Menu.Item>
        <Menu.Item key="Motherboards">
            <Link to="/Motherboards">Motherboards</Link>
        </Menu.Item>
        <Menu.Item key="PowerSupplies">
            <Link to="/PowerSupplies">Power supplies</Link>
        </Menu.Item>
        <Menu.Item key="Processors">
            <Link to="/Processors">Processors</Link>
        </Menu.Item>
    </Menu>
);

export default withRouter(SideMenu);
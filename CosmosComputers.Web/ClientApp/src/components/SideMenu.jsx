import * as React from 'react';
import { Menu } from 'antd';

const SideMenu = (props) => (
    <Menu style={{width: "100%", height: "100%"}} mode="inline" theme="dark">
        <Menu.Item key="Cases">Cases</Menu.Item>
        <Menu.Item key="Coolers">Coolers</Menu.Item>
        <Menu.Item key="Discs">Discs</Menu.Item>
        <Menu.Item key="GraphicCards">Graphic Cards</Menu.Item>
        <Menu.Item key="MemoryModules">Memory modules</Menu.Item>
        <Menu.Item key="Motherboards">Motherboards</Menu.Item>
        <Menu.Item key="PowerSupplies">Power supplies</Menu.Item>
        <Menu.Item key="Processors">Processors</Menu.Item>
    </Menu>
);

export default SideMenu;
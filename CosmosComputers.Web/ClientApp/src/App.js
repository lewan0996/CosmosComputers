import React, { Component } from 'react';
import './App.css';
import SideMenu from './components/SideMenu';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';
import Computers from './components/pages/Computers';
import Cases from './components/pages/Cases';
const { Header, Sider, Content } = Layout;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout style={{ height: "100%" }}>
          <Header style={{ backgroundColor: "#FFFFFF" }}>
            <h1 style={{ color: "rgba(0,0,0,0.65)", width: '100%' }}>
              Cosmos Computers
            </h1>
          </Header>
          <Layout style={{ height: "100%" }}>
            <Sider
              style={{ height: "100%" }}
              breakpoint="sm"
              collapsedWidth="0"
            >
              <SideMenu />
            </Sider>
            <Content>
              <Route exact path="/" render={() => <Computers />} />
              <Route path="/Cases" render={() => <Cases />} />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;

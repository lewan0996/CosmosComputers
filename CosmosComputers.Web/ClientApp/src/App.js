import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import SideMenu from './components/SideMenu';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Route  
} from 'react-router-dom';
import Computers from './components/pages/Computers';
import Cases from './components/pages/Cases';
const { Header, Sider, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Layout style={{ height: "100%" }}>
            <Header>
              <h1 style={{ color: 'rgb(255, 255, 255, 0.65)', width: '100%' }}>
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
                <Route exact path="/" Component={Computers} />
                <Route path="/Cases" Component={Cases} />
              </Content>
            </Layout>
          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;

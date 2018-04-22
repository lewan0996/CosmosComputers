import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import SideMenu from './components/SideMenu';
import { Layout } from 'antd';
const { Header, Sider, Content } = Layout;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout style={{height: "100%"}}>
          <Header>
            <h1 style={{ color: 'rgb(255, 255, 255, 0.65)', width: '100%' }}>
              Cosmos Computers
            </h1>
          </Header>
          <Layout style={{height: "100%"}}>
            <Sider 
            style={{height:"100%"}}             
              breakpoint="sm"
              collapsedWidth="0"
            >
              <SideMenu />
            </Sider>
            <Content>
              qweqweqweqweeeeeeeeeasdfasdfadsfsadf
              asdfasdfffffffffffffffffffffffffffff
              asdfasdfffffffffffffffffffffffffffffweqr
              qwetqwettttttttttttttttttttttttttttttttt
              sdfgsdfgsdfgsdfgsdfgsfdgsdfgsdfgsdfgsdfgfsdgsfdg
              AWERSERYSERT
            </Content>
          </Layout>          
        </Layout>
      </div>
    );
  }
}

export default App;

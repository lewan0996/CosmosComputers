import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import SideMenu from './components/SideMenu';
import { Route } from 'react-router-dom';
import Computers from './components/pages/Computers';
import Cases from './components/pages/Cases';
import { Sidebar, Segment } from 'semantic-ui-react';
import * as ApiServices from './services/ApiServices';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar.Pushable as={Segment}style={{border: "none", borderRadius: 0}}>
          <SideMenu color="blue" />
          <Sidebar.Pusher style={{padding: 50, paddingRight: 200, backgroundColor:"rgba(0,0,0,0.7)"}}> {/*150 - menu width*/}
            <Route exact path="/" render={() => <Computers />} />
            <Route path="/Cases" render={async () => <Cases data={await ApiServices.getAll("Cases")} />} />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default App;

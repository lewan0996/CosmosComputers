import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import SideMenu from './components/SideMenu';
import { Route } from 'react-router-dom';
import Computers from './components/pages/Computers';
import Cases from './components/pages/Cases';
import { Grid } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid style={{height: "100%"}}>          
          <Grid.Row columns={2} style={{height: "100%"}}>
            <Grid.Column width={4}>
              <SideMenu color="blue"/>
            </Grid.Column>
            <Grid.Column width={12} stretched>
              <Route exact path="/" render={() => <Computers />} />
              <Route path="/Cases" render={() => <Cases />} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;

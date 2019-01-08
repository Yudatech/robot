import React, { Component } from 'react';
import {Provider } from 'mobx-react';

import './App.css';
import {Container, Row, Col, Form } from 'reactstrap';
import InputComp from './components/Input';
import RobotStore from './stores/RobotStore';

const robotStore = new RobotStore();

class App extends Component {
  render() {
    return (
      <Provider robotStore = {robotStore}>
     
      <div className="App">
        <Container fluid={true} className="robot">
        
          <h1> Robot</h1>
        
          <Row className="input-map-area"> 
            <Col xs="12" md="4">

              <Form> 
                <p>Drow your own room by choosing shapes!</p>
                <InputComp/>
                
              </Form>
            </Col>
            <Col xs="12" md="8">
            
            </Col>
          
            </Row>
        </Container>
      
      </div>
      </Provider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {Provider } from 'mobx-react';

import './App.css';
import {Container, Row, Col } from 'reactstrap';
import InputComp from './components/Input';
import {robotStore} from './stores/RobotStore';
import {roomStore} from './stores/RoomStore'
import Map from './components/Map';


class App extends Component {
  render() {
    return (
      <Provider robotStore = {robotStore} roomStore={roomStore} >
      <div className="App">
        <Container fluid={true} className="robot">
          <h1> Robot Go!</h1>
          <Row className="input-map-area"> 
            <Col xs="12" md="4">
                <InputComp/>
            </Col>
            <Col xs="12" md="8">
              <Map></Map>
            </Col>
          
            </Row>
        </Container>
      </div>
      </Provider>
    );
  }
}

export default App;

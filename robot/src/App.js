import React, { Component } from 'react';
import './App.css';
import {Container, Row, Col, Form } from 'reactstrap';
import Input from './components/Input';
import RoomStore from './stores/room-store';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container fluid={true} className="robot">
        
          <h1> Robot</h1>
        
          <Row className="input-map-area"> 
            <Col xs="12" md="4">

              <Form> 
                <p>Drow your own room by choosing shapes!</p>
                <Input/>
                
              </Form>
            </Col>
            <Col xs="12" md="8">
            
            </Col>
          
            </Row>
        </Container>
      
      </div>
    );
  }
}

export default App;

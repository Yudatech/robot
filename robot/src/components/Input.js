import React, { Component } from 'react';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col, Label, Input } from 'reactstrap';
import {inject, observer } from 'mobx-react';



import '../css/style.css';

@inject ("robotStore") @observer class InputComp extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  setShape(shape){
    this.props.robotStore.setShape(shape);
  
  }


  render() {
    const store= this.props.robotStore;
    return (
      <div className="Input">
      <Row>
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            Shapes
          </DropdownToggle >
          <DropdownMenu className="p-0" tag="div">
            <DropdownItem tag="li" onClick={()=>this.setShape("square")}>Square</DropdownItem>
            <DropdownItem tag="li" onClick={()=>this.setShape("circular")}>Circular</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        </Row>
        <Row>
         {store.roomShape ? 
          store.roomShape === "square" ? 
           <Label for="r-number">Length </Label> 
          : 
           <Label for="r-number">Radius</Label>
          :
          <Label for="r-number">Please choose room shape.</Label>
          }
          
          <Input type="r-number" name="r-number" id="r-number" placeholder="Please enter a positive integer." />
        
       
        </Row>
       
        
         
        
      </div>
    );
  }
}

export default InputComp;


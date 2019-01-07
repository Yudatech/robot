import React, { Component } from 'react';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {inject, observer } from 'mobx-react';
import RoomStore from '../stores/room-store';


import '../css/style.css';

 export default @inject ('RoomStore') @observer class Input extends Component {
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

  setSquare(){

  }


  render() {
    return (
      <div className="Input">
       <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            Shapes
          </DropdownToggle >
          <DropdownMenu className="p-0" tag="div">
            <DropdownItem tag="li" onClick={this.setShape("square")}>Square</DropdownItem>
            <DropdownItem tag="li" >Circular</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        
      </div>
    );
  }
}


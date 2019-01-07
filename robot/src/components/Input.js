import React, { Component } from 'react';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import '../css/style.css';

export default class Input extends Component {
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


  render() {
    return (
      <div className="Input">
       <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            shapes
          </DropdownToggle >
          <DropdownMenu className="p-0" tag="div">
            <DropdownItem className="px-3 py-2 btn-li" tag="li" >Settings</DropdownItem>
            <DropdownItem className="px-3 py-2 btn-li" tag="li" >Logout</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        
      </div>
    );
  }
}


import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col, Label, Input , Button, ButtonGroup, Form} from 'reactstrap';
import {inject, observer } from 'mobx-react';



import '../css/style.css';



@inject ("robotStore") @observer class InputComp extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      inputChecked: true,
      isEnglish: true,
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  toggleLanguages(){
    this.setState(prevState => ({
      isEnglish: !prevState.isEnglish
    }));
  }

  setShape(shape){
    this.props.robotStore.setShape(shape);
  
  }


  renderMap(){

    // set length or radius
    var val =  ReactDOM.findDOMNode(this.refs.rField).value;
  
    if(val>=0 ){
      if( Number.isInteger(val/1)){
        this.setState(() => ({
          inputChecked: true
        }));
        this.props.robotStore.setR(val/1);
        
      }else{
        this.setState(() => ({
          inputChecked: false
        }));
      }
    }else{
      this.setState(() => ({
        inputChecked: false
      }));
    }

    //set start position

    let x = ReactDOM.findDOMNode(this.refs.xField).value/1;
    let y = ReactDOM.findDOMNode(this.refs.yField).value/1;
    
    if(x && y){
      this.props.robotStore.setStartPosition(x,y);
    }

    //set commands

    let commandString = ReactDOM.findDOMNode(this.refs.commandsField).value.toLowerCase();
    let commandSteps = commandString.split('');

    if(this.state.isEnglish){
      let interval =  setInterval(()=>{
        if(commandSteps.length === 0){
          clearInterval(interval);
          return;
        }

        let c = commandSteps.shift();
        if(c!=="f" && c!=="l" && c!=="r"){
          console.log("check your command!");
          return;
        }else{
          this.props.robotStore.turnTo(c);
        }
      }, 500);
      
      // commandSteps.forEach(c=>{
      //   if(c!=="f" && c!=="l" && c!=="r"){
      //     console.log("check your command!");
      //     return;
      //   }else{
          
      //     ()=>this.props.robotStore.turnTo(c),500);
      //   }
      // })
      
    }
  }




  render() {
    const store= this.props.robotStore;
    return (
      <div className="Input">

      {this.state.isEnglish ? 
      <div>
       <Button color="primary" onClick={()=>this.toggleLanguages()}>English</Button>
    
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
          <Label for="r-number">Please choose your room shape.</Label>
          }
          
          <Input ref="rField" type="number" name="r-number" id="r-number" placeholder="Please enter a positive integer."  />
         
          
          {this.state.inputChecked ? <p></p> : <p className="text-danger">Positive integers only!</p>}

          <Label for="xField">Configure start position:</Label> 
          <Label for="yField" className="d-none">Configure start position:</Label> 
          <Row>
            <Col>
            <Input ref="xField" type="number" name="xField" id="xField" placeholder="x axis" />  
            </Col>
            <Col>
          <Input ref="yField" type="number" name="yField" id="yField" placeholder="y axis" /> 
          </Col> 
          </Row> 
            
          <Label for="commandsField">The robot moves in the room by interpreting a string of commands:</Label>
          
          <p>L - Turn left R - Turn right F - Move forward</p>
          <Input ref="commandsField" type="text" name="commandsField" id="commandsField" placeholder="Example:  LFFRFRFRFF "  />
       
        </Row>
        <Button onClick={()=>this.renderMap()}>Start</Button>
     
          <p>You can also control your robot by steps</p>
         
    <ButtonGroup>
        <Button onClick={()=>store.turnTo("l")}>L</Button>
        <Button onClick={()=>store.moveForward()}>F</Button>
        <Button onClick={()=>store.turnTo("r")}>R</Button>
      </ButtonGroup>

     </div>
       :
       <div>
       
       <Button color="primary" onClick={()=>this.toggleLanguages()}>Svenska</Button>
       <Row>
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            Form
          </DropdownToggle >
          <DropdownMenu className="p-0" tag="div">
            <DropdownItem tag="li" onClick={()=>this.setShape("square")}>Fyrkant</DropdownItem>
            <DropdownItem tag="li" onClick={()=>this.setShape("circular")}>Cirkulär</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        </Row>

        <Row>
         {store.roomShape ? 
          store.roomShape === "square" ? 
           <Label for="r-number">Längd </Label> 
          : 
           <Label for="r-number">Radiu</Label>
          :
          <Label for="r-number">Välj din rumsform.</Label>
          }
          
          <Input ref="rField" type="number" name="r-number" id="r-number" placeholder="Please enter a positive integer and press Enter key." onKeyDown ={(e)=>this.handleNewRKeyDown(e)} />
          {this.state.inputChecked ? <p></p> : <p className="text-danger">Positiva heltal, tack!</p>}
          
          <Label for="commandsField">Roboten rör sig i rummet genom att tolka en rad kommandon:</Label>
          <p>V - Till vänster H - Till höger G - Gå framåt</p>
          <Input ref="commandsField" type="text" name="commandsField" id="commandsField" placeholder="Example: VGGHGHGHGG " onKeyDown ={(e)=>this.handleNewCommandsKeyDown(e)} />
       
        </Row>
          <p>
          Du kan också styra din robot med steg
          </p>
    <ButtonGroup>
        <Button>V</Button>
        <Button>G</Button>
        <Button>H</Button>
      </ButtonGroup>
        
       </div>
      }
  
       
        
         
        
      </div>
    );
  }
}

export default InputComp;


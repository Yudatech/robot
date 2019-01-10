import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {inject, observer } from 'mobx-react';
import {Row, Col, Label, Input , Button, ButtonGroup} from 'reactstrap';
import {FaArrowRight, FaArrowUp, FaArrowLeft} from 'react-icons/fa';
@inject ("robotStore", "roomStore") @observer class InputComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputChecked: true,
      commandChecked: true,
      cmdInput:'',
    };
  }

  setShape(shape){
    this.props.roomStore.setShape(shape);
  }

  handleCmdChange=(e)=>{
    let ref=[];
    //input English commands only valid for 'l'/'L', 'r'/'R', 'f'/'F'
    //input Swedish commands only valid for 'v'/'V', 'h'/'H', 'g'/'G'
    this.props.robotStore.isEnglish? ref=['l', 'r', 'f'] : ref = ['v','h','g'];
      let val = e.target.value;
      this.setState(() => ({
        cmdInput: val
      }), () => {
        let cmdArray = this.state.cmdInput.toLowerCase().split('');

        let uniqCmd = cmdArray.filter((item, pos)=>{
          return cmdArray.indexOf(item) ===pos
        });
        uniqCmd = uniqCmd.filter((item)=>{
          return !ref.includes(item);
        })
        
        if (uniqCmd.length > 0) {
          this.setState(() => ({
            commandChecked: false,
          }));
          return;
        } else {
          this.setState(() => ({
            commandChecked: true,
          }));
        }
      });
}


  

  renderMap(){
    // set length or radius
    var val =  ReactDOM.findDOMNode(this.refs.rField).value;
  
    if(val>=0 ){
      if( Number.isInteger(val/1)){
        this.setState(() => ({
          inputChecked: true
        }));
        this.props.roomStore.setR(val/1);
        
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

    let cmdArray = this.state.cmdInput.toLowerCase().split('');

    if(cmdArray.length>0){
      let interval =  setInterval(()=>{
        if(cmdArray.length === 0){
          clearInterval(interval);
          return;
        }else{
          this.props.robotStore.turnTo(cmdArray.shift());
        }
      
      }, 500);
    }
      
      
 
      
    
  }




  render() {
    const roomStore= this.props.roomStore;
    const robotStore = this.props.robotStore;
    return (
      <div className="Input">

     
      
       
       <Row>
        <p>Please choose your room shape.</p>
       <ButtonGroup>
          <Button onClick={()=>this.setShape("square")}>Square</Button>
          <Button onClick={()=>this.setShape("circular")}>Circular</Button>
       </ButtonGroup>
      
        </Row>
        <Row>
         {roomStore.roomShape ? 
          roomStore.roomShape === "square" ? 
           <Label for="r-number">Set your square room with a length of:</Label> 
          : 
           <Label for="r-number">Set your circular room with a radius of:</Label>
          :
          <Label for="r-number">Set your room size:</Label>
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
            
         

          {this.props.robotStore.isEnglish ? 
          <div>
             <Label for="commandsField">The robot moves in the room by interpreting a string of commands:</Label>
            <Button color="primary" onClick={()=>this.props.robotStore.toggleLanguages()}>English</Button>
            <p>L - Turn left R - Turn right F - Move forward</p>
          <Input ref="commandsField" type="text" name="commandsField" id="commandsField" placeholder="Example:  LFFRFRFRFF " value={this.state.cmdInput} onChange={this.handleCmdChange}  />
          </div>
              :
          <div>
            <Label for="commandsFieldSV">The robot moves in the room by interpreting a string of commands:</Label>
            <Button color="primary" onClick={()=>this.props.robotStore.toggleLanguages()}>Svenska</Button>
            <p>V - Turn left H - Turn right G - Move forward</p>
          <Input ref="commandsFieldSV" type="text" name="commandsFieldSV" id="commandsFieldSV" placeholder="Example:  VGGHGHGHGG " value={this.state.cmdInput} onChange={this.handleCmdChange} />
          </div>
          }
           {this.state.commandChecked ? <p></p> : <p className="text-danger">Command is not valid.</p>}
          
        </Row>
        <Button onClick={()=>this.renderMap()}>Start</Button>
     
          <p>You can also control your robot by steps</p>
         
      <ButtonGroup>
        <Button onClick={()=>robotStore.turnTo("l")}><FaArrowLeft /></Button>
        <Button onClick={()=>robotStore.moveForward()}><FaArrowUp /></Button>
        <Button onClick={()=>robotStore.turnTo("r")}><FaArrowRight /></Button>
      </ButtonGroup>
      
      </div>
    );
  }
}

export default InputComp;


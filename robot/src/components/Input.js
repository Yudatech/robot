import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {inject, observer} from 'mobx-react';
import {
  Form,
  Row,
  Col,
  Label,
  Input,
  Button,
  ButtonGroup
} from 'reactstrap';
import {checkWithinRange} from '../utils';
import {FaArrowRight, FaArrowUp, FaArrowLeft} from 'react-icons/fa';
import '../css/input.css';

/*
* Summary.  Input class is used to generate a control panel for configurations and user actions 
*/
@inject("robotStore", "roomStore")@observer class InputComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rChecked: true,
      inputChecked: true,
      commandChecked: true,
      coordChecked: true,
      isStartCoordValid: true,
      cmdInput: '',
      xInput: '',
      yInput: '',
      readyToGo: true,
    };
  }

  setShape(shape) {
    this.props.robotStore.resetDefaultStates();
    ReactDOM.findDOMNode(this.refs.xField).value = "";
    ReactDOM.findDOMNode(this.refs.yField).value = "";
    this.setState(()=>({cmdInput:"", isStartCoordValid: true}));
    this
      .props
      .roomStore
      .setShape(shape);
  }

  /*
   *  @fires {state}    inputChecked    Tell the UI to show warning or not
   *  @fires {store}    r    set room size
   */
  handleRChange = () => {
    var r = ReactDOM
      .findDOMNode(this.refs.rField)
      .value / 1;
    if (r >= 0) {
      if (Number.isInteger(r)) {
        this.setState(() => ({inputChecked: true}));
        this
          .props
          .roomStore
          .setR(r);
      } else {
        this.setState(() => ({inputChecked: false}));
      }
    } else {
      this.setState(() => ({inputChecked: false}));
    }
  }

  /*
   *  @fires {state}    coordChecked    Tell the UI to show warning or not
   *  @fires {store}    coordinates    set robot start position
   */

  handleCoordChange = () => {
    let x = ReactDOM
      .findDOMNode(this.refs.xField)
      .value / 1;
    this.setState(()=>({xInput:x}));

    let y = ReactDOM
      .findDOMNode(this.refs.yField)
      .value / 1;
      this.setState(()=>({yInput:y}));

    if ((x!=="" && y!=="") || (x==="" && y==="")) {
      // coordinates values only accept integers
      if (Number.isInteger(x) && Number.isInteger(y)) {
        let check = this
        .props
        .robotStore
        .setStartPosition(x, y);
        this.setState(() => ({coordChecked: true, isStartCoordValid: check}));
        
      } else {
        this.setState(() => ({coordChecked: false}));
      }
    }

  }
  
  toggleLanguages(){
    this.props.robotStore.toggleLanguages();
    this.setState(()=>({cmdInput : "", commandChecked: true}));
    console.log(ReactDOM.findDOMNode(this.refs.commandsField).value)
  }

  /*
   *  @param {event}    e   change events on Commmand Input Element
   *  @fires {state}    commandChecked    Tell the UI to show warning or not
   */
  handleCmdChange = (e) => {
    // input English commands only valid for 'l'/'L', 'r'/'R', 'f'/'F' input Swedish
    // commands only valid for 'v'/'V', 'h'/'H', 'g'/'G'
    let val = e.target.value;
    this.setState(() => ({cmdInput: val}));

    let regEx = this.props.robotStore.isEnglish
      ? /((?![flr]).)/gi
      : /((?![vhg]).)/gi;

    let result = val.match(regEx);
    // once result is not null, means input commands contains invalid chars
    if (result) {
      this.setState(() => ({commandChecked: false}));
    } else {
      this.setState(() => ({commandChecked: true}));
    }
  }

  /*
   *  @fires {state}    rChecked   check if room size set before start
   *  @fires {state}    isStartCoordValid    check if start position on the map
   *  @param {array}    [let]    cmdArray   transfer commands string to array 
   *
   */

  renderMap() {
    const {inputChecked, commandChecked, coordChecked, isStartCoordValid, xInput, yInput} = this.state;
    let r = ReactDOM.findDOMNode(this.refs.rField).value;
    if (r) {
      this.setState(() => ({rChecked: true}));
    } else {
      this.setState(() => ({rChecked: false}));
    }
    let check= checkWithinRange(xInput, yInput, this.props.roomStore.r);
    this.setState(()=>({
      isStartCoordValid: check
    }))
    //check if room size set, input(r, coord, command) values valid, start coord inside room 
    if (r && inputChecked && commandChecked && coordChecked && isStartCoordValid) {
      this.setState(()=>({readyToGo: true}));
      //set commands, make move, turning, intrval
      let cmdArray = this
        .state
        .cmdInput
        .toLowerCase()
        .split('');

      if (cmdArray.length > 0) {
        let interval = setInterval(() => {
          if (cmdArray.length === 0) {
            clearInterval(interval);
            return;
          } else {
            this
              .props
              .robotStore
              .turnTo(cmdArray.shift());
          }

        }, 500);
      }
    } else {
      this.setState(()=>({readyToGo: false}))
      return;
    }

  }

  render() {
    const roomStore = this.props.roomStore;
    const robotStore = this.props.robotStore;
    return (
      <Form className="Input">

        <Row>
          <p style={{width:"100%", fontSize: "26px"}}>Please choose your room shape.</p>
          <ButtonGroup style={{marginTop:"20px", marginLeft:"20%", width:"60%"}}>
            <Button onClick={() => this.setShape("square")} className={roomStore.roomShape === "square" ? "active" : ""} >Square</Button>
            <Button onClick={() => this.setShape("circular")} className={roomStore.roomShape === "circular" ? "active" : ""}>Circular</Button>
          </ButtonGroup>

        </Row>
        <Row style={{margin: "20px"}}>
          {roomStore.roomShape
            ? roomStore.roomShape === "square"
              ? <Label for="r-number">Set your square room with a length of:</Label>
              : <Label for="r-number">Set your circular room with a radius of:</Label>
            : <Label for="r-number">Set your room size:</Label>
          }
          {this.state.rChecked
            ? <p></p>
            : <p className="text-danger" style={{marginBottom:"10px"}}>Don't forget to set room size!</p>}
          <Input
            ref="rField"
            type="number"
            name="r-number"
            id="r-number"
            placeholder="Please enter a positive integer."
            onChange={this.handleRChange}
            required/> {this.state.inputChecked
            ? <p></p>
            : <p className="text-danger">Positive integers only!</p>}

          <Label for="xField" style={{marginTop:"20px"}}>Configure start position: </Label>  
          <Label for="yField" className="d-none">Configure start position:
          </Label>
          {this.state.coordChecked
            ? <p></p>
            : <p style={{marginTop:"20px",marginBottom:"10px", marginLeft:"20px"}} className="text-danger">  Integers only!</p>}
          {this.state.isStartCoordValid 
            ? <p></p>
            : <p className="text-danger" style={{marginBottom: "10px"}}>Invalid coordinates! Your robot is outside of your room!</p>
          }
          <Row>

            <Col>
              <Input
                ref="xField"
                type="number"
                name="xField"
                id="xField"
                placeholder="x axis"
                onChange={this.handleCoordChange}
                />
            </Col>
            <Col>
              <Input
                ref="yField"
                type="number"
                name="yField"
                id="yField"
                placeholder="y axis"
                onChange={this.handleCoordChange}/>
            </Col>
          </Row>

          {this.props.robotStore.isEnglish
            ? <div>
                <Label for="commandsField" style={{textAlign:"left", marginTop:"20px"}}>The robot moves in the room by interpreting a string of commands:</Label>
               <span> <Button className="active float-left" onClick={() => this.toggleLanguages()} >English commands</Button></span> 
                <span style={{marginTop:"20px", fontStyle: "italic"}}>L - Turn left R - Turn right F - Move forward</span>
                {this.state.commandChecked
                  ? <p></p>
                  : <p className="text-danger">Command is not valid, only "l", "r", "f" or "L", "R", "F" is allowed.</p>}
               
              </div>
            : <div>
              <Label for="commandsField" style={{textAlign:"left", marginTop:"20px"}}>The robot moves in the room by interpreting a string of commands:</Label>
              <span><Button className="active float-left" onClick={() => this.toggleLanguages()}>Svenska commands</Button></span>
              <span style={{marginTop:"20px", fontStyle: "italic"}}>V - Turn left H - Turn right G - Move forward</span>
              {this.state.commandChecked
                ? <p></p>
                : <p className="text-danger">Command is not valid, only "v", "h", "g" and "V", "H", "G"</p>}
           
            </div>}
                <Input
                  ref="commandsField"
                  type="text"
                  name="commandsField"
                  id="commandsField"
                  value={this.state.cmdInput}
                  onChange={this.handleCmdChange}/>
        </Row>
        <Row>
          <Button className="active" style={{marginTop: "20px", width:"30%", marginLeft:"35%"}} onClick={() => this.renderMap()}>Start</Button>
          </Row>
        
        {/* Button control not allowed when r is not set */}
        {this.props.roomStore.r ?  
        <div>
          <p className="float-left" style={{marginTop: "20px", marginLeft:"20px"}}>You can also control your robot by steps:</p>
          <ButtonGroup style={{width:"40%"}}>
            <Button className="direc" onClick={() => robotStore.turnTo("l")}><FaArrowLeft/></Button>
            <Button className="direc" onClick={() => robotStore.moveForward()}><FaArrowUp/></Button>
            <Button className="direc" onClick={() => robotStore.turnTo("r")}><FaArrowRight/></Button>
          </ButtonGroup>
        </div>
        :
        <div></div>
        
      }
        
      
      
        

      </Form>
    );
  }
}

export default InputComp;

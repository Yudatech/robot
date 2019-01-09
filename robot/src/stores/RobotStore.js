
import {observable, action} from 'mobx';
import { exists } from 'fs';

export default class RobotStore {
  //room info
  @observable roomShape="";
  @observable r = ""; //length of sides of squares or radius of circulars
  @observable tooBigRoom = false;
    //moves
  @observable coordinates = [0,0];
  @observable direction = 0;
  @observable currentMove = "";
  @observable commandsStep=[];

  @action setShape(shape){
    switch (shape){
      case "square":
        this.roomShape = "square";
        break;
      case "circular":
        this.roomShape = "circular";
        break;
      default:
      this.roomShape = "square";
    }
    
  }

  @action setR(num){
    if(num>0){
      this.r = num;
    }else{
      this.r = 0;
    }
  }

  @action checkRoomSize(tooBig){
    if(tooBig){
      this.tooBigRoom=true;
    }else{
      this.tooBigRoom= false;
    }
  }

  @action setStartPosition(x,y){
    this.coordinates=[x,y];
  
  }

 

  @action turnTo(direc){
    
    switch(direc){
      case "l":
        this.direction = (this.direction + 1) % 4;
        this.commandsStep.push({
          command: "L",
          result: true
        });
        break;
      case "r":
        this.direction = (this.direction + 3) % 4;
        this.commandsStep.push({
          command: "R",
          result: true
        });
        break;
      case "f":
        this.moveForward();
        break;
      default:
        break;
    }
  
  }

  @action moveForward(){
    
      const pos_x= this.coordinates[0];
      const pos_y = this.coordinates[1];
      const direct = this.direction;
      const r = this.r;
  
      let newPos = {
        x: pos_x,
        y: pos_y
      };
  
      switch(direct){
        case 0: 
        newPos = {
            x: pos_x,
            y: pos_y + 1
          };
          break;
  
          case 1: 
          newPos = {
            x: pos_x -1,
            y: pos_y
          };
          break;
  
          case 2: 
          newPos = {
            x: pos_x,
            y: pos_y - 1
          };
          break;
  
          case 3: 
          newPos = {
            x: pos_x +1,
            y: pos_y
          };
          break;
  
          default:
          break;
      }

      if(this.roomShape ==="circular"){
        if((newPos.x*newPos.x+newPos.y*newPos.y)>(r*r*1.1)){
          this.coordinates= [pos_x, pos_y];
          this.commandsStep.push({
            command: "F",
            result: false
          });
        }else{
          this.coordinates = [newPos.x, newPos.y];
          this.commandsStep.push({
            command: "F",
            result: true
          });
        }
      }else{
        if(newPos.x>=r || newPos.y>=r || newPos.x<0 || newPos.y<0){
          this.coordinates= [pos_x, pos_y];
          this.commandsStep.push({
            command: "F",
            result: false
          });
        }else{
          this.coordinates = [newPos.x, newPos.y];
          this.commandsStep.push({
            command: "F",
            result: true
          });
        }
      }

  
      
    
  }
}

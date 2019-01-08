
import {observable, action } from 'mobx';

export default class RobotStore {
  //room info
  @observable shape="";
  @observable r = ""; //length of sides of squares or radius of circulars
  //moves

  @action setShape(shape){
    switch (shape){
      case "square":
        this.roomShape = "square";
        break;
      case "circular":
        this.roomShape = "circular";
        break;
      default:
        console.log("shape err");
    }
    
  }

  @action setR(num){
    if(num>0){
      this.r = num;
    }else{
      this.r = 0;
    }
  }
}

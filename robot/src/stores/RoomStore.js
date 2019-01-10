  //manage room info

import {observable, action} from 'mobx';


 class RoomStore {
    @observable roomShape="";
    @observable r = ""; //length of sides of squares or radius of circulars

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
  
   
  
}

export const roomStore = new RoomStore();
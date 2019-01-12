import {observable, action} from 'mobx';
import {roomStore} from './RoomStore';
import {checkWithinRange} from '../utils';
class RobotStore {
  //moves
  @observable coordinates = [0, 0];
  @observable direction = 0;
  @observable currentMove = "";
  @observable isEnglish = true;
  @observable commandsStep = [];
  @observable amIstuck = false;

  @action resetDefaultStates(){
    this.coordinates = [0, 0];
    this.direction = 0; 
    this.commandsStep = [];
  }

  @action toggleLanguages() {
    this.isEnglish = !this.isEnglish;
  }

  @action setStartPosition(x, y) {
    this.coordinates = [x, y];
    if (roomStore.roomShape === "circular") {
      return checkWithinRange(x, y, roomStore.r);
    } else {
      if (x > roomStore.r || y > roomStore.r || x < 0 || y < 0) {
        return false;
      } else {
        return true;
      }
    }

  }
 
  // set direction by number N = 0, W = 1, S = 2, E = 3
  // turn left direction +1, turn right direction + 3
  @action turnTo(direc) {
    switch (direc) {
      case "l":
      case "v":
        this.direction = (this.direction + 1) % 4;
        this.isEnglish
          ? this
            .commandsStep
            .push({command: "L", result: true})
          : this
            .commandsStep
            .push({command: "V", result: true});
        break;
      case "r":
      case "h":
        this.direction = (this.direction + 3) % 4;
        this.isEnglish
          ? this
            .commandsStep
            .push({command: "R", result: true})
          : this
            .commandsStep
            .push({command: "H", result: true});
        break;
      case "f":
      case "g":
        this.moveForward();
        break;
      default:
        break;
    }
  }

  // robot supose appear at newPos after each move forward.
  // if newPos still inside room, robot move to newPos
  // if newPos shows outside room, robot stay at old position.
  @action moveForward() {
    const pos_x = this.coordinates[0];
    const pos_y = this.coordinates[1];
    const direct = this.direction;
    const r = roomStore.r;

    let newPos = {
      x: pos_x,
      y: pos_y
    };

    switch (direct) {
      case 0:
        newPos = {
          x: pos_x,
          y: pos_y + 1
        };
        break;
      case 1:
        newPos = {
          x: pos_x - 1,
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
          x: pos_x + 1,
          y: pos_y
        };
        break;
      default:
        break;
    }
    if (roomStore.roomShape === "circular") {
      if (checkWithinRange(newPos.x, newPos.y, r)) {

        this.coordinates = [newPos.x, newPos.y];
        this.isEnglish
          ? this
            .commandsStep
            .push({command: "F", result: true})
          : this
            .commandsStep
            .push({command: "G", result: true});
        this.amIstuck = false;
      } else {

        this.coordinates = [pos_x, pos_y];
        this.isEnglish
          ? this
            .commandsStep
            .push({command: "F", result: false})
          : this
            .commandsStep
            .push({command: "G", result: false});
        this.amIstuck = true;

      }
    } else {
      if (newPos.x >= r || newPos.y >= r || newPos.x < 0 || newPos.y < 0) {
        this.coordinates = [pos_x, pos_y];
        this.isEnglish
        ? this
          .commandsStep
          .push({command: "F", result: false})
        : this
          .commandsStep
          .push({command: "G", result: false});
        this.amIstuck = true;
      } else {
        this.coordinates = [newPos.x, newPos.y];
        this.isEnglish
        ? this
          .commandsStep
          .push({command: "F", result: true})
        : this
          .commandsStep
          .push({command: "G", result: true});
        this.amIstuck = false;
      }
    }

  }
}

export const robotStore = new RobotStore();

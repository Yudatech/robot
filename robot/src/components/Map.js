import React, {Component} from 'react';
import '../css/map.css';
import {inject, observer} from 'mobx-react';
import {FaAndroid} from 'react-icons/fa';
import {toDirection} from '../utils';
import {checkWithinRange} from '../utils';
import {toJS} from 'mobx';

@inject("robotStore", "roomStore")@observer class Map extends Component {

  /*
   * param   {array}  [let]   map   Drow room and robot with div
   * param   {number}  let    cellWidth   Control the minum size of each <div>, which shows on the map
   * param   {array}  [let]   row   Drow room row by row with alternative color and robot
   */

  createMap = () => {
    const pos_x = toJS(this.props.robotStore.coordinates)[0];
    const pos_y = toJS(this.props.robotStore.coordinates)[1];
    const direct = toJS(this.props.robotStore.direction);
    const shape = toJS(this.props.roomStore.roomShape);

    let map = [];

    if (!this.props.roomStore) {
      return <div>Empty</div>;
    }

    const r = this.props.roomStore.r;

    let cellWidth = 0;

    if (r > 0) {
      if (shape === "circular") {
        cellWidth = Math.floor(500 / (2 * r + 1));

        if (cellWidth <= 20) {
          return (
            <p className="text-warning">Too big room! I'll not show you my map, but you can find my position here!</p>
          );
        }
        for (let i = r; i >= -r; i--) {
          let row = [];

          for (let j = -r; j <= r; j++) {
            const color = i % 2 === 0
              ? (j % 2 === 0
                ? 'black'
                : 'white')
              : (j % 2 === 0
                ? 'white'
                : 'black');
            if (pos_x === j && pos_y === i) {
              row.push(
                <div
                  className={`cell ${color}`}
                  style={{
                  width: `${cellWidth}px`,
                  height: `${cellWidth}px`
                }}
                  row={i}
                  col={j}
                  key={j}><FaAndroid
                  style={{
                  fontSize: `${cellWidth - 4}px`,
                  margin: 0
                }}
                  className={`${toDirection(direct)} robot`}/></div>
              );
            } else if (checkWithinRange(i, j, r)) {
              row.push(
                <div
                  className={`cell ${color}`}
                  style={{
                  width: `${cellWidth}px`,
                  height: `${cellWidth}px`
                }}
                  row={i}
                  col={j}
                  key={j}></div>
              );
            } else {
              row.push(
                <div
                  style={{
                  width: `${cellWidth}px`,
                  height: `${cellWidth}px`,
                  backgroundColor: "white"
                }}
                  row={i}
                  col={j}
                  key={j}></div>
              );
            }
          }
          map.push(
            <div className="row" key={i}>{row}</div>
          );
        }
      } else {

        cellWidth = Math.floor(500 / r);

        if (cellWidth <= 20) {
          return (
            <p className="text-warning">Too big room! I'll not show you my map, but you can find my position here!</p>
          );
        }
        for (let i = r - 1; i >= 0; i--) {
          let row = [];

          for (let j = 0; j < r; j++) {
            const color = i % 2 === 0
              ? (j % 2 === 0
                ? 'black'
                : 'white')
              : (j % 2 === 0
                ? 'white'
                : 'black');
            if (pos_x === j && pos_y === i) {
              row.push(
                <div
                  className={`cell ${color}`}
                  style={{
                  width: `${cellWidth}px`,
                  height: `${cellWidth}px`
                }}
                  row={i}
                  col={j}
                  key={j}><FaAndroid
                  style={{
                  fontSize: `${cellWidth - 4}px`,
                  margin: 0
                }}
                  className={`${toDirection(direct)} robot`}/></div>
              );
            } else {
              row.push(
                <div
                  className={`cell ${color}`}
                  style={{
                  width: `${cellWidth}px`,
                  height: `${cellWidth}px`
                }}
                  row={i}
                  col={j}
                  key={j}></div>
              );
            }
          }
          map.push(
            <div className="row" key={i}>{row}</div>
          );
        }
      }

      return map;
    }
  }

  render() {
    const x = this.props.robotStore.coordinates[0];
    const y = this.props.robotStore.coordinates[1];
    const step = this.props.robotStore.commandsStep;
    const stuck = this.props.robotStore.amIstuck;
    return (

      <div className="map">
        {this.createMap()}
        {/* Robot will stuck at the edge if given command leads robot outside of the room, and commend step shows red */}
        {stuck ? <p className="text-warning">Help me! I'm stuck here! Can't move forword anymore!</p> : <p></p>}
        <div style={{maxWidth: "100%", flexWrap: "wrap", display: "flex"}}>{step.map((s, i) => {
          return (s.result
            ? <div key={i}>{s.command}</div>
            : <div key={i} style={{
              color: 'red'
            }}>{s.command}</div>)
        })}
        </div>
        <div style={{marginTop: "20px"}}>
          <FaAndroid
            style={{
            margin: '0px',
            pedding: '0px',
            color: "orange"
          }}
            className="robot"/>
          My position: ({x}, {y}) {toDirection(this.props.robotStore.direction)}</div>
      </div>
    );
  }

}

export default Map;
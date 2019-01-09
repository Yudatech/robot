import React, { Component } from 'react';
import '../css/map.css';
import {inject, observer } from 'mobx-react';
import {FaAndroid} from 'react-icons/fa';
import {toDirection} from '../utils';
import {toJS} from 'mobx';

@inject ("robotStore") @observer class Map extends Component {
 
 

  createMap = ()=>{
    const pos_x= toJS(this.props.robotStore.coordinates)[0];
    const pos_y = toJS(this.props.robotStore.coordinates)[1];
    const direct = toJS(this.props.robotStore.direction);
    const shape = toJS(this.props.robotStore.roomShape);

    let map = [];

    if(!this.props.robotStore){
      return <div>Empty</div>;
    }

    const r = this.props.robotStore.r;

    let cellWidth=0;

    if(r>0){
       if(shape==="circular"){
        cellWidth= Math.floor(500/(2*r+1));

        if(cellWidth<=20){
          return (<p  className="text-warning">Too big room! I'll not show you my map, but you can find my position here!</p>); 
        }
         for (let i = r; i>=-r; i--){
          //j= r-1; j>-r; j--
           let row =[];

           for (let j= -r; j<=r; j++){
            //i = -r+1; i<r; i++
             const color =i%2 === 0 ? (j%2 === 0 ? 'black' : 'white') : (j%2 === 0 ? 'white' : 'black');
             if(pos_x===j && pos_y===i){
              row.push(<div className={`cell ${color}`} style={{width: `${cellWidth}px`, height:`${cellWidth}px`}}  row={i} col={j} key={j}><FaAndroid style={{fontSize:`${cellWidth-4}px`, margin:0}} className={`${toDirection(direct)} robot`}/></div>);
            }else if((i*i + j*j)>(r*r*1.1)){
            
          
              row.push(<div style={{width: `${cellWidth}px`, height:`${cellWidth}px`, backgroundColor:"white"}}  row={i} col={j} key={j}></div>);
            }
            else{
            row.push(<div className={`cell ${color}`} style={{width: `${cellWidth}px`, height:`${cellWidth}px`}}  row={i} col={j} key={j}></div>);
            }
           }
           map.push(<div className="row" key={i}>{row}</div>);
         }
       }else{

        cellWidth= Math.floor(500/r);

        if(cellWidth<=20){
          return (<p  className="text-warning">Too big room! I'll not show you my map, but you can find my position here!</p>); 
        }
        for (let i=r-1; i>=0 ; i --){
          let row = [];
          
          for (let j=0; j<r; j++){
            const color = i%2 === 0? (j%2 === 0 ? 'black' : 'white') : (j%2 === 0 ? 'white': 'black');
            if(pos_x===j && pos_y===i){
              row.push(<div className={`cell ${color}`} style={{width: `${cellWidth}px`, height:`${cellWidth}px`}}  row={i} col={j} key={j}><FaAndroid style={{fontSize:`${cellWidth-4}px`, margin:0}} className={`${toDirection(direct)} robot`}/></div>);
            }else{
            row.push(<div className={`cell ${color}`} style={{width: `${cellWidth}px`, height:`${cellWidth}px`}}  row={i} col={j} key={j}></div>);
            }
          }
          map.push(<div className="row" key={i}>{row}</div>);
      }
       }
       
        return map;
      }
    }
  
  render() {
    const x=this.props.robotStore.coordinates[0];
    const y= this.props.robotStore.coordinates[1];
    const step = this.props.robotStore.commandsStep;
    return (
    
      <div className="map">
        {this.createMap()}
          <p>{step.map((s, i)=>{
            return(s.result ? <span key={i}>{s.command}</span> : <span key={i} style={{color: 'red'}}>{s.command}</span>)
          })}</p>
         <p> <FaAndroid style={{margin:'0px', pedding: '0px',color:"orange"}} className="robot"/> My position: ({x}, {y})  {toDirection(this.props.robotStore.direction)}</p>
      </div>
    );
    }
  
}

export default Map;
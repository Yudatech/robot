import React, { Component } from 'react';
import './Map.css';

class Map extends Component {
  render() {
    return (
      <div className="map">
        
        <canvas ref="dots" width={640} height={425}/>
      </div>
    );
  }
}

export default Map;
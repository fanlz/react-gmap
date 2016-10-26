import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { loadJS } from '../utils';

class GMap extends Component{
  constructor(props) {
    super(props);
    this.loadMap = this.loadMap.bind(this);
    this.state = {}
  }

  loadMap() {
    const mapDom = ReactDOM.findDOMNode(this.refs.mjmap);
    this.map = new google.maps.Map(mapDom, {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }

  componentDidMount() {
    const _this = this;
    if(!window.google) {
      loadJS('http://ditu.google.cn/maps/api/js?sensor=false&libraries=geometry')
        .then(_this.loadMap, () => console.log('load false'))
        .catch(() => console.log('load false'))
    }
  }
  render() {
    return (
      <div style={{width: '100%', height: '100%'}} ref="mjmap"></div>
    )
  }
}

export default GMap;

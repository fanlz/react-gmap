import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { isEqual, assign } from 'lodash';
import { loadJS } from '../utils';

class GMap extends Component{
  constructor(props) {
    super(props);
    this.loadMap = this.loadMap.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.renderLines = this.renderLines.bind(this);
    this.renderMakers = this.renderMakers.bind(this);
    this.map = null;
    this.lines = [];
    this.markers = [];    
    this.state = {}

    this.default = {
      lineStyle: {
        strokeColor: '#2ec7fa',
        strokeOpacity: 1.0,
        strokeWeight: 3
      },
      options: {
        center: {
          lat: 39.92, lng: 116.46
        },
        zoom: 4,
        minZoom: 3,
        maxZoom: 18,
        zoomControl: true,
        draggable: true,
        scrollwheel: true,
        scaleControl: true,
        panControl: true,
        mapTypeControl:false,
        streetViewControl: false,
        disableDoubleClickZoom: false
      }
    }
  }

  renderLines() {
    const { lines, lineStyle } = this.props;
    this.lines.forEach((line) => {
      line.setMap(null);
    })
    this.lines = [];
    const lStyle = assign(this.default.lineStyle, lineStyle);
    lines.forEach((l) => {
      let line = new google.maps.Polyline(assign({path:l.coords}, lStyle, l.lineStyle))
    
      this.lines.push(line);
      line.setMap(this.map);
    })
  }

  renderMakers() {
    const { markers } = this.props;
    this.markers.forEach((marker) => {
      marker.remove();
    })
    this.markers = [];
    markers.forEach((marker) => {
      let oMarker = new Marker(this.map, marker);
      this.markers.push(oMarker);
    });
  }

  updateMap() {
    const { posOptions } = this.props;
    
    if(posOptions) {
      let bounds = new google.maps.LatLngBounds();
      posOptions.coords.forEach((line) => {
        bounds.extend(new google.maps.LatLng(line.lat, line.lng));
      });

      // this.map.fitBounds(bounds);
    }

    this.renderLines();
    this.renderMakers();
  }

  componentDidUpdate(prevProps, prevState) {
    if(!isEqual(this.props, prevProps)) {
      this.updateMap();
    } 
  }

  loadMap() {
    const { options, onClick, onDoubleClick } = this.props;
    window.Marker = function(map, marker){
      this.lat = marker.lat;
      this.lng = marker.lng;
      this.html  = marker.content;
      this.setMap(map);
    }

    Marker.prototype = new google.maps.OverlayView();
    Marker.prototype.draw = function(){
      let ele = this.ele;
      if(!ele) {
        ele = this.ele = document.createElement('div');
        ele.style.position = 'absolute';
        ele.style.zIndex = 999;
        ele.innerHTML = this.html

        this.getPanes().overlayImage.appendChild(ele);
      }

      var latlng = new google.maps.LatLng(this.lat, this.lng);
      var pos = this.getProjection().fromLatLngToDivPixel(latlng);
      if(pos) {
        ele.style.left = pos.x + 'px';
        ele.style.top = pos.y + 'px';
      }
    }
    Marker.prototype.remove = function(){
      if(this.ele) {
        this.ele.parentNode.removeChild(this.ele);
        this.ele = null;
      }
      this.setMap(null);
    }

    const mapDom = ReactDOM.findDOMNode(this.refs.mjmap);
    this.map = new google.maps.Map(mapDom, assign(this.default.options, options));
    this.map.addListener('click', function(event) {
       // onClick && onClick(event);
    });
    this.map.addListener('dblclick', function(event) {
       onDoubleClick && onDoubleClick(event);
    });
    this.updateMap();
  }

  componentDidMount() {
    const _this = this;
    if(!window.google) {
      loadJS('http://ditu.google.cn/maps/api/js')
        .then(_this.loadMap, ()=>this.setState({hasGoogle: false}))
        .catch(() => ()=>this.setState({hasGoogle: false}))
    }
  }

  render() {
    return (
      <div style={{width: '100%', height: '100%',backgroundColor:'#ccc'}} ref="mjmap"></div>
    )
  }
}

GMap.propTypes = {
  lines: PropTypes.array,
  markers: PropTypes.array,
  posOptions: PropTypes.object,
  options: PropTypes.object,
  lineStyle: PropTypes.object,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func
}

export default GMap;

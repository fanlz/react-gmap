import React, {Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import GMap from './src/GMap';
import PlaceAutocomplete from './src/PlaceAutocomplete';
import * as utils from './src/utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.mapClick = this.mapClick.bind(this)
    this.mapDoubleClick = this.mapDoubleClick.bind(this)
    this.onPlaceChange = this.onPlaceChange.bind(this)
    this.state = {
      inputValue: 'hhe',
      options: {
        zoomControl: true,
        disableDoubleClickZoom: true
      },
      lineStyle: {
        strokeWeight: 7, 
        strokeColor: '#ccc'
      },
      lines: [{lat: 39.92, lng: 116.46}, 
            {lat: 38.92, lng: 113.22},
            {lat: 39.92, lng: 116.46}, 
            {lat: 44.92, lng: 113.22}],
      markers: [{
          lat:39.92,
          lng:116.46,
          content: '<div class="marker">a</div>'
        },
        {
          lat:38.92,
          lng:116.46,
          content: '<div class="marker">b</div>'
        }
      ]
    };
  }
  mapClick(e) {
    const _this = this;
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    const latLng = utils.latLng(lat, lng);
    this.setState({
      markers: [{lat, lng, content:'<div class="marker">0</div>'}]
    });

    utils.geocode({latLng}, function(results, status) {
      console.log(results, status);
      debugger
    })
  }
  mapDoubleClick(e) {
    this.setState({
      markers: [{lat: e.latLng.lat(), lng: e.latLng.lng(), content:'<div class="marker">0</div>'}]
    })
  }
  onPlaceChange(place) {
    if(place && place.geometry) {
      let lat = place.geometry.location.lat();
      let lng = place.geometry.location.lng();

      this.setState({
        markers: [{lat, lng, content: '<div class="marker">'+place.formatted_address+'</div>'}],
        options: {center: {lat, lng}, zoom: 4}
      })
    } else {
      alert('not found');
    }
  }


  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps() {}
  componentWillUnmount() {}

  render() {
    return (
      <div style={{width: '500px', height: '500px'}} >
        <GMap 
          onClick={this.mapClick}
          options={this.state.options}
          lineStyle={this.state.lineStyle} 
          lines={this.state.lines} 
          markers={this.state.markers}
          zoomDisabled={true}
          posOptions={{coords:this.state.lines, pix: {x: 0, y: 0}}}/>
        <PlaceAutocomplete 
          ref={(v)=>this.refPlace=v}
          onPlaceChange={this.onPlaceChange}/>
      </div>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('container')
);

import React, {Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import GMap from './src/GMap';

class App extends Component {
  constructor(props) {
    super(props);
    this.mapClick = this.mapClick.bind(this)
    this.state = {
      options: {
        zoomControl: true,
        disableDoubleClickZoom: true
      },
      lineStyle: {
        strokeWeight: 7, 
        strokeColor: '#ccc'
      },
      lines: [
        {
          coords: [
            {lat: 39.92, lng: 116.46}, 
            {lat: 38.92, lng: 113.22}
          ], 
          lineStyle: {
            strokeWeight: 5, 
            strokeColor: '#000'
          }
        },
        {
          coords: [
            {lat: 39.92, lng: 116.46}, 
            {lat: 44.92, lng: 113.22}
          ]
        }
      ],
      posOptions: {coords: [{lat: 39.92, lng: 116.46}, {lat: 38.92, lng: 113.22}]},
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
    this.setState({
      markers: [{lat: e.latLng.lat(), lng: e.latLng.lng(), content:'<div class="marker">0</div>'}]
    })
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps() {}
  componentWillUnmount() {}

  render() {
    return (
      <div style={{width: '500px', height: '500px'}} >
        <GMap 
          onClick={() => alert('ha')}
          options={this.state.options}
          lineStyle={this.state.lineStyle} 
          lines={this.state.lines} 
          markers={this.state.markers}
          posOptions={this.state.posOptions}
          onDoubleClick={this.mapClick}/>
      </div>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('container')
);

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { isEqual, assign } from 'lodash';
import { loadJS } from './utils';

class PlaceAutocomplete extends Component{
  constructor(props) {
    super(props);
    this.initAutocomplete = this.initAutocomplete.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.autocomplete = null;
    this.state = {

    }
  }
  initAutocomplete() {
    const _this = this;
    const { onPlaceChange } = this.props;
    const inputDom = ReactDOM.findDOMNode(_this.inputRef);
    _this.autocomplete = new google.maps.places.Autocomplete(inputDom);
    _this.autocomplete.addListener('place_changed', function() {
      const place = _this.autocomplete.getPlace();
      if(place.geometry) {
        let lat = place.geometry.location.lat();
        let lng = place.geometry.location.lng();
        let formatted_address = place.formatted_address;
        onPlaceChange && onPlaceChange({lat, lng, formatted_address});
      }
    });
  }
  componentDidMount() {
    const _this = this;
    if(window.google) {
      _this.initAutocomplete();
    } else {
      loadJS().then(_this.initAutocomplete);
    }
  }
  onKeyDown(e) {
    const { onPlaceChange } = this.props;
    if(e.nativeEvent.which == 13) {
      this.geocoder = new google.maps.Geocoder();
      this.geocoder.geocode({address: e.nativeEvent.target.value}, function(results, status) {
        if(status == 'OK') {
          let lat = results[0].geometry.location.lat();
          let lng = results[0].geometry.location.lng();
          let formatted_address = results[0].formatted_address;
          onPlaceChange && onPlaceChange({lat, lng, formatted_address});
        }
      });
    } 
  }
  render() {
    const { placeholder, onFocus, cName } = this.props;
    return (
      <input
        onKeyDown={this.onKeyDown}
        className={cName}
        ref={(v) => this.inputRef=v}
        placeholder={placeholder} 
        onFocus={onFocus} 
        type="text"></input>
    )
  }
}

PlaceAutocomplete.propTypes = {
  cName: PropTypes.string,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  onPlaceChange: PropTypes.func,
}

export default PlaceAutocomplete;

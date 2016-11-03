'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require('lodash');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var PlaceAutocomplete = function (_Component) {
  _inherits(PlaceAutocomplete, _Component);

  function PlaceAutocomplete(props) {
    _classCallCheck(this, PlaceAutocomplete);

    var _this2 = _possibleConstructorReturn(this, _Component.call(this, props));

    _this2.initAutocomplete = _this2.initAutocomplete.bind(_this2);
    _this2.onKeyDown = _this2.onKeyDown.bind(_this2);
    _this2.autocomplete = null;
    _this2.state = {};
    return _this2;
  }

  PlaceAutocomplete.prototype.initAutocomplete = function initAutocomplete() {
    var _this = this;
    var onPlaceChange = this.props.onPlaceChange;

    var inputDom = _reactDom2.default.findDOMNode(_this.inputRef);
    _this.autocomplete = new google.maps.places.Autocomplete(inputDom);
    _this.autocomplete.addListener('place_changed', function () {
      var place = _this.autocomplete.getPlace();
      if (place.geometry) {
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();
        var formatted_address = place.formatted_address;
        onPlaceChange && onPlaceChange({ lat: lat, lng: lng, formatted_address: formatted_address });
      }
    });
  };

  PlaceAutocomplete.prototype.componentDidMount = function componentDidMount() {
    var _this = this;
    if (window.google) {
      _this.initAutocomplete();
    } else {
      (0, _utils.loadJS)().then(_this.initAutocomplete);
    }
  };

  PlaceAutocomplete.prototype.onKeyDown = function onKeyDown(e) {
    var onPlaceChange = this.props.onPlaceChange;

    if (e.nativeEvent.which == 13) {
      this.geocoder = new google.maps.Geocoder();
      this.geocoder.geocode({ address: e.nativeEvent.target.value }, function (results, status) {
        if (status == 'OK') {
          var lat = results[0].geometry.location.lat();
          var lng = results[0].geometry.location.lng();
          var formatted_address = results[0].formatted_address;
          onPlaceChange && onPlaceChange({ lat: lat, lng: lng, formatted_address: formatted_address });
        }
      });
    }
  };

  PlaceAutocomplete.prototype.render = function render() {
    var _this3 = this;

    var _props = this.props,
        placeholder = _props.placeholder,
        onFocus = _props.onFocus,
        cName = _props.cName;

    return _react2.default.createElement('input', {
      onKeyDown: this.onKeyDown,
      className: cName,
      ref: function ref(v) {
        return _this3.inputRef = v;
      },
      placeholder: placeholder,
      onFocus: onFocus,
      type: 'text' });
  };

  return PlaceAutocomplete;
}(_react.Component);

PlaceAutocomplete.propTypes = {
  cName: _react.PropTypes.string,
  placeholder: _react.PropTypes.string,
  onFocus: _react.PropTypes.func,
  onPlaceChange: _react.PropTypes.func
};

exports.default = PlaceAutocomplete;
module.exports = exports['default'];
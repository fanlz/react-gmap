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

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var GMap = function (_Component) {
  _inherits(GMap, _Component);

  function GMap(props) {
    _classCallCheck(this, GMap);

    var _this2 = _possibleConstructorReturn(this, _Component.call(this, props));

    _this2.loadMap = _this2.loadMap.bind(_this2);
    _this2.updateMap = _this2.updateMap.bind(_this2);
    _this2.renderLines = _this2.renderLines.bind(_this2);
    _this2.renderMakers = _this2.renderMakers.bind(_this2);
    _this2.map = null;
    _this2.lines = [];
    _this2.markers = [];
    _this2.state = {};

    _this2.default = {
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
        mapTypeControl: false,
        streetViewControl: false,
        backgroundColor: '#eee',
        clickableIcons: false,
        disableDoubleClickZoom: false
      }
    };
    return _this2;
  }

  GMap.prototype.renderLines = function renderLines() {
    var _props = this.props,
        _props$lines = _props.lines,
        lines = _props$lines === undefined ? [] : _props$lines,
        lineStyle = _props.lineStyle;

    this.lines.forEach(function (line) {
      line.setMap(null);
    });
    this.lines = [];
    var lStyle = (0, _lodash.assign)(this.default.lineStyle, lineStyle);
    var line = new google.maps.Polyline((0, _lodash.assign)({ path: lines }, lStyle));
    this.lines.push(line);
    line.setMap(this.map);
  };

  GMap.prototype.renderMakers = function renderMakers() {
    var _this3 = this;

    var _props$markers = this.props.markers,
        markers = _props$markers === undefined ? [] : _props$markers;

    this.markers.forEach(function (marker) {
      marker.remove();
    });
    this.markers = [];
    markers.forEach(function (marker) {
      var oMarker = new Marker(_this3.map, marker);
      _this3.markers.push(oMarker);
    });
  };

  GMap.prototype.updateMap = function updateMap() {
    var _props2 = this.props,
        posOptions = _props2.posOptions,
        options = _props2.options,
        zoomDisabled = _props2.zoomDisabled,
        centerDisabled = _props2.centerDisabled;

    var newOptions = (0, _lodash.assign)(this.default.options, options);

    if (posOptions) {
      utils.fitMap(this.map, posOptions);
    } else {
      if (!centerDisabled) {
        this.map.setCenter(newOptions.center);
      }
      if (!zoomDisabled) {
        this.map.setZoom(newOptions.zoom);
      }
    }
    this.renderLines();
    this.renderMakers();
  };

  GMap.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (!(0, _lodash.isEqual)(this.props, prevProps)) {
      this.updateMap();
    }
  };

  GMap.prototype.loadMap = function loadMap() {
    var _props3 = this.props,
        options = _props3.options,
        onClick = _props3.onClick,
        onDoubleClick = _props3.onDoubleClick;

    window.Marker = function (map, marker) {
      this.lat = marker.lat;
      this.lng = marker.lng;
      this.html = marker.content;
      this.setMap(map);
    };

    Marker.prototype = new google.maps.OverlayView();
    Marker.prototype.draw = function () {
      var ele = this.ele;
      if (!ele) {
        ele = this.ele = document.createElement('div');
        ele.style.position = 'absolute';
        ele.style.zIndex = 999;
        ele.innerHTML = this.html;

        this.getPanes().overlayImage.appendChild(ele);
      }

      var latlng = new google.maps.LatLng(this.lat, this.lng);
      var pos = this.getProjection().fromLatLngToDivPixel(latlng);
      if (pos) {
        ele.style.left = pos.x + 'px';
        ele.style.top = pos.y + 'px';
      }
    };
    Marker.prototype.remove = function () {
      if (this.ele) {
        this.ele.parentNode.removeChild(this.ele);
        this.ele = null;
      }
      this.setMap(null);
    };

    var mapDom = _reactDom2.default.findDOMNode(this.refs.mjmap);
    this.map = new google.maps.Map(mapDom, (0, _lodash.assign)(this.default.options, options));
    this.map.addListener('click', function (event) {
      onClick && onClick(event);
    });
    this.map.addListener('dblclick', function (event) {
      onDoubleClick && onDoubleClick(event);
    });
    this.updateMap();
  };

  GMap.prototype.componentDidMount = function componentDidMount() {
    var _this = this;
    if (!window.google) {
      utils.loadJS().then(_this.loadMap);
    }
  };

  GMap.prototype.render = function render() {
    return _react2.default.createElement('div', { style: { width: '100%', height: '100%', backgroundColor: '#ccc' }, ref: 'mjmap' });
  };

  return GMap;
}(_react.Component);

GMap.propTypes = {
  lines: _react.PropTypes.array,
  markers: _react.PropTypes.array,
  posOptions: _react.PropTypes.object,
  options: _react.PropTypes.object,
  lineStyle: _react.PropTypes.object,
  onClick: _react.PropTypes.func,
  onDoubleClick: _react.PropTypes.func
};

exports.default = GMap;
module.exports = exports['default'];
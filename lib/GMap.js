'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = require('../utils');

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
    _this2.state = {};
    return _this2;
  }

  GMap.prototype.loadMap = function loadMap() {
    var mapDom = _reactDom2.default.findDOMNode(this.refs.mjmap);
    this.map = new google.maps.Map(mapDom, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    });
  };

  GMap.prototype.componentDidMount = function componentDidMount() {
    var _this = this;
    if (!window.google) {
      (0, _utils.loadJS)('http://ditu.google.cn/maps/api/js?sensor=false&libraries=geometry').then(_this.loadMap, function () {
        return console.log('load false');
      }).catch(function () {
        return console.log('load false');
      });
    }
  };

  GMap.prototype.render = function render() {
    return _react2.default.createElement('div', { style: { width: '100%', height: '100%' }, ref: 'mjmap' });
  };

  return GMap;
}(_react.Component);

exports.default = GMap;
module.exports = exports['default'];
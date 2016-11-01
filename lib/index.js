'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GMap = require('./GMap');

var _GMap2 = _interopRequireDefault(_GMap);

var _PlaceAutocomplete = require('./PlaceAutocomplete');

var _PlaceAutocomplete2 = _interopRequireDefault(_PlaceAutocomplete);

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  GMap: _GMap2.default,
  PlaceAutocomplete: _PlaceAutocomplete2.default,
  utils: utils
};
module.exports = exports['default'];
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _defaultProps = require("./default-props");

var _propTypes = require("./prop-types");

var _materialTable = _interopRequireDefault(require("./material-table"));

var _core = require("@material-ui/core");

var _components = require("./components");

Object.keys(_components).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _components[key];
    }
  });
});
_materialTable["default"].defaultProps = _defaultProps.defaultProps;
_materialTable["default"].propTypes = _propTypes.propTypes;

var styles = function styles(theme) {
  return {
    paginationRoot: {
      width: '100%'
    },
    paginationToolbar: {
      padding: 0,
      width: '100%'
    },
    paginationCaption: {
      display: 'none'
    },
    paginationSelectRoot: {
      margin: 0
    }
  };
};

var _default = (0, _core.withStyles)(styles, {
  withTheme: true
})(function (props) {
  return _react["default"].createElement(_materialTable["default"], (0, _extends2["default"])({}, props, {
    ref: props.tableRef
  }));
});

exports["default"] = _default;
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Icon = _interopRequireDefault(require("@material-ui/core/Icon"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */
var MTableAction =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(MTableAction, _React$Component);

  function MTableAction() {
    (0, _classCallCheck2["default"])(this, MTableAction);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(MTableAction).apply(this, arguments));
  }

  (0, _createClass2["default"])(MTableAction, [{
    key: "render",
    value: function render() {
      var _this = this;

      var action = this.props.action;
      var disabled = action.disabled || this.props.disabled;

      if (typeof action === 'function') {
        action = action(this.props.data);

        if (!action) {
          return null;
        }
      }

      if (action.action) {
        action = action.action(this.props.data);

        if (!action) {
          return null;
        }
      }

      if (action.hidden) {
        return null;
      }

      var handleOnClick = function handleOnClick(event) {
        if (action.onClick) {
          action.onClick(event, _this.props.data);
          event.stopPropagation();
        }
      };

      var icon = typeof action.icon === "string" ? React.createElement(_Icon["default"], action.iconProps, action.icon) : typeof action.icon === "function" ? action.icon((0, _objectSpread2["default"])({}, action.iconProps, {
        disabled: disabled
      })) : React.createElement(action.icon, null);
      var button = React.createElement(_IconButton["default"], {
        size: this.props.size,
        color: "inherit",
        disabled: disabled,
        onClick: function onClick(event) {
          return handleOnClick(event);
        }
      }, icon);

      if (action.tooltip) {
        // fix for issue #1049
        // https://github.com/mbrn/material-table/issues/1049
        return disabled ? React.createElement(_Tooltip["default"], {
          title: action.tooltip
        }, React.createElement("span", null, button)) : React.createElement(_Tooltip["default"], {
          title: action.tooltip
        }, button);
      } else {
        return button;
      }
    }
  }]);
  return MTableAction;
}(React.Component);

MTableAction.defaultProps = {
  action: {},
  data: {}
};
MTableAction.propTypes = {
  action: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].object]).isRequired,
  data: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].arrayOf(_propTypes["default"].object)]),
  disabled: _propTypes["default"].bool,
  size: _propTypes["default"].string
};
var _default = MTableAction;
exports["default"] = _default;
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(
  require("@babel/runtime/helpers/objectSpread")
);

var _classCallCheck2 = _interopRequireDefault(
  require("@babel/runtime/helpers/classCallCheck")
);

var _createClass2 = _interopRequireDefault(
  require("@babel/runtime/helpers/createClass")
);

var _inherits2 = _interopRequireDefault(
  require("@babel/runtime/helpers/inherits")
);

var _possibleConstructorReturn2 = _interopRequireDefault(
  require("@babel/runtime/helpers/possibleConstructorReturn")
);

var _getPrototypeOf2 = _interopRequireDefault(
  require("@babel/runtime/helpers/getPrototypeOf")
);

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Icon = _interopRequireDefault(require("@material-ui/core/Icon"));

var _IconButton = _interopRequireDefault(
  require("@material-ui/core/IconButton")
);

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = (0, _getPrototypeOf2["default"])(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return (0, _possibleConstructorReturn2["default"])(this, result);
  };
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

/* eslint-enable no-unused-vars */
var MTableAction = /*#__PURE__*/ (function (_React$Component) {
  (0, _inherits2["default"])(MTableAction, _React$Component);

  var _super = _createSuper(MTableAction);

  function MTableAction() {
    (0, _classCallCheck2["default"])(this, MTableAction);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(MTableAction, [
    {
      key: "render",
      value: function render() {
        var _this = this;

        var action = this.props.action;

        if (typeof action === "function") {
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

        var disabled = action.disabled || this.props.disabled;

        var handleOnClick = function handleOnClick(event) {
          if (action.onClick) {
            action.onClick(event, _this.props.data);
            event.stopPropagation();
          }
        };

        var icon =
          typeof action.icon === "string"
            ? /*#__PURE__*/ React.createElement(
                _Icon["default"],
                action.iconProps,
                action.icon
              )
            : typeof action.icon === "function"
            ? action.icon(
                (0, _objectSpread2["default"])({}, action.iconProps, {
                  disabled: disabled,
                })
              )
            : /*#__PURE__*/ React.createElement(action.icon, null);
        var button = /*#__PURE__*/ React.createElement(
          _IconButton["default"],
          {
            size: this.props.size,
            color: "inherit",
            disabled: disabled,
            onClick: handleOnClick,
          },
          icon
        );

        if (action.tooltip) {
          // fix for issue #1049
          // https://github.com/mbrn/material-table/issues/1049
          return disabled
            ? /*#__PURE__*/ React.createElement(
                _Tooltip["default"],
                {
                  title: action.tooltip,
                },
                /*#__PURE__*/ React.createElement("span", null, button)
              )
            : /*#__PURE__*/ React.createElement(
                _Tooltip["default"],
                {
                  title: action.tooltip,
                },
                button
              );
        } else {
          return button;
        }
      },
    },
  ]);
  return MTableAction;
})(React.Component);

MTableAction.defaultProps = {
  action: {},
  data: {},
};
MTableAction.propTypes = {
  action: _propTypes["default"].oneOfType([
    _propTypes["default"].func,
    _propTypes["default"].object,
  ]).isRequired,
  data: _propTypes["default"].oneOfType([
    _propTypes["default"].object,
    _propTypes["default"].arrayOf(_propTypes["default"].object),
  ]),
  disabled: _propTypes["default"].bool,
  size: _propTypes["default"].string,
};
var _default = MTableAction;
exports["default"] = _default;

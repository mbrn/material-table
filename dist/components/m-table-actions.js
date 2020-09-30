"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;

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
var MTableActions = /*#__PURE__*/ (function (_React$Component) {
  (0, _inherits2["default"])(MTableActions, _React$Component);

  var _super = _createSuper(MTableActions);

  function MTableActions() {
    (0, _classCallCheck2["default"])(this, MTableActions);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(MTableActions, [
    {
      key: "render",
      value: function render() {
        var _this = this;

        if (this.props.actions) {
          return this.props.actions.map(function (action, index) {
            return /*#__PURE__*/ React.createElement(
              _this.props.components.Action,
              {
                action: action,
                key: "action-" + index,
                data: _this.props.data,
                size: _this.props.size,
                disabled: _this.props.disabled,
              }
            );
          });
        }

        return null;
      },
    },
  ]);
  return MTableActions;
})(React.Component);

MTableActions.defaultProps = {
  actions: [],
  data: {},
};
MTableActions.propTypes = {
  components: _propTypes["default"].object.isRequired,
  actions: _propTypes["default"].array.isRequired,
  data: _propTypes["default"].oneOfType([
    _propTypes["default"].object,
    _propTypes["default"].arrayOf(_propTypes["default"].object),
  ]),
  disabled: _propTypes["default"].bool,
  size: _propTypes["default"].string,
};
var _default = MTableActions;
exports["default"] = _default;

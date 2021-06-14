"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(
  require("@babel/runtime/helpers/objectSpread")
);

var _classCallCheck2 = _interopRequireDefault(
  require("@babel/runtime/helpers/classCallCheck")
);

var _createClass2 = _interopRequireDefault(
  require("@babel/runtime/helpers/createClass")
);

var _assertThisInitialized2 = _interopRequireDefault(
  require("@babel/runtime/helpers/assertThisInitialized")
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

var _defineProperty2 = _interopRequireDefault(
  require("@babel/runtime/helpers/defineProperty")
);

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _CircularProgress = _interopRequireDefault(
  require("@material-ui/core/CircularProgress")
);

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

var _withTheme = _interopRequireDefault(
  require("@material-ui/core/styles/withTheme")
);

var _ = require("..");

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(
    nodeInterop
  ) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (
    obj === null ||
    (_typeof(obj) !== "object" && typeof obj !== "function")
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = (0, _getPrototypeOf2.default)(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = (0, _getPrototypeOf2.default)(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return (0, _possibleConstructorReturn2.default)(this, result);
  };
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
    return true;
  } catch (e) {
    return false;
  }
}

/* eslint-enable no-unused-vars */
var MTableEditCell = /*#__PURE__*/ (function (_React$Component) {
  (0, _inherits2.default)(MTableEditCell, _React$Component);

  var _super = _createSuper(MTableEditCell);

  function MTableEditCell(props) {
    var _this;

    (0, _classCallCheck2.default)(this, MTableEditCell);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "getStyle",
      function () {
        var cellStyle = {
          boxShadow: "2px 0px 15px rgba(125,147,178,.25)",
          color: "inherit",
          width: _this.props.columnDef.tableData.width,
          boxSizing: "border-box",
          fontSize: "inherit",
          fontFamily: "inherit",
          fontWeight: "inherit",
          padding: "0 16px",
        };

        if (typeof _this.props.columnDef.cellStyle === "function") {
          cellStyle = (0, _objectSpread2.default)(
            {},
            cellStyle,
            _this.props.columnDef.cellStyle(
              _this.state.value,
              _this.props.rowData
            )
          );
        } else {
          cellStyle = (0, _objectSpread2.default)(
            {},
            cellStyle,
            _this.props.columnDef.cellStyle
          );
        }

        if (typeof _this.props.cellEditable.cellStyle === "function") {
          cellStyle = (0, _objectSpread2.default)(
            {},
            cellStyle,
            _this.props.cellEditable.cellStyle(
              _this.state.value,
              _this.props.rowData,
              _this.props.columnDef
            )
          );
        } else {
          cellStyle = (0, _objectSpread2.default)(
            {},
            cellStyle,
            _this.props.cellEditable.cellStyle
          );
        }

        return cellStyle;
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "handleKeyDown",
      function (e) {
        if (e.keyCode === 13) {
          _this.onApprove();
        } else if (e.keyCode === 27) {
          _this.onCancel();
        }
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onApprove",
      function () {
        _this.setState(
          {
            isLoading: true,
          },
          function () {
            _this.props.cellEditable
              .onCellEditApproved(
                _this.state.value, // newValue
                _this.props.rowData[_this.props.columnDef.field], // oldValue
                _this.props.rowData, // rowData with old value
                _this.props.columnDef // columnDef
              )
              .then(function () {
                _this.setState({
                  isLoading: false,
                });

                _this.props.onCellEditFinished(
                  _this.props.rowData,
                  _this.props.columnDef
                );
              })
              .catch(function (error) {
                _this.setState({
                  isLoading: false,
                });
              });
          }
        );
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onCancel",
      function () {
        _this.props.onCellEditFinished(
          _this.props.rowData,
          _this.props.columnDef
        );
      }
    );
    _this.state = {
      isLoading: false,
      value: _this.props.rowData[_this.props.columnDef.field],
    };
    return _this;
  }

  (0, _createClass2.default)(MTableEditCell, [
    {
      key: "renderActions",
      value: function renderActions() {
        if (this.state.isLoading) {
          return /*#__PURE__*/ React.createElement(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "center",
                width: 60,
              },
            },
            /*#__PURE__*/ React.createElement(_CircularProgress.default, {
              size: 20,
            })
          );
        }

        var actions = [
          {
            icon: this.props.icons.Check,
            tooltip: this.props.localization.saveTooltip,
            onClick: this.onApprove,
            disabled: this.state.isLoading,
          },
          {
            icon: this.props.icons.Clear,
            tooltip: this.props.localization.cancelTooltip,
            onClick: this.onCancel,
            disabled: this.state.isLoading,
          },
        ];
        return /*#__PURE__*/ React.createElement(
          this.props.components.Actions,
          {
            actions: actions,
            components: this.props.components,
            size: "small",
          }
        );
      },
    },
    {
      key: "render",
      value: function render() {
        var _this2 = this;

        return /*#__PURE__*/ React.createElement(
          _TableCell.default,
          {
            size: this.props.size,
            style: this.getStyle(),
            padding: "none",
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
              },
            },
            /*#__PURE__*/ React.createElement(
              "div",
              {
                style: {
                  flex: 1,
                  marginRight: 4,
                },
              },
              /*#__PURE__*/ React.createElement(
                this.props.components.EditField,
                {
                  columnDef: this.props.columnDef,
                  value: this.state.value,
                  onChange: function onChange(value) {
                    return _this2.setState({
                      value: value,
                    });
                  },
                  onKeyDown: this.handleKeyDown,
                  disabled: this.state.isLoading,
                  autoFocus: true,
                }
              )
            ),
            this.renderActions()
          )
        );
      },
    },
  ]);
  return MTableEditCell;
})(React.Component);

MTableEditCell.defaultProps = {
  columnDef: {},
};
MTableEditCell.propTypes = {
  cellEditable: _propTypes.default.object.isRequired,
  columnDef: _propTypes.default.object.isRequired,
  components: _propTypes.default.object.isRequired,
  errorState: _propTypes.default.oneOfType([
    _propTypes.default.object,
    _propTypes.default.bool,
  ]),
  icons: _propTypes.default.object.isRequired,
  localization: _propTypes.default.object.isRequired,
  onCellEditFinished: _propTypes.default.func.isRequired,
  rowData: _propTypes.default.object.isRequired,
  size: _propTypes.default.string,
};

var _default = (0, _withTheme.default)(MTableEditCell);

exports.default = _default;

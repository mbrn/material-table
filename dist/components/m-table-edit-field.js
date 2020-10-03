"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(
  require("@babel/runtime/helpers/extends")
);

var _objectWithoutProperties2 = _interopRequireDefault(
  require("@babel/runtime/helpers/objectWithoutProperties")
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

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _FormControl = _interopRequireDefault(
  require("@material-ui/core/FormControl")
);

var _FormHelperText = _interopRequireDefault(
  require("@material-ui/core/FormHelperText")
);

var _FormGroup = _interopRequireDefault(require("@material-ui/core/FormGroup"));

var _FormControlLabel = _interopRequireDefault(
  require("@material-ui/core/FormControlLabel")
);

var _dateFns = _interopRequireDefault(require("@date-io/date-fns"));

var _pickers = require("@material-ui/pickers");

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

var MTableEditField = /*#__PURE__*/ (function (_React$Component) {
  (0, _inherits2["default"])(MTableEditField, _React$Component);

  var _super = _createSuper(MTableEditField);

  function MTableEditField() {
    (0, _classCallCheck2["default"])(this, MTableEditField);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(MTableEditField, [
    {
      key: "getProps",
      value: function getProps() {
        var _this$props = this.props,
          columnDef = _this$props.columnDef,
          rowData = _this$props.rowData,
          onRowDataChange = _this$props.onRowDataChange,
          errorState = _this$props.errorState,
          onBulkEditRowChanged = _this$props.onBulkEditRowChanged,
          scrollWidth = _this$props.scrollWidth,
          props = (0, _objectWithoutProperties2["default"])(_this$props, [
            "columnDef",
            "rowData",
            "onRowDataChange",
            "errorState",
            "onBulkEditRowChanged",
            "scrollWidth",
          ]);
        return props;
      },
    },
    {
      key: "renderLookupField",
      value: function renderLookupField() {
        var _this = this;

        var _this$getProps = this.getProps(),
          helperText = _this$getProps.helperText,
          error = _this$getProps.error,
          props = (0, _objectWithoutProperties2["default"])(_this$getProps, [
            "helperText",
            "error",
          ]);

        return /*#__PURE__*/ React.createElement(
          _FormControl["default"],
          {
            error: Boolean(error),
          },
          /*#__PURE__*/ React.createElement(
            _Select["default"],
            (0, _extends2["default"])({}, props, {
              value: this.props.value === undefined ? "" : this.props.value,
              onChange: function onChange(event) {
                return _this.props.onChange(event.target.value);
              },
              style: {
                fontSize: 13,
              },
              SelectDisplayProps: {
                "aria-label": this.props.columnDef.title,
              },
            }),
            Object.keys(this.props.columnDef.lookup).map(function (key) {
              return /*#__PURE__*/ React.createElement(
                _MenuItem["default"],
                {
                  key: key,
                  value: key,
                },
                _this.props.columnDef.lookup[key]
              );
            })
          ),
          Boolean(helperText) &&
            /*#__PURE__*/ React.createElement(
              _FormHelperText["default"],
              null,
              helperText
            )
        );
      },
    },
    {
      key: "renderBooleanField",
      value: function renderBooleanField() {
        var _this2 = this;

        var _this$getProps2 = this.getProps(),
          helperText = _this$getProps2.helperText,
          error = _this$getProps2.error,
          props = (0, _objectWithoutProperties2["default"])(_this$getProps2, [
            "helperText",
            "error",
          ]);

        return /*#__PURE__*/ React.createElement(
          _FormControl["default"],
          {
            error: Boolean(error),
            component: "fieldset",
          },
          /*#__PURE__*/ React.createElement(
            _FormGroup["default"],
            null,
            /*#__PURE__*/ React.createElement(_FormControlLabel["default"], {
              label: "",
              control: /*#__PURE__*/ React.createElement(
                _Checkbox["default"],
                (0, _extends2["default"])({}, props, {
                  value: String(this.props.value),
                  checked: Boolean(this.props.value),
                  onChange: function onChange(event) {
                    return _this2.props.onChange(event.target.checked);
                  },
                  style: {
                    padding: 0,
                    width: 24,
                    marginLeft: 9,
                  },
                  inputProps: {
                    "aria-label": this.props.columnDef.title,
                  },
                })
              ),
            })
          ),
          /*#__PURE__*/ React.createElement(
            _FormHelperText["default"],
            null,
            helperText
          )
        );
      },
    },
    {
      key: "renderDateField",
      value: function renderDateField() {
        var dateFormat =
          this.props.columnDef.dateSetting &&
          this.props.columnDef.dateSetting.format
            ? this.props.columnDef.dateSetting.format
            : "dd.MM.yyyy";
        return /*#__PURE__*/ React.createElement(
          _pickers.MuiPickersUtilsProvider,
          {
            utils: _dateFns["default"],
            locale: this.props.locale,
          },
          /*#__PURE__*/ React.createElement(
            _pickers.DatePicker,
            (0, _extends2["default"])({}, this.getProps(), {
              format: dateFormat,
              value: this.props.value || null,
              onChange: this.props.onChange,
              clearable: true,
              InputProps: {
                style: {
                  fontSize: 13,
                },
              },
              inputProps: {
                "aria-label": "".concat(
                  this.props.columnDef.title,
                  ": press space to edit"
                ),
              },
            })
          )
        );
      },
    },
    {
      key: "renderTimeField",
      value: function renderTimeField() {
        return /*#__PURE__*/ React.createElement(
          _pickers.MuiPickersUtilsProvider,
          {
            utils: _dateFns["default"],
            locale: this.props.locale,
          },
          /*#__PURE__*/ React.createElement(
            _pickers.TimePicker,
            (0, _extends2["default"])({}, this.getProps(), {
              format: "HH:mm:ss",
              value: this.props.value || null,
              onChange: this.props.onChange,
              clearable: true,
              InputProps: {
                style: {
                  fontSize: 13,
                },
              },
              inputProps: {
                "aria-label": "".concat(
                  this.props.columnDef.title,
                  ": press space to edit"
                ),
              },
            })
          )
        );
      },
    },
    {
      key: "renderDateTimeField",
      value: function renderDateTimeField() {
        return /*#__PURE__*/ React.createElement(
          _pickers.MuiPickersUtilsProvider,
          {
            utils: _dateFns["default"],
            locale: this.props.locale,
          },
          /*#__PURE__*/ React.createElement(
            _pickers.DateTimePicker,
            (0, _extends2["default"])({}, this.getProps(), {
              format: "dd.MM.yyyy HH:mm:ss",
              value: this.props.value || null,
              onChange: this.props.onChange,
              clearable: true,
              InputProps: {
                style: {
                  fontSize: 13,
                },
              },
              inputProps: {
                "aria-label": "".concat(
                  this.props.columnDef.title,
                  ": press space to edit"
                ),
              },
            })
          )
        );
      },
    },
    {
      key: "renderTextField",
      value: function renderTextField() {
        var _this3 = this;

        return /*#__PURE__*/ React.createElement(
          _TextField["default"],
          (0, _extends2["default"])({}, this.getProps(), {
            fullWidth: true,
            style:
              this.props.columnDef.type === "numeric"
                ? {
                    float: "right",
                  }
                : {},
            type: this.props.columnDef.type === "numeric" ? "number" : "text",
            placeholder:
              this.props.columnDef.editPlaceholder ||
              this.props.columnDef.title,
            value: this.props.value === undefined ? "" : this.props.value,
            onChange: function onChange(event) {
              return _this3.props.onChange(
                _this3.props.columnDef.type === "numeric"
                  ? event.target.valueAsNumber
                  : event.target.value
              );
            },
            InputProps: {
              style: {
                fontSize: 13,
              },
            },
            inputProps: {
              "aria-label": this.props.columnDef.title,
            },
          })
        );
      },
    },
    {
      key: "renderCurrencyField",
      value: function renderCurrencyField() {
        var _this4 = this;

        return /*#__PURE__*/ React.createElement(
          _TextField["default"],
          (0, _extends2["default"])({}, this.getProps(), {
            placeholder:
              this.props.columnDef.editPlaceholder ||
              this.props.columnDef.title,
            style: {
              float: "right",
            },
            type: "number",
            value: this.props.value === undefined ? "" : this.props.value,
            onChange: function onChange(event) {
              var value = event.target.valueAsNumber;

              if (!value && value !== 0) {
                value = undefined;
              }

              return _this4.props.onChange(value);
            },
            InputProps: {
              style: {
                fontSize: 13,
                textAlign: "right",
              },
            },
            inputProps: {
              "aria-label": this.props.columnDef.title,
            },
            onKeyDown: this.props.onKeyDown,
            autoFocus: this.props.autoFocus,
          })
        );
      },
    },
    {
      key: "render",
      value: function render() {
        var component = "ok";

        if (this.props.columnDef.lookup) {
          component = this.renderLookupField();
        } else if (this.props.columnDef.type === "boolean") {
          component = this.renderBooleanField();
        } else if (this.props.columnDef.type === "date") {
          component = this.renderDateField();
        } else if (this.props.columnDef.type === "time") {
          component = this.renderTimeField();
        } else if (this.props.columnDef.type === "datetime") {
          component = this.renderDateTimeField();
        } else if (this.props.columnDef.type === "currency") {
          component = this.renderCurrencyField();
        } else {
          component = this.renderTextField();
        }

        return component;
      },
    },
  ]);
  return MTableEditField;
})(React.Component);

MTableEditField.propTypes = {
  value: _propTypes["default"].any,
  onChange: _propTypes["default"].func.isRequired,
  columnDef: _propTypes["default"].object.isRequired,
  locale: _propTypes["default"].object,
};
var _default = MTableEditField;
exports["default"] = _default;

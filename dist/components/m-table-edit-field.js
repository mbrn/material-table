"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var React = _interopRequireWildcard(require("react"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _dateFns = _interopRequireDefault(require("@date-io/date-fns"));

var _pickers = require("@material-ui/pickers");

var _propTypes = _interopRequireDefault(require("prop-types"));

var MTableEditField =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(MTableEditField, _React$Component);

  function MTableEditField() {
    (0, _classCallCheck2["default"])(this, MTableEditField);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(MTableEditField).apply(this, arguments));
  }

  (0, _createClass2["default"])(MTableEditField, [{
    key: "getProps",
    value: function getProps() {
      var _this$props = this.props,
          columnDef = _this$props.columnDef,
          rowData = _this$props.rowData,
          onRowDataChange = _this$props.onRowDataChange,
          props = (0, _objectWithoutProperties2["default"])(_this$props, ["columnDef", "rowData", "onRowDataChange"]);
      return props;
    }
  }, {
    key: "renderLookupField",
    value: function renderLookupField() {
      var _this = this;

      return React.createElement(_Select["default"], (0, _extends2["default"])({}, this.getProps(), {
        value: this.props.value === undefined ? '' : this.props.value,
        onChange: function onChange(event) {
          return _this.props.onChange(event.target.value);
        },
        style: {
          fontSize: 13
        }
      }), Object.keys(this.props.columnDef.lookup).map(function (key) {
        return React.createElement(_MenuItem["default"], {
          key: key,
          value: key
        }, _this.props.columnDef.lookup[key]);
      }));
    }
  }, {
    key: "renderBooleanField",
    value: function renderBooleanField() {
      var _this2 = this;

      return React.createElement(_Checkbox["default"], (0, _extends2["default"])({}, this.getProps(), {
        value: String(this.props.value),
        checked: Boolean(this.props.value),
        onChange: function onChange(event) {
          return _this2.props.onChange(event.target.checked);
        },
        style: {
          paddingLeft: 0,
          paddingTop: 0,
          paddingBottom: 0
        }
      }));
    }
  }, {
    key: "renderDateField",
    value: function renderDateField() {
      return React.createElement(_pickers.MuiPickersUtilsProvider, {
        utils: _dateFns["default"],
        locale: this.props.dateTimePickerLocalization
      }, React.createElement(_pickers.DatePicker, (0, _extends2["default"])({}, this.getProps(), {
        format: "dd.MM.yyyy",
        value: this.props.value || null,
        onChange: this.props.onChange,
        clearable: true,
        InputProps: {
          style: {
            fontSize: 13
          }
        }
      })));
    }
  }, {
    key: "renderTimeField",
    value: function renderTimeField() {
      return React.createElement(_pickers.MuiPickersUtilsProvider, {
        utils: _dateFns["default"],
        locale: this.props.dateTimePickerLocalization
      }, React.createElement(_pickers.TimePicker, (0, _extends2["default"])({}, this.getProps(), {
        format: "HH:mm:ss",
        value: this.props.value || null,
        onChange: this.props.onChange,
        clearable: true,
        InputProps: {
          style: {
            fontSize: 13
          }
        }
      })));
    }
  }, {
    key: "renderDateTimeField",
    value: function renderDateTimeField() {
      return React.createElement(_pickers.MuiPickersUtilsProvider, {
        utils: _dateFns["default"],
        locale: this.props.dateTimePickerLocalization
      }, React.createElement(_pickers.DateTimePicker, (0, _extends2["default"])({}, this.getProps(), {
        format: "dd.MM.yyyy HH:mm:ss",
        value: this.props.value || null,
        onChange: this.props.onChange,
        clearable: true,
        InputProps: {
          style: {
            fontSize: 13
          }
        }
      })));
    }
  }, {
    key: "renderTextField",
    value: function renderTextField() {
      var _this3 = this;

      return React.createElement(_TextField["default"], (0, _extends2["default"])({}, this.getProps(), {
        style: this.props.columnDef.type === 'numeric' ? {
          "float": 'right'
        } : {},
        type: this.props.columnDef.type === 'numeric' ? 'number' : 'text',
        placeholder: this.props.columnDef.title,
        value: this.props.value === undefined ? '' : this.props.value,
        onChange: function onChange(event) {
          return _this3.props.onChange(event.target.value);
        },
        InputProps: {
          style: {
            fontSize: 13
          }
        }
      }));
    }
  }, {
    key: "renderCurrencyField",
    value: function renderCurrencyField() {
      var _this4 = this;

      return React.createElement(_TextField["default"], (0, _extends2["default"])({}, this.getProps(), {
        placeholder: this.props.columnDef.title,
        value: this.props.value === undefined ? '' : this.props.value,
        onChange: function onChange(event) {
          return _this4.props.onChange(event.target.value);
        },
        inputProps: {
          style: {
            fontSize: 13,
            textAlign: "right"
          }
        }
      }));
    }
  }, {
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
    }
  }]);
  return MTableEditField;
}(React.Component);

MTableEditField.propTypes = {
  value: _propTypes["default"].any,
  onChange: _propTypes["default"].func.isRequired,
  columnDef: _propTypes["default"].object.isRequired,
  dateTimePickerLocalization: _propTypes["default"].object
};
var _default = MTableEditField;
exports["default"] = _default;
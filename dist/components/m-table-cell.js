"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _propTypes = _interopRequireDefault(require("prop-types"));

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/* eslint-disable no-useless-escape */
var isoDateRegex = /^\d{4}-(0[1-9]|1[0-2])-([12]\d|0[1-9]|3[01])([T\s](([01]\d|2[0-3])\:[0-5]\d|24\:00)(\:[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3])\:?([0-5]\d)?)?)?$/;
/* eslint-enable no-useless-escape */

var MTableCell =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(MTableCell, _React$Component);

  function MTableCell() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, MTableCell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(MTableCell)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleClickCell", function (e) {
      if (_this.props.columnDef.disableClick) {
        e.stopPropagation();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getStyle", function () {
      var cellStyle = {
        color: 'inherit'
      };

      if (typeof _this.props.columnDef.cellStyle === 'function') {
        cellStyle = (0, _objectSpread2["default"])({}, cellStyle, _this.props.columnDef.cellStyle(_this.props.value, _this.props.rowData));
      } else {
        cellStyle = (0, _objectSpread2["default"])({}, cellStyle, _this.props.columnDef.cellStyle);
      }

      if (_this.props.columnDef.disableClick) {
        cellStyle.cursor = 'default';
      }

      return (0, _objectSpread2["default"])({}, _this.props.style, cellStyle);
    });
    return _this;
  }

  (0, _createClass2["default"])(MTableCell, [{
    key: "getRenderValue",
    value: function getRenderValue() {
      if (this.props.columnDef.emptyValue !== undefined && (this.props.value === undefined || this.props.value === null)) {
        return this.getEmptyValue(this.props.columnDef.emptyValue);
      }

      if (this.props.columnDef.render) {
        if (this.props.rowData) {
          return this.props.columnDef.render(this.props.rowData, 'row');
        } else {
          return this.props.columnDef.render(this.props.value, 'group');
        }
      } else if (this.props.columnDef.type === 'boolean') {
        var style = {
          textAlign: 'left',
          verticalAlign: 'middle',
          width: 48
        };

        if (this.props.value) {
          return React.createElement(this.props.icons.Check, {
            style: style
          });
        } else {
          return React.createElement(this.props.icons.ThirdStateCheck, {
            style: style
          });
        }
      } else if (this.props.columnDef.type === 'date') {
        if (this.props.value instanceof Date) {
          return this.props.value.toLocaleDateString();
        } else if (isoDateRegex.exec(this.props.value)) {
          return new Date(this.props.value).toLocaleDateString();
        } else {
          return this.props.value;
        }
      } else if (this.props.columnDef.type === 'time') {
        if (this.props.value instanceof Date) {
          return this.props.value.toLocaleTimeString();
        } else if (isoDateRegex.exec(this.props.value)) {
          return new Date(this.props.value).toLocaleTimeString();
        } else {
          return this.props.value;
        }
      } else if (this.props.columnDef.type === 'datetime') {
        if (this.props.value instanceof Date) {
          return this.props.value.toLocaleString();
        } else if (isoDateRegex.exec(this.props.value)) {
          return new Date(this.props.value).toLocaleString();
        } else {
          return this.props.value;
        }
      } else if (this.props.columnDef.type === 'currency') {
        return this.getCurrencyValue(this.props.columnDef.currencySetting, this.props.value);
      }

      return this.props.value;
    }
  }, {
    key: "getEmptyValue",
    value: function getEmptyValue(emptyValue) {
      if (typeof emptyValue === 'function') {
        return this.props.columnDef.emptyValue(this.props.rowData);
      } else {
        return emptyValue;
      }
    }
  }, {
    key: "getCurrencyValue",
    value: function getCurrencyValue(currencySetting, value) {
      if (currencySetting !== undefined) {
        return new Intl.NumberFormat(currencySetting.locale !== undefined ? currencySetting.locale : 'en-US', {
          style: 'currency',
          currency: currencySetting.currencyCode !== undefined ? currencySetting.currencyCode : 'USD',
          minimumFractionDigits: currencySetting.minimumFractionDigits !== undefined ? currencySetting.minimumFractionDigits : 2,
          maximumFractionDigits: currencySetting.maximumFractionDigits !== undefined ? currencySetting.maximumFractionDigits : 2
        }).format(value !== undefined ? value : 0);
      } else {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value !== undefined ? value : 0);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          icons = _this$props.icons,
          columnDef = _this$props.columnDef,
          rowData = _this$props.rowData,
          cellProps = (0, _objectWithoutProperties2["default"])(_this$props, ["icons", "columnDef", "rowData"]);
      return React.createElement(_TableCell["default"], (0, _extends2["default"])({
        size: this.props.size
      }, cellProps, {
        style: this.getStyle(),
        align: ['numeric', 'currency'].indexOf(this.props.columnDef.type) !== -1 ? "right" : "left",
        onClick: this.handleClickCell
      }), this.props.children, this.getRenderValue());
    }
  }]);
  return MTableCell;
}(React.Component);

exports["default"] = MTableCell;
MTableCell.defaultProps = {
  columnDef: {},
  value: undefined
};
MTableCell.propTypes = {
  columnDef: _propTypes["default"].object.isRequired,
  value: _propTypes["default"].any,
  rowData: _propTypes["default"].object
};
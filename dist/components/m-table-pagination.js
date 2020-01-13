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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _withStyles = _interopRequireDefault(require("@material-ui/core/styles/withStyles"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var React = _interopRequireWildcard(require("react"));

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */
var MTablePaginationInner =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(MTablePaginationInner, _React$Component);

  function MTablePaginationInner() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, MTablePaginationInner);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(MTablePaginationInner)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleFirstPageButtonClick", function (event) {
      _this.props.onChangePage(event, 0);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleBackButtonClick", function (event) {
      _this.props.onChangePage(event, _this.props.page - 1);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleNextButtonClick", function (event) {
      _this.props.onChangePage(event, _this.props.page + 1);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleLastPageButtonClick", function (event) {
      _this.props.onChangePage(event, Math.max(0, Math.ceil(_this.props.count / _this.props.rowsPerPage) - 1));
    });
    return _this;
  }

  (0, _createClass2["default"])(MTablePaginationInner, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          classes = _this$props.classes,
          count = _this$props.count,
          page = _this$props.page,
          rowsPerPage = _this$props.rowsPerPage,
          theme = _this$props.theme,
          showFirstLastPageButtons = _this$props.showFirstLastPageButtons;
      var localization = (0, _objectSpread2["default"])({}, MTablePaginationInner.defaultProps.localization, this.props.localization);
      return React.createElement("div", {
        className: classes.root
      }, showFirstLastPageButtons && React.createElement(_Tooltip["default"], {
        title: localization.firstTooltip
      }, React.createElement("span", null, React.createElement(_IconButton["default"], {
        onClick: this.handleFirstPageButtonClick,
        disabled: page === 0,
        "aria-label": localization.firstAriaLabel
      }, theme.direction === 'rtl' ? React.createElement(this.props.icons.LastPage, null) : React.createElement(this.props.icons.FirstPage, null)))), React.createElement(_Tooltip["default"], {
        title: localization.previousTooltip
      }, React.createElement("span", null, React.createElement(_IconButton["default"], {
        onClick: this.handleBackButtonClick,
        disabled: page === 0,
        "aria-label": localization.previousAriaLabel
      }, theme.direction === 'rtl' ? React.createElement(this.props.icons.NextPage, null) : React.createElement(this.props.icons.PreviousPage, null)))), React.createElement(_Typography["default"], {
        variant: "caption",
        style: {
          flex: 1,
          textAlign: 'center',
          alignSelf: 'center',
          flexBasis: 'inherit'
        }
      }, localization.labelDisplayedRows.replace('{from}', this.props.page * this.props.rowsPerPage + 1).replace('{to}', Math.min((this.props.page + 1) * this.props.rowsPerPage, this.props.count)).replace('{count}', this.props.count)), React.createElement(_Tooltip["default"], {
        title: localization.nextTooltip
      }, React.createElement("span", null, React.createElement(_IconButton["default"], {
        onClick: this.handleNextButtonClick,
        disabled: page >= Math.ceil(count / rowsPerPage) - 1,
        "aria-label": localization.nextAriaLabel
      }, theme.direction === 'rtl' ? React.createElement(this.props.icons.PreviousPage, null) : React.createElement(this.props.icons.NextPage, null)))), showFirstLastPageButtons && React.createElement(_Tooltip["default"], {
        title: localization.lastTooltip
      }, React.createElement("span", null, React.createElement(_IconButton["default"], {
        onClick: this.handleLastPageButtonClick,
        disabled: page >= Math.ceil(count / rowsPerPage) - 1,
        "aria-label": localization.lastAriaLabel
      }, theme.direction === 'rtl' ? React.createElement(this.props.icons.FirstPage, null) : React.createElement(this.props.icons.LastPage, null)))));
    }
  }]);
  return MTablePaginationInner;
}(React.Component);

var actionsStyles = function actionsStyles(theme) {
  return {
    root: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      display: 'flex' // lineHeight: '48px'

    }
  };
};

MTablePaginationInner.propTypes = {
  onChangePage: _propTypes["default"].func,
  page: _propTypes["default"].number,
  count: _propTypes["default"].number,
  rowsPerPage: _propTypes["default"].number,
  classes: _propTypes["default"].object,
  localization: _propTypes["default"].object,
  theme: _propTypes["default"].any,
  showFirstLastPageButtons: _propTypes["default"].bool
};
MTablePaginationInner.defaultProps = {
  showFirstLastPageButtons: true,
  localization: {
    firstTooltip: 'First Page',
    previousTooltip: 'Previous Page',
    nextTooltip: 'Next Page',
    lastTooltip: 'Last Page',
    labelDisplayedRows: '{from}-{to} of {count}',
    labelRowsPerPage: 'Rows per page:'
  }
};
var MTablePagination = (0, _withStyles["default"])(actionsStyles, {
  withTheme: true
})(MTablePaginationInner);
var _default = MTablePagination;
exports["default"] = _default;
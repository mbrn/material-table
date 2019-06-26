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

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _dateFns = _interopRequireDefault(require("@date-io/date-fns"));

var _pickers = require("@material-ui/pickers");

/* eslint-disable no-unused-vars */
var ITEM_HEIGHT = 48;
var ITEM_PADDING_TOP = 8;
var MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

var MTableFilterRow =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(MTableFilterRow, _React$Component);

  function MTableFilterRow() {
    var _getPrototypeOf2,
        _this2 = this;

    var _this;

    (0, _classCallCheck2["default"])(this, MTableFilterRow);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(MTableFilterRow)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderLookupFilter", function (columnDef) {
      return React.createElement(_core.FormControl, {
        style: {
          width: '100%'
        }
      }, React.createElement(_core.Select, {
        multiple: true,
        value: columnDef.tableData.filterValue || [],
        onChange: function onChange(event) {
          _this.props.onFilterChanged(columnDef.tableData.id, event.target.value);
        },
        input: React.createElement(_core.Input, {
          id: "select-multiple-checkbox"
        }),
        renderValue: function renderValue(selecteds) {
          return selecteds.map(function (selected) {
            return columnDef.lookup[selected];
          }).join(', ');
        },
        MenuProps: MenuProps
      }, Object.keys(columnDef.lookup).map(function (key) {
        return React.createElement(_core.MenuItem, {
          key: key,
          value: key
        }, React.createElement(_core.Checkbox, {
          checked: columnDef.tableData.filterValue ? columnDef.tableData.filterValue.indexOf(key.toString()) > -1 : false
        }), React.createElement(_core.ListItemText, {
          primary: columnDef.lookup[key]
        }));
      })));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderBooleanFilter", function (columnDef) {
      return React.createElement(_core.Checkbox, {
        indeterminate: columnDef.tableData.filterValue === undefined,
        checked: columnDef.tableData.filterValue === 'checked',
        onChange: function onChange() {
          var val;

          if (columnDef.tableData.filterValue === undefined) {
            val = 'checked';
          } else if (columnDef.tableData.filterValue === 'checked') {
            val = 'unchecked';
          }

          _this.props.onFilterChanged(columnDef.tableData.id, val);
        }
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderDefaultFilter", function (columnDef) {
      var localization = (0, _objectSpread2["default"])({}, MTableFilterRow.defaultProps.localization, _this.props.localization);
      return React.createElement(_core.TextField, {
        style: columnDef.type === 'numeric' ? {
          "float": 'right'
        } : {},
        type: columnDef.type === 'numeric' ? 'number' : 'text',
        value: columnDef.tableData.filterValue || '',
        placeholder: columnDef.filterPlaceholder || '',
        onChange: function onChange(event) {
          _this.props.onFilterChanged(columnDef.tableData.id, event.target.value);
        },
        InputProps: {
          startAdornment: React.createElement(_core.InputAdornment, {
            position: "start"
          }, React.createElement(_core.Tooltip, {
            title: localization.filterTooltip
          }, React.createElement(_this2.props.icons.Filter, null)))
        }
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderDateTypeFilter", function (columnDef) {
      var dateInputElement = null;

      var onDateInputChange = function onDateInputChange(date) {
        return _this.props.onFilterChanged(columnDef.tableData.id, date);
      };

      if (columnDef.type === 'date') {
        dateInputElement = React.createElement(_pickers.DatePicker, {
          value: columnDef.tableData.filterValue || null,
          onChange: onDateInputChange,
          clearable: true
        });
      } else if (columnDef.type === 'datetime') {
        dateInputElement = React.createElement(_pickers.DateTimePicker, {
          value: columnDef.tableData.filterValue || null,
          onChange: onDateInputChange,
          clearable: true
        });
      } else if (columnDef.type === 'time') {
        dateInputElement = React.createElement(_pickers.TimePicker, {
          value: columnDef.tableData.filterValue || null,
          onChange: onDateInputChange,
          clearable: true
        });
      }

      return React.createElement(_pickers.MuiPickersUtilsProvider, {
        utils: _dateFns["default"]
      }, dateInputElement);
    });
    return _this;
  }

  (0, _createClass2["default"])(MTableFilterRow, [{
    key: "getComponentForColumn",
    value: function getComponentForColumn(columnDef) {
      if (columnDef.filtering === false) {
        return null;
      }

      if (columnDef.field || columnDef.customFilterAndSearch) {
        if (columnDef.lookup) {
          return this.renderLookupFilter(columnDef);
        } else if (columnDef.type === 'boolean') {
          return this.renderBooleanFilter(columnDef);
        } else if (['date', 'datetime', 'time'].includes(columnDef.type)) {
          return this.renderDateTypeFilter(columnDef);
        } else {
          return this.renderDefaultFilter(columnDef);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var columns = this.props.columns.filter(function (columnDef) {
        return !columnDef.hidden && !(columnDef.tableData.groupOrder > -1);
      }).sort(function (a, b) {
        return a.tableData.columnOrder - b.tableData.columnOrder;
      }).map(function (columnDef) {
        return React.createElement(_core.TableCell, {
          key: columnDef.tableData.id,
          style: (0, _objectSpread2["default"])({}, _this3.props.filterCellStyle, columnDef.filterCellStyle)
        }, _this3.getComponentForColumn(columnDef));
      });

      if (this.props.selection) {
        columns.splice(0, 0, React.createElement(_core.TableCell, {
          padding: "none",
          key: "key-selection-column"
        }));
      }

      if (this.props.emptyCell && this.props.hasActions) {
        if (this.props.actionsColumnIndex === -1) {
          columns.push(React.createElement(_core.TableCell, {
            key: "key-action-column"
          }));
        } else {
          var endPos = 0;

          if (this.props.selection) {
            endPos = 1;
          }

          columns.splice(this.props.actionsColumnIndex + endPos, 0, React.createElement(_core.TableCell, {
            key: "key-action-column"
          }));
        }
      }

      if (this.props.hasDetailPanel) {
        columns.splice(0, 0, React.createElement(_core.TableCell, {
          padding: "none",
          key: "key-detail-panel-column"
        }));
      }

      if (this.props.isTreeData > 0) {
        columns.splice(0, 0, React.createElement(_core.TableCell, {
          padding: "none",
          key: "key-tree-data-filter"
        }));
      }

      this.props.columns.filter(function (columnDef) {
        return columnDef.tableData.groupOrder > -1;
      }).forEach(function (columnDef) {
        columns.splice(0, 0, React.createElement(_core.TableCell, {
          padding: "checkbox",
          key: "key-group-filter" + columnDef.tableData.id
        }));
      });
      return React.createElement(_core.TableRow, {
        style: {
          height: 10
        }
      }, columns);
    }
  }]);
  return MTableFilterRow;
}(React.Component);

MTableFilterRow.defaultProps = {
  emptyCell: false,
  columns: [],
  selection: false,
  hasActions: false,
  localization: {
    filterTooltip: 'Filter'
  }
};
MTableFilterRow.propTypes = {
  emptyCell: _propTypes["default"].bool,
  columns: _propTypes["default"].array.isRequired,
  hasDetailPanel: _propTypes["default"].bool.isRequired,
  isTreeData: _propTypes["default"].bool.isRequired,
  onFilterChanged: _propTypes["default"].func.isRequired,
  filterCellStyle: _propTypes["default"].object,
  selection: _propTypes["default"].bool.isRequired,
  actionsColumnIndex: _propTypes["default"].number,
  hasActions: _propTypes["default"].bool,
  localization: _propTypes["default"].object
};
var _default = MTableFilterRow;
exports["default"] = _default;
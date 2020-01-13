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

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

var _Input = _interopRequireDefault(require("@material-ui/core/Input"));

var _InputLabel = _interopRequireDefault(require("@material-ui/core/InputLabel"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _InputAdornment = _interopRequireDefault(require("@material-ui/core/InputAdornment"));

var _Icon = _interopRequireDefault(require("@material-ui/core/Icon"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderFilterComponent", function (columnDef) {
      return React.createElement(columnDef.filterComponent, {
        columnDef: columnDef,
        onFilterChanged: _this.props.onFilterChanged
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderLookupFilter", function (columnDef) {
      return React.createElement(_FormControl["default"], {
        style: {
          width: '100%'
        }
      }, React.createElement(_InputLabel["default"], {
        htmlFor: "select-multiple-checkbox"
      }, columnDef.filterPlaceholder), React.createElement(_Select["default"], {
        multiple: true,
        value: columnDef.tableData.filterValue || [],
        onChange: function onChange(event) {
          _this.props.onFilterChanged(columnDef.tableData.id, event.target.value);
        },
        input: React.createElement(_Input["default"], {
          id: "select-multiple-checkbox"
        }),
        renderValue: function renderValue(selecteds) {
          return selecteds.map(function (selected) {
            return columnDef.lookup[selected];
          }).join(', ');
        },
        MenuProps: MenuProps,
        style: {
          marginTop: 0
        }
      }, Object.keys(columnDef.lookup).map(function (key) {
        return React.createElement(_MenuItem["default"], {
          key: key,
          value: key
        }, React.createElement(_Checkbox["default"], {
          checked: columnDef.tableData.filterValue ? columnDef.tableData.filterValue.indexOf(key.toString()) > -1 : false
        }), React.createElement(_ListItemText["default"], {
          primary: columnDef.lookup[key]
        }));
      })));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderBooleanFilter", function (columnDef) {
      return React.createElement(_Checkbox["default"], {
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
      return React.createElement(_TextField["default"], {
        style: columnDef.type === 'numeric' ? {
          "float": 'right'
        } : {},
        type: columnDef.type === 'numeric' ? 'number' : 'search',
        value: columnDef.tableData.filterValue || '',
        placeholder: columnDef.filterPlaceholder || '',
        onChange: function onChange(event) {
          _this.props.onFilterChanged(columnDef.tableData.id, event.target.value);
        },
        InputProps: _this.props.hideFilterIcons || columnDef.hideFilterIcon ? undefined : {
          startAdornment: React.createElement(_InputAdornment["default"], {
            position: "start"
          }, React.createElement(_Tooltip["default"], {
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
        utils: _dateFns["default"],
        locale: _this.props.localization.dateTimePickerLocalization
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
        if (columnDef.filterComponent) {
          return this.renderFilterComponent(columnDef);
        } else if (columnDef.lookup) {
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
        return React.createElement(_TableCell["default"], {
          key: columnDef.tableData.id,
          style: (0, _objectSpread2["default"])({}, _this3.props.filterCellStyle, columnDef.filterCellStyle)
        }, _this3.getComponentForColumn(columnDef));
      });

      if (this.props.selection) {
        columns.splice(0, 0, React.createElement(_TableCell["default"], {
          padding: "none",
          key: "key-selection-column"
        }));
      }

      if (this.props.hasActions) {
        if (this.props.actionsColumnIndex === -1) {
          columns.push(React.createElement(_TableCell["default"], {
            key: "key-action-column"
          }));
        } else {
          var endPos = 0;

          if (this.props.selection) {
            endPos = 1;
          }

          columns.splice(this.props.actionsColumnIndex + endPos, 0, React.createElement(_TableCell["default"], {
            key: "key-action-column"
          }));
        }
      }

      if (this.props.hasDetailPanel) {
        columns.splice(0, 0, React.createElement(_TableCell["default"], {
          padding: "none",
          key: "key-detail-panel-column"
        }));
      }

      if (this.props.isTreeData > 0) {
        columns.splice(0, 0, React.createElement(_TableCell["default"], {
          padding: "none",
          key: "key-tree-data-filter"
        }));
      }

      this.props.columns.filter(function (columnDef) {
        return columnDef.tableData.groupOrder > -1;
      }).forEach(function (columnDef) {
        columns.splice(0, 0, React.createElement(_TableCell["default"], {
          padding: "checkbox",
          key: "key-group-filter" + columnDef.tableData.id
        }));
      });
      return React.createElement(_TableRow["default"], {
        style: {
          height: 10
        }
      }, columns);
    }
  }]);
  return MTableFilterRow;
}(React.Component);

MTableFilterRow.defaultProps = {
  columns: [],
  selection: false,
  hasActions: false,
  localization: {
    filterTooltip: 'Filter'
  },
  hideFilterIcons: false
};
MTableFilterRow.propTypes = {
  columns: _propTypes["default"].array.isRequired,
  hasDetailPanel: _propTypes["default"].bool.isRequired,
  isTreeData: _propTypes["default"].bool.isRequired,
  onFilterChanged: _propTypes["default"].func.isRequired,
  filterCellStyle: _propTypes["default"].object,
  selection: _propTypes["default"].bool.isRequired,
  actionsColumnIndex: _propTypes["default"].number,
  hasActions: _propTypes["default"].bool,
  localization: _propTypes["default"].object,
  hideFilterIcons: _propTypes["default"].bool
};
var _default = MTableFilterRow;
exports["default"] = _default;
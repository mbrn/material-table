"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.styles = exports.MTableHeader = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _TableHead = _interopRequireDefault(require("@material-ui/core/TableHead"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableSortLabel = _interopRequireDefault(require("@material-ui/core/TableSortLabel"));

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _withStyles = _interopRequireDefault(require("@material-ui/core/styles/withStyles"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */
var MTableHeader =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(MTableHeader, _React$Component);

  function MTableHeader() {
    (0, _classCallCheck2["default"])(this, MTableHeader);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(MTableHeader).apply(this, arguments));
  }

  (0, _createClass2["default"])(MTableHeader, [{
    key: "renderHeader",
    value: function renderHeader() {
      var _this = this;

      var mapArr = this.props.columns.filter(function (columnDef) {
        return !columnDef.hidden && !(columnDef.tableData.groupOrder > -1);
      }).sort(function (a, b) {
        return a.tableData.columnOrder - b.tableData.columnOrder;
      }).map(function (columnDef, index) {
        var content = columnDef.title;

        if (_this.props.draggable) {
          content = React.createElement(_reactBeautifulDnd.Draggable, {
            key: columnDef.tableData.id,
            draggableId: columnDef.tableData.id.toString(),
            index: index
          }, function (provided, snapshot) {
            return React.createElement("div", (0, _extends2["default"])({
              ref: provided.innerRef
            }, provided.draggableProps, provided.dragHandleProps), columnDef.title);
          });
        }

        if (columnDef.sorting !== false && _this.props.sorting) {
          content = React.createElement(_TableSortLabel["default"], {
            IconComponent: _this.props.icons.SortArrow,
            active: _this.props.orderBy === columnDef.tableData.id,
            direction: _this.props.orderDirection || 'asc',
            onClick: function onClick() {
              var orderDirection = columnDef.tableData.id !== _this.props.orderBy ? 'asc' : _this.props.orderDirection === 'asc' ? 'desc' : _this.props.orderDirection === 'desc' && _this.props.thirdSortClick ? '' : _this.props.orderDirection === 'desc' && !_this.props.thirdSortClick ? 'asc' : _this.props.orderDirection === '' ? 'asc' : 'desc';

              _this.props.onOrderChange(columnDef.tableData.id, orderDirection);
            }
          }, content);
        }

        return React.createElement(_TableCell["default"], {
          key: columnDef.tableData.id,
          align: ['numeric'].indexOf(columnDef.type) !== -1 ? "right" : "left",
          className: _this.props.classes.header,
          style: (0, _objectSpread2["default"])({}, _this.props.headerStyle, columnDef.headerStyle)
        }, content);
      });
      return mapArr;
    }
  }, {
    key: "renderActionsHeader",
    value: function renderActionsHeader() {
      var localization = (0, _objectSpread2["default"])({}, MTableHeader.defaultProps.localization, this.props.localization);
      return React.createElement(_TableCell["default"], {
        key: "key-actions-column",
        padding: "checkbox",
        className: this.props.classes.header,
        style: (0, _objectSpread2["default"])({}, this.props.headerStyle, {
          textAlign: 'center'
        })
      }, React.createElement(_TableSortLabel["default"], {
        disabled: true
      }, localization.actions));
    }
  }, {
    key: "renderSelectionHeader",
    value: function renderSelectionHeader() {
      var _this2 = this;

      return React.createElement(_TableCell["default"], {
        padding: "none",
        key: "key-selection-column",
        className: this.props.classes.header,
        style: (0, _objectSpread2["default"])({}, this.props.headerStyle)
      }, this.props.showSelectAllCheckbox && React.createElement(_Checkbox["default"], {
        indeterminate: this.props.selectedCount > 0 && this.props.selectedCount < this.props.dataCount,
        checked: this.props.dataCount > 0 && this.props.selectedCount === this.props.dataCount,
        onChange: function onChange(event, checked) {
          return _this2.props.onAllSelected && _this2.props.onAllSelected(checked);
        }
      }));
    }
  }, {
    key: "renderDetailPanelColumnCell",
    value: function renderDetailPanelColumnCell() {
      return React.createElement(_TableCell["default"], {
        padding: "none",
        key: "key-detail-panel-column",
        className: this.props.classes.header,
        style: (0, _objectSpread2["default"])({}, this.props.headerStyle)
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var headers = this.renderHeader();

      if (this.props.hasSelection) {
        headers.splice(0, 0, this.renderSelectionHeader());
      }

      if (this.props.showActionsColumn) {
        if (this.props.actionsHeaderIndex >= 0) {
          var endPos = 0;

          if (this.props.hasSelection) {
            endPos = 1;
          }

          headers.splice(this.props.actionsHeaderIndex + endPos, 0, this.renderActionsHeader());
        } else if (this.props.actionsHeaderIndex === -1) {
          headers.push(this.renderActionsHeader());
        }
      }

      if (this.props.hasDetailPanel) {
        if (this.props.detailPanelColumnAlignment === 'right') {
          headers.push(this.renderDetailPanelColumnCell());
        } else {
          headers.splice(0, 0, this.renderDetailPanelColumnCell());
        }
      }

      if (this.props.isTreeData > 0) {
        headers.splice(0, 0, React.createElement(_TableCell["default"], {
          padding: "none",
          key: "key-tree-data-header",
          className: this.props.classes.header,
          style: (0, _objectSpread2["default"])({}, this.props.headerStyle)
        }));
      }

      this.props.columns.filter(function (columnDef) {
        return columnDef.tableData.groupOrder > -1;
      }).forEach(function (columnDef) {
        headers.splice(0, 0, React.createElement(_TableCell["default"], {
          padding: "checkbox",
          key: "key-group-header" + columnDef.tableData.id,
          className: _this3.props.classes.header
        }));
      });
      return React.createElement(_TableHead["default"], null, React.createElement(_TableRow["default"], null, headers));
    }
  }]);
  return MTableHeader;
}(React.Component);

exports.MTableHeader = MTableHeader;
MTableHeader.defaultProps = {
  dataCount: 0,
  hasSelection: false,
  headerStyle: {},
  selectedCount: 0,
  sorting: true,
  localization: {
    actions: 'Actions'
  },
  orderBy: undefined,
  orderDirection: 'asc',
  actionsHeaderIndex: 0,
  detailPanelColumnAlignment: "left",
  draggable: true,
  thirdSortClick: true
};
MTableHeader.propTypes = {
  columns: _propTypes["default"].array.isRequired,
  dataCount: _propTypes["default"].number,
  hasDetailPanel: _propTypes["default"].bool.isRequired,
  detailPanelColumnAlignment: _propTypes["default"].string,
  hasSelection: _propTypes["default"].bool,
  headerStyle: _propTypes["default"].object,
  localization: _propTypes["default"].object,
  selectedCount: _propTypes["default"].number,
  sorting: _propTypes["default"].bool,
  onAllSelected: _propTypes["default"].func,
  onOrderChange: _propTypes["default"].func,
  orderBy: _propTypes["default"].number,
  orderDirection: _propTypes["default"].string,
  actionsHeaderIndex: _propTypes["default"].number,
  showActionsColumn: _propTypes["default"].bool,
  showSelectAllCheckbox: _propTypes["default"].bool,
  draggable: _propTypes["default"].bool,
  thirdSortClick: _propTypes["default"].bool
};

var styles = function styles(theme) {
  return {
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 10,
      backgroundColor: theme.palette.background.paper // Change according to theme,

    }
  };
};

exports.styles = styles;

var _default = (0, _withStyles["default"])(styles)(MTableHeader);

exports["default"] = _default;
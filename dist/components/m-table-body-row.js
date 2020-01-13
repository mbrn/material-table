"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Icon = _interopRequireDefault(require("@material-ui/core/Icon"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var React = _interopRequireWildcard(require("react"));

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */
var MTableBodyRow =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(MTableBodyRow, _React$Component);

  function MTableBodyRow() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, MTableBodyRow);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(MTableBodyRow)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "rotateIconStyle", function (isOpen) {
      return {
        transform: isOpen ? 'rotate(90deg)' : 'none'
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getElementSize", function () {
      return _this.props.options.padding === 'default' ? 'medium' : 'small';
    });
    return _this;
  }

  (0, _createClass2["default"])(MTableBodyRow, [{
    key: "renderColumns",
    value: function renderColumns() {
      var _this2 = this;

      var size = this.getElementSize();
      var mapArr = this.props.columns.filter(function (columnDef) {
        return !columnDef.hidden && !(columnDef.tableData.groupOrder > -1);
      }).sort(function (a, b) {
        return a.tableData.columnOrder - b.tableData.columnOrder;
      }).map(function (columnDef, index) {
        var value = _this2.props.getFieldValue(_this2.props.data, columnDef);

        return React.createElement(_this2.props.components.Cell, {
          size: size,
          icons: _this2.props.icons,
          columnDef: (0, _objectSpread2["default"])({
            cellStyle: _this2.props.options.cellStyle
          }, columnDef),
          value: value,
          key: "cell-" + _this2.props.data.tableData.id + "-" + columnDef.tableData.id,
          rowData: _this2.props.data
        });
      });
      return mapArr;
    }
  }, {
    key: "renderActions",
    value: function renderActions() {
      var size = this.getElementSize();
      var baseIconSize = size === 'medium' ? 42 : 26;
      var actions = this.props.actions.filter(function (a) {
        return a.position === "row" || typeof a === "function";
      });
      return React.createElement(_TableCell["default"], {
        size: size,
        padding: "none",
        key: "key-actions-column",
        style: (0, _objectSpread2["default"])({
          width: baseIconSize * actions.length,
          padding: '0px 5px'
        }, this.props.options.actionsCellStyle)
      }, React.createElement("div", {
        style: {
          display: 'flex'
        }
      }, React.createElement(this.props.components.Actions, {
        data: this.props.data,
        actions: actions,
        components: this.props.components,
        size: size,
        disabled: this.props.hasAnyEditingRow
      })));
    }
  }, {
    key: "renderSelectionColumn",
    value: function renderSelectionColumn() {
      var _this3 = this;

      var checkboxProps = this.props.options.selectionProps || {};

      if (typeof checkboxProps === 'function') {
        checkboxProps = checkboxProps(this.props.data);
      }

      var size = this.getElementSize();
      var baseIconSize = size === 'medium' ? 42 : 26;
      var styles = size === 'medium' ? {
        marginLeft: this.props.level * 9
      } : {
        padding: "4px",
        marginLeft: 5 + this.props.level * 9
      };
      return React.createElement(_TableCell["default"], {
        size: this.getElementSize(),
        padding: "none",
        key: "key-selection-column",
        style: {
          width: baseIconSize + 9 * (this.props.treeDataMaxLevel - 1)
        }
      }, React.createElement(_Checkbox["default"], (0, _extends2["default"])({
        size: size,
        checked: this.props.data.tableData.checked === true,
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
        value: this.props.data.tableData.id.toString(),
        onChange: function onChange(event) {
          return _this3.props.onRowSelected(event, _this3.props.path, _this3.props.data);
        },
        style: styles
      }, checkboxProps)));
    }
  }, {
    key: "renderDetailPanelColumn",
    value: function renderDetailPanelColumn() {
      var _this4 = this;

      var CustomIcon = function CustomIcon(_ref) {
        var icon = _ref.icon,
            iconProps = _ref.iconProps;
        return typeof icon === "string" ? React.createElement(_Icon["default"], iconProps, icon) : React.createElement(icon, (0, _objectSpread2["default"])({}, iconProps));
      };

      if (typeof this.props.detailPanel == 'function') {
        return React.createElement(_TableCell["default"], {
          size: this.getElementSize(),
          padding: "none",
          key: "key-detail-panel-column",
          style: {
            width: 42,
            textAlign: 'center'
          }
        }, React.createElement(_IconButton["default"], {
          size: this.getElementSize(),
          style: (0, _objectSpread2["default"])({
            transition: 'all ease 200ms'
          }, this.rotateIconStyle(this.props.data.tableData.showDetailPanel)),
          onClick: function onClick(event) {
            _this4.props.onToggleDetailPanel(_this4.props.path, _this4.props.detailPanel);

            event.stopPropagation();
          }
        }, React.createElement(this.props.icons.DetailPanel, null)));
      } else {
        return React.createElement(_TableCell["default"], {
          size: this.getElementSize(),
          padding: "none",
          key: "key-detail-panel-column"
        }, React.createElement("div", {
          style: {
            width: 42 * this.props.detailPanel.length,
            textAlign: 'center',
            display: 'flex'
          }
        }, this.props.detailPanel.map(function (panel, index) {
          if (typeof panel === "function") {
            panel = panel(_this4.props.data);
          }

          var isOpen = (_this4.props.data.tableData.showDetailPanel || '').toString() === panel.render.toString();
          var iconButton = React.createElement(_this4.props.icons.DetailPanel, null);
          var animation = true;

          if (isOpen) {
            if (panel.openIcon) {
              iconButton = React.createElement(CustomIcon, {
                icon: panel.openIcon,
                iconProps: panel.iconProps
              });
              animation = false;
            } else if (panel.icon) {
              iconButton = React.createElement(CustomIcon, {
                icon: panel.icon,
                iconProps: panel.iconProps
              });
            }
          } else if (panel.icon) {
            iconButton = React.createElement(CustomIcon, {
              icon: panel.icon,
              iconProps: panel.iconProps
            });
            animation = false;
          }

          iconButton = React.createElement(_IconButton["default"], {
            size: _this4.getElementSize(),
            key: "key-detail-panel-" + index,
            style: (0, _objectSpread2["default"])({
              transition: 'all ease 200ms'
            }, _this4.rotateIconStyle(animation && isOpen)),
            disabled: panel.disabled,
            onClick: function onClick(event) {
              _this4.props.onToggleDetailPanel(_this4.props.path, panel.render);

              event.stopPropagation();
            }
          }, iconButton);

          if (panel.tooltip) {
            iconButton = React.createElement(_Tooltip["default"], {
              key: "key-detail-panel-" + index,
              title: panel.tooltip
            }, iconButton);
          }

          return iconButton;
        })));
      }
    }
  }, {
    key: "getStyle",
    value: function getStyle(index, level) {
      var style = {
        transition: 'all ease 300ms'
      };

      if (typeof this.props.options.rowStyle === "function") {
        style = (0, _objectSpread2["default"])({}, style, this.props.options.rowStyle(this.props.data, index, level));
      } else if (this.props.options.rowStyle) {
        style = (0, _objectSpread2["default"])({}, style, this.props.options.rowStyle);
      }

      if (this.props.onRowClick) {
        style.cursor = 'pointer';
      }

      if (this.props.hasAnyEditingRow) {
        style.opacity = 0.2;
      }

      return style;
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var renderColumns = this.renderColumns();

      if (this.props.options.selection) {
        renderColumns.splice(0, 0, this.renderSelectionColumn());
      }

      if (this.props.actions && this.props.actions.filter(function (a) {
        return a.position === "row" || typeof a === "function";
      }).length > 0) {
        if (this.props.options.actionsColumnIndex === -1) {
          renderColumns.push(this.renderActions());
        } else if (this.props.options.actionsColumnIndex >= 0) {
          var endPos = 0;

          if (this.props.options.selection) {
            endPos = 1;
          }

          renderColumns.splice(this.props.options.actionsColumnIndex + endPos, 0, this.renderActions());
        }
      }

      if (this.props.isTreeData) {
        if (this.props.data.tableData.childRows && this.props.data.tableData.childRows.length > 0) {
          renderColumns.splice(0, 0, React.createElement(_TableCell["default"], {
            size: this.getElementSize(),
            padding: "none",
            key: "key-tree-data-column",
            style: {
              width: 48 + 9 * (this.props.treeDataMaxLevel - 2)
            }
          }, React.createElement(_IconButton["default"], {
            size: this.getElementSize(),
            style: (0, _objectSpread2["default"])({
              transition: 'all ease 200ms',
              marginLeft: this.props.level * 9
            }, this.rotateIconStyle(this.props.data.tableData.isTreeExpanded)),
            onClick: function onClick(event) {
              _this5.props.onTreeExpandChanged(_this5.props.path, _this5.props.data);

              event.stopPropagation();
            }
          }, React.createElement(this.props.icons.DetailPanel, null))));
        } else {
          renderColumns.splice(0, 0, React.createElement(_TableCell["default"], {
            padding: "none",
            key: "key-tree-data-column"
          }));
        }
      } // Lastly we add detail panel icon


      if (this.props.detailPanel) {
        if (this.props.options.detailPanelColumnAlignment === 'right') {
          renderColumns.push(this.renderDetailPanelColumn());
        } else {
          renderColumns.splice(0, 0, this.renderDetailPanelColumn());
        }
      }

      this.props.columns.filter(function (columnDef) {
        return columnDef.tableData.groupOrder > -1;
      }).forEach(function (columnDef) {
        renderColumns.splice(0, 0, React.createElement(_TableCell["default"], {
          size: _this5.getElementSize(),
          padding: "none",
          key: "key-group-cell" + columnDef.tableData.id
        }));
      });
      var _this$props = this.props,
          icons = _this$props.icons,
          data = _this$props.data,
          columns = _this$props.columns,
          components = _this$props.components,
          detailPanel = _this$props.detailPanel,
          getFieldValue = _this$props.getFieldValue,
          isTreeData = _this$props.isTreeData,
          onRowClick = _this$props.onRowClick,
          onRowSelected = _this$props.onRowSelected,
          onTreeExpandChanged = _this$props.onTreeExpandChanged,
          onToggleDetailPanel = _this$props.onToggleDetailPanel,
          onEditingCanceled = _this$props.onEditingCanceled,
          onEditingApproved = _this$props.onEditingApproved,
          options = _this$props.options,
          hasAnyEditingRow = _this$props.hasAnyEditingRow,
          treeDataMaxLevel = _this$props.treeDataMaxLevel,
          localization = _this$props.localization,
          actions = _this$props.actions,
          rowProps = (0, _objectWithoutProperties2["default"])(_this$props, ["icons", "data", "columns", "components", "detailPanel", "getFieldValue", "isTreeData", "onRowClick", "onRowSelected", "onTreeExpandChanged", "onToggleDetailPanel", "onEditingCanceled", "onEditingApproved", "options", "hasAnyEditingRow", "treeDataMaxLevel", "localization", "actions"]);
      return React.createElement(React.Fragment, null, React.createElement(_TableRow["default"], (0, _extends2["default"])({
        selected: hasAnyEditingRow
      }, rowProps, {
        hover: onRowClick ? true : false,
        style: this.getStyle(this.props.index, this.props.level),
        onClick: function onClick(event) {
          onRowClick && onRowClick(event, _this5.props.data, function (panelIndex) {
            var panel = detailPanel;

            if (Array.isArray(panel)) {
              panel = panel[panelIndex || 0];

              if (typeof panel === "function") {
                panel = panel(_this5.props.data);
              }

              panel = panel.render;
            }

            onToggleDetailPanel(_this5.props.path, panel);
          });
        }
      }), renderColumns), this.props.data.tableData.childRows && this.props.data.tableData.isTreeExpanded && this.props.data.tableData.childRows.map(function (data, index) {
        if (data.tableData.editing) {
          return React.createElement(_this5.props.components.EditRow, {
            columns: _this5.props.columns.filter(function (columnDef) {
              return !columnDef.hidden;
            }),
            components: _this5.props.components,
            data: data,
            icons: _this5.props.icons,
            localization: _this5.props.localization,
            getFieldValue: _this5.props.getFieldValue,
            key: index,
            mode: data.tableData.editing,
            options: _this5.props.options,
            isTreeData: _this5.props.isTreeData,
            detailPanel: _this5.props.detailPanel,
            onEditingCanceled: onEditingCanceled,
            onEditingApproved: onEditingApproved
          });
        } else {
          return React.createElement(_this5.props.components.Row, (0, _extends2["default"])({}, _this5.props, {
            data: data,
            index: index,
            key: index,
            level: _this5.props.level + 1,
            path: [].concat((0, _toConsumableArray2["default"])(_this5.props.path), [index]),
            onEditingCanceled: onEditingCanceled,
            onEditingApproved: onEditingApproved,
            hasAnyEditingRow: _this5.props.hasAnyEditingRow,
            treeDataMaxLevel: treeDataMaxLevel
          }));
        }
      }), this.props.data.tableData && this.props.data.tableData.showDetailPanel && React.createElement(_TableRow["default"] // selected={this.props.index % 2 === 0}
      , null, React.createElement(_TableCell["default"], {
        size: this.getElementSize(),
        colSpan: renderColumns.length,
        padding: "none"
      }, this.props.data.tableData.showDetailPanel(this.props.data))));
    }
  }]);
  return MTableBodyRow;
}(React.Component);

exports["default"] = MTableBodyRow;
MTableBodyRow.defaultProps = {
  actions: [],
  index: 0,
  data: {},
  options: {},
  path: []
};
MTableBodyRow.propTypes = {
  actions: _propTypes["default"].array,
  icons: _propTypes["default"].any.isRequired,
  index: _propTypes["default"].number.isRequired,
  data: _propTypes["default"].object.isRequired,
  detailPanel: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]))]),
  hasAnyEditingRow: _propTypes["default"].bool,
  options: _propTypes["default"].object.isRequired,
  onRowSelected: _propTypes["default"].func,
  path: _propTypes["default"].arrayOf(_propTypes["default"].number),
  treeDataMaxLevel: _propTypes["default"].number,
  getFieldValue: _propTypes["default"].func.isRequired,
  columns: _propTypes["default"].array,
  onToggleDetailPanel: _propTypes["default"].func.isRequired,
  onRowClick: _propTypes["default"].func,
  onEditingApproved: _propTypes["default"].func,
  onEditingCanceled: _propTypes["default"].func
};
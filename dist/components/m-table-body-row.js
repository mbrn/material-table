"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(
  require("@babel/runtime/helpers/toConsumableArray")
);

var _objectWithoutProperties2 = _interopRequireDefault(
  require("@babel/runtime/helpers/objectWithoutProperties")
);

var _extends2 = _interopRequireDefault(
  require("@babel/runtime/helpers/extends")
);

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

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _IconButton = _interopRequireDefault(
  require("@material-ui/core/IconButton")
);

var _Icon = _interopRequireDefault(require("@material-ui/core/Icon"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var React = _interopRequireWildcard(require("react"));

var CommonValues = _interopRequireWildcard(require("../utils/common-values"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

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
var MTableBodyRow = /*#__PURE__*/ (function (_React$Component) {
  (0, _inherits2["default"])(MTableBodyRow, _React$Component);

  var _super = _createSuper(MTableBodyRow);

  function MTableBodyRow() {
    var _this;

    (0, _classCallCheck2["default"])(this, MTableBodyRow);

    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])(
      (0, _assertThisInitialized2["default"])(_this),
      "rotateIconStyle",
      function (isOpen) {
        return {
          transform: isOpen ? "rotate(90deg)" : "none",
        };
      }
    );
    return _this;
  }

  (0, _createClass2["default"])(MTableBodyRow, [
    {
      key: "renderColumns",
      value: function renderColumns() {
        var _this2 = this;

        var size = CommonValues.elementSize(this.props);
        var mapArr = this.props.columns
          .filter(function (columnDef) {
            return !columnDef.hidden && !(columnDef.tableData.groupOrder > -1);
          })
          .sort(function (a, b) {
            return a.tableData.columnOrder - b.tableData.columnOrder;
          })
          .map(function (columnDef, index) {
            var value = _this2.props.getFieldValue(
              _this2.props.data,
              columnDef
            );

            if (
              _this2.props.data.tableData.editCellList &&
              _this2.props.data.tableData.editCellList.find(function (c) {
                return c.tableData.id === columnDef.tableData.id;
              })
            ) {
              return /*#__PURE__*/ React.createElement(
                _this2.props.components.EditCell,
                {
                  components: _this2.props.components,
                  icons: _this2.props.icons,
                  localization: _this2.props.localization,
                  columnDef: columnDef,
                  size: size,
                  key:
                    "cell-" +
                    _this2.props.data.tableData.id +
                    "-" +
                    columnDef.tableData.id,
                  rowData: _this2.props.data,
                  cellEditable: _this2.props.cellEditable,
                  onCellEditFinished: _this2.props.onCellEditFinished,
                  scrollWidth: _this2.props.scrollWidth,
                }
              );
            } else {
              return /*#__PURE__*/ React.createElement(
                _this2.props.components.Cell,
                {
                  size: size,
                  errorState: _this2.props.errorState,
                  icons: _this2.props.icons,
                  columnDef: (0, _objectSpread2["default"])(
                    {
                      cellStyle: _this2.props.options.cellStyle,
                    },
                    columnDef
                  ),
                  value: value,
                  key:
                    "cell-" +
                    _this2.props.data.tableData.id +
                    "-" +
                    columnDef.tableData.id,
                  rowData: _this2.props.data,
                  cellEditable:
                    columnDef.editable !== "never" &&
                    !!_this2.props.cellEditable,
                  onCellEditStarted: _this2.props.onCellEditStarted,
                  scrollWidth: _this2.props.scrollWidth,
                }
              );
            }
          });
        return mapArr;
      },
    },
    {
      key: "renderActions",
      value: function renderActions() {
        var size = CommonValues.elementSize(this.props);
        var actions = CommonValues.rowActions(this.props);
        var width = actions.length * CommonValues.baseIconSize(this.props);
        return /*#__PURE__*/ React.createElement(
          _TableCell["default"],
          {
            size: size,
            padding: "none",
            key: "key-actions-column",
            style: (0, _objectSpread2["default"])(
              {
                width: width,
                padding: "0px 5px",
                boxSizing: "border-box",
              },
              this.props.options.actionsCellStyle
            ),
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              style: {
                display: "flex",
              },
            },
            /*#__PURE__*/ React.createElement(this.props.components.Actions, {
              data: this.props.data,
              actions: actions,
              components: this.props.components,
              size: size,
              disabled: this.props.hasAnyEditingRow,
            })
          )
        );
      },
    },
    {
      key: "renderSelectionColumn",
      value: function renderSelectionColumn() {
        var _this3 = this;

        var checkboxProps = this.props.options.selectionProps || {};

        if (typeof checkboxProps === "function") {
          checkboxProps = checkboxProps(this.props.data);
        }

        var size = CommonValues.elementSize(this.props);
        var selectionWidth = CommonValues.selectionMaxWidth(
          this.props,
          this.props.treeDataMaxLevel
        );
        var styles =
          size === "medium"
            ? {
                marginLeft: this.props.level * 9,
              }
            : {
                padding: "4px",
                marginLeft: 5 + this.props.level * 9,
              };
        return /*#__PURE__*/ React.createElement(
          _TableCell["default"],
          {
            size: size,
            padding: "none",
            key: "key-selection-column",
            style: {
              width: selectionWidth,
            },
          },
          /*#__PURE__*/ React.createElement(
            _Checkbox["default"],
            (0, _extends2["default"])(
              {
                size: size,
                checked: this.props.data.tableData.checked === true,
                onClick: function onClick(e) {
                  return e.stopPropagation();
                },
                value: this.props.data.tableData.id.toString(),
                onChange: function onChange(event) {
                  return _this3.props.onRowSelected(
                    event,
                    _this3.props.path,
                    _this3.props.data
                  );
                },
                style: styles,
              },
              checkboxProps
            )
          )
        );
      },
    },
    {
      key: "renderDraggableColumn",
      value: function renderDraggableColumn() {
        var draggableOptions = this.props.options.draggableRowsOptions;
        return /*#__PURE__*/ React.createElement(_TableCell["default"], {
          padding: "none",
          key: "key-drag-column",
          style: {
            width: draggableOptions.dragCellWidth,
          },
        });
      },
    },
    {
      key: "renderDetailPanelColumn",
      value: function renderDetailPanelColumn() {
        var _this4 = this;

        var size = CommonValues.elementSize(this.props);

        var CustomIcon = function CustomIcon(_ref) {
          var icon = _ref.icon,
            iconProps = _ref.iconProps;
          return typeof icon === "string"
            ? /*#__PURE__*/ React.createElement(
                _Icon["default"],
                iconProps,
                icon
              )
            : React.createElement(
                icon,
                (0, _objectSpread2["default"])({}, iconProps)
              );
        };

        if (typeof this.props.detailPanel == "function") {
          return /*#__PURE__*/ React.createElement(
            _TableCell["default"],
            {
              size: size,
              padding: "none",
              key: "key-detail-panel-column",
              style: (0, _objectSpread2["default"])(
                {
                  width: 42,
                  textAlign: "center",
                },
                this.props.options.detailPanelColumnStyle
              ),
            },
            /*#__PURE__*/ React.createElement(
              _IconButton["default"],
              {
                size: size,
                style: (0, _objectSpread2["default"])(
                  {
                    transition: "all ease 200ms",
                  },
                  this.rotateIconStyle(
                    this.props.data.tableData.showDetailPanel
                  )
                ),
                onClick: function onClick(event) {
                  _this4.props.onToggleDetailPanel(
                    _this4.props.path,
                    _this4.props.detailPanel
                  );

                  event.stopPropagation();
                },
              },
              /*#__PURE__*/ React.createElement(
                this.props.icons.DetailPanel,
                null
              )
            )
          );
        } else {
          return /*#__PURE__*/ React.createElement(
            _TableCell["default"],
            {
              size: size,
              padding: "none",
              key: "key-detail-panel-column",
            },
            /*#__PURE__*/ React.createElement(
              "div",
              {
                style: (0, _objectSpread2["default"])(
                  {
                    width: 42 * this.props.detailPanel.length,
                    textAlign: "center",
                    display: "flex",
                  },
                  this.props.options.detailPanelColumnStyle
                ),
              },
              this.props.detailPanel.map(function (panel, index) {
                if (typeof panel === "function") {
                  panel = panel(_this4.props.data);
                }

                var isOpen =
                  (
                    _this4.props.data.tableData.showDetailPanel || ""
                  ).toString() === panel.render.toString();
                var iconButton = /*#__PURE__*/ React.createElement(
                  _this4.props.icons.DetailPanel,
                  null
                );
                var animation = true;

                if (isOpen) {
                  if (panel.openIcon) {
                    iconButton = /*#__PURE__*/ React.createElement(CustomIcon, {
                      icon: panel.openIcon,
                      iconProps: panel.iconProps,
                    });
                    animation = false;
                  } else if (panel.icon) {
                    iconButton = /*#__PURE__*/ React.createElement(CustomIcon, {
                      icon: panel.icon,
                      iconProps: panel.iconProps,
                    });
                  }
                } else if (panel.icon) {
                  iconButton = /*#__PURE__*/ React.createElement(CustomIcon, {
                    icon: panel.icon,
                    iconProps: panel.iconProps,
                  });
                  animation = false;
                }

                iconButton = /*#__PURE__*/ React.createElement(
                  _IconButton["default"],
                  {
                    size: size,
                    key: "key-detail-panel-" + index,
                    style: (0, _objectSpread2["default"])(
                      {
                        transition: "all ease 200ms",
                      },
                      _this4.rotateIconStyle(animation && isOpen)
                    ),
                    disabled: panel.disabled,
                    onClick: function onClick(event) {
                      _this4.props.onToggleDetailPanel(
                        _this4.props.path,
                        panel.render
                      );

                      event.stopPropagation();
                    },
                  },
                  iconButton
                );

                if (panel.tooltip) {
                  iconButton = /*#__PURE__*/ React.createElement(
                    _Tooltip["default"],
                    {
                      key: "key-detail-panel-" + index,
                      title: panel.tooltip,
                    },
                    iconButton
                  );
                }

                return iconButton;
              })
            )
          );
        }
      },
    },
    {
      key: "renderTreeDataColumn",
      value: function renderTreeDataColumn() {
        var _this5 = this;

        var size = CommonValues.elementSize(this.props);

        if (
          this.props.data.tableData.childRows &&
          this.props.data.tableData.childRows.length > 0
        ) {
          return /*#__PURE__*/ React.createElement(
            _TableCell["default"],
            {
              size: size,
              padding: "none",
              key: "key-tree-data-column",
              style: {
                width: 48 + 9 * (this.props.treeDataMaxLevel - 2),
              },
            },
            /*#__PURE__*/ React.createElement(
              _IconButton["default"],
              {
                size: size,
                style: (0, _objectSpread2["default"])(
                  {
                    transition: "all ease 200ms",
                    marginLeft: this.props.level * 9,
                  },
                  this.rotateIconStyle(this.props.data.tableData.isTreeExpanded)
                ),
                onClick: function onClick(event) {
                  _this5.props.onTreeExpandChanged(
                    _this5.props.path,
                    _this5.props.data
                  );

                  event.stopPropagation();
                },
              },
              /*#__PURE__*/ React.createElement(
                this.props.icons.DetailPanel,
                null
              )
            )
          );
        } else {
          return /*#__PURE__*/ React.createElement(_TableCell["default"], {
            padding: "none",
            key: "key-tree-data-column",
          });
        }
      },
    },
    {
      key: "getStyle",
      value: function getStyle(index, level) {
        var style = {
          transition: "all ease 300ms",
        };

        if (typeof this.props.options.rowStyle === "function") {
          style = (0, _objectSpread2["default"])(
            {},
            style,
            this.props.options.rowStyle(
              this.props.data,
              index,
              level,
              this.props.hasAnyEditingRow
            )
          );
        } else if (this.props.options.rowStyle) {
          style = (0, _objectSpread2["default"])(
            {},
            style,
            this.props.options.rowStyle
          );
        }

        if (this.props.onRowClick) {
          style.cursor = "pointer";
        }

        if (this.props.hasAnyEditingRow) {
          style.opacity = style.opacity ? style.opacity : 0.2;
        }

        return style;
      },
    },
    {
      key: "render",
      value: function render() {
        var _this6 = this;

        var size = CommonValues.elementSize(this.props);
        var renderColumns = this.renderColumns();

        if (this.props.options.selection) {
          renderColumns.splice(0, 0, this.renderSelectionColumn());
        }

        if (
          this.props.actions &&
          this.props.actions.filter(function (a) {
            return a.position === "row" || typeof a === "function";
          }).length > 0
        ) {
          if (this.props.options.actionsColumnIndex === -1) {
            renderColumns.push(this.renderActions());
          } else if (this.props.options.actionsColumnIndex >= 0) {
            var endPos = 0;

            if (this.props.options.selection) {
              endPos = 1;
            }

            renderColumns.splice(
              this.props.options.actionsColumnIndex + endPos,
              0,
              this.renderActions()
            );
          }
        } // Then we add detail panel icon

        if (this.props.detailPanel) {
          if (this.props.options.detailPanelColumnAlignment === "right") {
            renderColumns.push(this.renderDetailPanelColumn());
          } else {
            renderColumns.splice(0, 0, this.renderDetailPanelColumn());
          }
        } // Lastly we add tree data icon

        if (this.props.isTreeData) {
          renderColumns.splice(0, 0, this.renderTreeDataColumn());
        }

        this.props.columns
          .filter(function (columnDef) {
            return columnDef.tableData.groupOrder > -1;
          })
          .forEach(function (columnDef) {
            renderColumns.splice(
              0,
              0,
              /*#__PURE__*/ React.createElement(_TableCell["default"], {
                size: size,
                padding: "none",
                key: "key-group-cell" + columnDef.tableData.id,
              })
            );
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
          errorState = _this$props.errorState,
          cellEditable = _this$props.cellEditable,
          onCellEditStarted = _this$props.onCellEditStarted,
          onCellEditFinished = _this$props.onCellEditFinished,
          scrollWidth = _this$props.scrollWidth,
          rowProps = (0, _objectWithoutProperties2["default"])(_this$props, [
            "icons",
            "data",
            "columns",
            "components",
            "detailPanel",
            "getFieldValue",
            "isTreeData",
            "onRowClick",
            "onRowSelected",
            "onTreeExpandChanged",
            "onToggleDetailPanel",
            "onEditingCanceled",
            "onEditingApproved",
            "options",
            "hasAnyEditingRow",
            "treeDataMaxLevel",
            "localization",
            "actions",
            "errorState",
            "cellEditable",
            "onCellEditStarted",
            "onCellEditFinished",
            "scrollWidth",
          ]);
        return /*#__PURE__*/ React.createElement(
          React.Fragment,
          null,
          /*#__PURE__*/ React.createElement(
            _reactBeautifulDnd.Draggable,
            {
              isDragDisabled: !options.draggableRows,
              key: "row-" + this.props.index.toString(),
              draggableId: "row-" + this.props.index.toString(),
              index: this.props.index,
            },
            function (provided, snapshot) {
              var _provided$draggablePr = provided.draggableProps,
                providedStyle = _provided$draggablePr.style,
                providedDraggableProps = (0,
                _objectWithoutProperties2["default"])(_provided$draggablePr, [
                  "style",
                ]);
              var rowStyle = (0, _objectSpread2["default"])(
                {},
                _this6.getStyle(_this6.props.index, _this6.props.level),
                providedStyle
              );
              return /*#__PURE__*/ React.createElement(
                _TableRow["default"],
                (0, _extends2["default"])(
                  {
                    selected: hasAnyEditingRow,
                  },
                  rowProps,
                  {
                    hover: onRowClick ? true : false,
                    style: rowStyle,
                    onClick: function onClick(event) {
                      onRowClick &&
                        onRowClick(event, _this6.props.data, function (
                          panelIndex
                        ) {
                          var panel = detailPanel;

                          if (Array.isArray(panel)) {
                            panel = panel[panelIndex || 0];

                            if (typeof panel === "function") {
                              panel = panel(_this6.props.data);
                            }

                            panel = panel.render;
                          }

                          onToggleDetailPanel(_this6.props.path, panel);
                        });
                    },
                    ref: provided.innerRef,
                  },
                  providedDraggableProps,
                  options.draggableRowsOptions.draggableCell
                    ? {}
                    : provided.dragHandleProps
                ),
                options.draggableRows &&
                  options.draggableRowsOptions.draggableCell &&
                  /*#__PURE__*/ React.createElement(
                    _this6.props.components.Cell,
                    (0, _extends2["default"])(
                      {
                        value: options.draggableRowsOptions.dragCellContent,
                        columnDef: {
                          tableData: {
                            width: options.draggableRowsOptions.dragCellWidth,
                          },
                        },
                      },
                      provided.dragHandleProps
                    )
                  ),
                renderColumns
              );
            }
          ),
          this.props.data.tableData &&
            this.props.data.tableData.showDetailPanel &&
            /*#__PURE__*/ React.createElement(
              _TableRow["default"], // selected={this.props.index % 2 === 0}
              null,
              /*#__PURE__*/ React.createElement(
                _TableCell["default"],
                {
                  size: size,
                  colSpan: renderColumns.length,
                  padding: "none",
                },
                this.props.data.tableData.showDetailPanel(this.props.data)
              )
            ),
          this.props.data.tableData.childRows &&
            this.props.data.tableData.isTreeExpanded &&
            this.props.data.tableData.childRows.map(function (data, index) {
              if (data.tableData.editing) {
                return /*#__PURE__*/ React.createElement(
                  _this6.props.components.EditRow,
                  {
                    columns: _this6.props.columns.filter(function (columnDef) {
                      return !columnDef.hidden;
                    }),
                    components: _this6.props.components,
                    data: data,
                    icons: _this6.props.icons,
                    localization: _this6.props.localization,
                    getFieldValue: _this6.props.getFieldValue,
                    key: index,
                    mode: data.tableData.editing,
                    options: _this6.props.options,
                    isTreeData: _this6.props.isTreeData,
                    detailPanel: _this6.props.detailPanel,
                    onEditingCanceled: onEditingCanceled,
                    onEditingApproved: onEditingApproved,
                    errorState: _this6.props.errorState,
                  }
                );
              } else {
                return /*#__PURE__*/ React.createElement(
                  _this6.props.components.Row,
                  (0, _extends2["default"])({}, _this6.props, {
                    data: data,
                    index: index,
                    key: index,
                    level: _this6.props.level + 1,
                    path: [].concat(
                      (0, _toConsumableArray2["default"])(_this6.props.path),
                      [index]
                    ),
                    onEditingCanceled: onEditingCanceled,
                    onEditingApproved: onEditingApproved,
                    hasAnyEditingRow: _this6.props.hasAnyEditingRow,
                    treeDataMaxLevel: treeDataMaxLevel,
                    errorState: _this6.props.errorState,
                    cellEditable: cellEditable,
                    onCellEditStarted: onCellEditStarted,
                    onCellEditFinished: onCellEditFinished,
                  })
                );
              }
            })
        );
      },
    },
  ]);
  return MTableBodyRow;
})(React.Component);

exports["default"] = MTableBodyRow;
MTableBodyRow.defaultProps = {
  actions: [],
  index: 0,
  data: {},
  options: {},
  path: [],
};
MTableBodyRow.propTypes = {
  actions: _propTypes["default"].array,
  icons: _propTypes["default"].any.isRequired,
  index: _propTypes["default"].number.isRequired,
  data: _propTypes["default"].object.isRequired,
  detailPanel: _propTypes["default"].oneOfType([
    _propTypes["default"].func,
    _propTypes["default"].arrayOf(
      _propTypes["default"].oneOfType([
        _propTypes["default"].object,
        _propTypes["default"].func,
      ])
    ),
  ]),
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
  onEditingCanceled: _propTypes["default"].func,
  errorState: _propTypes["default"].oneOfType([
    _propTypes["default"].object,
    _propTypes["default"].bool,
  ]),
};

"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = exports.styles = exports.MTableHeader = void 0;

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

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _TableHead = _interopRequireDefault(require("@material-ui/core/TableHead"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableSortLabel = _interopRequireDefault(
  require("@material-ui/core/TableSortLabel")
);

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _withStyles = _interopRequireDefault(
  require("@material-ui/core/styles/withStyles")
);

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _core = require("@material-ui/core");

var CommonValues = _interopRequireWildcard(require("../utils/common-values"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

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
var MTableHeader = /*#__PURE__*/ (function (_React$Component) {
  (0, _inherits2["default"])(MTableHeader, _React$Component);

  var _super = _createSuper(MTableHeader);

  function MTableHeader(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, MTableHeader);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])(
      (0, _assertThisInitialized2["default"])(_this),
      "handleMouseDown",
      function (e, columnDef) {
        _this.setState({
          lastAdditionalWidth: columnDef.tableData.additionalWidth,
          lastX: e.clientX,
          resizingColumnDef: columnDef,
        });
      }
    );
    (0, _defineProperty2["default"])(
      (0, _assertThisInitialized2["default"])(_this),
      "handleMouseMove",
      function (e) {
        if (!_this.state.resizingColumnDef) {
          return;
        }

        var additionalWidth =
          _this.state.lastAdditionalWidth + e.clientX - _this.state.lastX;
        additionalWidth = Math.min(
          _this.state.resizingColumnDef.maxWidth || additionalWidth,
          additionalWidth
        );

        if (
          _this.state.resizingColumnDef.tableData.additionalWidth !==
          additionalWidth
        ) {
          _this.props.onColumnResized(
            _this.state.resizingColumnDef.tableData.id,
            additionalWidth
          );
        }
      }
    );
    (0, _defineProperty2["default"])(
      (0, _assertThisInitialized2["default"])(_this),
      "handleMouseUp",
      function (e) {
        _this.setState({
          resizingColumnDef: undefined,
        });
      }
    );
    (0, _defineProperty2["default"])(
      (0, _assertThisInitialized2["default"])(_this),
      "getCellStyle",
      function (columnDef) {
        var width = CommonValues.reducePercentsInCalc(
          columnDef.tableData.width,
          _this.props.scrollWidth
        );
        var style = (0, _objectSpread2["default"])(
          {},
          _this.props.headerStyle,
          columnDef.headerStyle,
          {
            boxSizing: "border-box",
            width: width,
            maxWidth: columnDef.maxWidth,
            minWidth: columnDef.minWidth,
          }
        );

        if (
          _this.props.options.tableLayout === "fixed" &&
          _this.props.options.columnResizable &&
          columnDef.resizable !== false
        ) {
          style.paddingRight = 2;
        }

        return style;
      }
    );
    _this.state = {
      lastX: 0,
      resizingColumnDef: undefined,
    };
    return _this;
  } // shouldComponentUpdate(nextProps, nextState){
  //   return !equal(nextProps, this.props) || !equal(nextState, this.state);
  // }

  (0, _createClass2["default"])(MTableHeader, [
    {
      key: "componentDidMount",
      value: function componentDidMount() {
        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp);
      },
    },
    {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("mouseup", this.handleMouseUp);
      },
    },
    {
      key: "renderHeader",
      value: function renderHeader() {
        var _this2 = this;

        var size =
          this.props.options.padding === "default" ? "medium" : "small";
        var mapArr = this.props.columns
          .filter(function (columnDef) {
            return !columnDef.hidden && !(columnDef.tableData.groupOrder > -1);
          })
          .sort(function (a, b) {
            return a.tableData.columnOrder - b.tableData.columnOrder;
          })
          .map(function (columnDef, index) {
            var content = columnDef.title;

            if (_this2.props.draggable) {
              content = /*#__PURE__*/ React.createElement(
                _reactBeautifulDnd.Draggable,
                {
                  key: columnDef.tableData.id,
                  draggableId: columnDef.tableData.id.toString(),
                  index: index,
                  isDragDisabled: !(
                    _this2.props.draggable && !_this2.props.draggableRows
                  ),
                },
                function (provided, snapshot) {
                  return /*#__PURE__*/ React.createElement(
                    "div",
                    (0, _extends2["default"])(
                      {
                        ref: provided.innerRef,
                      },
                      provided.draggableProps,
                      provided.dragHandleProps
                    ),
                    columnDef.title
                  );
                }
              );
            }

            if (columnDef.sorting !== false && _this2.props.sorting) {
              content = /*#__PURE__*/ React.createElement(
                _TableSortLabel["default"],
                {
                  IconComponent: _this2.props.icons.SortArrow,
                  active: _this2.props.orderBy === columnDef.tableData.id,
                  direction: _this2.props.orderDirection || "asc",
                  onClick: function onClick() {
                    var orderDirection =
                      columnDef.tableData.id !== _this2.props.orderBy
                        ? "asc"
                        : _this2.props.orderDirection === "asc"
                        ? "desc"
                        : _this2.props.orderDirection === "desc" &&
                          _this2.props.thirdSortClick
                        ? ""
                        : _this2.props.orderDirection === "desc" &&
                          !_this2.props.thirdSortClick
                        ? "asc"
                        : _this2.props.orderDirection === ""
                        ? "asc"
                        : "desc";

                    _this2.props.onOrderChange(
                      columnDef.tableData.id,
                      orderDirection
                    );
                  },
                },
                content
              );
            }

            if (columnDef.tooltip) {
              content = /*#__PURE__*/ React.createElement(
                _core.Tooltip,
                {
                  title: columnDef.tooltip,
                  placement: "bottom",
                },
                /*#__PURE__*/ React.createElement("span", null, content)
              );
            }

            if (
              _this2.props.options.tableLayout === "fixed" &&
              _this2.props.options.columnResizable &&
              columnDef.resizable !== false
            ) {
              content = /*#__PURE__*/ React.createElement(
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
                    },
                  },
                  content
                ),
                /*#__PURE__*/ React.createElement("div", null),
                /*#__PURE__*/ React.createElement(_this2.props.icons.Resize, {
                  style: {
                    cursor: "col-resize",
                    color:
                      _this2.state.resizingColumnDef &&
                      _this2.state.resizingColumnDef.tableData.id ===
                        columnDef.tableData.id
                        ? _this2.props.theme.palette.primary.main
                        : "inherit",
                  },
                  onMouseDown: function onMouseDown(e) {
                    return _this2.handleMouseDown(e, columnDef);
                  },
                })
              );
            }

            var cellAlignment =
              columnDef.align !== undefined
                ? columnDef.align
                : ["numeric", "currency"].indexOf(columnDef.type) !== -1
                ? "right"
                : "left";
            return /*#__PURE__*/ React.createElement(
              _TableCell["default"],
              {
                key: columnDef.tableData.id,
                align: cellAlignment,
                className: _this2.props.classes.header,
                style: _this2.getCellStyle(columnDef),
                size: size,
              },
              content
            );
          });
        return mapArr;
      },
    },
    {
      key: "renderActionsHeader",
      value: function renderActionsHeader() {
        var localization = (0, _objectSpread2["default"])(
          {},
          MTableHeader.defaultProps.localization,
          this.props.localization
        );
        var width = CommonValues.actionsColumnWidth(this.props);
        return /*#__PURE__*/ React.createElement(
          _TableCell["default"],
          {
            key: "key-actions-column",
            padding: "checkbox",
            className: this.props.classes.header,
            style: (0, _objectSpread2["default"])({}, this.props.headerStyle, {
              width: width,
              textAlign: "center",
              boxSizing: "border-box",
            }),
          },
          /*#__PURE__*/ React.createElement(
            _TableSortLabel["default"],
            {
              hideSortIcon: true,
              disabled: true,
            },
            localization.actions
          )
        );
      },
    },
    {
      key: "renderSelectionHeader",
      value: function renderSelectionHeader() {
        var _this3 = this;

        var selectionWidth = CommonValues.selectionMaxWidth(
          this.props,
          this.props.treeDataMaxLevel
        );
        return /*#__PURE__*/ React.createElement(
          _TableCell["default"],
          {
            padding: "none",
            key: "key-selection-column",
            className: this.props.classes.header,
            style: (0, _objectSpread2["default"])({}, this.props.headerStyle, {
              width: selectionWidth,
            }),
          },
          this.props.showSelectAllCheckbox &&
            /*#__PURE__*/ React.createElement(
              _Checkbox["default"],
              (0, _extends2["default"])(
                {
                  indeterminate:
                    this.props.selectedCount > 0 &&
                    this.props.selectedCount < this.props.dataCount,
                  checked:
                    this.props.dataCount > 0 &&
                    this.props.selectedCount === this.props.dataCount,
                  onChange: function onChange(event, checked) {
                    return (
                      _this3.props.onAllSelected &&
                      _this3.props.onAllSelected(checked)
                    );
                  },
                },
                this.props.options.headerSelectionProps
              )
            )
        );
      },
    },
    {
      key: "renderDraggableHeaderCell",
      value: function renderDraggableHeaderCell() {
        var draggableOptions = this.props.options.draggableRowsOptions;
        return /*#__PURE__*/ React.createElement(
          _TableCell["default"],
          {
            padding: "none",
            key: "key-drag-column",
            className: this.props.classes.header,
            style: (0, _objectSpread2["default"])({}, this.props.headerStyle, {
              width: draggableOptions.dragCellWidth,
            }),
          },
          draggableOptions.dragHeaderContent
        );
      },
    },
    {
      key: "renderDetailPanelColumnCell",
      value: function renderDetailPanelColumnCell() {
        return /*#__PURE__*/ React.createElement(_TableCell["default"], {
          padding: "none",
          key: "key-detail-panel-column",
          className: this.props.classes.header,
          style: (0, _objectSpread2["default"])({}, this.props.headerStyle),
        });
      },
    },
    {
      key: "render",
      value: function render() {
        var _this4 = this;

        var headers = this.renderHeader();

        if (this.props.hasSelection) {
          headers.splice(0, 0, this.renderSelectionHeader());
        }

        if (
          this.props.options.draggableRows &&
          this.props.options.draggableRowsOptions.draggableCell
        ) {
          headers.splice(0, 0, this.renderDraggableHeaderCell());
        }

        if (this.props.showActionsColumn) {
          if (this.props.actionsHeaderIndex >= 0) {
            var endPos = 0;

            if (this.props.hasSelection) {
              endPos = 1;
            }

            headers.splice(
              this.props.actionsHeaderIndex + endPos,
              0,
              this.renderActionsHeader()
            );
          } else if (this.props.actionsHeaderIndex === -1) {
            headers.push(this.renderActionsHeader());
          }
        }

        if (this.props.hasDetailPanel) {
          if (this.props.detailPanelColumnAlignment === "right") {
            headers.push(this.renderDetailPanelColumnCell());
          } else {
            headers.splice(0, 0, this.renderDetailPanelColumnCell());
          }
        }

        if (this.props.isTreeData > 0) {
          headers.splice(
            0,
            0,
            /*#__PURE__*/ React.createElement(_TableCell["default"], {
              padding: "none",
              key: "key-tree-data-header",
              className: this.props.classes.header,
              style: (0, _objectSpread2["default"])({}, this.props.headerStyle),
            })
          );
        }

        this.props.columns
          .filter(function (columnDef) {
            return columnDef.tableData.groupOrder > -1;
          })
          .forEach(function (columnDef) {
            headers.splice(
              0,
              0,
              /*#__PURE__*/ React.createElement(_TableCell["default"], {
                padding: "checkbox",
                key: "key-group-header" + columnDef.tableData.id,
                className: _this4.props.classes.header,
              })
            );
          });
        return /*#__PURE__*/ React.createElement(
          _TableHead["default"],
          null,
          /*#__PURE__*/ React.createElement(_TableRow["default"], null, headers)
        );
      },
    },
  ]);
  return MTableHeader;
})(React.Component);

exports.MTableHeader = MTableHeader;
MTableHeader.defaultProps = {
  dataCount: 0,
  hasSelection: false,
  headerStyle: {},
  selectedCount: 0,
  sorting: true,
  localization: {
    actions: "Actions",
  },
  orderBy: undefined,
  orderDirection: "asc",
  actionsHeaderIndex: 0,
  detailPanelColumnAlignment: "left",
  draggable: true,
  thirdSortClick: true,
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
  thirdSortClick: _propTypes["default"].bool,
  tooltip: _propTypes["default"].string,
};

var styles = function styles(theme) {
  return {
    header: {
      // display: 'inline-block',
      position: "sticky",
      top: 0,
      zIndex: 10,
      backgroundColor: theme.palette.background.paper, // Change according to theme,
    },
  };
};

exports.styles = styles;

var _default = (0, _withStyles["default"])(styles, {
  withTheme: true,
})(MTableHeader);

exports["default"] = _default;

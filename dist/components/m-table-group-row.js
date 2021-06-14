"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(
  require("@babel/runtime/helpers/objectSpread")
);

var _toConsumableArray2 = _interopRequireDefault(
  require("@babel/runtime/helpers/toConsumableArray")
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

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _IconButton = _interopRequireDefault(
  require("@material-ui/core/IconButton")
);

var _propTypes = _interopRequireDefault(require("prop-types"));

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(
    nodeInterop
  ) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (
    obj === null ||
    (_typeof(obj) !== "object" && typeof obj !== "function")
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = (0, _getPrototypeOf2.default)(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = (0, _getPrototypeOf2.default)(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return (0, _possibleConstructorReturn2.default)(this, result);
  };
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
    return true;
  } catch (e) {
    return false;
  }
}

/* eslint-enable no-unused-vars */
var MTableGroupRow = /*#__PURE__*/ (function (_React$Component) {
  (0, _inherits2.default)(MTableGroupRow, _React$Component);

  var _super = _createSuper(MTableGroupRow);

  function MTableGroupRow() {
    var _this;

    (0, _classCallCheck2.default)(this, MTableGroupRow);

    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "rotateIconStyle",
      function (isOpen) {
        return {
          transform: isOpen ? "rotate(90deg)" : "none",
        };
      }
    );
    return _this;
  }

  (0, _createClass2.default)(MTableGroupRow, [
    {
      key: "render",
      value: function render() {
        var _this2 = this;

        var colSpan = this.props.columns.filter(function (columnDef) {
          return !columnDef.hidden;
        }).length;
        this.props.options.selection && colSpan++;
        this.props.detailPanel && colSpan++;
        this.props.actions && this.props.actions.length > 0 && colSpan++;
        var column = this.props.groups[this.props.level];
        var detail;

        if (this.props.groupData.isExpanded) {
          if (this.props.groups.length > this.props.level + 1) {
            // Is there another group
            detail = this.props.groupData.groups.map(function (
              groupData,
              index
            ) {
              return /*#__PURE__*/ React.createElement(
                _this2.props.components.GroupRow,
                {
                  actions: _this2.props.actions,
                  key: groupData.value || "" + index,
                  columns: _this2.props.columns,
                  components: _this2.props.components,
                  detailPanel: _this2.props.detailPanel,
                  getFieldValue: _this2.props.getFieldValue,
                  groupData: groupData,
                  groups: _this2.props.groups,
                  icons: _this2.props.icons,
                  level: _this2.props.level + 1,
                  path: [].concat(
                    (0, _toConsumableArray2.default)(_this2.props.path),
                    [index]
                  ),
                  onGroupExpandChanged: _this2.props.onGroupExpandChanged,
                  onRowSelected: _this2.props.onRowSelected,
                  onRowClick: _this2.props.onRowClick,
                  onToggleDetailPanel: _this2.props.onToggleDetailPanel,
                  onTreeExpandChanged: _this2.props.onTreeExpandChanged,
                  onEditingCanceled: _this2.props.onEditingCanceled,
                  onEditingApproved: _this2.props.onEditingApproved,
                  options: _this2.props.options,
                  hasAnyEditingRow: _this2.props.hasAnyEditingRow,
                  isTreeData: _this2.props.isTreeData,
                  cellEditable: _this2.props.cellEditable,
                  onCellEditStarted: _this2.props.onCellEditStarted,
                  onCellEditFinished: _this2.props.onCellEditFinished,
                  scrollWidth: _this2.props.scrollWidth,
                }
              );
            });
          } else {
            detail = this.props.groupData.data.map(function (rowData, index) {
              if (rowData.tableData.editing) {
                return /*#__PURE__*/ React.createElement(
                  _this2.props.components.EditRow,
                  {
                    columns: _this2.props.columns,
                    components: _this2.props.components,
                    data: rowData,
                    icons: _this2.props.icons,
                    path: [].concat(
                      (0, _toConsumableArray2.default)(_this2.props.path),
                      [index]
                    ),
                    localization: _this2.props.localization,
                    key: index,
                    mode: rowData.tableData.editing,
                    options: _this2.props.options,
                    isTreeData: _this2.props.isTreeData,
                    detailPanel: _this2.props.detailPanel,
                    onEditingCanceled: _this2.props.onEditingCanceled,
                    onEditingApproved: _this2.props.onEditingApproved,
                    getFieldValue: _this2.props.getFieldValue,
                    onBulkEditRowChanged: _this2.props.onBulkEditRowChanged,
                    scrollWidth: _this2.props.scrollWidth,
                  }
                );
              } else {
                return /*#__PURE__*/ React.createElement(
                  _this2.props.components.Row,
                  {
                    actions: _this2.props.actions,
                    key: index,
                    columns: _this2.props.columns,
                    components: _this2.props.components,
                    data: rowData,
                    detailPanel: _this2.props.detailPanel,
                    getFieldValue: _this2.props.getFieldValue,
                    icons: _this2.props.icons,
                    path: [].concat(
                      (0, _toConsumableArray2.default)(_this2.props.path),
                      [index]
                    ),
                    onRowSelected: _this2.props.onRowSelected,
                    onRowClick: _this2.props.onRowClick,
                    onToggleDetailPanel: _this2.props.onToggleDetailPanel,
                    options: _this2.props.options,
                    isTreeData: _this2.props.isTreeData,
                    onTreeExpandChanged: _this2.props.onTreeExpandChanged,
                    onEditingCanceled: _this2.props.onEditingCanceled,
                    onEditingApproved: _this2.props.onEditingApproved,
                    hasAnyEditingRow: _this2.props.hasAnyEditingRow,
                    cellEditable: _this2.props.cellEditable,
                    onCellEditStarted: _this2.props.onCellEditStarted,
                    onCellEditFinished: _this2.props.onCellEditFinished,
                    scrollWidth: _this2.props.scrollWidth,
                  }
                );
              }
            });
          }
        }

        var freeCells = [];

        for (var i = 0; i < this.props.level; i++) {
          freeCells.push(
            /*#__PURE__*/ React.createElement(_TableCell.default, {
              padding: "checkbox",
              key: i,
            })
          );
        }

        var value = this.props.groupData.value;

        if (column.lookup) {
          value = column.lookup[value];
        }

        var title = column.title;

        if (typeof this.props.options.groupTitle === "function") {
          title = this.props.options.groupTitle(this.props.groupData);
        } else if (typeof title !== "string") {
          title = React.cloneElement(title);
        }

        var separator = this.props.options.groupRowSeparator || ": ";
        return /*#__PURE__*/ React.createElement(
          React.Fragment,
          null,
          /*#__PURE__*/ React.createElement(
            _TableRow.default,
            null,
            freeCells,
            /*#__PURE__*/ React.createElement(
              this.props.components.Cell,
              {
                colSpan: colSpan,
                padding: "none",
                columnDef: column,
                value: value,
                icons: this.props.icons,
              },
              /*#__PURE__*/ React.createElement(
                _IconButton.default,
                {
                  style: (0, _objectSpread2.default)(
                    {
                      transition: "all ease 200ms",
                    },
                    this.rotateIconStyle(this.props.groupData.isExpanded)
                  ),
                  onClick: function onClick(event) {
                    _this2.props.onGroupExpandChanged(_this2.props.path);
                  },
                },
                /*#__PURE__*/ React.createElement(
                  this.props.icons.DetailPanel,
                  null
                )
              ),
              /*#__PURE__*/ React.createElement("b", null, title, separator)
            )
          ),
          detail
        );
      },
    },
  ]);
  return MTableGroupRow;
})(React.Component);

exports.default = MTableGroupRow;
MTableGroupRow.defaultProps = {
  columns: [],
  groups: [],
  options: {},
  level: 0,
};
MTableGroupRow.propTypes = {
  actions: _propTypes.default.array,
  columns: _propTypes.default.arrayOf(_propTypes.default.object),
  components: _propTypes.default.object,
  detailPanel: _propTypes.default.oneOfType([
    _propTypes.default.func,
    _propTypes.default.arrayOf(_propTypes.default.object),
  ]),
  getFieldValue: _propTypes.default.func,
  groupData: _propTypes.default.object,
  groups: _propTypes.default.arrayOf(_propTypes.default.object),
  hasAnyEditingRow: _propTypes.default.bool,
  icons: _propTypes.default.object,
  isTreeData: _propTypes.default.bool.isRequired,
  level: _propTypes.default.number,
  localization: _propTypes.default.object,
  onGroupExpandChanged: _propTypes.default.func,
  onRowSelected: _propTypes.default.func,
  onRowClick: _propTypes.default.func,
  onToggleDetailPanel: _propTypes.default.func.isRequired,
  onTreeExpandChanged: _propTypes.default.func.isRequired,
  onEditingCanceled: _propTypes.default.func,
  onEditingApproved: _propTypes.default.func,
  options: _propTypes.default.object,
  path: _propTypes.default.arrayOf(_propTypes.default.number),
  scrollWidth: _propTypes.default.number.isRequired,
  cellEditable: _propTypes.default.object,
  onCellEditStarted: _propTypes.default.func,
  onCellEditFinished: _propTypes.default.func,
  onBulkEditRowChanged: _propTypes.default.func,
};

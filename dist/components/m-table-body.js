"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(
  require("@babel/runtime/helpers/toConsumableArray")
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

var _inherits2 = _interopRequireDefault(
  require("@babel/runtime/helpers/inherits")
);

var _possibleConstructorReturn2 = _interopRequireDefault(
  require("@babel/runtime/helpers/possibleConstructorReturn")
);

var _getPrototypeOf2 = _interopRequireDefault(
  require("@babel/runtime/helpers/getPrototypeOf")
);

var _TableBody = _interopRequireDefault(require("@material-ui/core/TableBody"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var React = _interopRequireWildcard(require("react"));

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
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

/* eslint-enable no-unused-vars */
var MTableBody = /*#__PURE__*/ (function (_React$Component) {
  (0, _inherits2.default)(MTableBody, _React$Component);

  var _super = _createSuper(MTableBody);

  function MTableBody() {
    (0, _classCallCheck2.default)(this, MTableBody);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(MTableBody, [
    {
      key: "renderEmpty",
      value: function renderEmpty(emptyRowCount, renderData) {
        var rowHeight = this.props.options.padding === "default" ? 49 : 36;
        var localization = (0, _objectSpread2.default)(
          {},
          MTableBody.defaultProps.localization,
          this.props.localization
        );

        if (
          this.props.options.showEmptyDataSourceMessage &&
          renderData.length === 0
        ) {
          var addColumn = 0;

          if (this.props.options.selection) {
            addColumn++;
          }

          if (
            this.props.actions &&
            this.props.actions.filter(function (a) {
              return a.position === "row" || typeof a === "function";
            }).length > 0
          ) {
            addColumn++;
          }

          if (this.props.hasDetailPanel) {
            addColumn++;
          }

          if (this.props.isTreeData) {
            addColumn++;
          }

          return /*#__PURE__*/ React.createElement(
            _TableRow.default,
            {
              style: {
                height:
                  rowHeight *
                  (this.props.options.paging &&
                  this.props.options.emptyRowsWhenPaging
                    ? this.props.pageSize
                    : 1),
              },
              key: "empty-" + 0,
            },
            /*#__PURE__*/ React.createElement(
              _TableCell.default,
              {
                style: {
                  paddingTop: 0,
                  paddingBottom: 0,
                  textAlign: "center",
                },
                colSpan: this.props.columns.reduce(function (
                  currentVal,
                  columnDef
                ) {
                  return columnDef.hidden ? currentVal : currentVal + 1;
                },
                addColumn),
                key: "empty-",
              },
              localization.emptyDataSourceMessage
            )
          );
        } else if (this.props.options.emptyRowsWhenPaging) {
          return /*#__PURE__*/ React.createElement(
            React.Fragment,
            null,
            (0, _toConsumableArray2.default)(Array(emptyRowCount)).map(
              function (r, index) {
                return /*#__PURE__*/ React.createElement(_TableRow.default, {
                  style: {
                    height: rowHeight,
                  },
                  key: "empty-" + index,
                });
              }
            ),
            emptyRowCount > 0 &&
              /*#__PURE__*/ React.createElement(_TableRow.default, {
                style: {
                  height: 1,
                },
                key: "empty-last1",
              })
          );
        }
      },
    },
    {
      key: "renderUngroupedRows",
      value: function renderUngroupedRows(renderData) {
        var _this = this;

        return renderData.map(function (data, index) {
          if (data.tableData.editing || _this.props.bulkEditOpen) {
            return /*#__PURE__*/ React.createElement(
              _this.props.components.EditRow,
              {
                columns: _this.props.columns.filter(function (columnDef) {
                  return !columnDef.hidden;
                }),
                components: _this.props.components,
                data: data,
                errorState: _this.props.errorState,
                icons: _this.props.icons,
                localization: (0, _objectSpread2.default)(
                  {},
                  MTableBody.defaultProps.localization.editRow,
                  _this.props.localization.editRow,
                  {
                    dateTimePickerLocalization:
                      _this.props.localization.dateTimePickerLocalization,
                  }
                ),
                key: "row-" + data.tableData.id,
                mode: _this.props.bulkEditOpen
                  ? "bulk"
                  : data.tableData.editing,
                options: _this.props.options,
                isTreeData: _this.props.isTreeData,
                detailPanel: _this.props.detailPanel,
                onEditingCanceled: _this.props.onEditingCanceled,
                onEditingApproved: _this.props.onEditingApproved,
                getFieldValue: _this.props.getFieldValue,
                onBulkEditRowChanged: _this.props.onBulkEditRowChanged,
                scrollWidth: _this.props.scrollWidth,
              }
            );
          } else {
            return /*#__PURE__*/ React.createElement(
              _this.props.components.Row,
              {
                components: _this.props.components,
                icons: _this.props.icons,
                data: data,
                index: index,
                errorState: _this.props.errorState,
                key: "row-" + data.tableData.id,
                level: 0,
                options: _this.props.options,
                localization: (0, _objectSpread2.default)(
                  {},
                  MTableBody.defaultProps.localization.editRow,
                  _this.props.localization.editRow,
                  {
                    dateTimePickerLocalization:
                      _this.props.localization.dateTimePickerLocalization,
                  }
                ),
                onRowSelected: _this.props.onRowSelected,
                actions: _this.props.actions,
                columns: _this.props.columns,
                getFieldValue: _this.props.getFieldValue,
                detailPanel: _this.props.detailPanel,
                path: [index + _this.props.pageSize * _this.props.currentPage],
                onToggleDetailPanel: _this.props.onToggleDetailPanel,
                onRowClick: _this.props.onRowClick,
                isTreeData: _this.props.isTreeData,
                onTreeExpandChanged: _this.props.onTreeExpandChanged,
                onEditingCanceled: _this.props.onEditingCanceled,
                onEditingApproved: _this.props.onEditingApproved,
                hasAnyEditingRow: _this.props.hasAnyEditingRow,
                treeDataMaxLevel: _this.props.treeDataMaxLevel,
                cellEditable: _this.props.cellEditable,
                onCellEditStarted: _this.props.onCellEditStarted,
                onCellEditFinished: _this.props.onCellEditFinished,
                scrollWidth: _this.props.scrollWidth,
              }
            );
          }
        });
      },
    },
    {
      key: "renderGroupedRows",
      value: function renderGroupedRows(groups, renderData) {
        var _this2 = this;

        return renderData.map(function (groupData, index) {
          return /*#__PURE__*/ React.createElement(
            _this2.props.components.GroupRow,
            {
              actions: _this2.props.actions,
              key: groupData.value == null ? "" + index : groupData.value,
              columns: _this2.props.columns,
              components: _this2.props.components,
              detailPanel: _this2.props.detailPanel,
              getFieldValue: _this2.props.getFieldValue,
              groupData: groupData,
              groups: groups,
              icons: _this2.props.icons,
              level: 0,
              path: [index + _this2.props.pageSize * _this2.props.currentPage],
              onGroupExpandChanged: _this2.props.onGroupExpandChanged,
              onRowSelected: _this2.props.onRowSelected,
              onRowClick: _this2.props.onRowClick,
              onEditingCanceled: _this2.props.onEditingCanceled,
              onEditingApproved: _this2.props.onEditingApproved,
              onToggleDetailPanel: _this2.props.onToggleDetailPanel,
              onTreeExpandChanged: _this2.props.onTreeExpandChanged,
              options: _this2.props.options,
              isTreeData: _this2.props.isTreeData,
              hasAnyEditingRow: _this2.props.hasAnyEditingRow,
              localization: (0, _objectSpread2.default)(
                {},
                MTableBody.defaultProps.localization.editRow,
                _this2.props.localization.editRow,
                {
                  dateTimePickerLocalization:
                    _this2.props.localization.dateTimePickerLocalization,
                }
              ),
              cellEditable: _this2.props.cellEditable,
              onCellEditStarted: _this2.props.onCellEditStarted,
              onCellEditFinished: _this2.props.onCellEditFinished,
              onBulkEditRowChanged: _this2.props.onBulkEditRowChanged,
              scrollWidth: _this2.props.scrollWidth,
            }
          );
        });
      },
    },
    {
      key: "render",
      value: function render() {
        var renderData = this.props.renderData;
        var groups = this.props.columns
          .filter(function (col) {
            return col.tableData.groupOrder > -1;
          })
          .sort(function (col1, col2) {
            return col1.tableData.groupOrder - col2.tableData.groupOrder;
          });
        var emptyRowCount = 0;

        if (this.props.options.paging) {
          emptyRowCount = this.props.pageSize - renderData.length;
        }

        return /*#__PURE__*/ React.createElement(
          _TableBody.default,
          null,
          this.props.options.filtering &&
            /*#__PURE__*/ React.createElement(this.props.components.FilterRow, {
              columns: this.props.columns.filter(function (columnDef) {
                return !columnDef.hidden;
              }),
              icons: this.props.icons,
              hasActions:
                this.props.actions.filter(function (a) {
                  return a.position === "row" || typeof a === "function";
                }).length > 0,
              actionsColumnIndex: this.props.options.actionsColumnIndex,
              onFilterChanged: this.props.onFilterChanged,
              selection: this.props.options.selection,
              localization: (0, _objectSpread2.default)(
                {},
                MTableBody.defaultProps.localization.filterRow,
                this.props.localization.filterRow,
                {
                  dateTimePickerLocalization: this.props.localization
                    .dateTimePickerLocalization,
                }
              ),
              hasDetailPanel: !!this.props.detailPanel,
              detailPanelColumnAlignment: this.props.options
                .detailPanelColumnAlignment,
              isTreeData: this.props.isTreeData,
              filterCellStyle: this.props.options.filterCellStyle,
              filterRowStyle: this.props.options.filterRowStyle,
              hideFilterIcons: this.props.options.hideFilterIcons,
              scrollWidth: this.props.scrollWidth,
            }),
          this.props.showAddRow &&
            this.props.options.addRowPosition === "first" &&
            /*#__PURE__*/ React.createElement(this.props.components.EditRow, {
              columns: this.props.columns.filter(function (columnDef) {
                return !columnDef.hidden;
              }),
              data: this.props.initialFormData,
              components: this.props.components,
              errorState: this.props.errorState,
              icons: this.props.icons,
              key: "key-add-row",
              mode: "add",
              localization: (0, _objectSpread2.default)(
                {},
                MTableBody.defaultProps.localization.editRow,
                this.props.localization.editRow,
                {
                  dateTimePickerLocalization: this.props.localization
                    .dateTimePickerLocalization,
                }
              ),
              options: this.props.options,
              isTreeData: this.props.isTreeData,
              detailPanel: this.props.detailPanel,
              onEditingCanceled: this.props.onEditingCanceled,
              onEditingApproved: this.props.onEditingApproved,
              getFieldValue: this.props.getFieldValue,
              scrollWidth: this.props.scrollWidth,
            }),
          groups.length > 0
            ? this.renderGroupedRows(groups, renderData)
            : this.renderUngroupedRows(renderData),
          this.props.showAddRow &&
            this.props.options.addRowPosition === "last" &&
            /*#__PURE__*/ React.createElement(this.props.components.EditRow, {
              columns: this.props.columns.filter(function (columnDef) {
                return !columnDef.hidden;
              }),
              data: this.props.initialFormData,
              components: this.props.components,
              errorState: this.props.errorState,
              icons: this.props.icons,
              key: "key-add-row",
              mode: "add",
              localization: (0, _objectSpread2.default)(
                {},
                MTableBody.defaultProps.localization.editRow,
                this.props.localization.editRow,
                {
                  dateTimePickerLocalization: this.props.localization
                    .dateTimePickerLocalization,
                }
              ),
              options: this.props.options,
              isTreeData: this.props.isTreeData,
              detailPanel: this.props.detailPanel,
              onEditingCanceled: this.props.onEditingCanceled,
              onEditingApproved: this.props.onEditingApproved,
              getFieldValue: this.props.getFieldValue,
              scrollWidth: this.props.scrollWidth,
            }),
          this.renderEmpty(emptyRowCount, renderData)
        );
      },
    },
  ]);
  return MTableBody;
})(React.Component);

MTableBody.defaultProps = {
  actions: [],
  currentPage: 0,
  pageSize: 5,
  renderData: [],
  selection: false,
  localization: {
    emptyDataSourceMessage: "No records to display",
    filterRow: {},
    editRow: {},
  },
};
MTableBody.propTypes = {
  actions: _propTypes.default.array,
  components: _propTypes.default.object.isRequired,
  columns: _propTypes.default.array.isRequired,
  currentPage: _propTypes.default.number,
  detailPanel: _propTypes.default.oneOfType([
    _propTypes.default.func,
    _propTypes.default.arrayOf(
      _propTypes.default.oneOfType([
        _propTypes.default.object,
        _propTypes.default.func,
      ])
    ),
  ]),
  getFieldValue: _propTypes.default.func.isRequired,
  hasAnyEditingRow: _propTypes.default.bool,
  hasDetailPanel: _propTypes.default.bool.isRequired,
  icons: _propTypes.default.object.isRequired,
  isTreeData: _propTypes.default.bool.isRequired,
  onRowSelected: _propTypes.default.func,
  options: _propTypes.default.object.isRequired,
  pageSize: _propTypes.default.number,
  renderData: _propTypes.default.array,
  initialFormData: _propTypes.default.object,
  selection: _propTypes.default.bool.isRequired,
  scrollWidth: _propTypes.default.number.isRequired,
  showAddRow: _propTypes.default.bool,
  treeDataMaxLevel: _propTypes.default.number,
  localization: _propTypes.default.object,
  onFilterChanged: _propTypes.default.func,
  onGroupExpandChanged: _propTypes.default.func,
  onToggleDetailPanel: _propTypes.default.func.isRequired,
  onTreeExpandChanged: _propTypes.default.func.isRequired,
  onRowClick: _propTypes.default.func,
  onEditingCanceled: _propTypes.default.func,
  onEditingApproved: _propTypes.default.func,
  errorState: _propTypes.default.oneOfType([
    _propTypes.default.object,
    _propTypes.default.bool,
  ]),
  cellEditable: _propTypes.default.object,
  onCellEditStarted: _propTypes.default.func,
  onCellEditFinished: _propTypes.default.func,
  bulkEditOpen: _propTypes.default.bool,
  onBulkEditRowChanged: _propTypes.default.func,
};
var _default = MTableBody;
exports.default = _default;

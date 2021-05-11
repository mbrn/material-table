"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof3 = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(
  require("@babel/runtime/helpers/extends")
);

var _toConsumableArray2 = _interopRequireDefault(
  require("@babel/runtime/helpers/toConsumableArray")
);

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

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

var _Table = _interopRequireDefault(require("@material-ui/core/Table"));

var _TableFooter = _interopRequireDefault(
  require("@material-ui/core/TableFooter")
);

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _LinearProgress = _interopRequireDefault(
  require("@material-ui/core/LinearProgress")
);

var _reactDoubleScrollbar = _interopRequireDefault(
  require("react-double-scrollbar")
);

var React = _interopRequireWildcard(require("react"));

var _components = require("./components");

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _dataManager = _interopRequireDefault(require("./utils/data-manager"));

var _debounce = require("debounce");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _core = require("@material-ui/core");

var CommonValues = _interopRequireWildcard(require("./utils/common-values"));

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
    (_typeof3(obj) !== "object" && typeof obj !== "function")
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
var MaterialTable = /*#__PURE__*/ (function (_React$Component) {
  (0, _inherits2.default)(MaterialTable, _React$Component);

  var _super = _createSuper(MaterialTable);

  function MaterialTable(_props) {
    var _this;

    (0, _classCallCheck2.default)(this, MaterialTable);
    _this = _super.call(this, _props);
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "dataManager",
      new _dataManager.default()
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "isRemoteData",
      function (props) {
        return !Array.isArray((props || _this.props).data);
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "isOutsidePageNumbers",
      function (props) {
        return props.page !== undefined && props.totalCount !== undefined;
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onAllSelected",
      function (checked) {
        _this.dataManager.changeAllSelected(checked);

        _this.setState(_this.dataManager.getRenderState(), function () {
          return _this.onSelectionChange();
        });
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onChangeColumnHidden",
      function (column, hidden) {
        _this.dataManager.changeColumnHidden(column, hidden);

        _this.setState(_this.dataManager.getRenderState(), function () {
          _this.props.onChangeColumnHidden &&
            _this.props.onChangeColumnHidden(column, hidden);
        });
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onChangeGroupOrder",
      function (groupedColumn) {
        _this.dataManager.changeGroupOrder(groupedColumn.tableData.id);

        _this.setState(_this.dataManager.getRenderState());
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onChangeOrder",
      function (orderBy, orderDirection) {
        var newOrderBy = orderDirection === "" ? -1 : orderBy;

        _this.dataManager.changeOrder(newOrderBy, orderDirection);

        if (_this.isRemoteData()) {
          var query = (0, _objectSpread2.default)({}, _this.state.query);
          query.page = 0;
          query.orderBy = _this.state.columns.find(function (a) {
            return a.tableData.id === newOrderBy;
          });
          query.orderDirection = orderDirection;

          _this.onQueryChange(query, function () {
            _this.props.onOrderChange &&
              _this.props.onOrderChange(newOrderBy, orderDirection);
          });
        } else {
          _this.setState(_this.dataManager.getRenderState(), function () {
            _this.props.onOrderChange &&
              _this.props.onOrderChange(newOrderBy, orderDirection);
          });
        }
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onChangePage",
      function (event, page) {
        if (_this.isRemoteData()) {
          var query = (0, _objectSpread2.default)({}, _this.state.query);
          query.page = page;

          _this.onQueryChange(query, function () {
            _this.props.onChangePage &&
              _this.props.onChangePage(page, query.pageSize);
          });
        } else {
          if (!_this.isOutsidePageNumbers(_this.props)) {
            _this.dataManager.changeCurrentPage(page);
          }

          _this.setState(_this.dataManager.getRenderState(), function () {
            _this.props.onChangePage &&
              _this.props.onChangePage(page, _this.state.pageSize);
          });
        }
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onChangeRowsPerPage",
      function (event) {
        var pageSize = event.target.value;

        _this.dataManager.changePageSize(pageSize);

        _this.props.onChangePage && _this.props.onChangePage(0, pageSize);

        if (_this.isRemoteData()) {
          var query = (0, _objectSpread2.default)({}, _this.state.query);
          query.pageSize = event.target.value;
          query.page = 0;

          _this.onQueryChange(query, function () {
            _this.props.onChangeRowsPerPage &&
              _this.props.onChangeRowsPerPage(pageSize);
          });
        } else {
          _this.dataManager.changeCurrentPage(0);

          _this.setState(_this.dataManager.getRenderState(), function () {
            _this.props.onChangeRowsPerPage &&
              _this.props.onChangeRowsPerPage(pageSize);
          });
        }
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onDragEnd",
      function (result) {
        if (!result || !result.source || !result.destination) return;

        _this.dataManager.changeByDrag(result);

        _this.setState(_this.dataManager.getRenderState(), function () {
          if (
            _this.props.onColumnDragged &&
            result.destination.droppableId === "headers" &&
            result.source.droppableId === "headers"
          ) {
            _this.props.onColumnDragged(
              result.source.index,
              result.destination.index
            );
          }
        });
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onGroupExpandChanged",
      function (path) {
        _this.dataManager.changeGroupExpand(path);

        _this.setState(_this.dataManager.getRenderState());
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onGroupRemoved",
      function (groupedColumn, index) {
        var result = {
          combine: null,
          destination: {
            droppableId: "headers",
            index: 0,
          },
          draggableId: groupedColumn.tableData.id,
          mode: "FLUID",
          reason: "DROP",
          source: {
            index: index,
            droppableId: "groups",
          },
          type: "DEFAULT",
        };

        _this.dataManager.changeByDrag(result);

        _this.setState(_this.dataManager.getRenderState(), function () {
          _this.props.onGroupRemoved &&
            _this.props.onGroupRemoved(groupedColumn, index);
        });
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onEditingApproved",
      function (mode, newData, oldData) {
        if (
          mode === "add" &&
          _this.props.editable &&
          _this.props.editable.onRowAdd
        ) {
          _this.setState(
            {
              isLoading: true,
            },
            function () {
              _this.props.editable
                .onRowAdd(newData)
                .then(function (result) {
                  _this.setState(
                    {
                      isLoading: false,
                      showAddRow: false,
                    },
                    function () {
                      if (_this.isRemoteData()) {
                        _this.onQueryChange(_this.state.query);
                      }
                    }
                  );
                })
                .catch(function (reason) {
                  var errorState = {
                    message: reason,
                    errorCause: "add",
                  };

                  _this.setState({
                    isLoading: false,
                    errorState: errorState,
                  });
                });
            }
          );
        } else if (
          mode === "update" &&
          _this.props.editable &&
          _this.props.editable.onRowUpdate
        ) {
          _this.setState(
            {
              isLoading: true,
            },
            function () {
              _this.props.editable
                .onRowUpdate(newData, oldData)
                .then(function (result) {
                  _this.dataManager.changeRowEditing(oldData);

                  _this.setState(
                    (0, _objectSpread2.default)(
                      {
                        isLoading: false,
                      },
                      _this.dataManager.getRenderState()
                    ),
                    function () {
                      if (_this.isRemoteData()) {
                        _this.onQueryChange(_this.state.query);
                      }
                    }
                  );
                })
                .catch(function (reason) {
                  var errorState = {
                    message: reason,
                    errorCause: "update",
                  };

                  _this.setState({
                    isLoading: false,
                    errorState: errorState,
                  });
                });
            }
          );
        } else if (
          mode === "delete" &&
          _this.props.editable &&
          _this.props.editable.onRowDelete
        ) {
          _this.setState(
            {
              isLoading: true,
            },
            function () {
              _this.props.editable
                .onRowDelete(oldData)
                .then(function (result) {
                  _this.dataManager.changeRowEditing(oldData);

                  _this.setState(
                    (0, _objectSpread2.default)(
                      {
                        isLoading: false,
                      },
                      _this.dataManager.getRenderState()
                    ),
                    function () {
                      if (_this.isRemoteData()) {
                        _this.onQueryChange(_this.state.query);
                      }
                    }
                  );
                })
                .catch(function (reason) {
                  var errorState = {
                    message: reason,
                    errorCause: "delete",
                  };

                  _this.setState({
                    isLoading: false,
                    errorState: errorState,
                  });
                });
            }
          );
        } else if (
          mode === "bulk" &&
          _this.props.editable &&
          _this.props.editable.onBulkUpdate
        ) {
          _this.setState(
            {
              isLoading: true,
            },
            function () {
              _this.props.editable
                .onBulkUpdate(_this.dataManager.bulkEditChangedRows)
                .then(function (result) {
                  _this.dataManager.changeBulkEditOpen(false);

                  _this.dataManager.clearBulkEditChangedRows();

                  _this.setState(
                    (0, _objectSpread2.default)(
                      {
                        isLoading: false,
                      },
                      _this.dataManager.getRenderState()
                    ),
                    function () {
                      if (_this.isRemoteData()) {
                        _this.onQueryChange(_this.state.query);
                      }
                    }
                  );
                })
                .catch(function (reason) {
                  var errorState = {
                    message: reason,
                    errorCause: "bulk edit",
                  };

                  _this.setState({
                    isLoading: false,
                    errorState: errorState,
                  });
                });
            }
          );
        }
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onEditingCanceled",
      function (mode, rowData) {
        if (mode === "add") {
          _this.props.editable.onRowAddCancelled &&
            _this.props.editable.onRowAddCancelled();

          _this.setState({
            showAddRow: false,
          });
        } else if (mode === "update") {
          _this.props.editable.onRowUpdateCancelled &&
            _this.props.editable.onRowUpdateCancelled();

          _this.dataManager.changeRowEditing(rowData);

          _this.setState(_this.dataManager.getRenderState());
        } else if (mode === "delete") {
          _this.dataManager.changeRowEditing(rowData);

          _this.setState(_this.dataManager.getRenderState());
        }
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "retry",
      function () {
        _this.onQueryChange(_this.state.query);
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onQueryChange",
      function (query, callback) {
        query = (0, _objectSpread2.default)({}, _this.state.query, query, {
          error: _this.state.errorState,
        });

        _this.setState(
          {
            isLoading: true,
            errorState: undefined,
          },
          function () {
            _this.props
              .data(query)
              .then(function (result) {
                query.totalCount = result.totalCount;
                query.page = result.page;

                _this.dataManager.setData(result.data);

                _this.setState(
                  (0, _objectSpread2.default)(
                    {
                      isLoading: false,
                      errorState: false,
                    },
                    _this.dataManager.getRenderState(),
                    {
                      query: query,
                    }
                  ),
                  function () {
                    callback && callback();
                  }
                );
              })
              .catch(function (error) {
                var localization = (0, _objectSpread2.default)(
                  {},
                  MaterialTable.defaultProps.localization,
                  _this.props.localization
                );
                var errorState = {
                  message:
                    (0, _typeof2.default)(error) === "object"
                      ? error.message
                      : error !== undefined
                      ? error
                      : localization.error,
                  errorCause: "query",
                };

                _this.setState(
                  (0, _objectSpread2.default)(
                    {
                      isLoading: false,
                      errorState: errorState,
                    },
                    _this.dataManager.getRenderState()
                  )
                );
              });
          }
        );
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onRowSelected",
      function (event, path, dataClicked) {
        _this.dataManager.changeRowSelected(event.target.checked, path);

        _this.setState(_this.dataManager.getRenderState(), function () {
          return _this.onSelectionChange(dataClicked);
        });
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onSelectionChange",
      function (dataClicked) {
        if (_this.props.onSelectionChange) {
          var selectedRows = [];

          var findSelecteds = function findSelecteds(list) {
            list.forEach(function (row) {
              if (row.tableData.checked) {
                selectedRows.push(row);
              }
            });
          };

          findSelecteds(_this.state.originalData);

          _this.props.onSelectionChange(selectedRows, dataClicked);
        }
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onSearchChangeDebounce",
      (0, _debounce.debounce)(function (searchText) {
        if (_this.isRemoteData()) {
          var query = (0, _objectSpread2.default)({}, _this.state.query);
          query.page = 0;
          query.search = searchText;

          _this.onQueryChange(query);
        } else {
          _this.setState(_this.dataManager.getRenderState(), function () {
            _this.props.onSearchChange &&
              _this.props.onSearchChange(searchText);
          });
        }
      }, _this.props.options.debounceInterval)
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onFilterChange",
      function (columnId, value) {
        _this.dataManager.changeFilterValue(columnId, value);

        _this.setState({}, _this.onFilterChangeDebounce);
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onFilterChangeDebounce",
      (0, _debounce.debounce)(function () {
        if (_this.isRemoteData()) {
          var query = (0, _objectSpread2.default)({}, _this.state.query);
          query.page = 0;
          query.filters = _this.state.columns
            .filter(function (a) {
              return a.tableData.filterValue;
            })
            .map(function (a) {
              return {
                column: a,
                operator: "=",
                value: a.tableData.filterValue,
              };
            });

          _this.onQueryChange(query);
        } else {
          _this.setState(_this.dataManager.getRenderState(), function () {
            if (_this.props.onFilterChange) {
              var appliedFilters = _this.state.columns
                .filter(function (a) {
                  return a.tableData.filterValue;
                })
                .map(function (a) {
                  return {
                    column: a,
                    operator: "=",
                    value: a.tableData.filterValue,
                  };
                });

              _this.props.onFilterChange(appliedFilters);
            }
          });
        }
      }, _this.props.options.debounceInterval)
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onTreeExpandChanged",
      function (path, data) {
        _this.dataManager.changeTreeExpand(path);

        _this.setState(_this.dataManager.getRenderState(), function () {
          _this.props.onTreeExpandChange &&
            _this.props.onTreeExpandChange(data, data.tableData.isTreeExpanded);
        });
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onToggleDetailPanel",
      function (path, render) {
        _this.dataManager.changeDetailPanelVisibility(path, render);

        _this.setState(_this.dataManager.getRenderState());
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onCellEditStarted",
      function (rowData, columnDef) {
        _this.dataManager.startCellEditable(rowData, columnDef);

        _this.setState(_this.dataManager.getRenderState());
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onCellEditFinished",
      function (rowData, columnDef) {
        _this.dataManager.finishCellEditable(rowData, columnDef);

        _this.setState(_this.dataManager.getRenderState());
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onEditRowDataChanged",
      function (rowData, newData) {
        _this.dataManager.setEditRowData(rowData, newData);

        _this.setState(_this.dataManager.getRenderState());
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "onColumnResized",
      function (id, additionalWidth) {
        _this.dataManager.onColumnResized(id, additionalWidth);

        _this.setState(_this.dataManager.getRenderState());
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "renderTable",
      function (props) {
        return /*#__PURE__*/ React.createElement(
          _Table.default,
          {
            style: {
              tableLayout:
                props.options.fixedColumns &&
                (props.options.fixedColumns.left ||
                  props.options.fixedColumns.right)
                  ? "fixed"
                  : props.options.tableLayout,
            },
          },
          props.options.header &&
            /*#__PURE__*/ React.createElement(props.components.Header, {
              actions: props.actions,
              localization: (0, _objectSpread2.default)(
                {},
                MaterialTable.defaultProps.localization.header,
                _this.props.localization.header
              ),
              columns: _this.state.columns,
              hasSelection: props.options.selection,
              headerStyle: props.options.headerStyle,
              icons: props.icons,
              selectedCount: _this.state.selectedCount,
              dataCount: props.parentChildData
                ? _this.state.treefiedDataLength
                : _this.state.columns.filter(function (col) {
                    return col.tableData.groupOrder > -1;
                  }).length > 0
                ? _this.state.groupedDataLength
                : _this.state.data.length,
              hasDetailPanel: !!props.detailPanel,
              detailPanelColumnAlignment:
                props.options.detailPanelColumnAlignment,
              showActionsColumn:
                props.actions &&
                props.actions.filter(function (a) {
                  return a.position === "row" || typeof a === "function";
                }).length > 0,
              showSelectAllCheckbox: props.options.showSelectAllCheckbox,
              orderBy: _this.state.orderBy,
              orderDirection: _this.state.orderDirection,
              onAllSelected: _this.onAllSelected,
              onOrderChange: _this.onChangeOrder,
              actionsHeaderIndex: props.options.actionsColumnIndex,
              sorting: props.options.sorting,
              grouping: props.options.grouping,
              isTreeData: _this.props.parentChildData !== undefined,
              draggable: props.options.draggable,
              thirdSortClick: props.options.thirdSortClick,
              treeDataMaxLevel: _this.state.treeDataMaxLevel,
              options: props.options,
              onColumnResized: _this.onColumnResized,
              scrollWidth: _this.state.width,
            }),
          /*#__PURE__*/ React.createElement(props.components.Body, {
            actions: props.actions,
            components: props.components,
            icons: props.icons,
            renderData: _this.state.renderData,
            currentPage: _this.state.currentPage,
            initialFormData: props.initialFormData,
            pageSize: _this.state.pageSize,
            columns: _this.state.columns,
            errorState: _this.state.errorState,
            detailPanel: props.detailPanel,
            options: props.options,
            getFieldValue: _this.dataManager.getFieldValue,
            isTreeData: _this.props.parentChildData !== undefined,
            onFilterChanged: _this.onFilterChange,
            onRowSelected: _this.onRowSelected,
            onToggleDetailPanel: _this.onToggleDetailPanel,
            onGroupExpandChanged: _this.onGroupExpandChanged,
            onTreeExpandChanged: _this.onTreeExpandChanged,
            onEditingCanceled: _this.onEditingCanceled,
            onEditingApproved: _this.onEditingApproved,
            localization: (0, _objectSpread2.default)(
              {},
              MaterialTable.defaultProps.localization.body,
              _this.props.localization.body
            ),
            onRowClick: _this.props.onRowClick,
            showAddRow: _this.state.showAddRow,
            hasAnyEditingRow: !!(
              _this.state.lastEditingRow || _this.state.showAddRow
            ),
            hasDetailPanel: !!props.detailPanel,
            treeDataMaxLevel: _this.state.treeDataMaxLevel,
            cellEditable: props.cellEditable,
            onCellEditStarted: _this.onCellEditStarted,
            onCellEditFinished: _this.onCellEditFinished,
            bulkEditOpen: _this.dataManager.bulkEditOpen,
            onBulkEditRowChanged: _this.dataManager.onBulkEditRowChanged,
            scrollWidth: _this.state.width,
          })
        );
      }
    );
    (0, _defineProperty2.default)(
      (0, _assertThisInitialized2.default)(_this),
      "getColumnsWidth",
      function (props, count) {
        var result = [];
        var actionsWidth = CommonValues.actionsColumnWidth(props);

        if (actionsWidth > 0) {
          if (
            count > 0 &&
            props.options.actionsColumnIndex >= 0 &&
            props.options.actionsColumnIndex < count
          ) {
            result.push(actionsWidth + "px");
          } else if (
            count < 0 &&
            props.options.actionsColumnIndex < 0 &&
            props.options.actionsColumnIndex >= count
          ) {
            result.push(actionsWidth + "px");
          }
        } // add selection action width only for left container div

        if (props.options.selection && count > 0) {
          var selectionWidth = CommonValues.selectionMaxWidth(
            props,
            _this.state.treeDataMaxLevel
          );
          result.push(selectionWidth + "px");
        }

        for (var i = 0; i < Math.abs(count) && i < props.columns.length; i++) {
          var colDef =
            props.columns[count >= 0 ? i : props.columns.length - 1 - i];

          if (colDef.tableData) {
            if (typeof colDef.tableData.width === "number") {
              result.push(colDef.tableData.width + "px");
            } else {
              result.push(colDef.tableData.width);
            }
          }
        }

        return "calc(" + result.join(" + ") + ")";
      }
    );

    var calculatedProps = _this.getProps(_props);

    _this.setDataManagerFields(calculatedProps, true);

    var renderState = _this.dataManager.getRenderState();

    _this.state = (0, _objectSpread2.default)(
      {
        data: [],
        errorState: undefined,
      },
      renderState,
      {
        query: {
          filters: renderState.columns
            .filter(function (a) {
              return a.tableData.filterValue;
            })
            .map(function (a) {
              return {
                column: a,
                operator: "=",
                value: a.tableData.filterValue,
              };
            }),
          orderBy: renderState.columns.find(function (a) {
            return a.tableData.id === renderState.orderBy;
          }),
          orderDirection: renderState.orderDirection,
          page: 0,
          pageSize: calculatedProps.options.pageSize,
          search: renderState.searchText,
          totalCount: 0,
        },
        showAddRow: false,
        bulkEditOpen: false,
        width: 0,
      }
    );
    _this.tableContainerDiv = React.createRef();
    return _this;
  }

  (0, _createClass2.default)(MaterialTable, [
    {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        this.setState(
          (0, _objectSpread2.default)({}, this.dataManager.getRenderState(), {
            width: this.tableContainerDiv.current.scrollWidth,
          }),
          function () {
            if (_this2.isRemoteData()) {
              _this2.onQueryChange(_this2.state.query);
            }
          }
        );
      },
    },
    {
      key: "setDataManagerFields",
      value: function setDataManagerFields(props, isInit) {
        var defaultSortColumnIndex = -1;
        var defaultSortDirection = "";

        if (props && props.options.sorting !== false) {
          defaultSortColumnIndex = props.columns.findIndex(function (a) {
            return a.defaultSort && a.sorting !== false;
          });
          defaultSortDirection =
            defaultSortColumnIndex > -1
              ? props.columns[defaultSortColumnIndex].defaultSort
              : "";
        }

        this.dataManager.setColumns(props.columns);
        this.dataManager.setDefaultExpanded(props.options.defaultExpanded);
        this.dataManager.changeRowEditing();

        if (this.isRemoteData(props)) {
          this.dataManager.changeApplySearch(false);
          this.dataManager.changeApplyFilters(false);
          this.dataManager.changeApplySort(false);
        } else {
          this.dataManager.changeApplySearch(true);
          this.dataManager.changeApplyFilters(true);
          this.dataManager.changeApplySort(true);
          this.dataManager.setData(props.data);
        } // If the columns changed and the defaultSorting differs from the current sorting, it will trigger a new sorting

        var shouldReorder =
          isInit ||
          (defaultSortColumnIndex !== this.dataManager.orderBy &&
            !this.isRemoteData() &&
            defaultSortDirection !== this.dataManager.orderDirection);
        shouldReorder &&
          this.dataManager.changeOrder(
            defaultSortColumnIndex,
            defaultSortDirection
          );
        isInit &&
          this.dataManager.changeSearchText(props.options.searchText || "");
        isInit &&
          this.dataManager.changeCurrentPage(
            props.options.initialPage ? props.options.initialPage : 0
          );
        (isInit || this.isRemoteData()) &&
          this.dataManager.changePageSize(props.options.pageSize);
        this.dataManager.changePaging(props.options.paging);
        isInit && this.dataManager.changeParentFunc(props.parentChildData);
        this.dataManager.changeDetailPanelType(props.options.detailPanelType);
      },
    },
    {
      key: "cleanColumns",
      value: function cleanColumns(columns) {
        return columns.map(function (col) {
          var colClone = (0, _objectSpread2.default)({}, col);
          delete colClone.tableData;
          return colClone;
        });
      },
    },
    {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        // const propsChanged = Object.entries(this.props).reduce((didChange, prop) => didChange || prop[1] !== prevProps[prop[0]], false);
        var fixedPrevColumns = this.cleanColumns(prevProps.columns);
        var fixedPropsColumns = this.cleanColumns(this.props.columns);
        var propsChanged = !(0, _fastDeepEqual.default)(
          fixedPrevColumns,
          fixedPropsColumns
        );
        propsChanged =
          propsChanged ||
          !(0, _fastDeepEqual.default)(prevProps.options, this.props.options);

        if (!this.isRemoteData()) {
          propsChanged =
            propsChanged ||
            !(0, _fastDeepEqual.default)(prevProps.data, this.props.data);
        }

        if (propsChanged) {
          var props = this.getProps(this.props);
          this.setDataManagerFields(props);
          this.setState(this.dataManager.getRenderState());
        }

        var count = this.isRemoteData()
          ? this.state.query.totalCount
          : this.state.data.length;
        var currentPage = this.isRemoteData()
          ? this.state.query.page
          : this.state.currentPage;
        var pageSize = this.isRemoteData()
          ? this.state.query.pageSize
          : this.state.pageSize;

        if (count <= pageSize * currentPage && currentPage !== 0) {
          this.onChangePage(null, Math.max(0, Math.ceil(count / pageSize) - 1));
        }
      },
    },
    {
      key: "getProps",
      value: function getProps(props) {
        var _this3 = this;

        var calculatedProps = (0, _objectSpread2.default)(
          {},
          props || this.props
        );
        calculatedProps.components = (0, _objectSpread2.default)(
          {},
          MaterialTable.defaultProps.components,
          calculatedProps.components
        );
        calculatedProps.icons = (0, _objectSpread2.default)(
          {},
          MaterialTable.defaultProps.icons,
          calculatedProps.icons
        );
        calculatedProps.options = (0, _objectSpread2.default)(
          {},
          MaterialTable.defaultProps.options,
          calculatedProps.options
        );
        var localization = (0, _objectSpread2.default)(
          {},
          MaterialTable.defaultProps.localization.body,
          calculatedProps.localization.body
        );
        calculatedProps.actions = (0, _toConsumableArray2.default)(
          calculatedProps.actions || []
        );
        if (calculatedProps.options.selection)
          calculatedProps.actions = calculatedProps.actions
            .filter(function (a) {
              return a;
            })
            .map(function (action) {
              if (
                action.position === "auto" ||
                action.isFreeAction === false ||
                (action.position === undefined &&
                  action.isFreeAction === undefined)
              ) {
                if (typeof action === "function")
                  return {
                    action: action,
                    position: "toolbarOnSelect",
                  };
                else
                  return (0, _objectSpread2.default)({}, action, {
                    position: "toolbarOnSelect",
                  });
              } else if (action.isFreeAction) {
                if (typeof action === "function")
                  return {
                    action: action,
                    position: "toolbar",
                  };
                else
                  return (0, _objectSpread2.default)({}, action, {
                    position: "toolbar",
                  });
              } else return action;
            });
        else
          calculatedProps.actions = calculatedProps.actions
            .filter(function (a) {
              return a;
            })
            .map(function (action) {
              if (
                action.position === "auto" ||
                action.isFreeAction === false ||
                (action.position === undefined &&
                  action.isFreeAction === undefined)
              ) {
                if (typeof action === "function")
                  return {
                    action: action,
                    position: "row",
                  };
                else
                  return (0, _objectSpread2.default)({}, action, {
                    position: "row",
                  });
              } else if (action.isFreeAction) {
                if (typeof action === "function")
                  return {
                    action: action,
                    position: "toolbar",
                  };
                else
                  return (0, _objectSpread2.default)({}, action, {
                    position: "toolbar",
                  });
              } else return action;
            });

        if (calculatedProps.editable) {
          if (calculatedProps.editable.onRowAdd) {
            calculatedProps.actions.push({
              icon: calculatedProps.icons.Add,
              tooltip: localization.addTooltip,
              position: "toolbar",
              disabled: !!this.dataManager.lastEditingRow,
              onClick: function onClick() {
                _this3.dataManager.changeRowEditing();

                _this3.setState(
                  (0, _objectSpread2.default)(
                    {},
                    _this3.dataManager.getRenderState(),
                    {
                      showAddRow: !_this3.state.showAddRow,
                    }
                  )
                );
              },
            });
          }

          if (calculatedProps.editable.onRowUpdate) {
            calculatedProps.actions.push(function (rowData) {
              return {
                icon: calculatedProps.icons.Edit,
                tooltip: calculatedProps.editable.editTooltip
                  ? calculatedProps.editable.editTooltip(rowData)
                  : localization.editTooltip,
                disabled:
                  calculatedProps.editable.isEditable &&
                  !calculatedProps.editable.isEditable(rowData),
                hidden:
                  calculatedProps.editable.isEditHidden &&
                  calculatedProps.editable.isEditHidden(rowData),
                onClick: function onClick(e, rowData) {
                  _this3.dataManager.changeRowEditing(rowData, "update");

                  _this3.setState(
                    (0, _objectSpread2.default)(
                      {},
                      _this3.dataManager.getRenderState(),
                      {
                        showAddRow: false,
                      }
                    )
                  );
                },
              };
            });
          }

          if (calculatedProps.editable.onRowDelete) {
            calculatedProps.actions.push(function (rowData) {
              return {
                icon: calculatedProps.icons.Delete,
                tooltip: calculatedProps.editable.deleteTooltip
                  ? calculatedProps.editable.deleteTooltip(rowData)
                  : localization.deleteTooltip,
                disabled:
                  calculatedProps.editable.isDeletable &&
                  !calculatedProps.editable.isDeletable(rowData),
                hidden:
                  calculatedProps.editable.isDeleteHidden &&
                  calculatedProps.editable.isDeleteHidden(rowData),
                onClick: function onClick(e, rowData) {
                  _this3.dataManager.changeRowEditing(rowData, "delete");

                  _this3.setState(
                    (0, _objectSpread2.default)(
                      {},
                      _this3.dataManager.getRenderState(),
                      {
                        showAddRow: false,
                      }
                    )
                  );
                },
              };
            });
          }

          if (calculatedProps.editable.onBulkUpdate) {
            calculatedProps.actions.push({
              icon: calculatedProps.icons.Edit,
              tooltip: localization.bulkEditTooltip,
              position: "toolbar",
              hidden: this.dataManager.bulkEditOpen,
              onClick: function onClick() {
                _this3.dataManager.changeBulkEditOpen(true);

                _this3.setState(_this3.dataManager.getRenderState());
              },
            });
            calculatedProps.actions.push({
              icon: calculatedProps.icons.Check,
              tooltip: localization.bulkEditApprove,
              position: "toolbar",
              hidden: !this.dataManager.bulkEditOpen,
              onClick: function onClick() {
                return _this3.onEditingApproved("bulk");
              },
            });
            calculatedProps.actions.push({
              icon: calculatedProps.icons.Clear,
              tooltip: localization.bulkEditCancel,
              position: "toolbar",
              hidden: !this.dataManager.bulkEditOpen,
              onClick: function onClick() {
                _this3.dataManager.changeBulkEditOpen(false);

                _this3.dataManager.clearBulkEditChangedRows();

                _this3.setState(_this3.dataManager.getRenderState());
              },
            });
          }
        }

        return calculatedProps;
      },
    },
    {
      key: "renderFooter",
      value: function renderFooter() {
        var props = this.getProps();

        if (props.options.paging) {
          var localization = (0, _objectSpread2.default)(
            {},
            MaterialTable.defaultProps.localization.pagination,
            this.props.localization.pagination
          );
          var isOutsidePageNumbers = this.isOutsidePageNumbers(props);
          var currentPage = isOutsidePageNumbers
            ? Math.min(
                props.page,
                Math.floor(props.totalCount / this.state.pageSize)
              )
            : this.state.currentPage;
          var totalCount = isOutsidePageNumbers
            ? props.totalCount
            : this.state.data.length;
          return /*#__PURE__*/ React.createElement(
            _Table.default,
            null,
            /*#__PURE__*/ React.createElement(
              _TableFooter.default,
              {
                style: {
                  display: "grid",
                },
              },
              /*#__PURE__*/ React.createElement(
                _TableRow.default,
                null,
                /*#__PURE__*/ React.createElement(props.components.Pagination, {
                  classes: {
                    root: props.classes.paginationRoot,
                    toolbar: props.classes.paginationToolbar,
                    caption: props.classes.paginationCaption,
                    selectRoot: props.classes.paginationSelectRoot,
                  },
                  style: {
                    float: props.theme.direction === "rtl" ? "" : "right",
                    overflowX: "auto",
                  },
                  colSpan: 3,
                  count: this.isRemoteData()
                    ? this.state.query.totalCount
                    : totalCount,
                  icons: props.icons,
                  rowsPerPage: this.state.pageSize,
                  rowsPerPageOptions: props.options.pageSizeOptions,
                  SelectProps: {
                    renderValue: function renderValue(value) {
                      return /*#__PURE__*/ React.createElement(
                        "div",
                        {
                          style: {
                            padding: "0px 5px",
                          },
                        },
                        value + " " + localization.labelRowsSelect + " "
                      );
                    },
                  },
                  page: this.isRemoteData()
                    ? this.state.query.page
                    : currentPage,
                  onChangePage: this.onChangePage,
                  onChangeRowsPerPage: this.onChangeRowsPerPage,
                  ActionsComponent: function ActionsComponent(subProps) {
                    return props.options.paginationType === "normal"
                      ? /*#__PURE__*/ React.createElement(
                          _components.MTablePagination,
                          (0, _extends2.default)({}, subProps, {
                            icons: props.icons,
                            localization: localization,
                            showFirstLastPageButtons:
                              props.options.showFirstLastPageButtons,
                          })
                        )
                      : /*#__PURE__*/ React.createElement(
                          _components.MTableSteppedPagination,
                          (0, _extends2.default)({}, subProps, {
                            icons: props.icons,
                            localization: localization,
                            showFirstLastPageButtons:
                              props.options.showFirstLastPageButtons,
                          })
                        );
                  },
                  labelDisplayedRows: function labelDisplayedRows(row) {
                    return localization.labelDisplayedRows
                      .replace("{from}", row.from)
                      .replace("{to}", row.to)
                      .replace("{count}", row.count);
                  },
                  labelRowsPerPage: localization.labelRowsPerPage,
                })
              )
            )
          );
        }
      },
    },
    {
      key: "render",
      value: function render() {
        var _this4 = this;

        var props = this.getProps();
        return /*#__PURE__*/ React.createElement(
          _reactBeautifulDnd.DragDropContext,
          {
            onDragEnd: this.onDragEnd,
            nonce: props.options.cspNonce,
          },
          /*#__PURE__*/ React.createElement(
            props.components.Container,
            {
              style: (0, _objectSpread2.default)(
                {
                  position: "relative",
                },
                props.style
              ),
            },
            props.options.paginationPosition === "top" ||
              props.options.paginationPosition === "both"
              ? this.renderFooter()
              : null,
            props.options.toolbar &&
              /*#__PURE__*/ React.createElement(props.components.Toolbar, {
                actions: props.actions,
                components: props.components,
                selectedRows:
                  this.state.selectedCount > 0
                    ? this.state.originalData.filter(function (a) {
                        return a.tableData.checked;
                      })
                    : [],
                columns: this.state.columns,
                columnsButton: props.options.columnsButton,
                icons: props.icons,
                exportAllData: props.options.exportAllData,
                exportButton: props.options.exportButton,
                exportDelimiter: props.options.exportDelimiter,
                exportFileName: props.options.exportFileName,
                exportCsv: props.options.exportCsv,
                exportPdf: props.options.exportPdf,
                getFieldValue: this.dataManager.getFieldValue,
                data: this.state.data,
                renderData: this.state.renderData,
                search: props.options.search,
                showTitle: props.options.showTitle,
                showTextRowsSelected: props.options.showTextRowsSelected,
                toolbarButtonAlignment: props.options.toolbarButtonAlignment,
                searchFieldAlignment: props.options.searchFieldAlignment,
                searchAutoFocus: props.options.searchAutoFocus,
                searchFieldStyle: props.options.searchFieldStyle,
                searchFieldVariant: props.options.searchFieldVariant,
                title: props.title,
                searchText: this.dataManager.searchText,
                onSearchChanged: this.onSearchChangeDebounce,
                dataManager: this.dataManager,
                onColumnsChanged: this.onChangeColumnHidden,
                localization: (0, _objectSpread2.default)(
                  {},
                  MaterialTable.defaultProps.localization.toolbar,
                  this.props.localization.toolbar
                ),
              }),
            props.options.grouping &&
              /*#__PURE__*/ React.createElement(props.components.Groupbar, {
                icons: props.icons,
                localization: (0, _objectSpread2.default)(
                  {},
                  MaterialTable.defaultProps.localization.grouping,
                  props.localization.grouping
                ),
                groupColumns: this.state.columns
                  .filter(function (col) {
                    return col.tableData.groupOrder > -1;
                  })
                  .sort(function (col1, col2) {
                    return (
                      col1.tableData.groupOrder - col2.tableData.groupOrder
                    );
                  }),
                onSortChanged: this.onChangeGroupOrder,
                onGroupRemoved: this.onGroupRemoved,
              }),
            /*#__PURE__*/ React.createElement(
              ScrollBar,
              {
                double: props.options.doubleHorizontalScroll,
              },
              /*#__PURE__*/ React.createElement(
                _reactBeautifulDnd.Droppable,
                {
                  droppableId: "headers",
                  direction: "horizontal",
                },
                function (provided, snapshot) {
                  var table = _this4.renderTable(props);

                  return /*#__PURE__*/ React.createElement(
                    "div",
                    {
                      ref: provided.innerRef,
                    },
                    /*#__PURE__*/ React.createElement(
                      "div",
                      {
                        ref: _this4.tableContainerDiv,
                        style: {
                          maxHeight: props.options.maxBodyHeight,
                          minHeight: props.options.minBodyHeight,
                          overflowY: props.options.overflowY,
                        },
                      },
                      _this4.state.width &&
                        props.options.fixedColumns &&
                        props.options.fixedColumns.right
                        ? /*#__PURE__*/ React.createElement(
                            "div",
                            {
                              style: {
                                width: _this4.getColumnsWidth(
                                  props,
                                  -1 * props.options.fixedColumns.right
                                ),
                                position: "absolute",
                                top: 0,
                                right: 0,
                                boxShadow:
                                  "-2px 0px 15px rgba(125,147,178,.25)",
                                overflowX: "hidden",
                                zIndex: 11,
                              },
                            },
                            /*#__PURE__*/ React.createElement(
                              "div",
                              {
                                style: {
                                  width: _this4.state.width,
                                  background: "white",
                                  transform: "translateX(calc(".concat(
                                    _this4.getColumnsWidth(
                                      props,
                                      -1 * props.options.fixedColumns.right
                                    ),
                                    " - 100%))"
                                  ),
                                },
                              },
                              table
                            )
                          )
                        : null,
                      /*#__PURE__*/ React.createElement("div", null, table),
                      _this4.state.width &&
                        props.options.fixedColumns &&
                        props.options.fixedColumns.left
                        ? /*#__PURE__*/ React.createElement(
                            "div",
                            {
                              style: {
                                width: _this4.getColumnsWidth(
                                  props,
                                  props.options.fixedColumns.left
                                ),
                                position: "absolute",
                                top: 0,
                                left: 0,
                                boxShadow: "2px 0px 15px rgba(125,147,178,.25)",
                                overflowX: "hidden",
                                zIndex: 11,
                              },
                            },
                            /*#__PURE__*/ React.createElement(
                              "div",
                              {
                                style: {
                                  width: _this4.state.width,
                                  background: "white",
                                },
                              },
                              table
                            )
                          )
                        : null
                    ),
                    provided.placeholder
                  );
                }
              )
            ),
            (this.state.isLoading || props.isLoading) &&
              props.options.loadingType === "linear" &&
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  style: {
                    position: "relative",
                    width: "100%",
                  },
                },
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: "100%",
                      width: "100%",
                    },
                  },
                  /*#__PURE__*/ React.createElement(
                    _LinearProgress.default,
                    null
                  )
                )
              ),
            props.options.paginationPosition === "bottom" ||
              props.options.paginationPosition === "both"
              ? this.renderFooter()
              : null,
            (this.state.isLoading || props.isLoading) &&
              props.options.loadingType === "overlay" &&
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "100%",
                    zIndex: 11,
                  },
                },
                /*#__PURE__*/ React.createElement(
                  props.components.OverlayLoading,
                  {
                    theme: props.theme,
                  }
                )
              ),
            this.state.errorState &&
              this.state.errorState.errorCause === "query" &&
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "100%",
                    zIndex: 11,
                  },
                },
                /*#__PURE__*/ React.createElement(
                  props.components.OverlayError,
                  {
                    error: this.state.errorState,
                    retry: this.retry,
                    theme: props.theme,
                    icon: props.icons.Retry,
                  }
                )
              )
          )
        );
      },
    },
  ]);
  return MaterialTable;
})(React.Component);

exports.default = MaterialTable;

var style = function style() {
  return {
    horizontalScrollContainer: {
      "& ::-webkit-scrollbar": {
        "-webkit-appearance": "none",
      },
      "& ::-webkit-scrollbar:horizontal": {
        height: 8,
      },
      "& ::-webkit-scrollbar-thumb": {
        borderRadius: 4,
        border: "2px solid white",
        backgroundColor: "rgba(0, 0, 0, .3)",
      },
    },
  };
};

var ScrollBar = (0, _core.withStyles)(style)(function (_ref) {
  var double = _ref.double,
    children = _ref.children,
    classes = _ref.classes;

  if (double) {
    return /*#__PURE__*/ React.createElement(
      _reactDoubleScrollbar.default,
      null,
      children
    );
  } else {
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: classes.horizontalScrollContainer,
        style: {
          overflowX: "auto",
          position: "relative",
        },
      },
      children
    );
  }
});

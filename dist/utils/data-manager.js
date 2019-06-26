"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _format = _interopRequireDefault(require("date-fns/format"));

var _2 = require("./");

var DataManager =
/*#__PURE__*/
function () {
  function DataManager() {
    var _this = this;

    (0, _classCallCheck2["default"])(this, DataManager);
    (0, _defineProperty2["default"])(this, "applyFilters", false);
    (0, _defineProperty2["default"])(this, "applySearch", false);
    (0, _defineProperty2["default"])(this, "currentPage", 0);
    (0, _defineProperty2["default"])(this, "detailPanelType", 'multiple');
    (0, _defineProperty2["default"])(this, "lastDetailPanelRow", undefined);
    (0, _defineProperty2["default"])(this, "lastEditingRow", undefined);
    (0, _defineProperty2["default"])(this, "orderBy", -1);
    (0, _defineProperty2["default"])(this, "orderDirection", '');
    (0, _defineProperty2["default"])(this, "pageSize", 5);
    (0, _defineProperty2["default"])(this, "paging", true);
    (0, _defineProperty2["default"])(this, "parentFunc", null);
    (0, _defineProperty2["default"])(this, "searchText", '');
    (0, _defineProperty2["default"])(this, "selectedCount", 0);
    (0, _defineProperty2["default"])(this, "treefiedDataLength", 0);
    (0, _defineProperty2["default"])(this, "treeDataMaxLevel", 0);
    (0, _defineProperty2["default"])(this, "defaultExpanded", false);
    (0, _defineProperty2["default"])(this, "data", []);
    (0, _defineProperty2["default"])(this, "columns", []);
    (0, _defineProperty2["default"])(this, "filteredData", []);
    (0, _defineProperty2["default"])(this, "searchedData", []);
    (0, _defineProperty2["default"])(this, "groupedData", []);
    (0, _defineProperty2["default"])(this, "treefiedData", []);
    (0, _defineProperty2["default"])(this, "sortedData", []);
    (0, _defineProperty2["default"])(this, "pagedData", []);
    (0, _defineProperty2["default"])(this, "renderData", []);
    (0, _defineProperty2["default"])(this, "filtered", false);
    (0, _defineProperty2["default"])(this, "searched", false);
    (0, _defineProperty2["default"])(this, "grouped", false);
    (0, _defineProperty2["default"])(this, "treefied", false);
    (0, _defineProperty2["default"])(this, "sorted", false);
    (0, _defineProperty2["default"])(this, "paged", false);
    (0, _defineProperty2["default"])(this, "rootGroupsIndex", {});
    (0, _defineProperty2["default"])(this, "findDataByPath", function (renderData, path) {
      if (_this.isDataType("tree")) {
        var node = path.reduce(function (result, current) {
          return result && result.tableData && result.tableData.childRows && result.tableData.childRows[current];
        }, {
          tableData: {
            childRows: renderData
          }
        });
        return node;
      } else {
        var data = {
          groups: renderData
        };

        var _node = path.reduce(function (result, current) {
          if (result.groups.length > 0) {
            return result.groups[current];
          } else if (result.data) {
            return result.data[current];
          } else {
            return undefined;
          }
        }, data);

        return _node;
      }
    });
    (0, _defineProperty2["default"])(this, "getFieldValue", function (rowData, columnDef) {
      var lookup = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var value = typeof rowData[columnDef.field] !== 'undefined' ? rowData[columnDef.field] : (0, _2.byString)(rowData, columnDef.field);

      if (columnDef.lookup && lookup) {
        value = columnDef.lookup[value];
      }

      return value;
    });
    (0, _defineProperty2["default"])(this, "getRenderState", function () {
      if (_this.filtered === false) {
        _this.filterData();
      }

      if (_this.searched === false) {
        _this.searchData();
      }

      if (_this.grouped === false && _this.isDataType("group")) {
        _this.groupData();
      }

      if (_this.treefied === false && _this.isDataType("tree")) {
        _this.treefyData();
      }

      if (_this.sorted === false) {
        _this.sortData();
      }

      if (_this.paged === false) {
        _this.pageData();
      }

      return {
        columns: _this.columns,
        currentPage: _this.currentPage,
        data: _this.sortedData,
        lastEditingRow: _this.lastEditingRow,
        orderBy: _this.orderBy,
        orderDirection: _this.orderDirection,
        originalData: _this.data,
        pageSize: _this.pageSize,
        renderData: _this.pagedData,
        searchText: _this.searchText,
        selectedCount: _this.selectedCount,
        treefiedDataLength: _this.treefiedDataLength,
        treeDataMaxLevel: _this.treeDataMaxLevel
      };
    });
    (0, _defineProperty2["default"])(this, "filterData", function () {
      _this.searched = _this.grouped = _this.treefied = _this.sorted = _this.paged = false;
      _this.filteredData = (0, _toConsumableArray2["default"])(_this.data);

      if (_this.applyFilters) {
        _this.columns.filter(function (columnDef) {
          return columnDef.tableData.filterValue;
        }).forEach(function (columnDef) {
          var lookup = columnDef.lookup,
              type = columnDef.type,
              tableData = columnDef.tableData;

          if (columnDef.customFilterAndSearch) {
            _this.filteredData = _this.filteredData.filter(function (row) {
              return !!columnDef.customFilterAndSearch(tableData.filterValue, row, columnDef);
            });
          } else {
            if (lookup) {
              _this.filteredData = _this.filteredData.filter(function (row) {
                var value = _this.getFieldValue(row, columnDef, false);

                return !tableData.filterValue || tableData.filterValue.length === 0 || tableData.filterValue.indexOf(value !== undefined && value.toString()) > -1;
              });
            } else if (type === 'numeric') {
              _this.filteredData = _this.filteredData.filter(function (row) {
                var value = _this.getFieldValue(row, columnDef);

                return value + "" === tableData.filterValue;
              });
            } else if (type === 'boolean' && tableData.filterValue) {
              _this.filteredData = _this.filteredData.filter(function (row) {
                var value = _this.getFieldValue(row, columnDef);

                return value && tableData.filterValue === 'checked' || !value && tableData.filterValue === 'unchecked';
              });
            } else if (['date', 'datetime'].includes(type)) {
              _this.filteredData = _this.filteredData.filter(function (row) {
                var value = _this.getFieldValue(row, columnDef);

                var currentDate = value ? new Date(value) : null;

                if (currentDate && currentDate.toString() !== 'Invalid Date') {
                  var selectedDate = tableData.filterValue;
                  var currentDateToCompare = '';
                  var selectedDateToCompare = '';

                  if (type === 'date') {
                    currentDateToCompare = (0, _format["default"])(currentDate, 'MM/dd/yyyy');
                    selectedDateToCompare = (0, _format["default"])(selectedDate, 'MM/dd/yyyy');
                  } else if (type === 'datetime') {
                    currentDateToCompare = (0, _format["default"])(currentDate, 'MM/dd/yyyy - HH:mm');
                    selectedDateToCompare = (0, _format["default"])(selectedDate, 'MM/dd/yyyy - HH:mm');
                  }

                  return currentDateToCompare === selectedDateToCompare;
                }

                return true;
              });
            } else if (type === 'time') {
              _this.filteredData = _this.filteredData.filter(function (row) {
                var value = _this.getFieldValue(row, columnDef);

                var currentHour = value || null;

                if (currentHour) {
                  var selectedHour = tableData.filterValue;
                  var currentHourToCompare = (0, _format["default"])(selectedHour, 'HH:mm');
                  return currentHour === currentHourToCompare;
                }

                return true;
              });
            } else {
              _this.filteredData = _this.filteredData.filter(function (row) {
                var value = _this.getFieldValue(row, columnDef);

                return value && value.toString().toUpperCase().includes(tableData.filterValue.toUpperCase());
              });
            }
          }
        });
      }

      _this.filtered = true;
    });
    (0, _defineProperty2["default"])(this, "searchData", function () {
      _this.grouped = _this.treefied = _this.sorted = _this.paged = false;
      _this.searchedData = (0, _toConsumableArray2["default"])(_this.filteredData);

      if (_this.searchText && _this.applySearch) {
        _this.searchedData = _this.searchedData.filter(function (row) {
          return _this.columns.filter(function (columnDef) {
            return columnDef.searchable === undefined ? !columnDef.hidden : columnDef.searchable;
          }).some(function (columnDef) {
            if (columnDef.customFilterAndSearch) {
              return !!columnDef.customFilterAndSearch(_this.searchText, row, columnDef);
            } else if (columnDef.field) {
              var value = _this.getFieldValue(row, columnDef);

              if (value) {
                return value.toString().toUpperCase().includes(_this.searchText.toUpperCase());
              }
            }
          });
        });
      }

      _this.searched = true;
    });
  }

  (0, _createClass2["default"])(DataManager, [{
    key: "setData",
    value: function setData(data) {
      var _this2 = this;

      this.selectedCount = 0;
      this.data = data.map(function (row, index) {
        row.tableData = (0, _objectSpread2["default"])({}, row.tableData, {
          id: index
        });

        if (row.tableData.checked) {
          _this2.selectedCount++;
        }

        return row;
      });
      this.filtered = false;
    }
  }, {
    key: "setColumns",
    value: function setColumns(columns) {
      this.columns = columns.map(function (columnDef, index) {
        columnDef.tableData = (0, _objectSpread2["default"])({
          columnOrder: index,
          filterValue: columnDef.defaultFilter,
          groupOrder: columnDef.defaultGroupOrder,
          groupSort: columnDef.defaultGroupSort || 'asc'
        }, columnDef.tableData, {
          id: index
        });
        return columnDef;
      });
    }
  }, {
    key: "setDefaultExpanded",
    value: function setDefaultExpanded(expanded) {
      this.defaultExpanded = expanded;
    }
  }, {
    key: "changeApplySearch",
    value: function changeApplySearch(applySearch) {
      this.applySearch = applySearch;
      this.searched = false;
    }
  }, {
    key: "changeApplyFilters",
    value: function changeApplyFilters(applyFilters) {
      this.applyFilters = applyFilters;
      this.filtered = false;
    }
  }, {
    key: "changePaging",
    value: function changePaging(paging) {
      this.paging = paging;
      this.paged = false;
    }
  }, {
    key: "changeCurrentPage",
    value: function changeCurrentPage(currentPage) {
      this.currentPage = currentPage;
      this.paged = false;
    }
  }, {
    key: "changePageSize",
    value: function changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.paged = false;
    }
  }, {
    key: "changeParentFunc",
    value: function changeParentFunc(parentFunc) {
      this.parentFunc = parentFunc;
    }
  }, {
    key: "changeFilterValue",
    value: function changeFilterValue(columnId, value) {
      this.columns[columnId].tableData.filterValue = value;
      this.filtered = false;
    }
  }, {
    key: "changeRowSelected",
    value: function changeRowSelected(checked, path) {
      var _this3 = this;

      var rowData = this.findDataByPath(this.sortedData, path);
      rowData.tableData.checked = checked;
      this.selectedCount = this.selectedCount + (checked ? 1 : -1);

      var checkChildRows = function checkChildRows(rowData) {
        if (rowData.tableData.childRows) {
          rowData.tableData.childRows.forEach(function (childRow) {
            childRow.tableData.checked = checked;
            _this3.selectedCount = _this3.selectedCount + (checked ? 1 : -1);
            checkChildRows(childRow);
          });
        }
      };

      checkChildRows(rowData);
      this.filtered = false;
    }
  }, {
    key: "changeDetailPanelVisibility",
    value: function changeDetailPanelVisibility(path, render) {
      var rowData = this.findDataByPath(this.sortedData, path);

      if ((rowData.tableData.showDetailPanel || '').toString() === render.toString()) {
        rowData.tableData.showDetailPanel = undefined;
      } else {
        rowData.tableData.showDetailPanel = render;
      }

      if (this.detailPanelType === 'single' && this.lastDetailPanelRow && this.lastDetailPanelRow != rowData) {
        this.lastDetailPanelRow.tableData.showDetailPanel = undefined;
      }

      this.lastDetailPanelRow = rowData;
    }
  }, {
    key: "changeGroupExpand",
    value: function changeGroupExpand(path) {
      var rowData = this.findDataByPath(this.sortedData, path);
      rowData.isExpanded = !rowData.isExpanded;
    }
  }, {
    key: "changeSearchText",
    value: function changeSearchText(searchText) {
      this.searchText = searchText;
      this.searched = false;
    }
  }, {
    key: "changeRowEditing",
    value: function changeRowEditing(rowData, mode) {
      if (rowData) {
        rowData.tableData.editing = mode;

        if (this.lastEditingRow && this.lastEditingRow != rowData) {
          this.lastEditingRow.tableData.editing = undefined;
        }

        if (mode) {
          this.lastEditingRow = rowData;
        } else {
          this.lastEditingRow = undefined;
        }
      } else if (this.lastEditingRow) {
        this.lastEditingRow.tableData.editing = undefined;
        this.lastEditingRow = undefined;
      }
    }
  }, {
    key: "changeAllSelected",
    value: function changeAllSelected(checked) {
      var selectedCount = 0;

      if (this.isDataType("group")) {
        var setCheck = function setCheck(data) {
          data.forEach(function (element) {
            if (element.groups.length > 0) {
              setCheck(element.groups);
            } else {
              element.data.forEach(function (d) {
                d.tableData.checked = checked;
                selectedCount++;
              });
            }
          });
        };

        setCheck(this.groupedData);
      } else {
        this.searchedData.map(function (row) {
          row.tableData.checked = checked;
          return row;
        });
        selectedCount = this.searchedData.length;
      }

      this.selectedCount = checked ? selectedCount : 0;
    }
  }, {
    key: "changeOrder",
    value: function changeOrder(orderBy, orderDirection) {
      this.orderBy = orderBy;
      this.orderDirection = orderDirection;
      this.currentPage = 0;
      this.sorted = false;
    }
  }, {
    key: "changeGroupOrder",
    value: function changeGroupOrder(columnId) {
      var column = this.columns.find(function (c) {
        return c.tableData.id === columnId;
      });

      if (column.tableData.groupSort === 'asc') {
        column.tableData.groupSort = 'desc';
      } else {
        column.tableData.groupSort = 'asc';
      }

      this.sorted = false;
    }
  }, {
    key: "changeColumnHidden",
    value: function changeColumnHidden(columnId, hidden) {
      var column = this.columns.find(function (c) {
        return c.tableData.id === columnId;
      });
      column.hidden = hidden;
    }
  }, {
    key: "changeTreeExpand",
    value: function changeTreeExpand(path) {
      var rowData = this.findDataByPath(this.sortedData, path);
      rowData.tableData.isTreeExpanded = !rowData.tableData.isTreeExpanded;
    }
  }, {
    key: "changeDetailPanelType",
    value: function changeDetailPanelType(type) {
      this.detailPanelType = type;
    }
  }, {
    key: "changeByDrag",
    value: function changeByDrag(result) {
      var start = 0;
      var groups = this.columns.filter(function (col) {
        return col.tableData.groupOrder > -1;
      }).sort(function (col1, col2) {
        return col1.tableData.groupOrder - col2.tableData.groupOrder;
      });

      if (result.destination.droppableId === "groups" && result.source.droppableId === "groups") {
        start = Math.min(result.destination.index, result.source.index);
        var end = Math.max(result.destination.index, result.source.index);
        groups = groups.slice(start, end + 1);

        if (result.destination.index < result.source.index) {
          // Take last and add as first
          var last = groups.pop();
          groups.unshift(last);
        } else {
          // Take first and add as last
          var _last = groups.shift();

          groups.push(_last);
        }
      } else if (result.destination.droppableId === "groups" && result.source.droppableId === "headers") {
        var newGroup = this.columns.find(function (c) {
          return c.tableData.id == result.draggableId;
        });

        if (newGroup.grouping === false || !newGroup.field) {
          return;
        }

        groups.splice(result.destination.index, 0, newGroup);
      } else if (result.destination.droppableId === "headers" && result.source.droppableId === "groups") {
        var removeGroup = this.columns.find(function (c) {
          return c.tableData.id == result.draggableId;
        });
        removeGroup.tableData.groupOrder = undefined;
        groups.splice(result.source.index, 1);
      } else if (result.destination.droppableId === "headers" && result.source.droppableId === "headers") {
        start = Math.min(result.destination.index, result.source.index);

        var _end = Math.max(result.destination.index, result.source.index);

        var colsToMov = this.columns.sort(function (a, b) {
          return a.tableData.columnOrder - b.tableData.columnOrder;
        }).filter(function (column) {
          return column.tableData.groupOrder === undefined;
        }).slice(start, _end + 1);

        if (result.destination.index < result.source.index) {
          // Take last and add as first
          var _last2 = colsToMov.pop();

          colsToMov.unshift(_last2);
        } else {
          // Take first and add as last
          var _last3 = colsToMov.shift();

          colsToMov.push(_last3);
        }

        for (var i = 0; i < colsToMov.length; i++) {
          colsToMov[i].tableData.columnOrder = start + i;
        }

        return;
      } else {
        return;
      }

      for (var _i = 0; _i < groups.length; _i++) {
        groups[_i].tableData.groupOrder = start + _i;
      }

      this.sorted = this.grouped = false;
    }
  }, {
    key: "findGroupByGroupPath",
    value: function findGroupByGroupPath(renderData, path) {
      var data = {
        groups: renderData,
        groupsIndex: this.rootGroupsIndex
      };
      var node = path.reduce(function (result, current) {
        if (!result) {
          return undefined;
        }

        if (result.groupsIndex[current] !== undefined) {
          return result.groups[result.groupsIndex[current]];
        }

        return undefined; // const group = result.groups.find(a => a.value === current);
        // return group;
      }, data);
      return node;
    }
  }, {
    key: "isDataType",
    value: function isDataType(type) {
      var dataType = "normal";

      if (this.parentFunc) {
        dataType = "tree";
      } else if (this.columns.find(function (a) {
        return a.tableData.groupOrder > -1;
      })) {
        dataType = "group";
      }

      return type === dataType;
    }
  }, {
    key: "sort",
    value: function sort(a, b, type) {
      if (type === 'numeric') {
        return a - b;
      } else {
        if (a !== b) {
          // to find nulls
          if (!a) return -1;
          if (!b) return 1;
        }

        return a < b ? -1 : a > b ? 1 : 0;
      }
    }
  }, {
    key: "sortList",
    value: function sortList(list) {
      var _this4 = this;

      var columnDef = this.columns.find(function (_) {
        return _.tableData.id === _this4.orderBy;
      });
      var result = list;

      if (columnDef.customSort) {
        if (this.orderDirection === 'desc') {
          result = list.sort(function (a, b) {
            return columnDef.customSort(b, a, 'row');
          });
        } else {
          result = list.sort(function (a, b) {
            return columnDef.customSort(a, b, 'row');
          });
        }
      } else {
        result = list.sort(this.orderDirection === 'desc' ? function (a, b) {
          return _this4.sort(_this4.getFieldValue(b, columnDef), _this4.getFieldValue(a, columnDef), columnDef.type);
        } : function (a, b) {
          return _this4.sort(_this4.getFieldValue(a, columnDef), _this4.getFieldValue(b, columnDef), columnDef.type);
        });
      }

      return result;
    }
  }, {
    key: "groupData",
    value: function groupData() {
      var _this5 = this;

      this.sorted = this.paged = false;
      var tmpData = (0, _toConsumableArray2["default"])(this.searchedData);
      var groups = this.columns.filter(function (col) {
        return col.tableData.groupOrder > -1;
      }).sort(function (col1, col2) {
        return col1.tableData.groupOrder - col2.tableData.groupOrder;
      });
      var subData = tmpData.reduce(function (result, currentRow) {
        var object = result;
        object = groups.reduce(function (o, colDef) {
          var value = currentRow[colDef.field] || (0, _2.byString)(currentRow, colDef.field);
          var group;

          if (o.groupsIndex[value] !== undefined) {
            group = o.groups[o.groupsIndex[value]];
          }

          if (!group) {
            var path = [].concat((0, _toConsumableArray2["default"])(o.path || []), [value]);
            var oldGroup = _this5.findGroupByGroupPath(_this5.groupedData, path) || {
              isExpanded: _this5.defaultExpanded ? true : false
            };
            group = {
              value: value,
              groups: [],
              groupsIndex: {},
              data: [],
              isExpanded: oldGroup.isExpanded,
              path: path
            };
            o.groups.push(group);
            o.groupsIndex[value] = o.groups.length - 1;
          }

          return group;
        }, object);
        object.data.push(currentRow);
        return result;
      }, {
        groups: [],
        groupsIndex: {}
      });
      this.groupedData = subData.groups;
      this.grouped = true;
      this.rootGroupsIndex = subData.groupsIndex;
    }
  }, {
    key: "treefyData",
    value: function treefyData() {
      var _this6 = this;

      this.sorted = this.paged = false;
      this.data.forEach(function (a) {
        return a.tableData.childRows = null;
      });
      this.treefiedData = [];
      this.treefiedDataLength = 0;
      this.treeDataMaxLevel = 0;

      var addRow = function addRow(rowData) {
        var parent = _this6.parentFunc(rowData, _this6.data);

        if (parent) {
          parent.tableData.childRows = parent.tableData.childRows || [];

          var oldParent = parent.tableData.path && _this6.findDataByPath(_this6.treefiedData, parent.tableData.path);

          var isDefined = oldParent && oldParent.tableData.isTreeExpanded !== undefined;
          parent.tableData.isTreeExpanded = isDefined ? oldParent.tableData.isTreeExpanded : _this6.defaultExpanded ? true : false;

          if (!parent.tableData.childRows.includes(rowData)) {
            parent.tableData.childRows.push(rowData);
            _this6.treefiedDataLength++;
          }

          addRow(parent);
          rowData.tableData.path = [].concat((0, _toConsumableArray2["default"])(parent.tableData.path), [parent.tableData.childRows.length - 1]);
          _this6.treeDataMaxLevel = Math.max(_this6.treeDataMaxLevel, rowData.tableData.path.length);
        } else {
          if (!_this6.treefiedData.includes(rowData)) {
            _this6.treefiedData.push(rowData);

            _this6.treefiedDataLength++;
            rowData.tableData.path = [_this6.treefiedData.length - 1];
          }
        }
      };

      this.searchedData.forEach(function (rowData) {
        addRow(rowData);
      });
      this.treefied = true;
    }
  }, {
    key: "sortData",
    value: function sortData() {
      var _this7 = this;

      this.paged = false;

      if (this.isDataType("group")) {
        this.sortedData = (0, _toConsumableArray2["default"])(this.groupedData);
        var groups = this.columns.filter(function (col) {
          return col.tableData.groupOrder > -1;
        }).sort(function (col1, col2) {
          return col1.tableData.groupOrder - col2.tableData.groupOrder;
        });

        var sortGroups = function sortGroups(list, columnDef) {
          if (columnDef.customSort) {
            return list.sort(columnDef.tableData.groupSort === 'desc' ? function (a, b) {
              return columnDef.customSort(b.value, a.value, 'group');
            } : function (a, b) {
              return columnDef.customSort(a.value, b.value, 'group');
            });
          } else {
            return list.sort(columnDef.tableData.groupSort === 'desc' ? function (a, b) {
              return _this7.sort(b.value, a.value, columnDef.type);
            } : function (a, b) {
              return _this7.sort(a.value, b.value, columnDef.type);
            });
          }
        };

        this.sortedData = sortGroups(this.sortedData, groups[0]);

        var sortGroupData = function sortGroupData(list, level) {
          list.forEach(function (element) {
            if (element.groups.length > 0) {
              var column = groups[level];
              element.groups = sortGroups(element.groups, column);
              sortGroupData(element.groups, level + 1);
            } else {
              if (_this7.orderBy >= 0 && _this7.orderDirection) {
                element.data = _this7.sortList(element.data);
              }
            }
          });
        };

        sortGroupData(this.sortedData, 1);
      } else if (this.isDataType("tree")) {
        this.sortedData = (0, _toConsumableArray2["default"])(this.treefiedData);

        if (this.orderBy != -1) {
          this.sortedData = this.sortList(this.sortedData);

          var sortTree = function sortTree(list) {
            list.forEach(function (item) {
              if (item.tableData.childRows) {
                item.tableData.childRows = _this7.sortList(item.tableData.childRows);
                sortTree(item.tableData.childRows);
              }
            });
          };

          sortTree(this.sortedData);
        }
      } else if (this.isDataType("normal")) {
        this.sortedData = (0, _toConsumableArray2["default"])(this.searchedData);

        if (this.orderBy != -1) {
          this.sortedData = this.sortList(this.sortedData);
        }
      }

      this.sorted = true;
    }
  }, {
    key: "pageData",
    value: function pageData() {
      this.pagedData = (0, _toConsumableArray2["default"])(this.sortedData);

      if (this.paging) {
        var startIndex = this.currentPage * this.pageSize;
        var endIndex = startIndex + this.pageSize;
        this.pagedData = this.pagedData.slice(startIndex, endIndex);
      }

      this.paged = true;
    }
  }]);
  return DataManager;
}();

exports["default"] = DataManager;
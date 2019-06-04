import formatDate from 'date-fns/format';
import { byString } from './';

export default class DataManager {
  applyFilters = false;
  applySearch = false;
  currentPage = 0;
  detailPanelType = 'multiple'
  lastDetailPanelRow = undefined;
  lastEditingRow = undefined;
  orderBy = -1;
  orderDirection = '';
  pageSize = 5;
  paging = true;
  parentFunc = null;
  searchText = '';
  selectedCount = 0;
  treefiedDataLength = 0;
  treeDataMaxLevel = 0;
  defaultExpanded = false;

  data = [];
  columns = [];

  filteredData = [];
  searchedData = [];
  groupedData = [];
  treefiedData = [];
  sortedData = [];
  pagedData = [];
  renderData = [];

  filtered = false;
  searched = false;
  grouped = false;
  treefied = false;
  sorted = false;
  paged = false;

  rootGroupsIndex = {};

  keyedRows = false;

  getKey = () => { };

  allTableData = {};

  constructor() {
  }

  setChecked(row, checked) {
    this.getRowTableData(row).checked = checked;
  }
  getChecked(row) {
    return this.getRowTableData(row).checked;
  }

  setKeyGetter(getKey) {
    this.keyedRows = !!getKey;
    if (this.keyedRows) {
      this.getKey = getKey;
    }
  }

  getRowTableData(row) {
    if (this.keyedRows) {
      return this.allTableData[this.getKey(row)];
    }
    else {
      return row.tableData;
    }
  }

  setRowTableData(row, tableData) {
    if (this.keyedRows) {
      this.allTableData[this.getKey(row)] = tableData;
    }
    else {
      row.tableData = tableData;
    }
  }

  setData(data) {
    this.selectedCount = 0;

    this.data = data;

    if (data) {
      data.forEach((row, index) => {
        const tableData = { ...this.getRowTableData(row) || {}, id: index };
        this.setRowTableData(row, tableData);
        if (tableData.checked) {
          this.selectedCount++;
        }
      });
    }
    this.filtered = false;
  }

  setColumns(columns) {
    this.columns = columns.map((columnDef, index) => {
      columnDef.tableData = {
        columnOrder: index,
        filterValue: columnDef.defaultFilter,
        groupOrder: columnDef.defaultGroupOrder,
        groupSort: columnDef.defaultGroupSort || 'asc',
        ...columnDef.tableData,
        id: index
      };
      return columnDef;
    });
  }

  setDefaultExpanded(expanded) {
    this.defaultExpanded = expanded;
  }

  changeApplySearch(applySearch) {
    this.applySearch = applySearch;
    this.searched = false;
  }

  changeApplyFilters(applyFilters) {
    this.applyFilters = applyFilters;
    this.filtered = false;
  }

  changePaging(paging) {
    this.paging = paging;
    this.paged = false;
  }

  changeCurrentPage(currentPage) {
    this.currentPage = currentPage;
    this.paged = false;
  }

  changePageSize(pageSize) {
    this.pageSize = pageSize;
    this.paged = false;
  }

  changeParentFunc(parentFunc) {
    this.parentFunc = parentFunc;
  }

  changeFilterValue(columnId, value) {
    this.columns[columnId].tableData.filterValue = value;
    this.filtered = false;
  }

  changeRowSelected(checked, path) {
    const rowData = this.findDataByPath(this.sortedData, path);
    const tableData = this.getRowTableData(rowData);
    tableData.checked = checked;
    this.selectedCount = this.selectedCount + (checked ? 1 : -1);

    const checkChildRows = dr => {
      const drTableData = this.getRowTableData(dr);
      if (drTableData.childRows) {
        drTableData.childRows.forEach(cr => {
          const crTableData = this.getRowTableData(cr);
          crTableData.checked = checked;
          this.selectedCount = this.selectedCount + (checked ? 1 : -1);
          checkChildRows(cr);
        });
      }
    };

    checkChildRows(rowData);

    this.filtered = false;
  }

  changeDetailPanelVisibility(path, render) {
    const rowData = this.findDataByPath(this.sortedData, path);

    const rowDataTableData = this.getRowTableData(rowData);

    if ((rowDataTableData.showDetailPanel || '').toString() === render.toString()) {
      rowDataTableData.showDetailPanel = undefined;
    }
    else {
      rowDataTableData.showDetailPanel = render;
    }

    if (this.detailPanelType === 'single' && this.lastDetailPanelRow && this.lastDetailPanelRow != rowData) {
      const lastDetailPanelRowTableData = this.getRowTableData(this.lastDetailPanelRow);
      lastDetailPanelRowTableData.showDetailPanel = undefined;
    }

    this.lastDetailPanelRow = rowData;
  }

  changeGroupExpand(path) {
    const rowData = this.findDataByPath(this.sortedData, path);
    rowData.isExpanded = !rowData.isExpanded;
  }

  changeSearchText(searchText) {
    this.searchText = searchText;
    this.searched = false;
  }

  changeRowEditing(rowData, mode) {
    if (rowData) {
      const tableData = this.getRowTableData(rowData);
      tableData.editing = mode;

      if (this.lastEditingRow && this.lastEditingRow != rowData) {
        const lastEditingRowTableData = this.getRowTableData(this.lastEditingRow);
        lastEditingRowTableData.editing = undefined;
      }

      if (mode) {
        this.lastEditingRow = rowData;
      }
      else {
        this.lastEditingRow = undefined;
      }
    }
    else if (this.lastEditingRow) {
      const lastEditingRowTableData = this.getRowTableData(this.lastEditingRow);
      lastEditingRowTableData.editing = undefined;
    }
  }

  changeAllSelected(checked) {
    let selectedCount = 0;
    if (this.isDataType("group")) {
      const setCheck = (data) => {
        data.forEach(element => {
          if (element.groups.length > 0) {
            setCheck(element.groups);
          }
          else {
            element.data.forEach(d => {
              this.setChecked(d, checked);
              selectedCount++;
            });
          }
        });
      };

      setCheck(this.groupedData);
    }
    else {
      this.searchedData.map(row => {
        this.setChecked(row, checked);
        return row;
      });
      selectedCount = this.searchedData.length;
    }

    this.selectedCount = checked ? selectedCount : 0;
  }

  changeOrder(orderBy, orderDirection) {
    this.orderBy = orderBy;
    this.orderDirection = orderDirection;
    this.currentPage = 0;

    this.sorted = false;
  }

  changeGroupOrder(columnId) {
    const column = this.columns.find(c => c.tableData.id === columnId);

    if (column.tableData.groupSort === 'asc') {
      column.tableData.groupSort = 'desc';
    }
    else {
      column.tableData.groupSort = 'asc';
    }

    this.sorted = false;
  }

  changeColumnHidden(columnId, hidden) {
    const column = this.columns.find(c => c.tableData.id === columnId);
    column.hidden = hidden;
  }

  changeTreeExpand(path) {
    const rowData = this.findDataByPath(this.sortedData, path);
    const rowDataTableData = this.getRowTableData(rowData);
    rowDataTableData.isTreeExpanded = !rowDataTableData.isTreeExpanded;
  }

  changeDetailPanelType(type) {
    this.detailPanelType = type;
  }

  changeByDrag(result) {
    let start = 0;

    let groups = this.columns
      .filter(col => col.tableData.groupOrder > -1)
      .sort((col1, col2) => col1.tableData.groupOrder - col2.tableData.groupOrder);


    if (result.destination && result.destination.droppableId === "groups" && result.source.droppableId === "groups") {
      start = Math.min(result.destination.index, result.source.index);
      const end = Math.max(result.destination.index, result.source.index);

      groups = groups.slice(start, end + 1);

      if (result.destination.index < result.source.index) {
        // Take last and add as first
        const last = groups.pop();
        groups.unshift(last);
      }
      else {
        // Take first and add as last
        const last = groups.shift();
        groups.push(last);
      }
    }
    else if (result.destination && result.destination.droppableId === "groups" && result.source.droppableId === "headers") {
      const newGroup = this.columns.find(c => c.tableData.id == result.draggableId);

      if (newGroup.grouping === false || !newGroup.field) {
        return;
      }

      groups.splice(result.destination.index, 0, newGroup);
    }
    else if (result.destination && result.destination.droppableId === "headers" && result.source.droppableId === "groups") {
      const removeGroup = this.columns.find(c => c.tableData.id == result.draggableId);
      removeGroup.tableData.groupOrder = undefined;
      groups.splice(result.source.index, 1);
    }
    else if (result.destination && result.destination.droppableId === "headers" && result.source.droppableId === "headers") {
      start = Math.min(result.destination.index, result.source.index);
      const end = Math.max(result.destination.index, result.source.index);

      const colsToMov = this.columns
        .sort((a, b) => a.tableData.columnOrder - b.tableData.columnOrder)
        .filter(column => column.tableData.groupOrder === undefined)
        .slice(start, end + 1);

      if (result.destination.index < result.source.index) {
        // Take last and add as first
        const last = colsToMov.pop();
        colsToMov.unshift(last);
      }
      else {
        // Take first and add as last
        const last = colsToMov.shift();
        colsToMov.push(last);
      }

      for (let i = 0; i < colsToMov.length; i++) {
        colsToMov[i].tableData.columnOrder = start + i;
      }

      return;
    }
    else {
      return;
    }

    for (let i = 0; i < groups.length; i++) {
      groups[i].tableData.groupOrder = start + i;
    }

    this.sorted = this.grouped = false;
  }

  findDataByPath = (renderData, path) => {
    if (this.isDataType("tree")) {
      const node = path.reduce((result, current) => {
        return (
          result &&
          result.tableData &&
          result.tableData.childRows &&
          result.tableData.childRows[current]
        );
      }, { tableData: { childRows: renderData } });

      return node;
    }
    else {
      const data = { groups: renderData };

      const node = path.reduce((result, current) => {
        if (result.groups.length > 0) {
          return result.groups[current];
        }
        else if (result.data) {
          return result.data[current];
        }
        else {
          return undefined;
        }
      }, data);
      return node;
    }
  }

  findGroupByGroupPath(renderData, path) {
    const data = { groups: renderData, groupsIndex: this.rootGroupsIndex };

    const node = path.reduce((result, current) => {
      if (!result) {
        return undefined;
      }

      if (result.groupsIndex[current] !== undefined) {
        return result.groups[result.groupsIndex[current]];
      }
      return undefined;
      // const group = result.groups.find(a => a.value === current);
      // return group;
    }, data);
    return node;
  }

  getFieldValue = (rowData, columnDef, lookup = true) => {
    let value = (typeof rowData[columnDef.field] !== 'undefined' ? rowData[columnDef.field] : byString(rowData, columnDef.field));
    if (columnDef.lookup && lookup) {
      value = columnDef.lookup[value];
    }

    return value;
  }

  isDataType(type) {
    let dataType = "normal";

    if (this.parentFunc) {
      dataType = "tree";
    }
    else if (this.columns.find(a => a.tableData.groupOrder > -1)) {
      dataType = "group";
    }

    return type === dataType;
  }

  sort(a, b, type) {
    if (type === 'numeric') {
      return a - b;
    } else {
      if (a !== b) { // to find nulls
        if (!a) return -1;
        if (!b) return 1;
      }
      return a < b ? -1 : a > b ? 1 : 0;
    }
  }

  sortList(list) {
    const columnDef = this.columns.find(_ => _.tableData.id === this.orderBy);
    let result = list;

    if (columnDef.customSort) {
      if (this.orderDirection === 'desc') {
        result = list.sort((a, b) => columnDef.customSort(b, a, 'row'));
      }
      else {
        result = list.sort((a, b) => columnDef.customSort(a, b, 'row'));
      }
    }
    else {
      result = list.sort(
        this.orderDirection === 'desc'
          ? (a, b) => this.sort(this.getFieldValue(b, columnDef), this.getFieldValue(a, columnDef), columnDef.type)
          : (a, b) => this.sort(this.getFieldValue(a, columnDef), this.getFieldValue(b, columnDef), columnDef.type)
      );
    }

    return result;
  }

  getRenderState = () => {
    if (this.filtered === false) {
      this.filterData();
    }

    if (this.searched === false) {
      this.searchData();
    }

    if (this.grouped === false && this.isDataType("group")) {
      this.groupData();
    }

    if (this.treefied === false && this.isDataType("tree")) {
      this.treefyData();
    }

    if (this.sorted === false) {
      this.sortData();
    }

    if (this.paged === false) {
      this.pageData();
    }

    return {
      columns: this.columns,
      currentPage: this.currentPage,
      data: this.sortedData,
      lastEditingRow: this.lastEditingRow,
      orderBy: this.orderBy,
      orderDirection: this.orderDirection,
      originalData: this.data,
      pageSize: this.pageSize,
      renderData: this.pagedData,
      searchText: this.searchText,
      selectedCount: this.selectedCount,
      treefiedDataLength: this.treefiedDataLength,
      treeDataMaxLevel: this.treeDataMaxLevel
    };
  }

  // =====================================================================================================
  // DATA MANUPULATIONS
  // =====================================================================================================

  filterData = () => {
    this.searched = this.grouped = this.treefied = this.sorted = this.paged = false;

    this.filteredData = [...this.data];

    if (this.applyFilters) {
      this.columns.filter(columnDef => columnDef.tableData.filterValue).forEach(columnDef => {
        const { lookup, type, tableData } = columnDef;
        if (columnDef.customFilterAndSearch) {
          this.filteredData = this.filteredData.filter(row => !!columnDef.customFilterAndSearch(tableData.filterValue, row, columnDef));
        }
        else {
          if (lookup) {
            this.filteredData = this.filteredData.filter(row => {
              const value = this.getFieldValue(row, columnDef, false);
              return !tableData.filterValue ||
                tableData.filterValue.length === 0 ||
                tableData.filterValue.indexOf(value !== undefined && value.toString()) > -1;
            });
          } else if (type === 'numeric') {
            this.filteredData = this.filteredData.filter(row => {
              const value = this.getFieldValue(row, columnDef);
              return (value + "") === tableData.filterValue;
            });
          } else if (type === 'boolean' && tableData.filterValue) {
            this.filteredData = this.filteredData.filter(row => {
              const value = this.getFieldValue(row, columnDef);
              return (value && tableData.filterValue === 'checked') ||
                (!value && tableData.filterValue === 'unchecked');
            });
          } else if (['date', 'datetime'].includes(type)) {
            this.filteredData = this.filteredData.filter(row => {
              const value = this.getFieldValue(row, columnDef);

              const currentDate = value ? new Date(value) : null;

              if (currentDate && currentDate.toString() !== 'Invalid Date') {
                const selectedDate = tableData.filterValue;
                let currentDateToCompare = '';
                let selectedDateToCompare = '';

                if (type === 'date') {
                  currentDateToCompare = formatDate(currentDate, 'MM/dd/yyyy');
                  selectedDateToCompare = formatDate(selectedDate, 'MM/dd/yyyy');
                } else if (type === 'datetime') {
                  currentDateToCompare = formatDate(currentDate, 'MM/dd/yyyy - HH:mm');
                  selectedDateToCompare = formatDate(selectedDate, 'MM/dd/yyyy - HH:mm');
                }

                return currentDateToCompare === selectedDateToCompare;
              }

              return true;
            });
          } else if (type === 'time') {
            this.filteredData = this.filteredData.filter(row => {
              const value = this.getFieldValue(row, columnDef);
              const currentHour = value || null;

              if (currentHour) {
                const selectedHour = tableData.filterValue;
                const currentHourToCompare = formatDate(selectedHour, 'HH:mm');

                return currentHour === currentHourToCompare;
              }

              return true;
            });
          } else {
            this.filteredData = this.filteredData.filter(row => {
              const value = this.getFieldValue(row, columnDef);
              return value && value.toString().toUpperCase().includes(tableData.filterValue.toUpperCase());
            });
          }
        }
      });
    }

    this.filtered = true;
  }

  searchData = () => {
    this.grouped = this.treefied = this.sorted = this.paged = false;

    this.searchedData = [...this.filteredData];

    if (this.searchText && this.applySearch) {
      this.searchedData = this.searchedData.filter(row => {
        return this.columns
          .filter(columnDef => { return columnDef.searchable === undefined ? !columnDef.hidden : columnDef.searchable })
          .some(columnDef => {
            if (columnDef.customFilterAndSearch) {
              return !!columnDef.customFilterAndSearch(this.searchText, row, columnDef);
            }
            else if (columnDef.field) {
              const value = this.getFieldValue(row, columnDef);
              if (value) {
                return value.toString().toUpperCase().includes(this.searchText.toUpperCase());
              }
            }
          });
      });
    }

    this.searched = true;
  }

  groupData() {
    this.sorted = this.paged = false;

    const tmpData = [...this.searchedData];

    const groups = this.columns
      .filter(col => col.tableData.groupOrder > -1)
      .sort((col1, col2) => col1.tableData.groupOrder - col2.tableData.groupOrder);

    const aggregatedColumns = this.columns.filter(i => i.aggregation);

    const subData = tmpData.reduce((result, currentRow) => {
      let object = result;
      object = groups.reduce((o, colDef) => {
        const value = currentRow[colDef.field] || byString(currentRow, colDef.field);

        let group;
        if (o.groupsIndex[value] !== undefined) {
          group = o.groups[o.groupsIndex[value]];
        }

        if (!group) {
          const path = [...(o.path || []), value];
          let oldGroup = this.findGroupByGroupPath(this.groupedData, path) || { isExpanded: (this.defaultExpanded ? true : false) };

          group = {
            value,
            aggregations: {},
            groups: [],
            groupsIndex: {},
            data: [],
            isExpanded: oldGroup.isExpanded,
            path: path
          };
          for (const key in aggregatedColumns) {
            if (aggregatedColumns.hasOwnProperty(key)) {
              const aggregatedColumn = aggregatedColumns[key];
              const colId = aggregatedColumn.tableData.id;
              group.aggregations[colId] = {
                label: aggregatedColumn.aggregation.label,
                getValue: aggregatedColumn.aggregation.GetResult,
                field: aggregatedColumn.field,
                colId: aggregatedColumn.tableData.id
              };
            }
          }
          o.groups.push(group);
          o.groupsIndex[value] = o.groups.length - 1;
        }

        for (const key in aggregatedColumns) {
          if (aggregatedColumns.hasOwnProperty(key)) {
            const aggregatedColumn = aggregatedColumns[key];
            const colId = aggregatedColumn.tableData.id;
            group.aggregations[colId].accumulator = aggregatedColumn.aggregation.Accumulate(group.aggregations[colId].accumulator, this.getFieldValue(aggregatedColumn, aggregatedColumn));
          }
        }
        return group;
      }, object);

      object.data.push(currentRow);

      return result;
    }, { groups: [], groupsIndex: {} });

    this.groupedData = subData.groups;

    setAggregationValues(this.groupedData);

    function setAggregationValues(groupedData) {
      if (!groupedData) return;
      for (let index = 0; index < groupedData.length; index++) {
        const group = groupedData[index];
        for (const key in group.aggregations) {
          if (group.aggregations.hasOwnProperty(key)) {
            const aggregation = group.aggregations[key];
            aggregation.value = aggregation.getValue(aggregation.accumulator);
            delete aggregation.getValue;
            delete aggregation.accumulator;
          }
        }
        setAggregationValues(group.groups);
      }
    }

    this.grouped = true;
    this.rootGroupsIndex = subData.groupsIndex;
  }

  treefyData() {
    this.sorted = this.paged = false;
    this.data.forEach(a => {
      const tableData = this.getRowTableData(a);
      tableData.childRows = null;
    });
    this.treefiedData = [];
    this.treefiedDataLength = 0;
    this.treeDataMaxLevel = 0;

    const addRow = (rowData) => {
      let parent = this.parentFunc(rowData, this.data);

      if (parent) {
        const parentTableData = this.getRowTableData(parent);
        parentTableData.childRows = parentTableData.childRows || [];
        let oldParent = parentTableData.path && this.findDataByPath(this.treefiedData, parentTableData.path);
        const oldParentTableData = this.getRowTableData(oldParent);
        let isDefined = oldParent && oldParentTableData.isTreeExpanded !== undefined;

        parentTableData.isTreeExpanded = isDefined ? oldParentTableData.isTreeExpanded : (this.defaultExpanded ? true : false);
        if (!parentTableData.childRows.includes(rowData)) {
          parentTableData.childRows.push(rowData);
          this.treefiedDataLength++;
        }

        addRow(parent);
        const rowDataTableData = this.getRowTableData(rowData);
        rowDataTableData.path = [...parentTableData.path, parentTableData.childRows.length - 1];
        this.treeDataMaxLevel = Math.max(this.treeDataMaxLevel, rowDataTableData.path.length);
      }
      else {
        if (!this.treefiedData.includes(rowData)) {
          this.treefiedData.push(rowData);
          this.treefiedDataLength++;
          const rowDataTableData = this.getRowTableData(rowData);
          rowDataTableData.path = [this.treefiedData.length - 1];
        }
      }
    };

    this.searchedData.forEach(rowData => {
      addRow(rowData);
    });

    this.treefied = true;
  }

  sortData() {
    this.paged = false;

    if (this.isDataType("group")) {
      this.sortedData = [...this.groupedData];

      const groups = this.columns
        .filter(col => col.tableData.groupOrder > -1)
        .sort((col1, col2) => col1.tableData.groupOrder - col2.tableData.groupOrder);

      const sortGroups = (list, columnDef) => {
        if (columnDef.customSort) {
          return list.sort(
            columnDef.tableData.groupSort === 'desc'
              ? (a, b) => columnDef.customSort(b.value, a.value, 'group')
              : (a, b) => columnDef.customSort(a.value, b.value, 'group')
          );
        }
        else {
          return list.sort(
            columnDef.tableData.groupSort === 'desc'
              ? (a, b) => this.sort(b.value, a.value, columnDef.type)
              : (a, b) => this.sort(a.value, b.value, columnDef.type)
          );
        }
      };

      this.sortedData = sortGroups(this.sortedData, groups[0]);

      const sortGroupData = (list, level) => {
        list.forEach(element => {
          if (element.groups.length > 0) {
            const column = groups[level];
            element.groups = sortGroups(element.groups, column);
            sortGroupData(element.groups, level + 1);
          }
          else {
            if (this.orderBy >= 0 && this.orderDirection) {
              element.data = this.sortList(element.data);
            }
          }
        });
      };

      sortGroupData(this.sortedData, 1);
    }
    else if (this.isDataType("tree")) {
      this.sortedData = [...this.treefiedData];
      if (this.orderBy != -1) {
        this.sortedData = this.sortList(this.sortedData);

        const sortTree = (list) => {
          list.forEach(item => {
            const itemTableData = this.getRowTableData(item);
            if (itemTableData.childRows) {
              itemTableData.childRows = this.sortList(itemTableData.childRows);
              sortTree(itemTableData.childRows);
            }
          });
        };

        sortTree(this.sortedData);
      }
    }
    else if (this.isDataType("normal")) {
      this.sortedData = [...this.searchedData];
      if (this.orderBy != -1) {
        this.sortedData = this.sortList(this.sortedData);
      }
    }

    this.sorted = true;
  }

  pageData() {
    this.pagedData = [...this.sortedData];

    if (this.paging) {
      const startIndex = this.currentPage * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      this.pagedData = this.pagedData.slice(startIndex, endIndex);
    }

    this.paged = true;
  }
}
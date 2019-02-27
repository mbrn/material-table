import formatDate from 'date-fns/format';

export default class DataManager {
  currentPage = 0;
  filterSelectionChecked = false;
  orderBy = -1;
  orderDirection = '';
  pageSize = 5;
  paging = true;
  searchText = '';
  selectedCount = 0;

  data = [];
  columns = [];

  filteredData = [];
  searchedData = [];
  groupedData = [];
  sortedData = [];
  pagedData = [];
  renderData = [];

  filtered = false;
  searched = false;
  grouped = false;
  sorted = false;
  paged = false;

  constructor() {
  }

  setData(data) {
    this.data = data.map((row, index) => {
      row.tableData = { ...row.tableData, id: index };
      if (row.tableData.checked) {
        this.selectedCount++;
      }
      return row;
    });
  }

  setColumns(columns) {
    this.columns = columns.map((columnDef, index) => {
      columnDef.tableData = {
        filterValue: columnDef.defaultFilter,
        groupOrder: columnDef.defaultGroupOrder,
        groupSort: columnDef.defaultGroupSort || 'asc',
        ...columnDef.tableData,
        id: index
      };
      return columnDef;
    });
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

  changeFilterValue(columnId, value) {
    this.columns[columnId].tableData.filterValue = value;
    this.filtered = false;
  }

  changeFilterSelectionChecked(checked) {
    this.filterSelectionChecked = checked;
    this.filtered = false;
  }

  changeRowSelected(checked, path) {
    const rowData = this.findDataByPath(this.sortedData, path);
    rowData.tableData.checked = checked;
    this.selectedCount = this.selectedCount + (checked ? 1 : -1);

    this.filtered = false;
  }

  changeDetailPanelVisibility(path, render) {
    const rowData = this.findDataByPath(this.sortedData, path);

    if (rowData.tableData.showDetailPanel === render) {
      rowData.tableData.showDetailPanel = undefined;
    }
    else {
      rowData.tableData.showDetailPanel = render;
    }
  }

  changeGroupExpand(path) {
    const rowData = this.findDataByPath(this.sortedData, path);
    rowData.isExpanded = !rowData.isExpanded;
  }

  changeSearchText(searchText) {
    this.searchText = searchText;
    this.searched = false;
  }

  changeAllSelected(checked) {
    let selectedCount = 0;
    if (this.isDataType("grouped")) {
      const setCheck = (data) => {
        data.forEach(element => {
          if (element.groups.length > 0) {
            setCheck(element.groups);
          }
          else {
            element.data.forEach(d => {
              d.tableData.checked = checked;
              selectedCount++;
            });
          }
        });
      };

      setCheck(this.groupedData);
    }
    else {
      this.searchedData.map(row => {
        row.tableData.checked = checked;
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

  changeByDrag(result) {
    let start = 0;

    let groups = this.columns
      .filter(col => col.tableData.groupOrder > -1)
      .sort((col1, col2) => col1.tableData.groupOrder - col2.tableData.groupOrder);


    if (result.destination.droppableId === "groups" && result.source.droppableId === "groups") {
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
    else if (result.destination.droppableId === "groups" && result.source.droppableId === "headers") {
      const newGroup = this.columns.find(c => c.tableData.id == result.draggableId);
      groups.splice(result.destination.index, 0, newGroup);
    }
    else if (result.destination.droppableId === "headers" && result.source.droppableId === "groups") {
      const removeGroup = this.columns.find(c => c.tableData.id == result.draggableId);
      removeGroup.tableData.groupOrder = undefined;
      groups.splice(result.source.index, 1);
    }
    else if (result.destination.droppableId === "headers" && result.source.droppableId === "headers") {
      // Column reordering
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
    const data = { groups: renderData };

    const node = path.reduce((result, current) => {
      if (result.groups.length > 0) {
        return result.groups[current];
      }
      else {
        return result.data[current];
      }
    }, data);
    return node;
  }

  getFieldValue = (rowData, columnDef) => {
    let value = (typeof rowData[columnDef.field] !== 'undefined' ? rowData[columnDef.field] : this.byString(rowData, columnDef.field));
    if (columnDef.lookup) {
      value = columnDef.lookup[value];
    }

    return value;
  }

  byString(o, s) {
    if (!s) {
      return;
    }

    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
      var x = a[i];
      if (o && x in o) {
        o = o[x];
      } else {
        return;
      }
    }
    return o;
  }

  isDataType(type) {
    let dataType = "normal";

    if (this.columns.find(a => a.tableData.groupOrder > -1)) {
      dataType = "grouped";
    }

    return type === dataType;
  }

  sort(a, b, type) {
    if (type === 'numeric') {
      return a - b;
    } else {
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

    if (this.grouped === false && this.isDataType("grouped")) {
      this.groupData();
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
      orderBy: this.orderBy,
      orderDirection: this.orderDirection,
      pageSize: this.pageSize,
      renderData: this.pagedData,
      searchText: this.searchText,
      selectedCount: this.selectedCount
    };
  }

  // =====================================================================================================
  // DATA MANUPULATIONS
  // =====================================================================================================

  filterData = () => {
    this.searched = this.grouped = this.treeStyled = this.sorted = this.paged = false;

    this.filteredData = [...this.data];

    if (this.filterSelectionChecked) {
      this.filterData = this.filterData.filter(row => {
        return row.tableData.checked;
      });
    }

    this.columns.filter(columnDef => columnDef.tableData.filterValue).forEach(columnDef => {
      const { lookup, type, tableData, field } = columnDef;
      if (columnDef.customFilterAndSearch) {
        this.filteredData = this.filteredData.filter(row => !!columnDef.customFilterAndSearch(tableData.filterValue, row, columnDef));
      }
      else {
        if (lookup) {
          this.filteredData = this.filteredData.filter(row => {
            return !tableData.filterValue ||
              tableData.filterValue.length === 0 ||
              tableData.filterValue.indexOf(row[field] && row[field].toString()) > -1;
          });
        } else if (type === 'numeric') {
          this.filteredData = this.filteredData.filter(row => {
            return row[field] === tableData.filterValue;
          });
        } else if (type === 'boolean' && tableData.filterValue) {
          this.filteredData = this.filteredData.filter(row => {
            return (row[field] && tableData.filterValue === 'checked') ||
              (!row[field] && tableData.filterValue === 'unchecked');
          });
        } else if (['date', 'datetime'].includes(type)) {
          this.filteredData = this.filteredData.filter(row => {
            const currentDate = row[field] ? new Date(row[field]) : null;

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
            const currentHour = row[field] || null;

            if (currentHour) {
              const selectedHour = tableData.filterValue;
              const currentHourToCompare = formatDate(selectedHour, 'HH:mm');

              return currentHour === currentHourToCompare;
            }

            return true;
          });
        } else {
          this.filteredData = this.filteredData.filter(row => {
            return row[field] && row[field].toString().toUpperCase().includes(tableData.filterValue.toUpperCase());
          });
        }
      }
    });

    this.filtered = true;
  }

  searchData = () => {
    this.grouped = this.treeStyled = this.sorted = this.paged = false;

    // TODO search in data
    this.searchedData = [...this.filteredData];

    if (this.searchText) {
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

    this.groupedData = [...this.searchedData];

    const groups = this.columns
      .filter(col => col.tableData.groupOrder > -1)
      .sort((col1, col2) => col1.tableData.groupOrder - col2.tableData.groupOrder);

    const subData = this.groupedData.reduce((result, current) => {

      let object = result;
      object = groups.reduce((o, colDef) => {
        const value = current[colDef.field] || this.byString(current, colDef.field);
        let group = o.groups.find(g => g.value === value);
        if (!group) {
          group = { value, groups: [], data: [], isExpanded: false };
          o.groups.push(group);
        }
        return group;
      }, object);

      object.data.push(current);

      return result;
    }, { groups: [] });

    this.groupedData = subData.groups;
    this.grouped = true;
  }

  sortData() {
    this.paged = false;

    // TODO search in data
    if (this.isDataType("grouped")) {
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
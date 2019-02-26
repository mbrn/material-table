export default class DataManager {
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

  getRenderState = () => {
    if(this.filtered === false) {
      this.filterData();
    }
    
    if(this.searched === false) {
      this.searchData();
    }

    if(this.groupedData === false && this.columns.includes(a => a.tableData.groupOrder > -1)) {
      this.groupData();
    }

    if(this.sorted === false) {
      this.sortData();
    }

    if(this.paged === false) {
      this.pageData();
    }

    return {
      renderData: this.pagedData,
      columns: this.columns
    };
  }

  filterData = () => {
    this.searched = this.grouped = this.treeStyled = this.sorted = this.paged = false;

    // TODO filter
    this.filterData = [...this.data];

    this.filtered = true;
  }

  searchData = () => {
    this.grouped = this.treeStyled = this.sorted = this.paged = false;

    // TODO search in data
    this.searchedData = [...this.filterData];

    this.searched = true;
  }

  groupData() {
    this.sorted = this.paged = false;

    // TODO search in data
    this.groupedData = [...this.searchedData];

    this.grouped = true;
  }

  sortData() {
    this.paged = false;

    // TODO search in data
    this.sortedData = [...this.searchedData];

    this.sorted = true;
  }

  pageData() {
    // TODO search in data
    this.pageData = [...this.sortedData];

    this.paged = true;
  }
}
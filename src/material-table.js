/* eslint-disable no-unused-vars */
import { Icon, Paper, Table, TableFooter, TablePagination, TableRow } from '@material-ui/core';
import formatDate from 'date-fns/format';
import PropTypes from 'prop-types';
import * as React from 'react';
import MTableActions from './m-table-actions';
import MTableBody from './m-table-body';
import MTableBodyRow from './m-table-body-row';
import MTableCell from './m-table-cell';
import MTableFilterRow from './m-table-filter-row';
import MTableHeader from './m-table-header';
import MTablePagination from './m-table-pagination';
import MTableToolbar from './m-table-toolbar';
/* eslint-enable no-unused-vars */

class MaterialTable extends React.Component {
  constructor(props) {
    super(props);

    const calculatedProps = this.getProps(props);
    let defaultSortColumnIndex = -1;
    let defaultSortDirection = '';
    if (calculatedProps) {
      defaultSortColumnIndex = calculatedProps.columns.findIndex(a => a.defaultSort);
      defaultSortDirection = defaultSortColumnIndex > -1 ? calculatedProps.columns[defaultSortColumnIndex].defaultSort : '';
    }
    this.state = {
      columns: [],
      currentPage: 0,
      data: [],
      pageSize: calculatedProps.options.pageSize,
      renderData: [],
      searchText: '',
      selectedCount: 0,
      orderBy: defaultSortColumnIndex,
      orderDirection: defaultSortDirection,
      filterSelectionChecked: false,
      ...this.getData(calculatedProps),
      ...this.getColumns(calculatedProps)
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      const data = this.getData(this.getProps(nextProps));
      const columns = this.getColumns(this.getProps(nextProps));
      this.setState(() => ({ ...columns, ...data }));
    }
  }

  getData(props) {
    let selectedCount = 0;
    const data = props.data.map((row, index) => {      
      row.tableData = { ...row.tableData, id: index };
      if(row.tableData.checked) {
        selectedCount++;
      }
      return row;
    });

    const renderData = this.getRenderData(data, props);

    return { data, renderData, selectedCount };
  }

  getColumns(props) {
    const columns = props.columns.map((columnDef, index) => {
      columnDef.tableData = { id: index, filterValue: columnDef.defaultFilter };
      return columnDef;
    });

    return { columns };
  }

  getProps(props) {
    const calculatedProps = { ...(props || this.props) };
    calculatedProps.components = { ...MaterialTable.defaultProps.components, ...calculatedProps.components };
    calculatedProps.icons = { ...MaterialTable.defaultProps.icons, ...calculatedProps.icons };
    calculatedProps.options = { ...MaterialTable.defaultProps.options, ...calculatedProps.options };

    return calculatedProps;
  }

  setData(data) {
    data = data || this.state.data;

    const renderData = this.getRenderData(data);
    this.setState({ data, renderData });
  }

  getRenderData = (data, props) => {
    data = data || this.state.data;
    props = this.getProps();

    let renderData = [...data];

    // App filter
    if (this.state) {
      renderData = renderData.filter(row => {
        if (this.state.filterSelectionChecked) return row.tableData.checked;
        return row.tableData;
      });

      this.state.columns.filter(columnDef => columnDef.tableData.filterValue).forEach(columnDef => {
        const { lookup, type, tableData, field } = columnDef;

        if (lookup) {
          renderData = renderData.filter(row => {
            return !tableData.filterValue ||
              tableData.filterValue.length === 0 ||
              tableData.filterValue.indexOf(row[field] && row[field].toString()) > -1;
          });
        } else if (type === 'numeric') {
          renderData = renderData.filter(row => {
            return row[field] === tableData.filterValue;
          });
        } else if (type === 'boolean' && tableData.filterValue) {
          renderData = renderData.filter(row => {
            return (row[field] && tableData.filterValue === 'checked') ||
              (!row[field] && tableData.filterValue === 'unchecked');
          });
        } else if (['date', 'datetime'].includes(type)) {
          renderData = renderData.filter(row => {
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
          renderData = renderData.filter(row => {
            const currentHour = row[field] || null;

            if (currentHour) {
              const selectedHour = tableData.filterValue;
              const currentHourToCompare = formatDate(selectedHour, 'HH:mm');

              return currentHour === currentHourToCompare;
            }

            return true;
          });
        } else {
          renderData = renderData.filter(row => {
            return row[field] && row[field].toString().toUpperCase().includes(tableData.filterValue.toUpperCase());
          });
        }
      });
    }

    // Apply Search
    if (this.state && this.state.searchText) {
      renderData = renderData.filter(row => {
        let result = false;
        this.state.columns
          .filter(columnDef => { return columnDef.searchable === undefined ? !columnDef.hidden : columnDef.searchable })
          .forEach(columnDef => {
            if (columnDef.field) {
              const value = this.getFieldValue(row, columnDef);
              if (value && value.toString().toUpperCase().includes(this.state.searchText.toUpperCase())) {
                result = true;
              }
            }
          });

        return result;
      });
    }

    // Apply Sorting
    if (this.state && this.state.orderBy >= 0 && this.state.orderDirection) {
      const columnDef = this.state.columns.find(_ => _.tableData.id === this.state.orderBy);
      renderData = renderData.sort(
        this.state.orderDirection === 'desc'
          ? (a, b) => this.sort(this.getFieldValue(b, columnDef), this.getFieldValue(a, columnDef), columnDef.type)
          : (a, b) => this.sort(this.getFieldValue(a, columnDef), this.getFieldValue(b, columnDef), columnDef.type)
      );
    }
    return renderData || data;
  }

  getFieldValue(rowData, columnDef) {
    let value = rowData[columnDef.field];
    if (columnDef.lookup) {
      value = columnDef.lookup[value];
    }

    return value;
  }

  sort(a, b, type) {
    if (type === 'numeric') {
      return a - b;
    } else {
      return a < b ? -1 : a > b ? 1 : 0;
    }
  }

  onSelectionChange = () => {
    if (this.props.onSelectionChange) {
      const selectedRows = this.state.data.filter(row => row.tableData.checked);
      this.props.onSelectionChange(selectedRows);
    }
  }

  onChangePage = (...args) => {
    this.props.onChangePage && this.props.onChangePage(...args);
  }

  onChangeRowsPerPage = (...args) => {
    this.props.onChangeRowsPerPage && this.props.onChangeRowsPerPage(...args);
  }

  onOrderChange = (...args) => {
    this.props.onOrderChange && this.props.onOrderChange(...args);
  }

  renderFooter() {
    const props = this.getProps();
    if (props.options.paging) {
      const localization = { ...MaterialTable.defaultProps.localization.pagination, ...this.props.localization.pagination };
      return (
        <Table>
          <TableFooter style={{ display: 'grid' }}>
            <TableRow>
              <props.components.Pagination
                style={{ float: 'right' }}
                colSpan={3}
                count={this.state.renderData.length}
                rowsPerPage={this.state.pageSize}
                rowsPerPageOptions={props.options.pageSizeOptions}
                page={this.state.currentPage}
                onChangePage={(event, page) => {
                  this.setState({ currentPage: page }, () => {
                    this.setData();
                    this.onChangePage(page);
                  });
                }}
                onChangeRowsPerPage={(event) => {
                  this.setState(state => {
                    state.pageSize = event.target.value;
                    state.currentPage = 0;
                    return state;
                  }, () => {
                    this.setData();
                    this.onChangeRowsPerPage(event.target.value);
                  });
                }}
                ActionsComponent={(subProps) => <MTablePagination {...subProps} icons={props.icons} localization={localization} />}
                labelDisplayedRows={(row) => localization.labelDisplayedRows.replace('{from}', row.from).replace('{to}', row.to).replace('{count}', row.count)}
                labelRowsPerPage={localization.labelRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      );
    }
  }

  componentDidMount() {
    this.setData();
  }

  render() {
    const props = this.getProps();

    return (
      <props.components.Container>
        {props.options.toolbar &&
          <props.components.Toolbar
            actions={props.actions}
            components={props.components}
            selectedRows={this.state.selectedCount > 0 ? this.state.data.filter(a => { return a.tableData.checked }) : []}
            columns={this.state.columns}
            columnsButton={props.options.columnsButton}
            icons={props.icons}
            exportButton={props.options.exportButton}
            exportDelimiter={props.options.exportDelimiter}
            renderData={this.state.renderData}
            search={props.options.search}
            searchText={this.state.searchText}
            title={props.title}
            onSearchChanged={searchText => this.setState({ searchText }, () => this.setData())}
            onColumnsChanged={columns => this.setState({ columns })}
            localization={{ ...MaterialTable.defaultProps.localization.toolbar, ...this.props.localization.toolbar }}
          />
        }
        <div style={{ overflowX: 'auto' }}>
          <Table>
            {props.options.header &&
              <props.components.Header
                localization={{ ...MaterialTable.defaultProps.localization.header, ...this.props.localization.header }}
                columns={this.state.columns}
                hasSelection={props.options.selection}
                headerStyle={props.options.headerStyle}
                selectedCount={this.state.selectedCount}
                dataCount={this.state.data.length}
                hasDetailPanel={!!props.detailPanel}
                showActionsColumn={props.actions && props.actions.filter(a => !a.isFreeAction && !this.props.options.selection).length > 0}
                orderBy={this.state.orderBy}
                orderDirection={this.state.orderDirection}
                onAllSelected={(checked) => {
                  const data = this.state.renderData.map(row => {
                    row.tableData.checked = checked;
                    return row;
                  });
                  const selectedCount = checked ? data.length : 0;
                  this.setState({ renderData: data, selectedCount }, () => this.onSelectionChange());
                }}
                onOrderChange={(orderBy, orderDirection) => {
                  this.setState({ orderBy, orderDirection, currentPage: 0 }, () => {
                    this.setData();
                    this.onOrderChange(orderBy, orderDirection);
                  });
                }}
                actionsHeaderIndex={props.options.actionsColumnIndex}
                sorting={props.options.sorting}
              />
            }
            <props.components.Body
              actions={props.actions}
              components={props.components}
              icons={props.icons}
              renderData={this.state.renderData}
              currentPage={this.state.currentPage}
              pageSize={this.state.pageSize}
              columns={this.state.columns}
              detailPanel={props.detailPanel}
              options={props.options}
              getFieldValue={this.getFieldValue}
              onFilterChanged={(columnId, value) => {
                const columns = this.state.columns;
                columns[columnId].tableData.filterValue = value;
                this.setState({ columns }, () => {
                  this.setData();
                });
              }}
              onFilterSelectionChanged={(event) => {
                const filterSelectionChecked = event.target.checked;
                const columns = this.state.columns;
                this.setState({ columns, filterSelectionChecked }, () => {
                  this.setData();
                });
              }}
              onRowSelected={(event, checked) => {
                const data = this.state.data;
                data[event.target.value].tableData.checked = checked;
                this.setState(state => ({
                  data: data,
                  selectedCount: state.selectedCount + (checked ? 1 : -1)
                }), () => this.onSelectionChange());
                this.setData();
              }}
              onToggleDetailPanel={(rowData, render) => {
                const data = this.state.data;
                const targetRow = data.find(a => a.tableData.id === rowData.tableData.id);
                if(targetRow.tableData.showDetailPanel === render) {
                  targetRow.tableData.showDetailPanel = undefined;
                }
                else {
                  targetRow.tableData.showDetailPanel = render;
                }                
                this.setData(data);
              }}
              localization={{ ...MaterialTable.defaultProps.localization.body, ...this.props.localization.body }}
            />
          </Table>
        </div>
        {this.renderFooter()}
      </props.components.Container>
    );
  }
}

MaterialTable.defaultProps = {
  actions: [],
  classes: {},
  columns: [],
  components: {
    Actions: MTableActions,
    Body: MTableBody,
    Cell: MTableCell,
    Container: Paper,
    FilterRow: MTableFilterRow,
    Header: MTableHeader,
    Pagination: TablePagination,
    Row: MTableBodyRow,
    Toolbar: MTableToolbar,
  },
  data: [],
  icons: {
    /* eslint-disable react/display-name */
    Check: (props) => <Icon {...props}>check</Icon>,
    DetailPanel: (props) => <Icon {...props}>chevron_right</Icon>,    
    Export: (props) => <Icon {...props}>save_alt</Icon>,
    Filter: (props) => <Icon {...props}>filter_list</Icon>,
    FirstPage: (props) => <Icon {...props}>first_page</Icon>,
    LastPage: (props) => <Icon {...props}>last_page</Icon>,
    NextPage: (props) => <Icon {...props}>chevron_right</Icon>,
    PreviousPage: (props) => <Icon {...props}>chevron_left</Icon>,
    Search: (props) => <Icon {...props}>search</Icon>,
    ThirdStateCheck: (props) => <Icon {...props}>remove</Icon>,
    ViewColumn: (props) => <Icon {...props}>view_column</Icon>
    /* eslint-enable react/display-name */
  },
  title: 'Table Title',
  options: {
    actionsColumnIndex: 0,
    columnsButton: false,
    emptyRowsWhenPaging: true,
    exportButton: false,
    exportDelimiter: ',',
    filtering: false,
    header: true,
    paging: true,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
    showEmptyDataSourceMessage: true,
    search: true,
    selection: false,
    sorting: true,
    toolbar: true
  },
  localization: {
    pagination: {
      labelDisplayedRows: '{from}-{to} of {count}',
      labelRowsPerPage: 'Rows per page:'
    },
    toolbar: {},
    header: {},
    body: {
      filterRow: {}
    }
  }
};

MaterialTable.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.string]).isRequired,
    isFreeAction: PropTypes.bool,
    tooltip: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    iconProps: PropTypes.object
  })])),
  columns: PropTypes.arrayOf(PropTypes.shape({
    cellStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    defaultFilter: PropTypes.any,    
    headerStyle: PropTypes.object,
    hidden: PropTypes.bool,
    field: PropTypes.string,
    filtering: PropTypes.bool,
    lookup: PropTypes.object,
    render: PropTypes.func,
    sorting: PropTypes.bool,
    defaultSort: PropTypes.oneOf(['asc', 'desc']),
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['boolean', 'numeric', 'date', 'datetime', 'time', 'currency']),
    searchable: PropTypes.bool,
    currencySetting: PropTypes.shape({
      locale: PropTypes.string,
      currencyCode: PropTypes.string,
      minimumFractionDigits: PropTypes.number,
      maximumFractionDigits: PropTypes.number
    }),
    emptyValue:PropTypes.oneOfType([PropTypes.string,PropTypes.func])
  })).isRequired,
  components: PropTypes.shape({
    Actions: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Body: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Cell: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Container: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    FilterRow: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Header: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Pagination: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Row: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Toolbar: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  }),
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  detailPanel: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.string]),
      openIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.string]),
      tooltip: PropTypes.string,
      render: PropTypes.func.isRequired
    }))
  ]),
  icons: PropTypes.shape({
    Check: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    DetailPanel: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Export: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Filter: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    FirstPage: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    LastPage: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    NextPage: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    PreviousPage: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Search: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    ThirdStateCheck: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    ViewColumn: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  }),
  title: PropTypes.string,
  options: PropTypes.shape({
    actionsColumnIndex: PropTypes.number,
    columnsButton: PropTypes.bool,
    emptyRowsWhenPaging: PropTypes.bool,
    exportButton: PropTypes.bool,
    exportDelimiter: PropTypes.string,
    filtering: PropTypes.bool,
    header: PropTypes.bool,
    headerStyle: PropTypes.object,
    paging: PropTypes.bool,
    pageSize: PropTypes.number,
    pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
    rowStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    showEmptyDataSourceMessage: PropTypes.bool,
    search: PropTypes.bool,
    selection: PropTypes.bool,
    sorting: PropTypes.bool,
    toolbar: PropTypes.bool    
  }),
  localization: PropTypes.shape({
    pagination: PropTypes.object,
    toolbar: PropTypes.object,
    header: PropTypes.object,
    body: PropTypes.object
  }),
  onSelectionChange: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  onChangePage: PropTypes.func,
  onOrderChange: PropTypes.func,
};

export default MaterialTable;

export { MTableActions };
export { MTableBody };
export { MTableCell };
export { MTableFilterRow };
export { MTableHeader };
export { MTablePagination };
export { MTableBodyRow };
export { MTableToolbar };

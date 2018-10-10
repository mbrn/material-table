/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';
import MTableBody from './m-table-body';
import MTableToolbar from './m-table-toolbar';
import MTablePagination from './m-table-pagination';
import MTableHeader from './m-table-header';
import {
  Paper, Table, TableRow,
  TableFooter, TablePagination,
  withStyles
} from '@material-ui/core';
/* eslint-enable no-unused-vars */

class MaterialTable extends React.Component {
  constructor(props) {
    super(props);

    const calculatedProps = this.getProps(props);
    this.state = Object.assign({
      columns: [],
      currentPage: 0,
      data: [],
      pageSize: calculatedProps.options.pageSize,
      renderData: [],
      searchText: '',
      selectedCount: 0,
      orderBy: -1,
      orderDirection: ''
    }, this.getDataAndColumns(calculatedProps));
  }

  componentWillReceiveProps(nextProps) {
    const dataAndColumns = this.getDataAndColumns(this.getProps(nextProps));
    this.setState(dataAndColumns);
  }

  getDataAndColumns(props) {
    const data = props.data.map((row, index) => {
      row.tableData = { id: index };
      return row;
    });

    const columns = props.columns.map((columnDef, index) => {
      columnDef.tableData = { id: index };
      return columnDef;
    });

    const renderData = this.getRenderData(data, props);
    return {data, columns, renderData};
  }

  getProps(props) {
    const calculatedProps = {...(props || this.props)};
    calculatedProps.options = Object.assign(MaterialTable.defaultProps.options, calculatedProps.options);

    return calculatedProps;
  }

  setData(data) {
    data = data || this.state.data;

    const renderData = this.getRenderData(data);
    this.setState({ data, renderData });
  }

  getRenderData(data, props) {
    data = data || this.state.data;
    props = this.getProps();

    let renderData = [...data];

    // App filter
    if (this.state) {
      this.state.columns.filter(columnDef => { return columnDef.tableData.filterValue }).forEach(columnDef => {
        if (columnDef.lookup) {
          renderData = renderData.filter(row => {
            return !columnDef.tableData.filterValue ||
              columnDef.tableData.filterValue.length === 0 ||
              columnDef.tableData.filterValue.indexOf(row[columnDef.field] && row[columnDef.field].toString()) > -1;
          });
        } else if (columnDef.type === 'numeric') {
          renderData = renderData.filter(row => {
            return row[columnDef.field] === columnDef.tableData.filterValue;
          });
        } else if (columnDef.type === 'boolean' && columnDef.tableData.filterValue) {
          renderData = renderData.filter(row => {
            return (row[columnDef.field] && columnDef.tableData.filterValue === 'checked') ||
              (!row[columnDef.field] && columnDef.tableData.filterValue === 'unchecked');
          });
        } else {
          renderData = renderData.filter(row => {
            return row[columnDef.field] && row[columnDef.field].toString().toUpperCase().includes(columnDef.tableData.filterValue.toUpperCase());
          });
        }
      });
    }

    // Apply Search
    if (this.state && this.state.searchText) {
      renderData = renderData.filter(row => {
        let result = false;
        this.state.columns
          .filter(columnDef => { return !columnDef.hidden })
          .forEach(columnDef => {
            const value = this.getFieldValue(row, columnDef) || '';
            if (value.toString().toUpperCase().includes(this.state.searchText.toUpperCase())) {
              result = true;
            }
          });

        return result;
      });
    }

    // Apply Sorting
    if (this.state && this.state.orderBy >= 0 && this.state.orderDirection) {
      const columnDef = this.state.columns[this.state.orderBy];
      renderData = renderData.sort(
        this.state.orderDirection === 'desc'
          ? (a, b) => this.sort(this.getFieldValue(b, columnDef), this.getFieldValue(a, columnDef), columnDef.type)
          : (a, b) => this.sort(this.getFieldValue(a, columnDef), this.getFieldValue(b, columnDef), columnDef.type)
      );
    }

    return renderData || data;
  }

  getFieldValue(rowData, columnDef) {
    if (columnDef.render) {
      return columnDef.render(rowData);
    } else {
      let value = rowData[columnDef.field];
      if (columnDef.lookup) {
        value = columnDef.lookup[value];
      }

      return value;
    }
  }

  sort(a, b, type) {
    if (type === 'numeric') {
      return a - b;
    } else {
      return a < b ? -1 : a > b ? 1 : 0;
    }
  }

  renderFooter() {
    const props = this.getProps();
    if (props.options.paging) {
      return (
        <Table>
          <TableFooter style={{display: 'grid'}}>
            <TableRow>
              <TablePagination
                style={{float: 'right'}}
                colSpan={3}
                count={this.state.renderData.length}
                rowsPerPage={this.state.pageSize}
                rowsPerPageOptions={props.options.pageSizeOptions}
                page={this.state.currentPage}
                onChangePage={(event, page) => {
                  this.setState({currentPage: page}, () => {
                    this.setData();
                  });
                }}
                onChangeRowsPerPage={(event) => {
                  this.setState(state => {
                    state.pageSize = event.target.value;
                    state.currentPage = 0;
                    return state;
                  }, () => {
                    this.setData();
                  });
                }}
                ActionsComponent={MTablePagination}
              />
            </TableRow>
          </TableFooter>
        </Table>
      );
    }
  }

  render() {
    const props = this.getProps();

    return (
      <Paper className={props.classes.root}>
        {props.options.toolbar &&
          <MTableToolbar
            actions={props.actions}
            selectedRows={this.state.selectedCount > 0 ? this.state.data.filter(a => { return a.tableData.checked }) : []}
            columns={this.state.columns}
            columnsButton={props.options.columnsButton}
            search={props.options.search}
            searchText={this.state.searchText}
            title={props.title}
            onSearchChanged={searchText => this.setState({searchText}, () => this.setData())}
            onColumnsChanged={columns => this.setState({columns})}    
            localization={Object.assign(MaterialTable.defaultProps.localization, this.props.localization)}        
          />
        }
        <div style={{overflowX: 'auto'}}>
          <Table>
            <MTableHeader 
              localization={Object.assign(MaterialTable.defaultProps.localization, this.props.localization)}
              columns={this.state.columns}
              hasSelection={props.options.selection}
              selectedCount={this.state.selectedCount}
              dataCount={this.state.data.length}
              showActionsColumn={props.actions && props.actions.filter(a => (!a.isFreeAction)).length > 0}
              orderBy={this.state.orderBy}
              orderDirection={this.state.orderDirection}
              onAllSelected={(checked) => {
                const data = this.state.renderData.map(row => {
                  row.tableData.checked = checked;
                  return row;
                });
                const selectedCount = checked ? data.length : 0;
                this.setState({renderData: data, selectedCount});
              }}
              onOrderChanged={(orderBy, orderDirection) => {
                this.setState({orderBy, orderDirection, currentPage: 0}, () => {
                  this.setData();
                });
              }}
            />
            <MTableBody 
              actions={props.actions}
              renderData={this.state.renderData}
              currentPage={this.state.currentPage}
              pageSize={this.state.pageSize}
              columns={this.state.columns}
              options={props.options}
              getFieldValue={this.getFieldValue}
              onFilterChanged={(columnId, value) => {
                const columns = this.state.columns;
                columns[columnId].tableData.filterValue = value;
                this.setState({columns}, () => {
                  this.setData();
                });
              }}
              onRowSelected={(event, checked) => {
                const data = this.state.data;
                data[event.target.value].tableData.checked = checked;
                this.setState(state => ({
                  data: data,
                  selectedCount: state.selectedCount + (checked ? 1 : -1)
                }));
              }}
            />
          </Table>
        </div>
        {this.renderFooter()}
      </Paper>
    );
  }
}

MaterialTable.defaultProps = {
  actions: [],
  classes: {},
  columns: [],
  data: [],
  title: 'Table Title',
  options: {
    columnsButton: false,
    filtering: false,
    paging: true,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
    search: true,
    selection: false,
    toolbar: true
  },
  localization: {
    actions: 'Actions',
    nRowsSelected: '{0} row(s) selected'
  }
};

MaterialTable.propTypes = {
  actions: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
  options: PropTypes.object,
  localization: PropTypes.object
};

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  },
});

export default withStyles(styles)(MaterialTable);
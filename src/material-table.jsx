import * as React from 'react'
import PropTypes from 'prop-types'
import MTableFilterRow from './m-table-filter-row'
import MTableToolbar from './m-table-toolbar'
import MTablePagination from './m-table-pagination'
import {
  Checkbox, Paper, Table,
  TableHead, TableBody, TableRow,
  TableCell, TableFooter, TablePagination, 
  TableSortLabel, withStyles, Typography
} from '@material-ui/core'

class MaterialTable extends React.Component {
  constructor(props) {
    super(props);         

    const calculatedProps = {...this.props}
    calculatedProps.options.paging = calculatedProps.options.paging !== false 
      && Object.assign(MaterialTable.defaultProps.options.paging, calculatedProps.options.paging);        

    const data =  this.props.data.map((row, index) => { 
      row.tableData = { id: index };
      return row;
    });
    const renderData = this.getRenderData(data, calculatedProps);

    const columns =  this.props.columns.map((columnDef, index) => { 
      columnDef.tableData = { id: index };
      return columnDef;
    });

    this.state = {
      columns: columns,
      currentPage: 0,      
      data: data,
      props: calculatedProps,      
      renderData: renderData,
      selectedCount: 0,
      orderBy: -1,
      orderDirection: ''
    }
  }

  setData(data) {
    data = data || this.state.data;

    const renderData = this.getRenderData(data);
    this.setState({ data, renderData });
  }

  getRenderData(data, props) {
    data = data || this.state.data;
    props = props || this.state.props

    let renderData = [...data]; //apply filter & 
    
    // App filter
    if(this.state) {
      this.state.columns.filter(columnDef => { return columnDef.tableData.filterValue; }).forEach(columnDef => {
        if(columnDef.lookup) {
          renderData = renderData.filter(row => {             
            return !columnDef.tableData.filterValue 
              || columnDef.tableData.filterValue.length == 0 
              || columnDef.tableData.filterValue.indexOf(row[columnDef.field] && row[columnDef.field].toString()) > -1;
          });
        }
        else if(columnDef.isNumeric === true) {
          renderData = renderData.filter(row => { 
            return row[columnDef.field] == columnDef.tableData.filterValue
          });
        }
        else {
          renderData = renderData.filter(row => { 
            return row[columnDef.field] 
              && row[columnDef.field].toString().toUpperCase().includes(columnDef.tableData.filterValue.toUpperCase())
          });
        }
      });
    }

    // Apply Sorting
    if(this.state && this.state.orderBy >= 0 && this.state.orderDirection) {
      const columnDef = this.state.columns[this.state.orderBy];
      renderData = renderData.sort(
        this.state.orderDirection === 'desc' ? 
        (a, b) => this.sort(this.getFieldValue(b, columnDef), this.getFieldValue(a, columnDef), columnDef.isNumeric) : 
        (a, b) => this.sort(this.getFieldValue(a, columnDef), this.getFieldValue(b, columnDef), columnDef.isNumeric)
      );
    }

    return renderData || data;
  }

  getFieldValue(rowData, columnDef) {
    if(columnDef.render) {
      return columnDef.render(rowData);
    }
    else {
      let value = rowData[columnDef.field];
      if(columnDef.lookup) {
        value = columnDef.lookup[value];
      }

      return value;
    }
  }

  sort(a, b, isNumeric) {
    if(isNumeric) {
      return a - b;
    } 
    else {
      return a < b ? -1 : a > b ? 1 : 0
    }
  }

  renderHeader() {
    return (
      <TableHead>
        <TableRow>
          {this.state.props.options.selection &&
            <TableCell padding="checkbox">
              <Checkbox 
                indeterminate={this.state.selectedCount > 0 && this.state.selectedCount < this.state.data.length}
                checked={this.state.selectedCount === this.state.data.length}
                onChange={(event, checked) => {
                  const data = this.state.data.map(row => { 
                    row.tableData.checked = checked; 
                    return row;
                  });
                  const selectedCount = checked ? data.length : 0;
                  this.setState({data, selectedCount});
                }} 
              />
            </TableCell>
          }
          {this.state.columns.filter(columnDef => {return !columnDef.hidden}).map((columnDef, index) => (
            <TableCell numeric={columnDef.isNumeric}>
              {columnDef.sort !== false ? 
                <TableSortLabel
                  active={this.state.orderBy === index}
                  direction={this.state.orderDirection}
                  onClick={() => {
                    const orderDirection = index !== this.state.orderBy ? "asc" : this.state.orderDirection === "asc" ? "desc" : "asc";
                    this.setState({orderBy: index,  orderDirection, currentPage: 0}, () => {
                      this.setData();
                    });
                  }}
                >
                  {columnDef.title}
                </TableSortLabel>
                :
                columnDef.title
              }
              
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  renderBody() {
    let renderData = this.state.renderData;
    let emptyRowCount = 0;
    if(this.state.props.options.paging) {
      const startIndex = this.state.currentPage * this.state.props.options.paging.pageSize;
      const endIndex = startIndex + this.state.props.options.paging.pageSize;
      renderData = renderData.slice(startIndex, endIndex);      
      emptyRowCount = this.state.props.options.paging.pageSize - renderData.length;
    }
    return (
      <TableBody>
        {this.state.props.options.filtering && 
          <MTableFilterRow 
            columns={this.state.columns.filter(columnDef => {return !columnDef.hidden})}
            onFilterChanged={(columnId, value) => {
              const columns = this.state.columns;
              columns[columnId].tableData.filterValue = value;
              this.setState({columns}, () => {
                this.setData();
              });
            }}
          />
        }
        {renderData.map((data, index) => (this.renderRow(data, index)))}        
        {[...Array(emptyRowCount)].map(() => <TableRow style={{height: 49}}/>)}
        {emptyRowCount > 0 && <div style={{height: 1}}/>}
      </TableBody>
    );
  }

  renderRow(data, index) {
    return (
      <TableRow selected={index % 2 === 0}>
        {this.state.props.options.selection &&
          <TableCell padding="checkbox">
            <Checkbox 
              checked={data.tableData.checked === true}
              value={data.tableData.id}
              onChange={(event, checked) => {
                data = this.state.data;
                data[event.target.value].tableData.checked = checked;
                this.setState(state => ({
                  data: data,
                  selectedCount: state.selectedCount + (checked ? 1 : -1)
                }))
              }}
            />
          </TableCell>
        }
        {this.state.columns.filter(columnDef => {return !columnDef.hidden}).map(columnDef => {
          const value = this.getFieldValue(data, columnDef);
          return <TableCell numeric={columnDef.isNumeric}>{value}</TableCell>
        })}
      </TableRow>
    );
  }

  renderFooter() {
    if(this.state.props.options.paging) {
      return (
        <TableFooter>
          <TableRow>
            <TablePagination
              style={{position: 'absolute', right: 20}}
              colSpan={3}
              count={this.state.renderData.length}
              rowsPerPage={this.state.props.options.paging.pageSize}
              rowsPerPageOptions={this.state.props.options.paging.pageSizeOptions}
              page={this.state.currentPage}
              onChangePage={(event, page) => { 
                this.setState({currentPage: page}, () => {
                  this.setData();
                }); 
                
              }}
              onChangeRowsPerPage={(event) => {
                this.setState(state => {
                  state.props.options.paging.pageSize = event.target.value;
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
      );
    } 
  }

  render() {
    const { classes } = this.state.props;

    return (
      <Paper className={classes.root}>
        {this.state.props.options.toolbar && 
          <MTableToolbar 
            {...this.state.props.options.toolbar} 
            columns={this.state.columns}
            onColumnsChanged={columns => this.setState({columns})}
          />
        }
        <Table className={classes.table}>
          {this.renderHeader()}
          {this.renderBody()}
        </Table>        
        {this.renderFooter()}
      </Paper>
    );
  }
}

MaterialTable.defaultProps = {
  classes: {},
  columns: [],
  data: [],  
  options: {
    filtering: false,
    paging: {
      pageSize: 5,
      pageSizeOptions: [5, 10, 20]
    },
    selection: false,            
    toolbar: false,
  }
}

MaterialTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  options: PropTypes.object
}

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

export default withStyles(styles)(MaterialTable)
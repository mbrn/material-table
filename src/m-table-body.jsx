/* eslint-disable no-unused-vars */
import * as React from 'react';
import MTableFilterRow from './m-table-filter-row';
import MTableCell from './m-table-cell';
import {
  Checkbox, Paper, Table,
  TableHead, TableBody, TableRow,
  TableCell, TableFooter, TablePagination,
  TableSortLabel, withStyles, Typography
} from '@material-ui/core';
/* eslint-enable no-unused-vars */

export default class MTableBody extends React.Component {

  renderRow(data, index) {
    return (
      <TableRow selected={index % 2 === 0}>
        {this.props.options.selection
        ? <TableCell padding="checkbox">
            <Checkbox
              checked={data.tableData.checked === true}
              value={data.tableData.id}
              onChange={this.props.onRowSelected}
            />
          </TableCell>
        : (this.props.actions && this.props.actions.filter(a => (!a.isFreeAction)).length > 0) &&
          <TableCell style={{paddingTop: 0, paddingBottom: 0}}>
            <div style={{display: 'flex'}}>
              <MTableActions data={data} actions={this.props.actions.filter(a => { return !a.isFreeAction })}/>
            </div>
          </TableCell>
        }
        {this.props.columns.filter(columnDef => { return !columnDef.hidden }).map(columnDef => {
          const value = this.props.getFieldValue(data, columnDef);
          return <MTableCell columnDef={columnDef} value={value}/>;
        })}
      </TableRow>
    );
  }

  render() {
    let renderData = this.props.renderData;
    let emptyRowCount = 0;
    if (this.props.options.paging) {
      const startIndex = this.props.currentPage * this.props.pageSize;
      const endIndex = startIndex + this.props.pageSize;
      renderData = renderData.slice(startIndex, endIndex);
      emptyRowCount = this.props.pageSize - renderData.length;
    }
    return (
      <TableBody>
        {this.props.options.filtering &&
          <MTableFilterRow
            columns={this.props.columns.filter(columnDef => { return !columnDef.hidden })}
            emptyCell={this.props.options.selection || (this.props.actions && this.props.actions.filter(a => (!a.isFreeAction)).length > 0)}
            onFilterChanged={this.props.onFilterChanged}
          />
        }
        {renderData.map((data, index) => (this.renderRow(data, index)))}
        {[...Array(emptyRowCount)].map(() => <TableRow style={{height: 49}}/>)}
        {emptyRowCount > 0 && <div style={{height: 1}}/>}
      </TableBody>
    );
  }
}

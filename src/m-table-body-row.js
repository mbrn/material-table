/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';
import MTableCell from './m-table-cell';
import MTableActions from './m-table-actions';
import { Checkbox, TableRow, TableCell } from '@material-ui/core';
/* eslint-enable no-unused-vars */

export default class MTableBodyRow extends React.Component {
  renderColumns(){
      const mapArr = this.props.columns.filter(columnDef => { return !columnDef.hidden })
      .map((columnDef) => {
        const value = this.props.getFieldValue(this.props.data, columnDef);
        return <MTableCell columnDef={columnDef} value={value} key={columnDef.tableData.id} rowData={this.props.data} />;
      });
      return mapArr;
  }

  renderActions() {
    return (
      <TableCell style={{ paddingTop: 0, paddingBottom: 0 }} key="key-actions-column">
        <div style={{ display: 'flex' }}>
          <MTableActions data={this.props.data} actions={this.props.actions.filter(a => { return !a.isFreeAction })} />
        </div>
      </TableCell>
    );
  }
  renderCheckbox() {
    return (
      <TableCell padding="checkbox" key="key-selection-column">
        <Checkbox
          checked={this.props.data.tableData.checked === true}
          value={`${this.props.data.tableData.id}`}
          onChange={this.props.onRowSelected}
        />
      </TableCell>
    );
  }
  render() {
    const columnArr = this.renderColumns();
    if(this.props.options.selection){
      columnArr.splice(0,0,this.renderCheckbox());
    }else if(this.props.actions &&
             this.props.actions.filter(a => (!a.isFreeAction)).length > 0){
          if(this.props.options.actionsColumnIndex === -1){
            columnArr.push(this.renderActions());
          }else if(this.props.options.actionsColumnIndex >= 0){
            columnArr.splice(this.props.options.actionsColumnIndex,0,this.renderActions());
          }

    }
    return (
      <TableRow selected={this.props.index % 2 === 0}>
       {columnArr}
      </TableRow>
    );
  }
}

MTableBodyRow.defaultProps = {
  actions: [],
  index: 0,
  data: {},
  options: {}
};

MTableBodyRow.propTypes = {
  actions: PropTypes.array,
  index: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  onRowSelected: PropTypes.func,
  getFieldValue: PropTypes.func.isRequired
};

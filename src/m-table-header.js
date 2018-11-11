/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  TableHead, TableRow, TableCell,
  TableSortLabel, Checkbox, withStyles
} from '@material-ui/core';
/* eslint-enable no-unused-vars */

class MTableHeader extends React.Component {
  render() {
    return (
      <TableHead>
        <TableRow>
          {this.props.hasSelection
            ? <TableCell padding="checkbox" key="key-selection-column">
              <Checkbox
                indeterminate={this.props.selectedCount > 0 && this.props.selectedCount < this.props.dataCount}
                checked={this.props.selectedCount === this.props.dataCount}
                onChange={(event, checked) => this.props.onAllSelected && this.props.onAllSelected(checked)}
              />
            </TableCell>
            : this.props.showActionsColumn &&
              <TableCell key="key-actions-column">
                <TableSortLabel>{this.props.localization.actions}</TableSortLabel>
              </TableCell>
          }
          {this.props.columns.filter(columnDef => { return !columnDef.hidden }).map((columnDef, index, arr) => (
            <TableCell
              key={columnDef.tableData.id}
              numeric={['numeric'].indexOf(columnDef.type) !== -1}
            >
              {columnDef.sort !== false
                ? <TableSortLabel
                  active={this.props.orderBy === columnDef.tableData.id}
                  direction={this.props.orderDirection || 'asc'}
                  onClick={() => {
                    const orderDirection = columnDef.tableData.id !== this.props.orderBy ? 'asc' : this.props.orderDirection === 'asc' ? 'desc' : 'asc';
                    this.props.onOrderChanged(columnDef.tableData.id, orderDirection);
                  }}
                >
                  {columnDef.title}
                </TableSortLabel>
                : columnDef.title
              }
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

MTableHeader.defaultProps = {
  dataCount: 0,
  hasSelection: false,
  selectedCount: 0,
  localization: {},
  orderBy: undefined,
  orderDirection: 'asc'
};

MTableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  dataCount: PropTypes.number,
  hasSelection: PropTypes.bool,
  localization: PropTypes.object,
  selectedCount: PropTypes.number,
  onAllSelected: PropTypes.func,
  onOrderChanged: PropTypes.func,
  orderBy: PropTypes.number,
  orderDirection: PropTypes.string
};

export default MTableHeader;

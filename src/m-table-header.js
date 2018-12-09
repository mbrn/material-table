/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  TableHead, TableRow, TableCell,
  TableSortLabel, Checkbox, withStyles
} from '@material-ui/core';
/* eslint-enable no-unused-vars */

class MTableHeader extends React.Component {
  renderHeader() {
    // eslint-disable-next-line no-console
    console.log(this.props.columns);
    const mapArr = this.props.columns.filter(columnDef => { return !columnDef.hidden })
      .map((columnDef) => (
        <TableCell
          key={columnDef.tableData.id}
          numeric={['numeric'].indexOf(columnDef.type) !== -1}
        >
          {(columnDef.sort !== false && columnDef.sorting !== false && this.props.sorting)
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
      ));
      // eslint-disable-next-line no-console
      console.log(mapArr);
    return mapArr;
  }

  renderActionsHeader() {
    return (
      <TableCell key="key-actions-column">
        <TableSortLabel>{this.props.localization.actions}</TableSortLabel>
      </TableCell>
    );
  }
  renderSelectionHeader() {
    return (
      <TableCell padding="checkbox" key="key-selection-column">
        <Checkbox
          indeterminate={this.props.selectedCount > 0 && this.props.selectedCount < this.props.dataCount}
          checked={this.props.selectedCount === this.props.dataCount}
          onChange={(event, checked) => this.props.onAllSelected && this.props.onAllSelected(checked)}
        />
      </TableCell>
    );
  }
  render() {
    const headers = this.renderHeader();
    // eslint-disable-next-line no-console
    console.log(headers);
    if (this.props.hasSelection) {
      headers.splice(0, 0, this.renderSelectionHeader());
    }

    if (this.props.showActionsColumn) {
      if (this.props.actionsHeaderIndex >= 0) {
        let endPos = 0;
        if (this.props.hasSelection) {
          endPos = 1;
        }
        headers.splice(this.props.actionsHeaderIndex + endPos, 0, this.renderActionsHeader());
        // eslint-disable-next-line no-console
        console.log(headers);
      } else if (this.props.actionsHeaderIndex === -1) {
        headers.push(this.renderActionsHeader());
      }
    }

    return (
      <TableHead>
        <TableRow>
          {headers}
        </TableRow>
      </TableHead>
    );
  }
}

MTableHeader.defaultProps = {
  dataCount: 0,
  hasSelection: false,
  selectedCount: 0,
  sorting: true,
  localization: {},
  orderBy: undefined,
  orderDirection: 'asc',
  actionsHeaderIndex: 0
};

MTableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  dataCount: PropTypes.number,
  hasSelection: PropTypes.bool,
  localization: PropTypes.object,
  selectedCount: PropTypes.number,
  sorting: PropTypes.bool,
  onAllSelected: PropTypes.func,
  onOrderChanged: PropTypes.func,
  orderBy: PropTypes.number,
  orderDirection: PropTypes.string,
  actionsHeaderIndex: PropTypes.number,
  showActionsColumn: PropTypes.bool,
};

export default MTableHeader;

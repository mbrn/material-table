/* eslint-disable no-unused-vars */
import * as React from 'react';
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
            ? <TableCell padding="checkbox">
              <Checkbox
                indeterminate={this.props.selectedCount > 0 && this.props.selectedCount < this.props.dataCount}
                checked={this.props.selectedCount === this.props.dataCount}
                onChange={(event, checked) => this.props.onAllSelected(checked)}
              />
            </TableCell>
            : this.props.showActionsColumn &&
            <TableCell>
              <TableSortLabel>{this.props.localization.actions}</TableSortLabel>              
            </TableCell>
          }
          {this.props.columns.filter(columnDef => { return !columnDef.hidden }).map((columnDef, index, arr) => (
            <TableCell
              numeric={['numeric', 'date', 'time', 'dateTime'].indexOf(columnDef.type) !== -1}
              className={(arr.length - 1) === index && this.props.classes.lastColumn}>
              {columnDef.sort !== false
                ? <TableSortLabel
                  active={this.props.orderBy === index}
                  direction={this.props.orderDirection}
                  onClick={() => {
                    const orderDirection = index !== this.props.orderBy ? 'asc' : this.props.orderDirection === 'asc' ? 'desc' : 'asc';
                    this.props.onOrderChanged(index, orderDirection);
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

const styles = theme => ({
  lastColumn: {
    width: '100%'
  }
});

export default withStyles(styles)(MTableHeader);

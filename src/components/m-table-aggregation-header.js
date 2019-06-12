/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, withStyles } from '@material-ui/core';

export class MTableAggregationHeader extends React.Component {
  renderHeader() {
    const mapArr = this.props.columns.filter(columnDef => !columnDef.hidden && !(columnDef.tableData.groupOrder > -1))
      .sort((a, b) => a.tableData.columnOrder - b.tableData.columnOrder)
      .map(columnDef => {
        const aggregation = this.props.aggregations[columnDef.tableData.id];
        const cellContent = aggregation ? (<span>
          {aggregation.label && <>{aggregation.label}: </>}<b>{aggregation.value}</b>
        </span>) : null;
        return (
          <TableCell
            key={columnDef.tableData.id}
            align={['numeric'].indexOf(columnDef.type) !== -1 ? "right" : "left"}
            className={this.props.classes.header}
            style={{ ...this.props.headerStyle, ...columnDef.headerStyle }}
          >
            {cellContent}
          </TableCell>
        );
      });
    return mapArr;
  }

  renderEmptyHeaderCell(key) {
    return (
      <TableCell
        key={key}//"key-actions-column"
        padding="checkbox"
        className={this.props.classes.header}
        style={{ ...this.props.headerStyle }}
      />
    );
  }
  // renderSelectionHeader() {
  //   return (
  //     <TableCell
  //       padding="checkbox"
  //       key="key-selection-column"
  //       className={this.props.classes.header}
  //       style={{ ...this.props.headerStyle }}
  //     />
  //   );
  // }

  render() {
    const headers = this.renderHeader();
    if (this.props.hasSelection) {
      headers.unshift(this.renderEmptyHeaderCell("checkbox"));
    }

    if (this.props.showActionsColumn) {
      if (this.props.actionsHeaderIndex >= 0) {
        let endPos = 0;
        if (this.props.hasSelection) {
          endPos = 1;
        }
        headers.splice(this.props.actionsHeaderIndex + endPos, 0, this.renderEmptyHeaderCell("key-actions-column"));
      } else if (this.props.actionsHeaderIndex === -1) {
        headers.push(this.renderEmptyHeaderCell("key-actions-column"));
      }
    }

    this.props.columns
      .filter(columnDef => columnDef.tableData.groupOrder > -1)
      .forEach(columnDef => {
        headers.unshift(<TableCell padding="checkbox" key={"key-group-header" + columnDef.tableData.id} className={this.props.classes.header} />);
      });

    return (
      <TableRow>
        {headers}
      </TableRow>
    );
  }
}

MTableAggregationHeader.defaultProps = {
  hasSelection: false,
  headerStyle: {},
  actionsHeaderIndex: 0,
};

MTableAggregationHeader.propTypes = {
  aggregations: PropTypes.object,
  columns: PropTypes.array.isRequired,
  classes: PropTypes.object,
  hasSelection: PropTypes.bool,
  headerStyle: PropTypes.object,
  actionsHeaderIndex: PropTypes.number,
  showActionsColumn: PropTypes.bool,
};


export const styles = theme => ({
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: theme.palette.background.paper, // Change according to theme,
  }
});

export default withStyles(styles)(MTableAggregationHeader);
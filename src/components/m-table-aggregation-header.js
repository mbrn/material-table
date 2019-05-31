/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  TableHead, TableRow, TableCell,
  TableSortLabel, Checkbox, withStyles
} from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
/* eslint-enable no-unused-vars */

export class MTableHeader extends React.Component {
  renderHeader() {
    /*hasAggregation && <TableRow key="aggr">
       <this.props.components.Cell colSpan={colSpan - 1}>
         {Object.keys(aggregations).map((i, idx) => (<span key={String(idx)}>
           <b>{aggregations[i].label && <>{aggregations[i].label}</>} {this.props.columns[aggregations[i].colId].title}: </b>{aggregations[i].value}
         </span>))}
       </this.props.components.Cell>
     </TableRow>*/
    const mapArr = this.props.columns.filter(columnDef => !columnDef.hidden && !(columnDef.tableData.groupOrder > -1))
      .sort((a, b) => a.tableData.columnOrder - b.tableData.columnOrder)
      .map((columnDef, index) => {
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

  renderActionsHeader() {
    return (
      <TableCell
        key="key-actions-column"
        padding="checkbox"
        className={this.props.classes.header}
        style={{ ...this.props.headerStyle, textAlign: 'center' }}
      />
    );
  }
  renderSelectionHeader() {
    return (
      <TableCell
        padding="checkbox"
        key="key-selection-column"
        className={this.props.classes.header}
        style={{ ...this.props.headerStyle }}
      />
    );
  }

  renderDetailPanelColumnCell() {
    return <TableCell
      padding="none"
      key="key-detail-panel-column"
      className={this.props.classes.header}
      style={{ ...this.props.headerStyle }}
    />;
  }

  render() {
    const headers = this.renderHeader();
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
      } else if (this.props.actionsHeaderIndex === -1) {
        headers.push(this.renderActionsHeader());
      }
    }

    if (this.props.hasDetailPanel) {
      if (this.props.detailPanelColumnAlignment === 'right') {
        headers.push(this.renderDetailPanelColumnCell());
      } else {
        headers.splice(0, 0, this.renderDetailPanelColumnCell());
      }
    }

    if (this.props.isTreeData > 0) {
      headers.splice(0, 0,
        <TableCell
          padding="none"
          key={"key-tree-data-header"}
          className={this.props.classes.header}
          style={{ ...this.props.headerStyle }}
        />
      );
    }

    this.props.columns
      .filter(columnDef => columnDef.tableData.groupOrder > -1)
      .forEach(columnDef => {
        headers.splice(0, 0, <TableCell padding="checkbox" key={"key-group-header" + columnDef.tableData.id} className={this.props.classes.header} />);
      });

    return (
      <TableRow>
        {headers}
      </TableRow>
    );
  }
}

MTableHeader.defaultProps = {
  hasSelection: false,
  headerStyle: {},
  actionsHeaderIndex: 0,
  detailPanelColumnAlignment: "left"
};

MTableHeader.propTypes = {
  aggregations: PropTypes.object,
  isTreeData: PropTypes.bool,
  columns: PropTypes.array.isRequired,
  hasDetailPanel: PropTypes.bool.isRequired,
  classes:PropTypes.object,
  detailPanelColumnAlignment: PropTypes.string,
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

export default withStyles(styles)(MTableHeader);
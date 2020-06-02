/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import withStyles from '@material-ui/core/styles/withStyles';
import { Draggable } from 'react-beautiful-dnd';
import { Tooltip } from '@material-ui/core';
import * as CommonValues from '../utils/common-values';
/* eslint-enable no-unused-vars */

export class MTableHeader extends React.Component {

  renderHeader() {
    const size = this.props.options.padding === 'default' ? 'medium' : 'small';

    const mapArr = this.props.columns.filter(columnDef => !columnDef.hidden && !(columnDef.tableData.groupOrder > -1))
      .sort((a, b) => a.tableData.columnOrder - b.tableData.columnOrder)
      .map((columnDef, index) => {
        let content = columnDef.title;

        if (this.props.draggable) {
          content = 
            (<Draggable
              key={columnDef.tableData.id}
              draggableId={columnDef.tableData.id.toString()}
              index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {columnDef.title}
                </div>
              )}
            </Draggable>)
          ;
        }

        if (columnDef.sorting !== false && this.props.sorting) {
          content = 
            (<TableSortLabel
              IconComponent={this.props.icons.SortArrow}
              active={this.props.orderBy === columnDef.tableData.id}
              direction={this.props.orderDirection || 'asc'}
              onClick={() => {
                const orderDirection =
                  columnDef.tableData.id !== this.props.orderBy
                    ? 'asc'
                    : this.props.orderDirection === 'asc'
                      ? 'desc'
                      : this.props.orderDirection === 'desc' && this.props.thirdSortClick
                        ? ''
                        : this.props.orderDirection === 'desc' && !this.props.thirdSortClick
                          ? 'asc'
                          : this.props.orderDirection === ''
                            ? 'asc'
                            : 'desc';
                this.props.onOrderChange(columnDef.tableData.id, orderDirection);
              }}
            >
              {content}
            </TableSortLabel>)
          ;
        }

        if (columnDef.tooltip) {
          content = <Tooltip title={columnDef.tooltip}><span>{content}</span></Tooltip>;
        }

        return (
          <TableCell
              key={columnDef.tableData.id}
              align={['numeric'].indexOf(columnDef.type) !== -1 ? "right" : "left"}
              className={this.props.classes.header}
              style={{ ...this.props.headerStyle, ...columnDef.headerStyle, boxSizing: 'border-box', width: columnDef.tableData.width }}
              size={size}
          >
            {content}
          </TableCell>
        );
      });
    return mapArr;
  }



  renderActionsHeader() {
    const localization = { ...MTableHeader.defaultProps.localization, ...this.props.localization };
    const width = CommonValues.actionsColumnWidth(this.props);
    return (
      <TableCell
          key="key-actions-column"
          padding="checkbox"
          className={this.props.classes.header}
          style={{ ...this.props.headerStyle, width: width, textAlign: 'center', boxSizing: 'border-box' }}
      >
        <TableSortLabel disabled>{localization.actions}</TableSortLabel>
      </TableCell>
    );
  }
  renderSelectionHeader() {
    const selectionWidth = CommonValues.selectionMaxWidth(this.props, this.props.treeDataMaxLevel);

    return (
      <TableCell
          padding="none"
          key="key-selection-column"
          className={this.props.classes.header}
          style={{ ...this.props.headerStyle, width: selectionWidth }}
      >
        {this.props.showSelectAllCheckbox &&
          <Checkbox
              indeterminate={this.props.selectedCount > 0 && this.props.selectedCount < this.props.dataCount}
              checked={this.props.dataCount > 0 && this.props.selectedCount === this.props.dataCount}
              onChange={(event, checked) => this.props.onAllSelected && this.props.onAllSelected(checked)}
          />
        }
      </TableCell>
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
  headerStyle: {},
  selectedCount: 0,
  sorting: true,
  localization: {
    actions: 'Actions'
  },
  orderBy: undefined,
  orderDirection: 'asc',
  actionsHeaderIndex: 0,
  detailPanelColumnAlignment: "left",
  draggable: true,
  thirdSortClick: true
};

MTableHeader.propTypes = {
  actionsHeaderIndex: PropTypes.number,
  columns: PropTypes.array.isRequired,
  dataCount: PropTypes.number,
  detailPanelColumnAlignment: PropTypes.string,
  draggable: PropTypes.bool,
  hasDetailPanel: PropTypes.bool.isRequired,
  hasSelection: PropTypes.bool,
  headerStyle: PropTypes.object,
  localization: PropTypes.object,
  onAllSelected: PropTypes.func,
  onOrderChange: PropTypes.func,
  orderBy: PropTypes.number,
  orderDirection: PropTypes.string,
  selectedCount: PropTypes.number,
  showActionsColumn: PropTypes.bool,
  showSelectAllCheckbox: PropTypes.bool,
  sorting: PropTypes.bool,
  thirdSortClick: PropTypes.bool,
  tooltip: PropTypes.string
};


export const styles = theme => ({
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: theme.palette.background.paper // Change according to theme,
  }
});

export default withStyles(styles)(MTableHeader);

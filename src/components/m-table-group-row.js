/* eslint-disable no-unused-vars */
import { TableCell, TableRow, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as React from 'react';
/* eslint-enable no-unused-vars */


export default class MTableGroupRow extends React.Component {

  rotateIconStyle = isOpen => ({
    transform: isOpen ? 'rotate(90deg)' : 'none'
  });

  render() {
    let colSpan = this.props.columns.filter(columnDef => !columnDef.hidden).length;
    this.props.options.selection && colSpan++;
    this.props.detailPanel && colSpan++;
    this.props.actions && this.props.actions.length > 0 && colSpan++;
    const column = this.props.groups[this.props.level];

    let detail;
    if (this.props.groupData.isExpanded) {
      if (this.props.groups.length > (this.props.level + 1)) { // Is there another group
        detail = this.props.groupData.groups.map((groupData, index) => (
          <this.props.components.GroupRow
            actions={this.props.actions}
            key={groupData.value || ("" + index)}
            columns={this.props.columns}
            components={this.props.components}
            detailPanel={this.props.detailPanel}
            getFieldValue={this.props.getFieldValue}
            groupData={groupData}
            groups={this.props.groups}
            icons={this.props.icons}
            level={this.props.level + 1}
            path={[...this.props.path, index]}
            onGroupExpandChanged={this.props.onGroupExpandChanged}
            onRowSelected={this.props.onRowSelected}
            onRowClick={this.props.onRowClick}
            onToggleDetailPanel={this.props.onToggleDetailPanel}
            onTreeExpandChanged={this.props.onTreeExpandChanged}
            onEditingCanceled={this.props.onEditingCanceled}
            onEditingApproved={this.props.onEditingApproved}
            options={this.props.options}
            hasAnyEditingRow={this.props.hasAnyEditingRow}
            isTreeData={this.props.isTreeData}
          />
        ));
      }
      else {
        detail = this.props.groupData.data.map((rowData, index) => (
          <this.props.components.Row
            actions={this.props.actions}
            key={index}
            columns={this.props.columns}
            components={this.props.components}
            data={rowData}
            detailPanel={this.props.detailPanel}
            getFieldValue={this.props.getFieldValue}
            icons={this.props.icons}
            path={[...this.props.path, index]}
            onRowSelected={this.props.onRowSelected}
            onRowClick={this.props.onRowClick}
            onToggleDetailPanel={this.props.onToggleDetailPanel}
            options={this.props.options}
            isTreeData={this.props.isTreeData}
            onTreeExpandChanged={this.props.onTreeExpandChanged}
            onEditingCanceled={this.props.onEditingCanceled}
            onEditingApproved={this.props.onEditingApproved}
            hasAnyEditingRow={this.props.hasAnyEditingRow}
          />
        ));
      }
    }

    const aggregations = this.props.groupData.aggregations;
    const hasAggregation = aggregations && !!Object.keys(aggregations).length;
    const topStyle = hasAggregation ? { borderBottom: 0 } : undefined;

    const freeCells = [];
    for (let i = 0; i < this.props.level; i++) {
      freeCells.push(<TableCell padding="checkbox" style={topStyle} />);
    }

    let value = this.props.groupData.value;
    if (column.lookup) {
      value = column.lookup[value];
    }
    return (
      <>
        <TableRow key="h" >
          {freeCells}
          <this.props.components.Cell
            colSpan={colSpan}
            padding="none"
            columnDef={column}
            value={value}
            icons={this.props.icons}
            style={topStyle}
          >
            <IconButton
              style={{ transition: 'all ease 200ms', ...this.rotateIconStyle(this.props.groupData.isExpanded) }}
              onClick={(event) => {
                this.props.onGroupExpandChanged(this.props.path);
              }}
            >
              <this.props.icons.DetailPanel />
            </IconButton>
            <b>{column.title}:&nbsp;</b>
          </this.props.components.Cell>
          {
            // {aggregations && <this.props.components.Cell colSpan={colSpan - 1}>
            //   {aggregations && Object.keys(aggregations).map((i, idx) => (<span key={String(idx)}>
            //     <b>{aggregations[i].label && <>{aggregations[i].label}</>} {this.props.columns[aggregations[i].colId].title}: </b>{aggregations[i].value}
            //   </span>))}
            // </this.props.components.Cell>}
          }
        </TableRow>
        {hasAggregation && <this.props.components.AggregationHeader
          aggregations={aggregations}
          columns={this.props.columns}
          hasDetailPanel={!!this.props.detailPanel}
          detailPanelColumnAlignment={this.props.detailPanelColumnAlignment}
          hasSelection={this.props.hasSelection}
          headerStyle={this.props.headerStyle}
          localization={this.props.localization}
          actionsHeaderIndex={this.props.actionsHeaderIndex}
          showActionsColumn={this.props.showActionsColumn} />}
        {detail}
      </>
    );
  }
}
/*hasAggregation && <TableRow key="aggr">
   <this.props.components.Cell colSpan={colSpan - 1}>
     {Object.keys(aggregations).map((i, idx) => (<span key={String(idx)}>
       <b>{aggregations[i].label && <>{aggregations[i].label}</>} {this.props.columns[aggregations[i].colId].title}: </b>{aggregations[i].value}
     </span>))}
   </this.props.components.Cell>
 </TableRow>*/
MTableGroupRow.defaultProps = {
  columns: [],
  groups: [],
  options: {},
  level: 0,
  detailPanelColumnAlignment: "left"
};

MTableGroupRow.propTypes = {
  detailPanelColumnAlignment: PropTypes.string,
  hasSelection: PropTypes.bool,
  headerStyle: PropTypes.object,
  actions: PropTypes.array,
  localization: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.object),
  actionsHeaderIndex: PropTypes.number,
  showActionsColumn: PropTypes.bool,
  components: PropTypes.object,
  detailPanel: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.object)]),
  getFieldValue: PropTypes.func,
  groupData: PropTypes.object,
  groups: PropTypes.arrayOf(PropTypes.object),
  hasAnyEditingRow: PropTypes.bool,
  icons: PropTypes.object,
  isTreeData: PropTypes.bool.isRequired,
  level: PropTypes.number,
  onGroupExpandChanged: PropTypes.func,
  onRowSelected: PropTypes.func,
  onRowClick: PropTypes.func,
  onToggleDetailPanel: PropTypes.func.isRequired,
  onTreeExpandChanged: PropTypes.func.isRequired,
  onEditingCanceled: PropTypes.func,
  onEditingApproved: PropTypes.func,
  options: PropTypes.object,
  path: PropTypes.arrayOf(PropTypes.number),
};

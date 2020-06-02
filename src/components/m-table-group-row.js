/* eslint-disable no-unused-vars */
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
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
      if (this.props.groups.length > this.props.level + 1) { // Is there another group
        detail = this.props.groupData.groups.map((groupData, index) => 
          (<this.props.components.GroupRow
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
          />)
        );
      }
      else {
        detail = this.props.groupData.data.map((rowData, index) => {
          if (rowData.tableData.editing) {
            return (
              <this.props.components.EditRow
                  columns={this.props.columns}
                  components={this.props.components}
                  data={rowData}
                  icons={this.props.icons}
                  path={[...this.props.path, index]}
                  localization={this.props.localization}
                  key={index}
                  mode={rowData.tableData.editing}
                  options={this.props.options}
                  isTreeData={this.props.isTreeData}
                  detailPanel={this.props.detailPanel}
                  onEditingCanceled={this.props.onEditingCanceled}
                  onEditingApproved={this.props.onEditingApproved}
                  getFieldValue={this.props.getFieldValue}
              />
            );
          } else {
            return (
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
            );
          }
        });
      }
    }

    const freeCells = [];
    for (let i = 0; i < this.props.level; i++) {
      freeCells.push(<TableCell padding="checkbox" key={i} />);
    }

    let value = this.props.groupData.value;
    if (column.lookup) {
      value = column.lookup[value];
    }
    
    let title = column.title;
    if (typeof this.props.options.groupTitle === "function") {
      title = this.props.options.groupTitle(this.props.groupData);
    } else if (typeof title !== "string") {
      title = React.cloneElement(title);
    }

    let separator = this.props.options.groupRowSeparator || ": ";

    return (
      <>
        <TableRow>
          {freeCells}
          <this.props.components.Cell 
              colSpan={colSpan} 
              padding="none" 
              columnDef={column} 
              value={value}
              icons={this.props.icons}
          >
            <IconButton
                style={{ transition: 'all ease 200ms', ...this.rotateIconStyle(this.props.groupData.isExpanded) }}
                onClick={(event) => {
                this.props.onGroupExpandChanged(this.props.path);
              }}
            >
              <this.props.icons.DetailPanel />
            </IconButton>
            <b>{title}{separator}</b>
          </this.props.components.Cell>
        </TableRow>
        {detail}
      </>
    );
  }
}

MTableGroupRow.defaultProps = {
  columns: [],
  groups: [],
  options: {},
  level: 0
};

MTableGroupRow.propTypes = {
  actions: PropTypes.array,
  columns: PropTypes.arrayOf(PropTypes.object),
  components: PropTypes.object,
  detailPanel: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.object)]),
  getFieldValue: PropTypes.func,
  groupData: PropTypes.object,
  groups: PropTypes.arrayOf(PropTypes.object),
  hasAnyEditingRow: PropTypes.bool,
  icons: PropTypes.object,
  isTreeData: PropTypes.bool.isRequired,
  level: PropTypes.number,
  localization: PropTypes.object,
  onEditingApproved: PropTypes.func,
  onEditingCanceled: PropTypes.func,
  onGroupExpandChanged: PropTypes.func,  
  onRowClick: PropTypes.func,
  onRowSelected: PropTypes.func,
  onToggleDetailPanel: PropTypes.func.isRequired,
  onTreeExpandChanged: PropTypes.func.isRequired,
  options: PropTypes.object,
  path: PropTypes.arrayOf(PropTypes.number)
};

/* eslint-disable no-unused-vars */
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";
import * as React from "react";
/* eslint-enable no-unused-vars */

export default class MTableGroupRow extends React.Component {
  rotateIconStyle = (isOpen) => ({
    transform: isOpen ? "rotate(90deg)" : "none",
  });

  render() {
    let colSpan = this.props.columns.filter((columnDef) => !columnDef.hidden)
      .length;
    this.props.options.selection && colSpan++;
    this.props.detailPanel && colSpan++;
    this.props.actions && this.props.actions.length > 0 && colSpan++;
    const column = this.props.groups[this.props.level];

    let detail;
    if (this.props.groupData.isExpanded) {
      if (this.props.groups.length > this.props.level + 1) {
        // Is there another group
        detail = this.props.groupData.groups.map((groupData, index) => (
          <this.props.components.GroupRow
            actions={this.props.actions}
            key={groupData.value || "" + index}
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
            onGroupSelected={this.props.onGroupSelected}
            onRowSelected={this.props.onRowSelected}
            onRowClick={this.props.onRowClick}
            onToggleDetailPanel={this.props.onToggleDetailPanel}
            onTreeExpandChanged={this.props.onTreeExpandChanged}
            onEditingCanceled={this.props.onEditingCanceled}
            onEditingApproved={this.props.onEditingApproved}
            options={this.props.options}
            hasAnyEditingRow={this.props.hasAnyEditingRow}
            isTreeData={this.props.isTreeData}
            cellEditable={this.props.cellEditable}
            onCellEditStarted={this.props.onCellEditStarted}
            onCellEditFinished={this.props.onCellEditFinished}
          />
        ));
      } else {
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
                onBulkEditRowChanged={this.props.onBulkEditRowChanged}
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
                cellEditable={this.props.cellEditable}
                onCellEditStarted={this.props.onCellEditStarted}
                onCellEditFinished={this.props.onCellEditFinished}
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

    const showSelectGroupCheckbox =
      this.props.options.selection &&
      this.props.options.showSelectGroupCheckbox;

    const mapSelectedRows = (groupData) => {
      let totalRows = 0;
      let selectedRows = 0;

      if (showSelectGroupCheckbox) {
        if (groupData.data.length) {
          totalRows += groupData.data.length;
          groupData.data.forEach(
            (row) => row.tableData.checked && selectedRows++
          );
        } else {
          groupData.groups.forEach((group) => {
            const [groupTotalRows, groupSelectedRows] = mapSelectedRows(group);

            totalRows += groupTotalRows;
            selectedRows += groupSelectedRows;
          });
        }
      }

      return [totalRows, selectedRows];
    };

    const [totalRows, selectedRows] = mapSelectedRows(this.props.groupData);

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
              style={{
                transition: "all ease 200ms",
                ...this.rotateIconStyle(this.props.groupData.isExpanded),
              }}
              onClick={(event) => {
                this.props.onGroupExpandChanged(this.props.path);
              }}
            >
              <this.props.icons.DetailPanel />
            </IconButton>
            {showSelectGroupCheckbox && (
              <Checkbox
                indeterminate={selectedRows > 0 && totalRows !== selectedRows}
                checked={totalRows === selectedRows}
                onChange={(event, checked) =>
                  this.props.onGroupSelected &&
                  this.props.onGroupSelected(checked, this.props.path)
                }
                style={{ marginRight: 8 }}
              />
            )}
            <b>
              {title}
              {separator}
            </b>
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
  level: 0,
};

MTableGroupRow.propTypes = {
  actions: PropTypes.array,
  columns: PropTypes.arrayOf(PropTypes.object),
  components: PropTypes.object,
  detailPanel: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  getFieldValue: PropTypes.func,
  groupData: PropTypes.object,
  groups: PropTypes.arrayOf(PropTypes.object),
  hasAnyEditingRow: PropTypes.bool,
  icons: PropTypes.object,
  isTreeData: PropTypes.bool.isRequired,
  level: PropTypes.number,
  localization: PropTypes.object,
  onGroupExpandChanged: PropTypes.func,
  onRowSelected: PropTypes.func,
  onGroupSelected: PropTypes.func,
  onRowClick: PropTypes.func,
  onToggleDetailPanel: PropTypes.func.isRequired,
  onTreeExpandChanged: PropTypes.func.isRequired,
  onEditingCanceled: PropTypes.func,
  onEditingApproved: PropTypes.func,
  options: PropTypes.object,
  path: PropTypes.arrayOf(PropTypes.number),
  cellEditable: PropTypes.object,
  onCellEditStarted: PropTypes.func,
  onCellEditFinished: PropTypes.func,
  onBulkEditRowChanged: PropTypes.func,
};

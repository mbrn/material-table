/* eslint-disable no-unused-vars */
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import * as React from 'react';
/* eslint-enable no-unused-vars */

class MTableBody extends React.Component {
  renderEmpty(emptyRowCount, renderData) {
    const rowHeight = this.props.options.padding === 'default' ? 49 : 36;
    const localization = { ...MTableBody.defaultProps.localization, ...this.props.localization };
    if (this.props.options.showEmptyDataSourceMessage && renderData.length === 0) {
      let addColumn = 0;
      if (this.props.options.selection) {
        addColumn++;
      }
      if (this.props.actions && this.props.actions.filter(a => a.position === "row" || typeof a === "function").length > 0) {
        addColumn++;
      }
      if (this.props.hasDetailPanel) {
        addColumn++;
      }
      if (this.props.isTreeData) {
        addColumn++;
      }
      return (
        <TableRow style={{ height: rowHeight * (this.props.options.paging && this.props.options.emptyRowsWhenPaging ? this.props.pageSize : 1) }} key={'empty-' + 0} >
          <TableCell style={{ paddingTop: 0, paddingBottom: 0, textAlign: 'center' }} colSpan={this.props.columns.length + addColumn} key="empty-">
            {localization.emptyDataSourceMessage}
          </TableCell>
        </TableRow>
      );
    } else if (this.props.options.emptyRowsWhenPaging) {
      return (
        <React.Fragment>
          {[...Array(emptyRowCount)].map((r, index) => <TableRow style={{ height: rowHeight }} key={'empty-' + index} />)}
          {emptyRowCount > 0 && <TableRow style={{ height: 1 }} key={'empty-last1'} />}
        </React.Fragment>
      );
    }
  }

  renderUngroupedRows(renderData) {
    return renderData.map((data, index) => {
      if (data.tableData.editing) {
        return (
          <this.props.components.EditRow
              columns={this.props.columns.filter(columnDef => { return !columnDef.hidden; })}
              components={this.props.components}
              data={data}
              icons={this.props.icons}
              localization={{ ...MTableBody.defaultProps.localization.editRow, ...this.props.localization.editRow, dateTimePickerLocalization: this.props.localization.dateTimePickerLocalization }}
              key={index}
              mode={data.tableData.editing}
              options={this.props.options}
              isTreeData={this.props.isTreeData}
              detailPanel={this.props.detailPanel}
              onEditingCanceled={this.props.onEditingCanceled}
              onEditingApproved={this.props.onEditingApproved}
              getFieldValue={this.props.getFieldValue}
          />
        );
      }
      else {
        return (
          <this.props.components.Row
              components={this.props.components}
              icons={this.props.icons}
              data={data}
              index={index}
              key={"row-" + data.tableData.id}
              level={0}
              options={this.props.options}
              localization={{ ...MTableBody.defaultProps.localization.editRow, ...this.props.localization.editRow }}
              onRowSelected={this.props.onRowSelected}
              actions={this.props.actions}
              columns={this.props.columns}
              getFieldValue={this.props.getFieldValue}
              detailPanel={this.props.detailPanel}
              path={[index + this.props.pageSize * this.props.currentPage]}
              onToggleDetailPanel={this.props.onToggleDetailPanel}
              onRowClick={this.props.onRowClick}
              isTreeData={this.props.isTreeData}
              onTreeExpandChanged={this.props.onTreeExpandChanged}
              onEditingCanceled={this.props.onEditingCanceled}
              onEditingApproved={this.props.onEditingApproved}
              hasAnyEditingRow={this.props.hasAnyEditingRow}
              treeDataMaxLevel={this.props.treeDataMaxLevel}
          />
        );
      }
    });
  }

  renderGroupedRows(groups, renderData) {
    return renderData.map((groupData, index) => 
      (<this.props.components.GroupRow
        actions={this.props.actions}
        key={groupData.value == null ? ('' + index) : groupData.value}
        columns={this.props.columns}
        components={this.props.components}
        detailPanel={this.props.detailPanel}
        getFieldValue={this.props.getFieldValue}
        groupData={groupData}
        groups={groups}
        icons={this.props.icons}
        level={0}
        path={[index + this.props.pageSize * this.props.currentPage]}
        onGroupExpandChanged={this.props.onGroupExpandChanged}
        onRowSelected={this.props.onRowSelected}
        onRowClick={this.props.onRowClick}
        onEditingCanceled={this.props.onEditingCanceled}
        onEditingApproved={this.props.onEditingApproved}
        onToggleDetailPanel={this.props.onToggleDetailPanel}
        onTreeExpandChanged={this.props.onTreeExpandChanged}
        options={this.props.options}
        isTreeData={this.props.isTreeData}
        hasAnyEditingRow={this.props.hasAnyEditingRow}
        localization={{ ...MTableBody.defaultProps.localization.editRow, ...this.props.localization.editRow }}
      />)
    );
  }

  render() {
    let renderData = this.props.renderData;
    const groups = this.props.columns
      .filter(col => col.tableData.groupOrder > -1)
      .sort((col1, col2) => col1.tableData.groupOrder - col2.tableData.groupOrder);

    let emptyRowCount = 0;
    if (this.props.options.paging) {
      emptyRowCount = this.props.pageSize - renderData.length;
    }

    return (
      <TableBody>
        {this.props.options.filtering &&
          <this.props.components.FilterRow
              columns={this.props.columns.filter(columnDef => !columnDef.hidden)}
              icons={this.props.icons}
              hasActions={this.props.actions.filter(a => a.position === "row" || typeof a === "function").length > 0}
              actionsColumnIndex={this.props.options.actionsColumnIndex}
              onFilterChanged={this.props.onFilterChanged}
              selection={this.props.options.selection}
              localization={{ ...MTableBody.defaultProps.localization.filterRow, ...this.props.localization.filterRow, dateTimePickerLocalization: this.props.localization.dateTimePickerLocalization }}
              hasDetailPanel={!!this.props.detailPanel}
              isTreeData={this.props.isTreeData}
              filterCellStyle={this.props.options.filterCellStyle}
              hideFilterIcons={this.props.options.hideFilterIcons}
          />
        }

        {this.props.showAddRow && this.props.options.addRowPosition === "first" &&
          <this.props.components.EditRow
              columns={this.props.columns.filter(columnDef => { return !columnDef.hidden; })}
              data={this.props.initialFormData}
              components={this.props.components}
              icons={this.props.icons}
              key="key-add-row"
              mode="add"
              localization={{ ...MTableBody.defaultProps.localization.editRow, ...this.props.localization.editRow }}
              options={this.props.options}
              isTreeData={this.props.isTreeData}
              detailPanel={this.props.detailPanel}
              onEditingCanceled={this.props.onEditingCanceled}
              onEditingApproved={this.props.onEditingApproved}
              getFieldValue={this.props.getFieldValue}
          />
        }

        {groups.length > 0 ?
          this.renderGroupedRows(groups, renderData) :
          this.renderUngroupedRows(renderData)
        }

        {this.props.showAddRow && this.props.options.addRowPosition === "last" &&
          <this.props.components.EditRow
              columns={this.props.columns.filter(columnDef => { return !columnDef.hidden; })}
              data={this.props.initialFormData}
              components={this.props.components}
              icons={this.props.icons}
              key="key-add-row"
              mode="add"
              localization={{ ...MTableBody.defaultProps.localization.editRow, ...this.props.localization.editRow }}
              options={this.props.options}
              isTreeData={this.props.isTreeData}
              detailPanel={this.props.detailPanel}
              onEditingCanceled={this.props.onEditingCanceled}
              onEditingApproved={this.props.onEditingApproved}
              getFieldValue={this.props.getFieldValue}
          />
        }
        {this.renderEmpty(emptyRowCount, renderData)}
      </TableBody>
    );
  }
}

MTableBody.defaultProps = {
  actions: [],
  currentPage: 0,
  pageSize: 5,
  renderData: [],
  selection: false,
  localization: {
    emptyDataSourceMessage: 'No records to display',
    filterRow: {},
    editRow: {}
  }
};

MTableBody.propTypes = {
  actions: PropTypes.array,
  columns: PropTypes.array.isRequired,
  components: PropTypes.object.isRequired,
  currentPage: PropTypes.number,
  detailPanel: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.func]))]),
  getFieldValue: PropTypes.func.isRequired,
  hasAnyEditingRow: PropTypes.bool,
  hasDetailPanel: PropTypes.bool.isRequired,
  icons: PropTypes.object.isRequired,
  initialFormData: PropTypes.object,
  isTreeData: PropTypes.bool.isRequired,
  localization: PropTypes.object,
  onEditingApproved: PropTypes.func,
  onEditingCanceled: PropTypes.func,
  onFilterChanged: PropTypes.func,
  onGroupExpandChanged: PropTypes.func,
  onRowClick: PropTypes.func,
  onRowSelected: PropTypes.func,
  onToggleDetailPanel: PropTypes.func.isRequired,
  onTreeExpandChanged: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  pageSize: PropTypes.number,
  renderData: PropTypes.array,
  selection: PropTypes.bool.isRequired,
  showAddRow: PropTypes.bool,
  treeDataMaxLevel: PropTypes.number
};

export default MTableBody;

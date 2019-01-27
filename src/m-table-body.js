/* eslint-disable no-unused-vars */
import { TableBody, TableCell, TableRow } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as React from 'react';
/* eslint-enable no-unused-vars */

class MTableBody extends React.Component {
  renderEmpty(emptyRowCount, renderData) {
    const localization = { ...MTableBody.defaultProps.localization, ...this.props.localization };
    if (this.props.options.showEmptyDataSourceMessage && renderData.length === 0) {
      let addColumn = 0;
      if (this.props.options.selection || (this.props.actions && this.props.actions.filter(a => !a.isFreeAction && !this.props.options.selection).length > 0)) {
        addColumn = 1;
      }
      return (
        <TableRow style={{ height: 49 * (this.props.options.paging && this.props.options.emptyRowsWhenPaging ? this.props.pageSize : 1) }} key={'empty-' + 0} >
          <TableCell style={{ paddingTop: 0, paddingBottom: 0, textAlign: 'center' }} colSpan={this.props.columns.length + addColumn} key="empty-">
            {localization.emptyDataSourceMessage}
          </TableCell>
        </TableRow>
      );
    } else if (this.props.options.emptyRowsWhenPaging) {
      return (
        <React.Fragment>
          {[...Array(emptyRowCount)].map((r, index) => <TableRow style={{ height: 49 }} key={'empty-' + index} />)}
          {emptyRowCount > 0 && <TableRow style={{ height: 1 }} key={'empty-last1'} />}
        </React.Fragment>
      );
    }
  }

  renderUngroupedRows(renderData) {
    return renderData.map((data, index) => {
      return (
        <this.props.components.Row
          components={this.props.components}
          icons={this.props.icons}
          data={data}
          index={index}
          key={index}
          options={this.props.options}
          onRowSelected={this.props.onRowSelected}
          actions={this.props.actions}
          columns={this.props.columns}
          getFieldValue={this.props.getFieldValue}
          detailPanel={this.props.detailPanel}
          path={[index]}
          onToggleDetailPanel={this.props.onToggleDetailPanel}
          onRowClick={this.props.onRowClick}
        />
      );
    });
  }

  renderGroupedRows(groups, renderData) {
    return renderData.map((groupData, index) => (
      <this.props.components.GroupRow
        key={groupData.value}
        columns={this.props.columns}
        components={this.props.components}
        getFieldValue={this.props.getFieldValue}
        groupData={groupData}
        groups={groups}
        icons={this.props.icons}
        level={0}
        path={[index]}
        onGroupExpandChanged={this.props.onGroupExpandChanged}
        onRowSelected={this.props.onRowSelected}
        options={this.props.options}
      />
    ));

  }

  render() {
    let renderData = this.props.renderData;
    const groups = this.props.columns
      .filter(col => col.tableData.groupOrder > -1)
      .sort((col1, col2) => col1.tableData.groupOrder - col2.tableData.groupOrder);

    let emptyRowCount = 0;
    if (this.props.options.paging) {
      const startIndex = this.props.currentPage * this.props.pageSize;
      const endIndex = startIndex + this.props.pageSize;
      renderData = renderData.slice(startIndex, endIndex);
      emptyRowCount = this.props.pageSize - renderData.length;
    }

    return (
      <TableBody>
        {this.props.options.filtering &&
          <this.props.components.FilterRow
            columns={this.props.columns.filter(columnDef => { return !columnDef.hidden })}
            icons={this.props.icons}
            emptyCell={this.props.options.selection || (this.props.actions && this.props.actions.filter(a => !a.isFreeAction && !this.props.options.selection).length > 0)}
            hasActions={(this.props.actions && this.props.actions.filter(a => !a.isFreeAction && !this.props.options.selection).length > 0)}
            actionsColumnIndex={this.props.options.actionsColumnIndex}
            onFilterChanged={this.props.onFilterChanged}
            selection={this.props.options.selection}
            onFilterSelectionChanged={this.props.onFilterSelectionChanged}
            localization={{ ...MTableBody.defaultProps.localization.filterRow, ...this.props.localization.filterRow }}
            hasDetailPanel={!!this.props.detailPanel}
          />
        }
        {groups.length > 0 ?
          this.renderGroupedRows(groups, renderData) :
          this.renderUngroupedRows(renderData)
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
    filterRow: {}
  }
};

MTableBody.propTypes = {
  actions: PropTypes.array,
  components: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  currentPage: PropTypes.number,
  detailPanel: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.object)]),
  getFieldValue: PropTypes.func.isRequired,
  icons: PropTypes.object.isRequired,
  onRowSelected: PropTypes.func,
  options: PropTypes.object.isRequired,
  pageSize: PropTypes.number,
  renderData: PropTypes.array,
  selection: PropTypes.bool.isRequired,
  onFilterSelectionChanged: PropTypes.func.isRequired,
  localization: PropTypes.object,
  onFilterChanged: PropTypes.func,
  onGroupExpandChanged: PropTypes.func,
  onToggleDetailPanel: PropTypes.func.isRequired,
  onRowClick: PropTypes.func,
};

export default MTableBody;

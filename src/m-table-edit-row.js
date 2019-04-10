/* eslint-disable no-unused-vars */
import { Checkbox, TableCell, TableRow, IconButton, Icon, Tooltip, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as React from 'react';
import FormField from './form/form-field';
import MTableCell from './m-table-cell';
import { byString } from './utils';
/* eslint-enable no-unused-vars */


export default class MTableEditRow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: props.data ? JSON.parse(JSON.stringify(props.data)) : {}
    };    
  }

  renderColumns() {
    const mapArr = this.props.columns.filter(columnDef => !columnDef.hidden && !(columnDef.tableData.groupOrder > -1))
      .map((columnDef, index) => {        
        const value = (typeof this.state.data[columnDef.field] !== 'undefined' ? this.state.data[columnDef.field] : byString(this.state.data, columnDef.field));
        const style = {};
        if (index === 0) {
          style.paddingLeft = 24 + this.props.level * 20;
        }

        if (!columnDef.field || (this.props.mode !== 'add' && columnDef.readonly)) {
          return (
            <this.props.components.Cell
              icons={this.props.icons}
              columnDef={columnDef}
              value={value}
              key={columnDef.tableData.id}
              rowData={this.props.data}
            />
          );
        }
        else {
          return (
            <TableCell
              key={columnDef.tableData.id}
              align={['numeric'].indexOf(columnDef.type) !== -1 ? "right" : "left"}
            >
              <FormField
                key={columnDef.tableData.id}
                columnDef={columnDef}
                value={value}
                onChange={value => {
                  const data = { ...this.state.data };
                  data[columnDef.field] = value;
                  this.setState({ data });
                }} />
            </TableCell>
          );
        }
      });
    return mapArr;
  }

  renderActions() {    
    const localization = { ...MTableEditRow.defaultProps.localization, ...this.props.localization };
    const actions = [
      {
        icon: this.props.icons.Check,
        tooltip: localization.saveTooltip,
        onClick: () => {
          const newData = this.state.data;
          delete newData.tableData;
          this.props.onEditingApproved(this.props.mode, this.state.data, this.props.data);
        }
      },
      {
        icon: this.props.icons.Clear,
        tooltip: localization.cancelTooltip,
        onClick: () => {
          this.props.onEditingCanceled(this.props.mode, this.props.data);
        }
      }
    ];
    return (
      <TableCell padding="dense" key="key-actions-column" style={{ width: 48 * actions.length, padding: '0px 5px' }}>
        <div style={{ display: 'flex' }}>
          <this.props.components.Actions data={this.props.data} actions={actions} components={this.props.components} />
        </div>
      </TableCell>
    );
  }

  getStyle() {
    const style = {
      // boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.2)',
      borderBottom: '1px solid red'
    };

    return style;
  }

  render() {
    const localization = { ...MTableEditRow.defaultProps.localization, ...this.props.localization };

    let columns;
    if (this.props.mode === "add" || this.props.mode === "update") {
      columns = this.renderColumns();
    }
    else {
      const colSpan = this.props.columns.filter(columnDef => !columnDef.hidden && !(columnDef.tableData.groupOrder > -1)).length;
      columns = [
        <TableCell
          padding={this.props.options.actionsColumnIndex === 0 ? "none" : undefined}
          key="key-selection-cell"
          colSpan={colSpan}>
          <Typography variant="h6">
            {localization.deleteText}
          </Typography>
        </TableCell>
      ];
    }


    if (this.props.options.selection) {
      columns.splice(0, 0, <TableCell padding="none" key="key-selection-cell" />);
    }

    if (this.props.options.actionsColumnIndex === -1) {
      columns.push(this.renderActions());
    } else if (this.props.options.actionsColumnIndex >= 0) {
      let endPos = 0;
      if (this.props.options.selection) {
        endPos = 1;
      }
      columns.splice(this.props.options.actionsColumnIndex + endPos, 0, this.renderActions());
    }

    // Lastly we add detail panel icon
    if (this.props.detailPanel) {
      columns.splice(0, 0, <TableCell padding="none" key="key-detail-panel-cell" />);
    }

    this.props.columns
      .filter(columnDef => columnDef.tableData.groupOrder > -1)
      .forEach(columnDef => {
        columns.splice(0, 0, <TableCell padding="none" key={"key-group-cell" + columnDef.tableData.id} />);
      });

    const { 
      detailPanel, 
      isTreeData, 
      onRowClick, 
      onRowSelected, 
      onTreeExpandChanged, 
      onToggleDetailPanel, 
      onEditingApproved,
      onEditingCanceled,
      ...rowProps 
    } = this.props;

    return (
      <>
        <TableRow
          {...rowProps}
          style={this.getStyle()}
        >
          {columns}
        </TableRow>
      </>
    );
  }
}

MTableEditRow.defaultProps = {
  actions: [],
  index: 0,
  options: {},
  path: [],
  localization: {
    saveTooltip: 'Save',
    cancelTooltip: 'Cancel',
    deleteText: 'Are you sure delete this row?',
  }
};

MTableEditRow.propTypes = {
  actions: PropTypes.array,
  icons: PropTypes.any.isRequired,
  index: PropTypes.number.isRequired,
  data: PropTypes.object,
  detailPanel: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.func]))]),
  options: PropTypes.object.isRequired,
  onRowSelected: PropTypes.func,
  path: PropTypes.arrayOf(PropTypes.number),
  columns: PropTypes.array,
  onRowClick: PropTypes.func,
  onEditingApproved: PropTypes.func,
  onEditingCanceled: PropTypes.func,  
  localization: PropTypes.object
};

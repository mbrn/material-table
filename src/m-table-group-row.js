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
    const colSpan = this.props.columns.filter(columnDef => !columnDef.hidden).length;
    const groupedColumn = this.props.groups[this.props.level];

    let detail;
    if (groupedColumn.tableData.isGroupExpanded[this.props.value]) {
      if (this.props.groups.length > (this.props.level + 1)) { // Is there another group
        const keys = Object.keys(this.props.data);
        detail = keys.map(key => (
          <this.props.components.GroupRow
            columns={this.props.columns}
            components={this.props.components}
            data={this.props.data[key]}
            groups={this.props.groups}
            getFieldValue={this.props.getFieldValue}
            icons={this.props.icons}
            level={this.props.level + 1}
            onGroupExpandChanged={this.props.onGroupExpandChanged}
            options={this.props.options}
            value={key}
          />
        ));
      }
      else {
        detail = this.props.data.map(rowData => (
          <this.props.components.Row
            columns={this.props.columns}
            components={this.props.components}
            data={rowData}
            getFieldValue={this.props.getFieldValue}
            options={this.props.options}
          />
        ));
      }
    }

    const freeCells = [];
    for(let i = 0; i < this.props.level; i++) {
      freeCells.push(<TableCell padding="checkbox"/>);
    }

    return (
      <>
        <TableRow>
          {freeCells}          
          <TableCell colSpan={colSpan} padding="none">
            <IconButton
              style={{ transition: 'all ease 200ms', ...this.rotateIconStyle(groupedColumn.tableData.isGroupExpanded[this.props.value]) }}
              onClick={(event) => {
                this.props.onGroupExpandChanged(groupedColumn, this.props.value);
              }}
            >
              <this.props.icons.DetailPanel />
            </IconButton>
            <b>{groupedColumn.title+ ": "}</b>
            {this.props.value}
          </TableCell>
        </TableRow>
        {detail}
      </>
    );
  }
}

MTableGroupRow.defaultProps = {
};

MTableGroupRow.propTypes = {
};

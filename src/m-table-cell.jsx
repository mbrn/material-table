/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Icon, TableCell } from '@material-ui/core';
/* eslint-enable no-unused-vars */

export default class MTableCell extends React.Component {
  getRenderValue() {
    if (this.props.columnDef.type === 'boolean') {
      const style = {textAlign: 'center', width: '48px'};
      if (this.props.value) {
        return <Icon style={style}>check</Icon>;
      } else {
        return <Icon style={style}>remove</Icon>;
      }
    } else if (this.props.columnDef.type === 'date') {
      if (this.props.value instanceof Date) {
        return this.props.value.toLocaleDateString();
      } else {
        return this.props.value;
      }
    } else if (this.props.columnDef.type === 'time') {
      if (this.props.value instanceof Date) {
        return this.props.value.toLocaleTimeString();
      } else {
        return this.props.value;
      }
    } else if (this.props.columnDef.type === 'dateTime') {
      if (this.props.value instanceof Date) {
        return this.props.value.toLocaleString();
      } else {
        return this.props.value;
      }
    }

    return this.props.value;
  }

  render() {
    let cellStyle = {};
    if(typeof this.props.columnDef.cellStyle === "function" ) {
      cellStyle = Object.assign(cellStyle, this.props.columnDef.cellStyle(this.props.value));
    }
    else {
      cellStyle = Object.assign(cellStyle, this.props.columnDef.cellStyle);
    }

    return (
      <TableCell style={cellStyle}
        numeric={['numeric'].indexOf(this.props.columnDef.type) !== -1}
      >
        {this.getRenderValue() || ''}
      </TableCell>
    );
  }
}

/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Icon, TableCell } from '@material-ui/core';
/* eslint-enable no-unused-vars */

export default class MTableCell extends React.Component {
  getRenderValue() {
    if (this.props.columnDef.type === 'boolean') {
      if (this.props.value) {
        return <Icon style={{textAlign: 'center'}}>check</Icon>;
      } else {
        return <Icon>remove</Icon>;
      }
    }

    return this.props.value;
  }

  render() {
    return (
      <TableCell
        numeric={this.props.columnDef.type === 'numeric'}
      >
        {this.getRenderValue()}
      </TableCell>
    );
  }
}

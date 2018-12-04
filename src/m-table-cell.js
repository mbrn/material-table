/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Icon, TableCell } from '@material-ui/core';
import PropTypes from 'prop-types';
/* eslint-enable no-unused-vars */

export default class MTableCell extends React.Component {
  getRenderValue() {
    if (this.props.columnDef.render) {
      return this.props.columnDef.render(this.props.rowData);
    } else if (this.props.columnDef.type === 'boolean') {
      const style = { textAlign: 'center', width: '48px' };
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
    } else if (this.props.columnDef.type === 'currency') {     
        return this.getCurrencyValue(this.props.columnDef.currencySetting,this.props.value);     
    }

    return this.props.value;
  }

  getCurrencyValue(currencySetting,value){
    if(currencySetting!==undefined){
       return new Intl.NumberFormat((currencySetting.locale!==undefined)?currencySetting.locale:'en-US',
           {
            style: 'currency', 
            currency: (currencySetting.currencyCode!==undefined)?currencySetting.currencyCode:'USD',
            minimumFractionDigits:(currencySetting.minimumFractionDigits!==undefined)?currencySetting.minimumFractionDigits:2,
            maximumFractionDigits:(currencySetting.maximumFractionDigits!==undefined)?currencySetting.maximumFractionDigits:2
          }).format((value!==undefined)?value:0);
    } else{
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format((value!==undefined)?value:0);
    }
  }

  render() {
    let cellStyle = {};
    if (typeof this.props.columnDef.cellStyle === 'function') {
      cellStyle = { ...cellStyle, ...this.props.columnDef.cellStyle(this.props.value) };
    } else {
      cellStyle = { ...cellStyle, ...this.props.columnDef.cellStyle };
    }

    return (
      <TableCell style={cellStyle}
        numeric={['numeric'].indexOf(this.props.columnDef.type) !== -1}
      >
        {this.getRenderValue()}
      </TableCell>
    );
  }
}

MTableCell.defaultProps = {
  columnDef: {},
  value: ''
};

MTableCell.propTypes = {
  columnDef: PropTypes.object.isRequired,
  value: PropTypes.any.isRequired
};

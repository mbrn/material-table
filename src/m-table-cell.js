/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Icon, TableCell } from '@material-ui/core';
import PropTypes from 'prop-types';
/* eslint-enable no-unused-vars */

export default class MTableCell extends React.Component {
  getRenderValue() {
    if (this.props.columnDef.emptyValue !== undefined && (this.props.value === undefined || this.props.value === null)) {
      return this.getEmptyValue(this.props.columnDef.emptyValue);
    }
    if (this.props.columnDef.render) {
      return this.props.columnDef.render(this.props.rowData, 'row');
    } else if (this.props.columnDef.type === 'boolean') {
      const style = { textAlign: 'center', width: '48px' };
      if (this.props.value) {
        return <this.props.icons.Check style={style} />;
      } else {
        return <this.props.icons.ThirdStateCheck style={style} />;
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
      return this.getCurrencyValue(this.props.columnDef.currencySetting, this.props.value);
    }

    return this.props.value;
  }

  getEmptyValue(emptyValue) {
    if (typeof emptyValue === 'function') {
      return this.props.columnDef.emptyValue(this.props.rowData);
    } else {
      return emptyValue;
    }
  }

  getCurrencyValue(currencySetting, value) {
    if (currencySetting !== undefined) {
      return new Intl.NumberFormat((currencySetting.locale !== undefined) ? currencySetting.locale : 'en-US',
        {
          style: 'currency',
          currency: (currencySetting.currencyCode !== undefined) ? currencySetting.currencyCode : 'USD',
          minimumFractionDigits: (currencySetting.minimumFractionDigits !== undefined) ? currencySetting.minimumFractionDigits : 2,
          maximumFractionDigits: (currencySetting.maximumFractionDigits !== undefined) ? currencySetting.maximumFractionDigits : 2
        }).format((value !== undefined) ? value : 0);
    } else {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format((value !== undefined) ? value : 0);
    }
  }

  handleClickCell = e => {
    const { columnDef, rowData, onClick } = this.props;
    if( columnDef.disableClick || typeof onClick !== 'function') return;
    onClick(e, rowData);
  }

  render() {

    const { columnDef, rowData, ...cellProps } = this.props;

    let cellStyle = {};
    if (typeof columnDef.cellStyle === 'function') {
      cellStyle = { ...cellStyle, ...columnDef.cellStyle(this.props.value) };
    } else {
      cellStyle = { ...cellStyle, ...columnDef.cellStyle };
    }

    

    return (
      <TableCell 
        {...cellProps}
        style={cellStyle}
        align={['numeric'].indexOf(this.props.columnDef.type) !== -1 ? "right" : "left"}
        onClick={this.handleClickCell}
      >
        {this.props.children}
        {this.getRenderValue()}
      </TableCell>
    );
  }
}

MTableCell.defaultProps = {
  columnDef: {},
  value: undefined,
  onClick: () => {},
};

MTableCell.propTypes = {
  columnDef: PropTypes.object.isRequired,
  value: PropTypes.any,
  rowData: PropTypes.object,
  onClick: PropTypes.func,
};

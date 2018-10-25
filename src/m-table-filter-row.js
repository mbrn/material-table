/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  TableCell, TableRow, TextField,
  FormControl, Select, Input,
  MenuItem, Checkbox, ListItemText,
  InputAdornment, Icon
} from '@material-ui/core';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import TimePicker from 'material-ui-pickers/TimePicker';
import DatePicker from 'material-ui-pickers/DatePicker';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

class MTableFilterRow extends React.Component {
  renderLookupFilter = (columnDef) => (
    <FormControl style={{width: '100%'}}>
      <Select
        multiple
        value={columnDef.tableData.filterValue || []}
        onChange={event => {
          this.props.onFilterChanged(columnDef.tableData.id, event.target.value);
        }}
        input={<Input id="select-multiple-checkbox" />}
        renderValue={selecteds => selecteds.map(selected => columnDef.lookup[selected]).join(', ')}
        MenuProps={MenuProps}
      >
        {
          Object.keys(columnDef.lookup).map(key => (
            <MenuItem key={key} value={key}>
              <Checkbox checked={columnDef.tableData.filterValue && columnDef.tableData.filterValue.indexOf(key.toString()) > -1} />
              <ListItemText primary={columnDef.lookup[key]} />
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )

  renderBooleanFilter = (columnDef) => (
    <Checkbox
      indeterminate={columnDef.tableData.filterValue === undefined}
      checked={columnDef.tableData.filterValue === 'checked'}
      onChange={() => {
        let val;
        if (columnDef.tableData.filterValue === undefined) {
          val = 'checked';
        } else if (columnDef.tableData.filterValue === 'checked') {
          val = 'unchecked';
        }

        this.props.onFilterChanged(columnDef.tableData.id, val);
      }}
    />
  )

  renderDefaultFilter = (columnDef) => (
    <TextField
      style={columnDef.type === 'numeric' ? {float: 'right'} : {}}
      type={columnDef.type === 'numeric' ? 'number' : 'text'}
      value={columnDef.tableData.filterValue}
      onChange={(event) => { this.props.onFilterChanged(columnDef.tableData.id, event.target.value) }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon>filter_list</Icon>
          </InputAdornment>
        )
      }}
    />
  )

  renderDateTypeFilter = (columnDef) => {
    let dateInputElement = null;
    const onDateInputChange = date => this.props.onFilterChanged(columnDef.tableData.id, date)

    if (columnDef.type === 'date') {
      dateInputElement = (
        <DatePicker
          value={columnDef.tableData.filterValue || null}
          onChange={onDateInputChange}
          clearable
        />
      );
    } else if (columnDef.type === 'datetime') {
      dateInputElement = (
        <DateTimePicker
          value={columnDef.tableData.filterValue || null}
          onChange={onDateInputChange}
          clearable
        />
      );
    } else if (columnDef.type === 'time') {
      dateInputElement = (
        <TimePicker
          value={columnDef.tableData.filterValue || null}
          onChange={onDateInputChange}
          clearable
        />
      );
    }

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {dateInputElement}
      </MuiPickersUtilsProvider>
    );
  }

  getComponentForColumn(columnDef) {
    if (columnDef.field) {
      if (columnDef.lookup) {
        return this.renderLookupFilter(columnDef);
      } else if (columnDef.type === 'boolean') {
        return this.renderBooleanFilter(columnDef);
      } else if (['date', 'datetime', 'time'].includes(columnDef.type)) {
        return this.renderDateTypeFilter(columnDef);
      } else {
        return this.renderDefaultFilter(columnDef);
      }
    }
  }

  render() {
    return (
      <TableRow style={{height: 10}}>
        {this.props.emptyCell && <TableCell/>}
        {this.props.columns.map(columnDef => (
          <TableCell key={columnDef.tableData.id}>
            {this.getComponentForColumn(columnDef)}
          </TableCell>
        ))}
      </TableRow>
    );
  }
}

MTableFilterRow.defaultProps = {
  emptyCell: false,
  columns: []
};

MTableFilterRow.propTypes = {
  emptyCell: PropTypes.bool,
  columns: PropTypes.array.isRequired,
  onFilterChanged: PropTypes.func.isRequired
};

export default MTableFilterRow;

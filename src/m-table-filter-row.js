/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  TableCell, TableRow, TextField,
  FormControl, Select, Input,
  MenuProps, MenuItem, Checkbox,
  ListItemText, InputAdornment, Icon
} from '@material-ui/core';
/* eslint-enable no-unused-vars */

class MTableFilterRow extends React.Component {
  getComponentForColumn(columnDef) {
    if (columnDef.field) {
      if (columnDef.lookup) {
        return (
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
        );
      } else if (columnDef.type === 'boolean') {
        return (
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
        );
      } else {
        return (
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
        );
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

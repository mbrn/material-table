import * as React from 'react'
import {
  TableCell, TableRow, TextField, 
  FormControl, InputLabel, Select,
  Input, MenuProps, MenuItem, 
  Checkbox, ListItemText, Button,
  InputAdornment, Icon
} from '@material-ui/core'

class MTableFilterRow extends React.Component {
  
  getComponentForColumn(columnDef) {
    if(columnDef.field) {
      if(columnDef.lookup) {
        return (
          <FormControl style={{width: '100%'}}>
            <Select
              multiple
              value={columnDef.tableData.filterValue || []}
              onChange={event => {
                this.props.onFilterChanged(columnDef.tableData.id, event.target.value)
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
      }
      else {
        return (
          <TextField
            style={columnDef.isNumeric && {float:'right'}}
            type={columnDef.isNumeric && 'number'}
            value={columnDef.tableData.filterValue}
            onChange={(event) => { this.props.onFilterChanged(columnDef.tableData.id, event.target.value) }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>filter_list</Icon>
                </InputAdornment>
              ),
            }}
          />

          // <TextField 
          //   style={columnDef.isNumeric && {float:'right'}}
          //   type={columnDef.isNumeric && 'number'}
          //   value={columnDef.tableData.filterValue}
          //   onChange={(event) => { this.props.onFilterChanged(columnDef.tableData.id, event.target.value) }}
          // />
        );
      }
    }
  }

  render() {
    return (
      <TableRow style={{height: 10}}>
        {this.props.emptyCell && <TableCell/>}
        {this.props.columns.map(columnDef => (
          <TableCell>
            {this.getComponentForColumn(columnDef)}
          </TableCell>
        ))}
      </TableRow>
    );
  }
}

export default MTableFilterRow
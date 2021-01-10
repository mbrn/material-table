import React, { useEffect, useState } from 'react';
import { getLocalizedFilterPlaceHolder } from './utils';

import {
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from '@material-ui/core';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function LookupFilter({ columnDef }) {
  const [selectedFilter, setSelectedFilter] = useState(
    columnDef.tableData.filterValue || []
  );

  useEffect(() => {
    setSelectedFilter(columnDef.tableData.filterValue || []);
  }, [columnDef.tableData.filterValue]);

  return (
    <FormControl style={{ width: '100%' }}>
      <InputLabel
        htmlFor={'select-multiple-checkbox' + columnDef.tableData.id}
        style={{ marginTop: -16 }}
      >
        {getLocalizedFilterPlaceHolder(columnDef)}
      </InputLabel>
      <Select
        multiple
        value={selectedFilter}
        onClose={() => {
          if (columnDef.filterOnItemSelect !== true) {
            props.onFilterChanged(columnDef.tableData.id, selectedFilter);
          }
        }}
        onChange={(event) => {
          setSelectedFilter(event.target.value);
          if (columnDef.filterOnItemSelect === true) {
            props.onFilterChanged(columnDef.tableData.id, event.target.value);
          }
        }}
        input={
          <Input id={'select-multiple-checkbox' + columnDef.tableData.id} />
        }
        renderValue={(selecteds) =>
          selecteds.map((selected) => columnDef.lookup[selected]).join(', ')
        }
        MenuProps={MenuProps}
        style={{ marginTop: 0 }}
      >
        {Object.keys(columnDef.lookup).map((key) => (
          <MenuItem key={key} value={key}>
            <Checkbox checked={selectedFilter.indexOf(key.toString()) > -1} />
            <ListItemText primary={columnDef.lookup[key]} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

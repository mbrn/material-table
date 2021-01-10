import React from 'react';
import { Checkbox } from '@material-ui/core';

export default function BooleanFilter({ columnDef, onFilterChanged }) {
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
        onFilterChanged(columnDef.tableData.id, val);
      }}
    />
  );
}

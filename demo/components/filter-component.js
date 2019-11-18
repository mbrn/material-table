import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function FilterComponent(props) {
  const { columnDef, onFilterChanged } = props; 
  return (
    <TextField
      style={columnDef.type === 'numeric' ? { float: 'right' } : {}}
      type={columnDef.type === 'numeric' ? 'number' : 'search'}
      onChange={(event) => {
        onFilterChanged(columnDef.tableData.id, event.target.value);
      }}
    />
  )
}

import React from 'react';
import { getLocalizedFilterPlaceHolder, getLocalizationData } from './utils';
import { InputAdornment, TextField, Tooltip } from '@material-ui/core';

export default function DefaultFilter({
  columnDef,
  icons,
  localization,
  hideFilterIcons,
  onFilterChanged,
}) {
  const _localization = getLocalizationData(localization);
  const FilterIcon = icons.Filter;

  return (
    <TextField
      style={columnDef.type === 'numeric' ? { float: 'right' } : {}}
      type={columnDef.type === 'numeric' ? 'number' : 'search'}
      value={columnDef.tableData.filterValue || ''}
      placeholder={getLocalizedFilterPlaceHolder(columnDef)}
      onChange={(event) => {
        onFilterChanged(columnDef.tableData.id, event.target.value);
      }}
      inputProps={{ 'aria-label': `filter data by ${columnDef.title}` }}
      InputProps={
        hideFilterIcons || columnDef.hideFilterIcon
          ? undefined
          : {
              startAdornment: (
                <InputAdornment position="start">
                  <Tooltip title={_localization.filterTooltip}>
                    <FilterIcon />
                  </Tooltip>
                </InputAdornment>
              ),
            }
      }
    />
  );
}

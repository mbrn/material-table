import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { getLocalizedFilterPlaceHolder } from './utils';
import {
  DatePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
  TimePicker,
} from '@material-ui/pickers';

export default function DateFilter({
  columnDef,
  onFilterChanged,
  localization,
}) {
  const onDateInputChange = (date) =>
    onFilterChanged(columnDef.tableData.id, date);

  const pickerProps = {
    value: columnDef.tableData.filterValue || null,
    onChange: onDateInputChange,
    placeholder: getLocalizedFilterPlaceHolder(columnDef),
    clearable: true,
  };

  let dateInputElement = null;
  if (columnDef.type === 'date') {
    dateInputElement = <DatePicker {...pickerProps} />;
  } else if (columnDef.type === 'datetime') {
    dateInputElement = <DateTimePicker {...pickerProps} />;
  } else if (columnDef.type === 'time') {
    dateInputElement = <TimePicker {...pickerProps} />;
  }

  return (
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
      locale={localization.dateTimePickerLocalization}
    >
      {dateInputElement}
    </MuiPickersUtilsProvider>
  );
}

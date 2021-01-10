import { createElement } from 'react';

export default function Filter({ columnDef, onFilterChanged }) {
  return createElement(columnDef.filterComponent, {
    columnDef,
    onFilterChanged,
  });
}

import * as React from 'react';
import { IconProps } from '@material-ui/core/Icon';

export interface MaterialTableProps {
  actions?: (Action | ((rowData:any) => Action)) [];
  columns: Column[];
  data: object;
  title: string;
  options?: Options;
  localization?: Localization;
}

export interface Action {
  icon: string;
  isFreeAction?: boolean;
  tooltip?: string;
  onClick: (event: any, data: any) => void;
  iconProps: IconProps
}

export interface Column {
  cellStyle?: any | ((data: any) => any);
  hidden?: boolean;
  field?: string;
  lookup?: object;
  render?: (data:any) => any;
  title: string;
  type?: 'boolean' | 'numeric' | 'date' | 'datetime' | 'time';
}

export interface Options {
  columnsButton?: boolean;
  exportButton?: boolean;
  filtering?: boolean;
  paging?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  search?: boolean;
  selection?: boolean;
  toolbar?: boolean;
}

export interface Localization {
  actions?: string;
  nRowsSelected?: string;
}

declare const MaterialTable: React.ComponentType<MaterialTableProps>;
export default MaterialTable;
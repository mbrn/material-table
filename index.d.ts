import * as React from 'react';
import { IconProps } from '@material-ui/core/Icon';

export interface MaterialTableProps {
  actions?: (Action | ((rowData:any) => Action)) [];
  columns: Column[];
  data: object;
  title: string;
  options?: Options;
  localization?: Localization;
  onSelectionChange?: (data: any[]) => void;
}

export interface Action {
  icon: string;
  isFreeAction?: boolean;
  tooltip?: string;
  onClick: (event: any, data: any) => void;
  iconProps?: IconProps
}

export interface Column {
  cellStyle?: any | ((data: any) => any);
  hidden?: boolean;
  field?: string;
  lookup?: object;
  render?: (data:any) => any;
  sorting?: boolean;
  defaultSort?: 'asc' | 'desc';
  title: string;
  type?: 'boolean' | 'numeric' | 'date' | 'datetime' | 'time' | 'currency';
  currencySetting?:object;
}

export interface Options {
  actionsColumnIndex?:number;
  columnsButton?: boolean;
  exportButton?: boolean;
  filtering?: boolean;
  paging?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  search?: boolean;
  selection?: boolean;
  sorting?: boolean;
  toolbar?: boolean;
  showEmptyDataSourceMessage?:boolean;
}

export interface Localization {
  actions?: string;
  nRowsSelected?: string;
  emptyDataSourceMessage?:string;
}

declare const MaterialTable: React.ComponentType<MaterialTableProps>;
export default MaterialTable;
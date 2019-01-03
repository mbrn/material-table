import * as React from 'react';
import { IconProps } from '@material-ui/core/Icon';

export interface MaterialTableProps {
  actions?: (Action | ((rowData:any) => Action)) [];
  columns: Column[];
  components?: Components;  
  data: object;
  detailPanel?: ((rowData: any) => React.ReactNode) | {
    icon?: string | React.ReactElement<any>,
    openIcon?: string | React.ReactElement<any>,
    tooltip?: string;
    render: (rowData: any) => string | React.ReactNode;
  }[];
  icons?: Icons,
  title: string;
  options?: Options;
  localization?: Localization;
  onSelectionChange?: (data: any[]) => void;
  onChangeRowsPerPage?: (pageSize: number) => void;
  onChangePage?: (page: number) => void;
  onOrderChange?: (orderBy: number, orderDirection: "asc" | "desc") => void;
}

export interface Action {
  icon: string | React.ReactElement<any>;
  isFreeAction?: boolean;
  tooltip?: string;
  onClick: (event: any, data: any) => void;
  iconProps?: IconProps
}

export interface Column {
  cellStyle?: any | ((data: any) => any);
  defaultFilter?: any;
  hidden?: boolean;
  field?: string;
  filtering?: boolean;
  lookup?: object;
  render?: (data:any) => any;
  sorting?: boolean;
  defaultSort?: 'asc' | 'desc';
  title: string;
  type?: 'boolean' | 'numeric' | 'date' | 'datetime' | 'time' | 'currency';
  searchable?: boolean;
  currencySetting?:{ locale?: string,currencyCode?: string,minimumFractionDigits?:number,maximumFractionDigits?:number};
  emptyValue?:  any | ((data: any) => any);
}

export interface Components {
  Actions?: React.ComponentType<any>;
  Body?: React.ComponentType<any>;
  Cell?: React.ComponentType<any>;
  Container?: React.ComponentType<any>;
  FilterRow?: React.ComponentType<any>;
  Header?: React.ComponentType<any>;
  Pagination?: React.ComponentType<any>;
  Row?: React.ComponentType<any>;
  Toolbar?: React.ComponentType<any>;
}

export interface Icons {
  Check: React.ReactElement<any>;
  DetailPanel: React.ReactElement<any>;
  Export: React.ReactElement<any>;
  Filter: React.ReactElement<any>;
  FirstPage: React.ReactElement<any>;
  LastPage: React.ReactElement<any>;
  NextPage: React.ReactElement<any>;
  PreviousPage: React.ReactElement<any>;
  Search: React.ReactElement<any>;
  ThirdStateCheck: React.ReactElement<any>;
  ViewColumn: React.ReactElement<any>;
}

export interface Options {
  actionsColumnIndex?:number;
  columnsButton?: boolean;
  emptyRowsWhenPaging?: boolean;
  exportButton?: boolean;
  exportDelimiter?: string;
  filtering?: boolean;
  header?: boolean;
  paging?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  rowStyle?: any | ((data: any) => any);
  showEmptyDataSourceMessage?:boolean;
  search?: boolean;
  selection?: boolean;
  sorting?: boolean;
  toolbar?: boolean;
}

export interface Localization {
  body?: {
    emptyDataSourceMessage?: string;
    filterRow?: {
      filterTooltip?: string;
    };
  };
  header?: {
    actions?: string;
  };
  pagination?: {
    firstTooltip?: string;
    previousTooltip?: string;
    nextTooltip?: string;
    lastTooltip?: string;
  };
  toolbar?: {
    nRowsSelected?: string;
    showColumnsTitle?: string;
    showColumnsAriaLabel?: string;
    exportTitle?: string;
    exportAriaLabel?: string;
    exportName?: string;
    searchTooltip?: string;
  };
}

declare const MaterialTable: React.ComponentType<MaterialTableProps>;
export default MaterialTable;


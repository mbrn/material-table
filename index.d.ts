import * as React from 'react';
import { IconProps } from '@material-ui/core/Icon';
import { string } from 'prop-types';

export interface MaterialTableProps {
  actions?: (Action | ((rowData:any) => Action)) [];
  columns: Column[];
  components?: Components;  
  data: object;
  detailPanel?: ((rowData: any) => React.ReactNode) | {
    icon?: string | React.ReactElement<any>;
    openIcon?: string | React.ReactElement<any>;
    tooltip?: string;
    render: (rowData: any) => string | React.ReactNode;
  }[];
  icons?: Icons;
  isLoading?: boolean;
  title: string;
  options?: Options;
  localization?: Localization;
  onChangeRowsPerPage?: (pageSize: number) => void;
  onChangePage?: (page: number) => void;  
  onOrderChange?: (orderBy: number, orderDirection: "asc" | "desc") => void;
  onRowClick?: (event?: React.MouseEvent, rowData?: any, toggleDetailPanel?: (panelIndex?: number) => void ) => void;
  onRowSelected?: (rowData: any) => void;
  onSelectionChange?: (data: any[]) => void;
}

export interface Action {
  icon: string | React.ReactElement<any>;
  isFreeAction?: boolean;
  tooltip?: string;
  onClick: (event: any, data: any) => void;
  iconProps?: IconProps
}

export interface Column {
  cellStyle?: React.CSSProperties | ((data: any) => React.CSSProperties);
  currencySetting?:{ locale?: string,currencyCode?: string,minimumFractionDigits?:number,maximumFractionDigits?:number};
  customFilterAndSearch?: (filter: any, rowData: any, columnDef: Column) => boolean;
  customSort?: (data1: any, data1: any, type: 'row' | 'group') => number;
  defaultFilter?: any;
  defaultGroupOrder?: number;
  defaultGroupSort?: 'asc' | 'desc';
  defaultSort?: 'asc' | 'desc';
  emptyValue?:  string | React.ReactElement<any> | ((data: any) => React.ReactElement<any> | string);
  field?: string;
  filtering?: boolean;
  grouping?: boolean;
  headerStyle?: React.CSSProperties;
  hidden?: boolean;
  lookup?: object;
  removable?: boolean;
  render?: (data:any) => any;
  searchable?: boolean;
  sorting?: boolean;
  title?: string;
  type?: 'string' | 'boolean' | 'numeric' | 'date' | 'datetime' | 'time' | 'currency';
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
  Check: () => React.ReactElement<any>;
  DetailPanel: () => React.ReactElement<any>;
  Export: () => React.ReactElement<any>;
  Filter: () => React.ReactElement<any>;
  FirstPage: () => React.ReactElement<any>;
  LastPage: () => React.ReactElement<any>;
  NextPage: () => React.ReactElement<any>;
  PreviousPage: () => React.ReactElement<any>;
  Search: () => React.ReactElement<any>;
  ThirdStateCheck: () => React.ReactElement<any>;
  ViewColumn: () => React.ReactElement<any>;
}

export interface Options {
  actionsColumnIndex?:number;
  columnsButton?: boolean;
  doubleHorizontalScroll?: boolean;
  emptyRowsWhenPaging?: boolean;
  exportButton?: boolean;
  exportDelimiter?: string;
  exportFileName?: string;
  filtering?: boolean;
  header?: boolean;
  headerStyle?: React.CSSProperties;
  loadingType?: 'overlay' | 'linear';
  paging?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  rowStyle?: React.CSSProperties | ((data: any) => React.CSSProperties);
  showEmptyDataSourceMessage?:boolean;
  search?: boolean;
  searchFieldStyle?: React.CSSProperties;
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
  grouping?: {
    groupedBy?: string;
    placeholder?: string;
  };
  pagination?: {
    firstTooltip?: string;
    previousTooltip?: string;
    nextTooltip?: string;
    lastTooltip?: string;    
    labelDisplayedRows?: string;
    labelRowsPerPage?: string;
  };
  toolbar?: {
    addRemoveColumns?: string;
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


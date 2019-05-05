import * as React from 'react';
import { IconProps } from '@material-ui/core/Icon';
import { string } from 'prop-types';

export interface MaterialTableProps {
  actions?: (Action | ((rowData: any) => Action))[];
  columns: Column[];
  components?: Components;
  data: any[] | ((query: Query) => Promise<QueryResult>);
  detailPanel?: ((rowData: any) => React.ReactNode) | (DetailPanel | ((rowData: any) => DetailPanel))[];
  editable?: {
    isEditable?: (rowData: any) => boolean;
    isDeletable?: (rowData: any) => boolean;
    onRowAdd?: (newData: any) => Promise<void>;
    onRowUpdate?: (newData: any, oldData?: any) => Promise<void>;
    onRowDelete?: (oldData: any) => Promise<void>;
  }
  icons?: Icons;
  isLoading?: boolean;
  title?: string | React.ReactElement<any>;
  options?: Options;
  parentChildData?: (row: any, rows: any[]) => any;
  localization?: Localization;
  onChangeRowsPerPage?: (pageSize: number) => void;
  onChangePage?: (page: number) => void;
  onOrderChange?: (orderBy: number, orderDirection: ("asc" | "desc")) => void;
  onRowClick?: (event?: React.MouseEvent, rowData?: any, toggleDetailPanel?: (panelIndex?: number) => void) => void;
  onRowSelected?: (rowData: any) => void;
  onSelectionChange?: (data: any[]) => void;
  onTreeExpandChange?: (data: any, isExpanded: boolean) => void;
  tableRef?: any;
}

export interface Filter {
  column: Column;
  operator: "=";
  value: any;
}

export interface Query {
  filters: Filter[];
  page: number;
  pageSize: number;
  search: string;
  orderBy: Column;
  orderDirection: "asc" | "desc";
}

export interface QueryResult {
  data: any[];
  page: number;
  totalCount: number;
}

export interface DetailPanel {
  disabled?: boolean;
  icon?: string | React.ReactElement<any>;
  openIcon?: string | React.ReactElement<any>;
  tooltip?: string;
  render: (rowData: any) => string | React.ReactNode;
}

export interface Action {
  disabled?: boolean;
  icon: string | (() => React.ReactElement<any>);
  isFreeAction?: boolean;
  tooltip?: string;
  onClick: (event: any, data: any) => void;
  iconProps?: IconProps;
}

export interface EditComponentProps {
  value: any,
  onChange: (newValue: any) => void,
  columnDef: EditCellColumnDef,
}

export interface EditCellColumnDef {
  field: string,
  title: string,
  tableData: {
    filterValue: any,
    groupOrder: any,
    groupSort: string,
    id: number,
  }
}

export interface Column {
  cellStyle?: React.CSSProperties | ((data: any, rowData: any) => React.CSSProperties);
  currencySetting?: { locale?: string, currencyCode?: string, minimumFractionDigits?: number, maximumFractionDigits?: number };
  customFilterAndSearch?: (filter: any, rowData: any, columnDef: Column) => boolean;
  customSort?: (data1: any, data2: any, type: (('row' | 'group'))) => number;
  defaultFilter?: any;
  defaultGroupOrder?: number;
  defaultGroupSort?: ('asc' | 'desc');
  defaultSort?: ('asc' | 'desc');
  disableClick?: boolean;
  editComponent?: ((props: EditComponentProps) => React.ReactElement<any>);
  emptyValue?: string | React.ReactElement<any> | ((data: any) => React.ReactElement<any> | string);
  export?: boolean;
  field?: string;
  filtering?: boolean;
  filterCellStyle?: React.CSSProperties;
  grouping?: boolean;
  headerStyle?: React.CSSProperties;
  hidden?: boolean;
  lookup?: object;
  editable?: ('always' | 'onUpdate' | 'onAdd' | 'never');
  removable?: boolean;
  render?: (data: any, type: ('row' | 'group')) => any;
  searchable?: boolean;
  sorting?: boolean;
  title?: string | React.ReactElement<any>;
  type?: ('string' | 'boolean' | 'numeric' | 'date' | 'datetime' | 'time' | 'currency');
}

export interface Components {
  Action?: React.ComponentType<any>;
  Actions?: React.ComponentType<any>;
  Body?: React.ComponentType<any>;
  Cell?: React.ComponentType<any>;
  Container?: React.ComponentType<any>;
  EditField?: React.ComponentType<any>;
  EditRow?: React.ComponentType<any>;
  FilterRow?: React.ComponentType<any>;
  Groupbar?: React.ComponentType<any>;
  GroupRow?: React.ComponentType<any>;
  Header?: React.ComponentType<any>;
  Pagination?: React.ComponentType<any>;
  OverlayLoading?: React.ComponentType<any>;
  Row?: React.ComponentType<any>;
  Toolbar?: React.ComponentType<any>;
}

export const MTableAction: () => React.ReactElement<any>;
export const MTableActions: () => React.ReactElement<any>;
export const MTableBody: () => React.ReactElement<any>;
export const MTableBodyRow: () => React.ReactElement<any>;
export const MTableCell: () => React.ReactElement<any>;
export const MTableEditField: () => React.ReactElement<any>;
export const MTableEditRow: () => React.ReactElement<any>;
export const MTableFilterRow: () => React.ReactElement<any>;
export const MTableGroupbar: () => React.ReactElement<any>;
export const MTableGroupRow: () => React.ReactElement<any>;
export const MTableHeader: () => React.ReactElement<any>;
export const MTablePagination: () => React.ReactElement<any>;
export const MTableToolbar: () => React.ReactElement<any>;


export interface Icons {
  Add?: () => React.ReactElement<any>;
  Check?: () => React.ReactElement<any>;
  Clear?: () => React.ReactElement<any>;
  Delete?: () => React.ReactElement<any>;
  DetailPanel?: () => React.ReactElement<any>;
  Edit?: () => React.ReactElement<any>;
  Export?: () => React.ReactElement<any>;
  Filter?: () => React.ReactElement<any>;
  FirstPage?: () => React.ReactElement<any>;
  SortArrow?: () => React.ReactElement<any>;
  LastPage?: () => React.ReactElement<any>;
  NextPage?: () => React.ReactElement<any>;
  PreviousPage?: () => React.ReactElement<any>;
  ResetSearch?: () => React.ReactElement<any>;
  Search?: () => React.ReactElement<any>;
  ThirdStateCheck?: () => React.ReactElement<any>;
  ViewColumn?: () => React.ReactElement<any>;
}

export interface Options {
  actionsCellStyle?: React.CSSProperties;
  actionsColumnIndex?: number;
  addRowPosition?: ('first' | 'last');
  columnsButton?: boolean;
  defaultExpanded?: boolean;
  debounceInterval?: number;
  detailPanelType?: ('single' | 'multiple');
  doubleHorizontalScroll?: boolean;
  emptyRowsWhenPaging?: boolean;
  exportAllData?: boolean;
  exportButton?: boolean;
  exportDelimiter?: string;
  exportFileName?: string;
  exportCsv?: (columns: any[], renderData: any[]) => void;
  filtering?: boolean;
  filterCellStyle?: React.CSSProperties;
  header?: boolean;
  headerStyle?: React.CSSProperties;
  initialPage?: number;
  loadingType?: ('overlay' | 'linear');
  maxBodyHeight?: number | string;
  paging?: boolean;
  grouping?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  paginationType?: ('normal' | 'stepped');
  rowStyle?: React.CSSProperties | ((data: any) => React.CSSProperties);
  showEmptyDataSourceMessage?: boolean;
  showSelectAllCheckbox?: boolean;
  showTitle?: boolean;
  search?: boolean;
  searchFieldAlignment?: 'left' | 'right';
  searchFieldStyle?: React.CSSProperties;
  selection?: boolean;
  sorting?: boolean;
  toolbar?: boolean;
  toolbarButtonAlignment?: 'left' | 'right';
}

export interface Localization {
  body?: {
    emptyDataSourceMessage?: string;
    filterRow?: {
      filterTooltip?: string;
    };
    editRow?: {
      saveTooltip?: string;
      cancelTooltip?: string;
      deleteText?: string;
    },
    addTooltip?: string;
    deleteTooltip?: string;
    editTooltip?: string;
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
    labelDisplayedRows?: string;
    labelRowsPerPage?: string;
    lastTooltip?: string;
    labelRowsSelect?: string;
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

import * as React from "react";
import { IconProps } from "@material-ui/core/Icon";
import SvgIcon from "@material-ui/core/SvgIcon";
import { string } from "prop-types";

type SvgIconComponent = typeof SvgIcon;

export interface MaterialTableProps<RowData extends object> {
  actions?: (Action<RowData> | ((rowData: RowData) => Action<RowData>))[];
  columns: Column<RowData>[];
  components?: Components;
  data: RowData[] | ((query: Query<RowData>) => Promise<QueryResult<RowData>>);
  detailPanel?:
    | ((rowData: RowData) => React.ReactNode)
    | (DetailPanel<RowData> | ((rowData: RowData) => DetailPanel<RowData>))[];
  editable?: {
    isEditable?: (rowData: RowData) => boolean;
    isDeletable?: (rowData: RowData) => boolean;
    onRowAdd?: (newData: RowData) => Promise<any>;
    onRowUpdate?: (newData: RowData, oldData?: RowData) => Promise<any>;
    onRowDelete?: (oldData: RowData) => Promise<any>;
    editTooltip?: (rowData: RowData) => string;
    deleteTooltip?: (rowData: RowData) => string;
    onRowAddCancelled?: (rowData: RowData) => void;
    onRowUpdateCancelled?: (rowData: RowData) => void;
    isEditHidden?: (rowData: RowData) => boolean;
    isDeleteHidden?: (rowData: RowData) => boolean;
  };
  icons?: Icons;
  initialFormData?: object;
  isLoading?: boolean;
  title?: string | React.ReactElement<any>;
  options?: Options<RowData>;
  parentChildData?: (row: RowData, rows: RowData[]) => RowData | undefined;
  localization?: Localization;
  onChangeRowsPerPage?: (pageSize: number) => void;
  onChangePage?: (page: number, pageSize: number) => void;
  onChangeColumnHidden?: (column: Column<RowData>, hidden: boolean) => void;
  onColumnDragged?: (sourceIndex: number, destinationIndex: number) => void;
  onOrderChange?: (orderBy: number, orderDirection: "asc" | "desc") => void;
  onGroupRemoved?: (column: Column<RowData>, index: boolean) => void;
  onRowClick?: (
    event?: React.MouseEvent,
    rowData?: RowData,
    toggleDetailPanel?: (panelIndex?: number) => void
  ) => void;
  onRowSelected?: (rowData: RowData) => void;
  onSearchChange?: (searchText: string) => void;
  /** An event fired when the table has finished filtering data
   * @param {Filter<RowData>[]} filters All the filters that are applied to the table
   */
  onFilterChange?: (filters: Filter<RowData>[]) => void;
  onSelectionChange?: (data: RowData[], rowData?: RowData) => void;
  onTreeExpandChange?: (data: any, isExpanded: boolean) => void;
  onQueryChange?: (query: Query<RowData>) => void;
  style?: React.CSSProperties;
  tableRef?: any;
  page?: number;
  totalCount?: number;
}

export interface Filter<RowData extends object> {
  column: Column<RowData>;
  operator: "=";
  value: any;
}
export interface ErrorState {
  message: string;
  errorCause: "query" | "add" | "update" | "delete";
}

export interface Query<RowData extends object> {
  filters: Filter<RowData>[];
  page: number;
  pageSize: number;
  totalCount: number;
  search: string;
  orderBy: Column<RowData>;
  orderDirection: "asc" | "desc";
  error?: ErrorState;
}

export interface QueryResult<RowData extends object> {
  data: RowData[];
  page: number;
  totalCount: number;
}

export interface DetailPanel<RowData extends object> {
  disabled?: boolean;
  icon?: string | React.ComponentType<any>;
  openIcon?: string | React.ComponentType<any>;
  tooltip?: string;
  render: (rowData: RowData) => string | React.ReactNode;
}

export interface Action<RowData extends object> {
  disabled?: boolean;
  icon: string | (() => React.ReactElement<any>) | SvgIconComponent;
  isFreeAction?: boolean;
  position?: "auto" | "toolbar" | "toolbarOnSelect" | "row";
  tooltip?: string;
  onClick: (event: any, data: RowData | RowData[]) => void;
  iconProps?: IconProps;
  hidden?: boolean;
}

export interface EditComponentProps<RowData extends object> {
  rowData: RowData;
  value: any;
  onChange: (newValue: any) => void;
  onRowDataChange: (newValue: RowData) => void;
  columnDef: EditCellColumnDef;
  error: boolean;
}

export interface EditCellColumnDef {
  field: string;
  title: string;
  tableData: {
    filterValue: any;
    groupOrder: any;
    groupSort: string;
    id: number;
  };
}

export interface Column<RowData extends object> {
  align?: "center" | "inherit" | "justify" | "left" | "right";
  cellStyle?:
    | React.CSSProperties
    | ((data: RowData[], rowData: RowData) => React.CSSProperties);
  currencySetting?: {
    locale?: string;
    currencyCode?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  };
  dateSetting?: { locale?: string };
  customFilterAndSearch?: (
    filter: any,
    rowData: RowData,
    columnDef: Column<RowData>
  ) => boolean;
  customSort?: (
    data1: RowData,
    data2: RowData,
    type: "row" | "group"
  ) => number;
  defaultFilter?: any;
  defaultGroupOrder?: number;
  defaultGroupSort?: "asc" | "desc";
  defaultSort?: "asc" | "desc";
  disableClick?: boolean;
  editComponent?: (
    props: EditComponentProps<RowData>
  ) => React.ReactElement<any>;
  emptyValue?:
    | string
    | React.ReactElement<any>
    | ((data: any) => React.ReactElement<any> | string);
  export?: boolean;
  field?: keyof RowData | string;
  filtering?: boolean;
  filterComponent?: (props: {
    columnDef: Column<RowData>;
    onFilterChanged: (rowId: string, value: any) => void;
  }) => React.ReactElement<any>;
  filterPlaceholder?: string;
  filterCellStyle?: React.CSSProperties;
  grouping?: boolean;
  groupTitle?: string | ((groupData: any) => any) | React.ReactNode;
  headerStyle?: React.CSSProperties;
  hidden?: boolean;
  hideFilterIcon?: boolean;
  initialEditValue?: any;
  lookup?: object;
  editPlaceholder?: string;
  editable?:
    | "always"
    | "onUpdate"
    | "onAdd"
    | "never"
    | ((columnDef: Column<RowData>, rowData: RowData) => boolean);
  removable?: boolean;
  validate?: (
    rowData: RowData
  ) => { isValid: boolean; helperText?: string } | string | boolean;
  render?: (data: RowData, type: "row" | "group") => any;
  searchable?: boolean;
  sorting?: boolean;
  title?: string | React.ReactElement<any>;
  tooltip?: string;
  type?:
    | "string"
    | "boolean"
    | "numeric"
    | "date"
    | "datetime"
    | "time"
    | "currency";
  width?: string | number;
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
  OverlayError?: React.ComponentType<any>;
  Row?: React.ComponentType<any>;
  Toolbar?: React.ComponentType<any>;
}

export const MTableAction: (props: any) => React.ReactElement<any>;
export const MTableActions: (props: any) => React.ReactElement<any>;
export const MTableBody: (props: any) => React.ReactElement<any>;
export const MTableBodyRow: (props: any) => React.ReactElement<any>;
export const MTableCell: (props: any) => React.ReactElement<any>;
export const MTableEditField: (props: any) => React.ReactElement<any>;
export const MTableEditRow: (props: any) => React.ReactElement<any>;
export const MTableFilterRow: (props: any) => React.ReactElement<any>;
export const MTableGroupbar: (props: any) => React.ReactElement<any>;
export const MTableGroupRow: (props: any) => React.ReactElement<any>;
export const MTableHeader: (props: any) => React.ReactElement<any>;
export const MTablePagination: (props: any) => React.ReactElement<any>;
export const MTableToolbar: (props: any) => React.ReactElement<any>;
export const MTable: (props: any) => React.ReactElement<any>;

export interface Icons {
  Add?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
  Check?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
  Clear?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
  Delete?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
  DetailPanel?: React.ForwardRefExoticComponent<
    React.RefAttributes<SVGSVGElement>
  >;
  Edit?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
  Export?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
  Filter?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
  FirstPage?: React.ForwardRefExoticComponent<
    React.RefAttributes<SVGSVGElement>
  >;
  SortArrow?: React.ForwardRefExoticComponent<
    React.RefAttributes<SVGSVGElement>
  >;
  LastPage?: React.ForwardRefExoticComponent<
    React.RefAttributes<SVGSVGElement>
  >;
  NextPage?: React.ForwardRefExoticComponent<
    React.RefAttributes<SVGSVGElement>
  >;
  PreviousPage?: React.ForwardRefExoticComponent<
    React.RefAttributes<SVGSVGElement>
  >;
  ResetSearch?: React.ForwardRefExoticComponent<
    React.RefAttributes<SVGSVGElement>
  >;
  Search?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
  ThirdStateCheck?: React.ForwardRefExoticComponent<
    React.RefAttributes<SVGSVGElement>
  >;
  ViewColumn?: React.ForwardRefExoticComponent<
    React.RefAttributes<SVGSVGElement>
  >;
  Retry?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
}

export interface Options<RowData extends object> {
  actionsCellStyle?: React.CSSProperties;
  detailPanelColumnStyle?: React.CSSProperties;
  editCellStyle?: React.CSSProperties;
  actionsColumnIndex?: number;
  addRowPosition?: "first" | "last";
  columnsButton?: boolean;
  defaultExpanded?: boolean | ((rowData: any) => boolean);
  debounceInterval?: number;
  detailPanelType?: "single" | "multiple";
  doubleHorizontalScroll?: boolean;
  draggable?: boolean;
  emptyRowsWhenPaging?: boolean;
  exportAllData?: boolean;
  exportButton?: boolean;
  exportDelimiter?: string;
  exportFileName?:
    | string
    | ((columns: Column<RowData>, data: string[][]) => string);
  exportCsv?: (columns: any[], renderData: any[]) => void;
  filtering?: boolean;
  filterCellStyle?: React.CSSProperties;
  filterRowStyle?: React.CSSProperties;
  fixedColumns?: { left?: number; right?: number };
  groupRowSeparator?: string;
  header?: boolean;
  headerSelectionProps?: object;
  headerStyle?: React.CSSProperties;
  hideFilterIcons?: boolean;
  initialPage?: number;
  loadingType?: "overlay" | "linear";
  maxBodyHeight?: number | string;
  minBodyHeight?: number | string;
  padding?: "default" | "dense";
  paging?: boolean;
  grouping?: boolean;
  groupTitle?: (groupData: any) => any;
  overflowY?: "visible" | "hidden" | "scroll" | "auto" | "initial" | "inherit";
  pageSize?: number;
  pageSizeOptions?: number[];
  paginationType?: "normal" | "stepped";
  rowStyle?:
    | React.CSSProperties
    | ((data: any, index: number, level: number) => React.CSSProperties);
  showEmptyDataSourceMessage?: boolean;
  showFirstLastPageButtons?: boolean;
  showSelectAllCheckbox?: boolean;
  showTitle?: boolean;
  showTextRowsSelected?: boolean;
  search?: boolean;
  searchText?: string;
  searchFieldAlignment?: "left" | "right";
  searchFieldStyle?: React.CSSProperties;
  searchFieldVariant?: "standard" | "filled" | "outlined";
  searchAutoFocus?: boolean;
  selection?: boolean;
  selectionProps?: any | ((data: any) => any);
  sorting?: boolean;
  tableLayout?: "auto" | "fixed";
  thirdSortClick?: boolean;
  persistTableData?: boolean;
  toolbar?: boolean;
  toolbarButtonAlignment?: "left" | "right";
  detailPanelColumnAlignment?: "left" | "right";
  cspNonce?: string;
}

export interface Localization {
  error?: React.ReactNode;
  body?: {
    dateTimePickerLocalization?: object; // The date-fns locale object applied to the datepickers
    emptyDataSourceMessage?: React.ReactNode;
    filterRow?: {
      filterTooltip?: React.ReactNode;
    };
    editRow?: {
      saveTooltip?: React.ReactNode;
      cancelTooltip?: React.ReactNode;
      deleteText?: React.ReactNode;
    };
    addTooltip?: React.ReactNode;
    deleteTooltip?: React.ReactNode;
    editTooltip?: React.ReactNode;
  };
  header?: {
    actions?: React.ReactNode;
  };
  grouping?: {
    groupedBy?: React.ReactNode;
    placeholder?: React.ReactNode;
  };
  pagination?: {
    firstTooltip?: React.ReactNode;
    firstAriaLabel?: string;
    previousTooltip?: React.ReactNode;
    previousAriaLabel?: string;
    nextTooltip?: React.ReactNode;
    nextAriaLabel?: string;
    labelDisplayedRows?: React.ReactNode;
    labelRowsPerPage?: React.ReactNode;
    lastTooltip?: React.ReactNode;
    lastAriaLabel?: string;
    labelRowsSelect?: React.ReactNode;
  };
  toolbar?: {
    addRemoveColumns?: React.ReactNode;
    nRowsSelected?: React.ReactNode | ((rowCount: number) => React.ReactNode);
    showColumnsTitle?: React.ReactNode;
    showColumnsAriaLabel?: string;
    exportTitle?: React.ReactNode;
    exportAriaLabel?: string;
    exportName?: React.ReactNode;
    searchTooltip?: React.ReactNode;
    searchPlaceholder?: React.ReactNode;
  };
}

export default class MaterialTable<
  RowData extends object
> extends React.Component<MaterialTableProps<RowData>> {}

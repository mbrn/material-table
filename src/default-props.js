import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Icons from "@material-ui/icons";
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import * as MComponents from './components';
import PropTypes from 'prop-types';
import { fade } from '@material-ui/core/styles/colorManipulator';

const OverlayLoading = props => (
  <div style={{ display: 'table', width: '100%', height: '100%', backgroundColor: fade(props.theme.palette.background.paper, 0.7) }}>
    <div style={{ display: 'table-cell', width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }}>
      <CircularProgress />
    </div>
  </div>
);
OverlayLoading.propTypes = {
  theme: PropTypes.any
};

const Container = (props) => <Paper elevation={2} {...props} />;

export const defaultProps = {
  actions: [],
  classes: {},
  columns: [],
  components: {
    Action: MComponents.MTableAction,
    Actions: MComponents.MTableActions,
    Body: MComponents.MTableBody,
    Cell: MComponents.MTableCell,
    Container: Container,
    EditField: MComponents.MTableEditField,
    EditRow: MComponents.MTableEditRow,
    FilterRow: MComponents.MTableFilterRow,
    Groupbar: MComponents.MTableGroupbar,
    GroupRow: MComponents.MTableGroupRow,
    Header: MComponents.MTableHeader,
    OverlayLoading: OverlayLoading,
    Pagination: TablePagination,
    Row: MComponents.MTableBodyRow,
    Toolbar: MComponents.MTableToolbar
  },
  data: [],
  icons: {
    /* eslint-disable react/display-name */
    Add: Icons.Add,
    Check: Icons.Check,
    Clear: Icons.Clear,
    Delete: Icons.DeleteOutline,
    DetailPanel: Icons.ChevronRight,
    Edit: Icons.Edit,
    Export: Icons.SaveAlt,
    Filter: Icons.FilterList,
    FirstPage: Icons.FirstPage,
    LastPage: Icons.LastPage,
    NextPage: Icons.ChevronRight,
    PreviousPage: Icons.ChevronLeft,
    ResetSearch: Icons.Clear,
    Search: Icons.Search,
    SortArrow: Icons.ArrowDownward,
    ThirdStateCheck: Icons.Remove,
    ViewColumn: Icons.ViewColumn
    /* eslint-enable react/display-name */
  },
  isLoading: false,
  title: 'Table Title',
  options: {
    actionsColumnIndex: 0,
    addRowPosition: 'last',
    columnsButton: false,
    detailPanelType: 'multiple',
    debounceInterval: 200,
    doubleHorizontalScroll: false,
    emptyRowsWhenPaging: true,
    exportAllData: false,
    exportButton: false,
    exportDelimiter: ',',
    filtering: false,
    groupTitle: false,
    header: true,
    hideFilterIcons: false,
    loadingType: 'overlay',
    padding: 'default',
    paging: true,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
    paginationType: 'normal',
    showEmptyDataSourceMessage: true,
    showFirstLastPageButtons: true,
    showSelectAllCheckbox: true,
    search: true,
    showTitle: true,
    showTextRowsSelected: true,
    tableLayout: 'auto',
    toolbarButtonAlignment: 'right',
    searchFieldAlignment: 'right',
    searchFieldStyle: {},
    selection: false,
    selectionProps: {},
    sorting: true,
    toolbar: true,
    defaultExpanded: false,
    detailPanelColumnAlignment: 'left',
    thirdSortClick: true,
    overflowY: 'auto',
  },
  localization: {
    grouping: {
      groupedBy: 'Grouped By:',
      placeholder: 'Drag headers here to group by',
    },
    pagination: {
      labelDisplayedRows: '{from}-{to} of {count}',
      labelRowsPerPage: 'Rows per page:',
      labelRowsSelect: 'rows'
    },
    toolbar: {},
    header: {},
    body: {
      filterRow: {},
      editRow: {
        saveTooltip: 'Save',
        cancelTooltip: 'Cancel',
        deleteText: 'Are you sure you want to delete this row?',
      },
      addTooltip: 'Add',
      deleteTooltip: 'Delete',
      editTooltip: 'Edit'
    }
  },
  style: {
  }
};

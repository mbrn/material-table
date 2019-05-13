import React from 'react';
import { CircularProgress, Icon, Paper, TablePagination } from '@material-ui/core';
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

export const defaultProps = {
  actions: [],
  classes: {},
  columns: [],
  components: {
    Action: MComponents.MTableAction,
    Actions: MComponents.MTableActions,
    Body: MComponents.MTableBody,
    Cell: MComponents.MTableCell,
    Container: Paper,
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
    Add: (props) => <Icon {...props}>add_box</Icon>,
    Check: (props) => <Icon {...props}>check</Icon>,
    Clear: (props) => <Icon {...props}>clear</Icon>,
    Delete: (props) => <Icon {...props}>delete_outline</Icon>,
    DetailPanel: (props) => <Icon {...props}>chevron_right</Icon>,
    Edit: (props) => <Icon {...props}>edit</Icon>,
    Export: (props) => <Icon {...props}>save_alt</Icon>,
    Filter: (props) => <Icon {...props}>filter_list</Icon>,
    FirstPage: (props) => <Icon {...props}>first_page</Icon>,
    LastPage: (props) => <Icon {...props}>last_page</Icon>,
    NextPage: (props) => <Icon {...props}>chevron_right</Icon>,
    PreviousPage: (props) => <Icon {...props}>chevron_left</Icon>,
    ResetSearch: (props) => <Icon {...props}>clear</Icon>,
    Search: (props) => <Icon {...props}>search</Icon>,
    SortArrow: (props) => <Icon {...props}>arrow_upward</Icon>,
    ThirdStateCheck: (props) => <Icon {...props}>remove</Icon>,
    ViewColumn: (props) => <Icon {...props}>view_column</Icon>
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
    header: true,
    loadingType: 'overlay',
    paging: true,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
    paginationType: 'normal',
    showEmptyDataSourceMessage: true,
    showSelectAllCheckbox: true,
    search: true,
    showTitle: true,
    toolbarButtonAlignment: 'right',
    searchFieldAlignment: 'right',
    searchFieldStyle: {},
    selection: false,
    sorting: true,
    toolbar: true,
    defaultExpanded: false
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
        deleteText: 'Are you sure delete this row?',
      },
      addTooltip: 'Add',
      deleteTooltip: 'Delete',
      editTooltip: 'Edit'
    }
  }
};
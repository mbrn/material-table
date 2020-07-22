import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import * as MComponents from "./components";
import PropTypes from "prop-types";
import { fade } from "@material-ui/core/styles/colorManipulator";

const OverlayLoading = (props) => (
  <div
    style={{
      display: "table",
      width: "100%",
      height: "100%",
      backgroundColor: fade(props.theme.palette.background.paper, 0.7),
    }}
  >
    <div
      style={{
        display: "table-cell",
        width: "100%",
        height: "100%",
        verticalAlign: "middle",
        textAlign: "center",
      }}
    >
      <CircularProgress />
    </div>
  </div>
);
OverlayLoading.propTypes = {
  theme: PropTypes.any,
};

const OverlayError = (props) => (
  <div
    style={{
      display: "table",
      width: "100%",
      height: "100%",
      backgroundColor: fade(props.theme.palette.background.paper, 0.7),
    }}
  >
    <div
      style={{
        display: "table-cell",
        width: "100%",
        height: "100%",
        verticalAlign: "middle",
        textAlign: "center",
      }}
    >
      <span>{props.error.message}</span>{" "}
      <props.icon
        onClick={props.retry}
        style={{ cursor: "pointer", position: "relative", top: 5 }}
      />
    </div>
  </div>
);
OverlayError.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  retry: PropTypes.func,
  theme: PropTypes.any,
  icon: PropTypes.any,
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
    OverlayError: OverlayError,
    Pagination: TablePagination,
    Row: MComponents.MTableBodyRow,
    Toolbar: MComponents.MTableToolbar,
  },
  data: [],
  icons: {
    /* eslint-disable react/display-name */
    Add: React.forwardRef((props, ref) => (
      <Icon {...props} ref={ref}>
        add_box
      </Icon>
    )),
    Check: React.forwardRef((props, ref) => (
      <Icon {...props} ref={ref}>
        check
      </Icon>
    )),
    Clear: React.forwardRef((props, ref) => (
      <Icon {...props} ref={ref}>
        clear
      </Icon>
    )),
    Delete: React.forwardRef((props, ref) => (
      <Icon {...props} ref={ref}>
        delete_outline
      </Icon>
    )),
    DetailPanel: React.forwardRef((props, ref) => (
      <Icon {...props} ref={ref}>
        chevron_right
      </Icon>
    )),
    Edit: React.forwardRef((props, ref) => (
      <Icon {...props} ref={ref}>
        edit
      </Icon>
    )),
    Export: React.forwardRef((props, ref) => (
      <Icon {...props} ref={ref}>
        save_alt
      </Icon>
    )),
    Filter: React.forwardRef((props, ref) => (
      <Icon {...props} ref={ref}>
        filter_list
      </Icon>
    )),
    FirstPage: React.forwardRef((props, ref) => (
      <Icon {...props} ref={ref}>
        first_page
      </Icon>
    )),
    LastPage: React.forwardRef((props, ref) => (
      <Icon {...props} ref={ref}>
        last_page
      </Icon>
    )),
    NextPage: React.forwardRef((props, ref) => (
      <Icon {...props} ref={ref}>
        chevron_right
      </Icon>
    )),
    PreviousPage: React.forwardRef((props, ref) => (
      <Icon {...props} ref={ref}>
        chevron_left
      </Icon>
    )),
    ResetSearch: React.forwardRef((props, ref) => (
      <Icon {...props} ref={ref}>
        clear
      </Icon>
    )),
    Search: React.forwardRef((props, ref) => (
      <Icon {...props} ref={ref}>
        search
      </Icon>
    )),
    SortArrow: React.forwardRef((props, ref) => (
      <Icon {...props} ref={ref}>
        arrow_downward
      </Icon>
    )),
    ThirdStateCheck: React.forwardRef((props, ref) => (
      <Icon {...props} ref={ref}>
        remove
      </Icon>
    )),
    ViewColumn: React.forwardRef((props, ref) => (
      <Icon {...props} ref={ref}>
        view_column
      </Icon>
    )),
    Retry: React.forwardRef((props, ref) => (
      <Icon {...props} ref={ref}>
        replay
      </Icon>
    )),
    /* eslint-enable react/display-name */
  },
  isLoading: false,
  title: "Table Title",
  options: {
    actionsColumnIndex: 0,
    addRowPosition: "last",
    columnsButton: false,
    detailPanelType: "multiple",
    debounceInterval: 200,
    doubleHorizontalScroll: false,
    emptyRowsWhenPaging: true,
    exportAllData: false,
    exportButton: false,
    exportDelimiter: ",",
    filtering: false,
    groupTitle: false,
    header: true,
    headerSelectionProps: {},
    hideFilterIcons: false,
    loadingType: "overlay",
    padding: "default",
    searchAutoFocus: false,
    paging: true,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
    paginationType: "normal",
    showEmptyDataSourceMessage: true,
    showFirstLastPageButtons: true,
    showSelectAllCheckbox: true,
    search: true,
    showTitle: true,
    showTextRowsSelected: true,
    tableLayout: "auto",
    toolbarButtonAlignment: "right",
    searchFieldAlignment: "right",
    searchFieldStyle: {},
    searchFieldVariant: "standard",
    selection: false,
    selectionProps: {},
    sorting: true,
    toolbar: true,
    defaultExpanded: false,
    detailPanelColumnAlignment: "left",
    thirdSortClick: true,
    persistTableData: false,
    overflowY: "auto",
  },
  localization: {
    error: "Data could not be retrieved",
    grouping: {
      groupedBy: "Grouped By:",
      placeholder: "Drag headers here to group by",
    },
    pagination: {
      labelDisplayedRows: "{from}-{to} of {count}",
      labelRowsPerPage: "Rows per page:",
      labelRowsSelect: "rows",
    },
    toolbar: {},
    header: {},
    body: {
      filterRow: {},
      editRow: {
        saveTooltip: "Save",
        cancelTooltip: "Cancel",
        deleteText: "Are you sure you want to delete this row?",
      },
      addTooltip: "Add",
      deleteTooltip: "Delete",
      editTooltip: "Edit",
    },
  },
  style: {},
};

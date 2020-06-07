"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultProps = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _CircularProgress = _interopRequireDefault(require("@material-ui/core/CircularProgress"));

var _Icon = _interopRequireDefault(require("@material-ui/core/Icon"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _TablePagination = _interopRequireDefault(require("@material-ui/core/TablePagination"));

var MComponents = _interopRequireWildcard(require("./components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

var OverlayLoading = function OverlayLoading(props) {
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'table',
      width: '100%',
      height: '100%',
      backgroundColor: (0, _colorManipulator.fade)(props.theme.palette.background.paper, 0.7)
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'table-cell',
      width: '100%',
      height: '100%',
      verticalAlign: 'middle',
      textAlign: 'center'
    }
  }, /*#__PURE__*/_react["default"].createElement(_CircularProgress["default"], null)));
};

OverlayLoading.propTypes = {
  theme: _propTypes["default"].any
};

var Container = function Container(props) {
  return /*#__PURE__*/_react["default"].createElement(_Paper["default"], (0, _extends2["default"])({
    elevation: 2
  }, props));
};

var defaultProps = {
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
    Pagination: _TablePagination["default"],
    Row: MComponents.MTableBodyRow,
    Toolbar: MComponents.MTableToolbar
  },
  data: [],
  icons: {
    /* eslint-disable react/display-name */
    Add: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_Icon["default"], (0, _extends2["default"])({}, props, {
        ref: ref
      }), "add_box");
    }),
    Check: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_Icon["default"], (0, _extends2["default"])({}, props, {
        ref: ref
      }), "check");
    }),
    Clear: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_Icon["default"], (0, _extends2["default"])({}, props, {
        ref: ref
      }), "clear");
    }),
    Delete: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_Icon["default"], (0, _extends2["default"])({}, props, {
        ref: ref
      }), "delete_outline");
    }),
    DetailPanel: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_Icon["default"], (0, _extends2["default"])({}, props, {
        ref: ref
      }), "chevron_right");
    }),
    Edit: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_Icon["default"], (0, _extends2["default"])({}, props, {
        ref: ref
      }), "edit");
    }),
    Export: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_Icon["default"], (0, _extends2["default"])({}, props, {
        ref: ref
      }), "save_alt");
    }),
    Filter: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_Icon["default"], (0, _extends2["default"])({}, props, {
        ref: ref
      }), "filter_list");
    }),
    FirstPage: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_Icon["default"], (0, _extends2["default"])({}, props, {
        ref: ref
      }), "first_page");
    }),
    LastPage: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_Icon["default"], (0, _extends2["default"])({}, props, {
        ref: ref
      }), "last_page");
    }),
    NextPage: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_Icon["default"], (0, _extends2["default"])({}, props, {
        ref: ref
      }), "chevron_right");
    }),
    PreviousPage: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_Icon["default"], (0, _extends2["default"])({}, props, {
        ref: ref
      }), "chevron_left");
    }),
    ResetSearch: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_Icon["default"], (0, _extends2["default"])({}, props, {
        ref: ref
      }), "clear");
    }),
    Search: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_Icon["default"], (0, _extends2["default"])({}, props, {
        ref: ref
      }), "search");
    }),
    SortArrow: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_Icon["default"], (0, _extends2["default"])({}, props, {
        ref: ref
      }), "arrow_downward");
    }),
    ThirdStateCheck: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_Icon["default"], (0, _extends2["default"])({}, props, {
        ref: ref
      }), "remove");
    }),
    ViewColumn: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_Icon["default"], (0, _extends2["default"])({}, props, {
        ref: ref
      }), "view_column");
    })
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
    searchAutoFocus: false,
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
    searchFieldVariant: 'standard',
    selection: false,
    selectionProps: {},
    sorting: true,
    toolbar: true,
    defaultExpanded: false,
    detailPanelColumnAlignment: 'left',
    thirdSortClick: true,
    overflowY: 'auto'
  },
  localization: {
    grouping: {
      groupedBy: 'Grouped By:',
      placeholder: 'Drag headers here to group by'
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
        deleteText: 'Are you sure you want to delete this row?'
      },
      addTooltip: 'Add',
      deleteTooltip: 'Delete',
      editTooltip: 'Edit'
    }
  },
  style: {}
};
exports.defaultProps = defaultProps;
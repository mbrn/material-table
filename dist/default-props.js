"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultProps = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _CircularProgress = _interopRequireDefault(require("@material-ui/core/CircularProgress"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _TablePagination = _interopRequireDefault(require("@material-ui/core/TablePagination"));

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

var _icons = require("@material-ui/icons");

var MComponents = _interopRequireWildcard(require("./components"));

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
      return /*#__PURE__*/_react["default"].createElement(_icons.AddBox, (0, _extends2["default"])({}, props, {
        ref: ref
      }));
    }),
    Check: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_icons.Check, (0, _extends2["default"])({}, props, {
        ref: ref
      }));
    }),
    Clear: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_icons.Clear, (0, _extends2["default"])({}, props, {
        ref: ref
      }));
    }),
    Delete: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_icons.DeleteOutline, (0, _extends2["default"])({}, props, {
        ref: ref
      }));
    }),
    DetailPanel: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_icons.ChevronRight, (0, _extends2["default"])({}, props, {
        ref: ref
      }));
    }),
    Edit: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_icons.Edit, (0, _extends2["default"])({}, props, {
        ref: ref
      }));
    }),
    Export: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_icons.SaveAlt, (0, _extends2["default"])({}, props, {
        ref: ref
      }));
    }),
    Filter: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_icons.FilterList, (0, _extends2["default"])({}, props, {
        ref: ref
      }));
    }),
    FirstPage: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_icons.FirstPage, (0, _extends2["default"])({}, props, {
        ref: ref
      }));
    }),
    LastPage: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_icons.LastPage, (0, _extends2["default"])({}, props, {
        ref: ref
      }));
    }),
    NextPage: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_icons.ChevronRight, (0, _extends2["default"])({}, props, {
        ref: ref
      }));
    }),
    PreviousPage: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_icons.ChevronLeft, (0, _extends2["default"])({}, props, {
        ref: ref
      }));
    }),
    ResetSearch: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_icons.Clear, (0, _extends2["default"])({}, props, {
        ref: ref
      }));
    }),
    Search: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_icons.Search, (0, _extends2["default"])({}, props, {
        ref: ref
      }));
    }),
    SortArrow: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_icons.ArrowDownward, (0, _extends2["default"])({}, props, {
        ref: ref
      }));
    }),
    ThirdStateCheck: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_icons.Remove, (0, _extends2["default"])({}, props, {
        ref: ref
      }));
    }),
    ViewColumn: _react["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/_react["default"].createElement(_icons.ViewColumn, (0, _extends2["default"])({}, props, {
        ref: ref
      }));
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
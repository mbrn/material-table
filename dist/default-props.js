"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.defaultProps = void 0;

var _objectSpread2 = _interopRequireDefault(
  require("@babel/runtime/helpers/objectSpread")
);

var _extends2 = _interopRequireDefault(
  require("@babel/runtime/helpers/extends")
);

var _react = _interopRequireDefault(require("react"));

var _CircularProgress = _interopRequireDefault(
  require("@material-ui/core/CircularProgress")
);

var _Icon = _interopRequireDefault(require("@material-ui/core/Icon"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _TablePagination = _interopRequireDefault(
  require("@material-ui/core/TablePagination")
);

var MComponents = _interopRequireWildcard(require("./components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(
    nodeInterop
  ) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (
    obj === null ||
    (_typeof(obj) !== "object" && typeof obj !== "function")
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

var OverlayLoading = function OverlayLoading(props) {
  return /*#__PURE__*/ _react.default.createElement(
    "div",
    {
      style: {
        display: "table",
        width: "100%",
        height: "100%",
        backgroundColor: (0, _colorManipulator.fade)(
          props.theme.palette.background.paper,
          0.7
        ),
      },
    },
    /*#__PURE__*/ _react.default.createElement(
      "div",
      {
        style: {
          display: "table-cell",
          width: "100%",
          height: "100%",
          verticalAlign: "middle",
          textAlign: "center",
        },
      },
      /*#__PURE__*/ _react.default.createElement(
        _CircularProgress.default,
        null
      )
    )
  );
};

OverlayLoading.propTypes = {
  theme: _propTypes.default.any,
};

var OverlayError = function OverlayError(props) {
  return /*#__PURE__*/ _react.default.createElement(
    "div",
    {
      style: {
        display: "table",
        width: "100%",
        height: "100%",
        backgroundColor: (0, _colorManipulator.fade)(
          props.theme.palette.background.paper,
          0.7
        ),
      },
    },
    /*#__PURE__*/ _react.default.createElement(
      "div",
      {
        style: {
          display: "table-cell",
          width: "100%",
          height: "100%",
          verticalAlign: "middle",
          textAlign: "center",
        },
      },
      /*#__PURE__*/ _react.default.createElement(
        "span",
        null,
        props.error.message
      ),
      " ",
      /*#__PURE__*/ _react.default.createElement(props.icon, {
        onClick: props.retry,
        style: {
          cursor: "pointer",
          position: "relative",
          top: 5,
        },
      })
    )
  );
};

OverlayError.propTypes = {
  error: _propTypes.default.oneOfType([
    _propTypes.default.object,
    _propTypes.default.string,
  ]),
  retry: _propTypes.default.func,
  theme: _propTypes.default.any,
  icon: _propTypes.default.any,
};

var Container = function Container(props) {
  return /*#__PURE__*/ _react.default.createElement(
    _Paper.default,
    (0, _extends2.default)(
      {
        elevation: 2,
      },
      props
    )
  );
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
    EditCell: MComponents.MTableEditCell,
    EditField: MComponents.MTableEditField,
    EditRow: MComponents.MTableEditRow,
    FilterRow: MComponents.MTableFilterRow,
    Groupbar: MComponents.MTableGroupbar,
    GroupRow: MComponents.MTableGroupRow,
    Header: MComponents.MTableHeader,
    OverlayLoading: OverlayLoading,
    OverlayError: OverlayError,
    Pagination: _TablePagination.default,
    Row: MComponents.MTableBodyRow,
    Toolbar: MComponents.MTableToolbar,
  },
  data: [],
  icons: {
    /* eslint-disable react/display-name */
    Add: _react.default.forwardRef(function (props, ref) {
      return /*#__PURE__*/ _react.default.createElement(
        _Icon.default,
        (0, _extends2.default)({}, props, {
          ref: ref,
        }),
        "add_box"
      );
    }),
    Check: _react.default.forwardRef(function (props, ref) {
      return /*#__PURE__*/ _react.default.createElement(
        _Icon.default,
        (0, _extends2.default)({}, props, {
          ref: ref,
        }),
        "check"
      );
    }),
    Clear: _react.default.forwardRef(function (props, ref) {
      return /*#__PURE__*/ _react.default.createElement(
        _Icon.default,
        (0, _extends2.default)({}, props, {
          ref: ref,
        }),
        "clear"
      );
    }),
    Delete: _react.default.forwardRef(function (props, ref) {
      return /*#__PURE__*/ _react.default.createElement(
        _Icon.default,
        (0, _extends2.default)({}, props, {
          ref: ref,
        }),
        "delete_outline"
      );
    }),
    DetailPanel: _react.default.forwardRef(function (props, ref) {
      return /*#__PURE__*/ _react.default.createElement(
        _Icon.default,
        (0, _extends2.default)({}, props, {
          ref: ref,
        }),
        "chevron_right"
      );
    }),
    Edit: _react.default.forwardRef(function (props, ref) {
      return /*#__PURE__*/ _react.default.createElement(
        _Icon.default,
        (0, _extends2.default)({}, props, {
          ref: ref,
        }),
        "edit"
      );
    }),
    Export: _react.default.forwardRef(function (props, ref) {
      return /*#__PURE__*/ _react.default.createElement(
        _Icon.default,
        (0, _extends2.default)({}, props, {
          ref: ref,
        }),
        "save_alt"
      );
    }),
    Filter: _react.default.forwardRef(function (props, ref) {
      return /*#__PURE__*/ _react.default.createElement(
        _Icon.default,
        (0, _extends2.default)({}, props, {
          ref: ref,
        }),
        "filter_list"
      );
    }),
    FirstPage: _react.default.forwardRef(function (props, ref) {
      return /*#__PURE__*/ _react.default.createElement(
        _Icon.default,
        (0, _extends2.default)({}, props, {
          ref: ref,
        }),
        "first_page"
      );
    }),
    LastPage: _react.default.forwardRef(function (props, ref) {
      return /*#__PURE__*/ _react.default.createElement(
        _Icon.default,
        (0, _extends2.default)({}, props, {
          ref: ref,
        }),
        "last_page"
      );
    }),
    NextPage: _react.default.forwardRef(function (props, ref) {
      return /*#__PURE__*/ _react.default.createElement(
        _Icon.default,
        (0, _extends2.default)({}, props, {
          ref: ref,
        }),
        "chevron_right"
      );
    }),
    PreviousPage: _react.default.forwardRef(function (props, ref) {
      return /*#__PURE__*/ _react.default.createElement(
        _Icon.default,
        (0, _extends2.default)({}, props, {
          ref: ref,
        }),
        "chevron_left"
      );
    }),
    ResetSearch: _react.default.forwardRef(function (props, ref) {
      return /*#__PURE__*/ _react.default.createElement(
        _Icon.default,
        (0, _extends2.default)({}, props, {
          ref: ref,
        }),
        "clear"
      );
    }),
    Resize: _react.default.forwardRef(function (props, ref) {
      return /*#__PURE__*/ _react.default.createElement(
        _Icon.default,
        (0, _extends2.default)({}, props, {
          ref: ref,
          style: (0, _objectSpread2.default)({}, props.style, {
            transform: "rotate(90deg)",
          }),
        }),
        "drag_handle"
      );
    }),
    Search: _react.default.forwardRef(function (props, ref) {
      return /*#__PURE__*/ _react.default.createElement(
        _Icon.default,
        (0, _extends2.default)({}, props, {
          ref: ref,
        }),
        "search"
      );
    }),
    SortArrow: _react.default.forwardRef(function (props, ref) {
      return /*#__PURE__*/ _react.default.createElement(
        _Icon.default,
        (0, _extends2.default)({}, props, {
          ref: ref,
        }),
        "arrow_downward"
      );
    }),
    ThirdStateCheck: _react.default.forwardRef(function (props, ref) {
      return /*#__PURE__*/ _react.default.createElement(
        _Icon.default,
        (0, _extends2.default)({}, props, {
          ref: ref,
        }),
        "remove"
      );
    }),
    ViewColumn: _react.default.forwardRef(function (props, ref) {
      return /*#__PURE__*/ _react.default.createElement(
        _Icon.default,
        (0, _extends2.default)({}, props, {
          ref: ref,
        }),
        "view_column"
      );
    }),
    Retry: _react.default.forwardRef(function (props, ref) {
      return /*#__PURE__*/ _react.default.createElement(
        _Icon.default,
        (0, _extends2.default)({}, props, {
          ref: ref,
        }),
        "replay"
      );
    }),
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
    paginationPosition: "bottom",
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
      bulkEditTooltip: "Edit All",
      bulkEditApprove: "Save all changes",
      bulkEditCancel: "Discard all changes",
    },
  },
  style: {},
};
exports.defaultProps = defaultProps;

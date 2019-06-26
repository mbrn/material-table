import PropTypes from "prop-types";

const RefComponent = PropTypes.shape({ current: PropTypes.element });
const StyledComponent = PropTypes.shape({
  classes: PropTypes.object,
  innerRef: RefComponent
});

export const propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({
        icon: PropTypes.oneOfType([
          PropTypes.element,
          PropTypes.func,
          PropTypes.string
        ]).isRequired,
        isFreeAction: PropTypes.bool,
        tooltip: PropTypes.string,
        onClick: PropTypes.func.isRequired,
        iconProps: PropTypes.object,
        iconButtonProps: PropTypes.object,
        fab: PropTypes.bool,
        title: PropTypes.string,
        disabled: PropTypes.bool,
        hidden: PropTypes.bool
      })
    ])
  ),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
      currencySetting: PropTypes.shape({
        locale: PropTypes.string,
        currencyCode: PropTypes.string,
        minimumFractionDigits: PropTypes.number,
        maximumFractionDigits: PropTypes.number
      }),
      customFilterAndSearch: PropTypes.func,
      customSort: PropTypes.func,
      defaultFilter: PropTypes.any,
      defaultSort: PropTypes.oneOf(["asc", "desc"]),
      editComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
      emptyValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
        PropTypes.func
      ]),
      export: PropTypes.bool,
      field: PropTypes.string,
      filtering: PropTypes.bool,
      filterCellStyle: PropTypes.object,
      filterPlaceholder: PropTypes.string,
      grouping: PropTypes.bool,
      headerStyle: PropTypes.object,
      hidden: PropTypes.bool,
      lookup: PropTypes.object,
      editable: PropTypes.oneOf([
        "always",
        "onUpdate",
        "onAdd",
        "never",
        PropTypes.func
      ]),
      removable: PropTypes.bool,
      render: PropTypes.func,
      searchable: PropTypes.bool,
      sorting: PropTypes.bool,
      title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
      type: PropTypes.oneOf([
        "string",
        "boolean",
        "numeric",
        "date",
        "datetime",
        "time",
        "currency"
      ])
    })
  ).isRequired,
  components: PropTypes.shape({
    Action: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      StyledComponent
    ]),
    Actions: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      StyledComponent
    ]),
    Body: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      StyledComponent
    ]),
    Cell: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      StyledComponent
    ]),
    Container: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      StyledComponent
    ]),
    EditField: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      StyledComponent
    ]),
    EditRow: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      StyledComponent
    ]),
    FilterRow: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      StyledComponent
    ]),
    Groupbar: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      StyledComponent
    ]),
    GroupRow: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      StyledComponent
    ]),
    Header: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      StyledComponent
    ]),
    OverlayLoading: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      StyledComponent
    ]),
    Pagination: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      StyledComponent
    ]),
    Row: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      StyledComponent
    ]),
    Toolbar: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      StyledComponent
    ])
  }),
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.func
  ]).isRequired,
  editable: PropTypes.shape({
    onRowAdd: PropTypes.func,
    onRowUpdate: PropTypes.func,
    onRowDelete: PropTypes.func
  }),
  detailPanel: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
          disabled: PropTypes.bool,
          icon: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.func,
            PropTypes.string
          ]),
          openIcon: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.func,
            PropTypes.string
          ]),
          tooltip: PropTypes.string,
          render: PropTypes.func.isRequired
        })
      ])
    )
  ]),
  icons: PropTypes.shape({
    Add: PropTypes.oneOfType([PropTypes.element, PropTypes.func, RefComponent]),
    Check: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      RefComponent
    ]),
    Clear: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      RefComponent
    ]),
    Delete: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      RefComponent
    ]),
    DetailPanel: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      RefComponent
    ]),
    Edit: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      RefComponent
    ]),
    Export: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      RefComponent
    ]),
    Filter: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      RefComponent
    ]),
    FirstPage: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      RefComponent
    ]),
    LastPage: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      RefComponent
    ]),
    NextPage: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      RefComponent
    ]),
    PreviousPage: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      RefComponent
    ]),
    ResetSearch: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      RefComponent
    ]),
    Search: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      RefComponent
    ]),
    SortArrow: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      RefComponent
    ]),
    ThirdStateCheck: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      RefComponent
    ]),
    ViewColumn: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      RefComponent
    ])
  }),
  isLoading: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  options: PropTypes.shape({
    actionsCellStyle: PropTypes.object,
    actionsColumnIndex: PropTypes.number,
    addRowPosition: PropTypes.oneOf(["first", "last"]),
    columnsButton: PropTypes.bool,
    defaultExpanded: PropTypes.bool,
    debounceInterval: PropTypes.number,
    detailPanelType: PropTypes.oneOf(["single", "multiple"]),
    doubleHorizontalScroll: PropTypes.bool,
    emptyRowsWhenPaging: PropTypes.bool,
    exportAllData: PropTypes.bool,
    exportButton: PropTypes.bool,
    exportDelimiter: PropTypes.string,
    exportFileName: PropTypes.string,
    exportCsv: PropTypes.func,
    filtering: PropTypes.bool,
    filterCellStyle: PropTypes.object,
    header: PropTypes.bool,
    headerStyle: PropTypes.object,
    initialPage: PropTypes.number,
    maxBodyHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    loadingType: PropTypes.oneOf(["overlay", "linear"]),
    padding: PropTypes.oneOf(["default", "dense"]),
    paging: PropTypes.bool,
    pageSize: PropTypes.number,
    pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
    paginationType: PropTypes.oneOf(["normal", "stepped"]),
    rowStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    search: PropTypes.bool,
    toolbarButtonAlignment: PropTypes.oneOf(["left", "right"]),
    searchFieldAlignment: PropTypes.oneOf(["left", "right"]),
    searchFieldStyle: PropTypes.object,
    searchFieldProps: PropTypes.object,
    selection: PropTypes.bool,
    selectionProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    showEmptyDataSourceMessage: PropTypes.bool,
    showFirstLastPageButtons: PropTypes.bool,
    showSelectAllCheckbox: PropTypes.bool,
    showTitle: PropTypes.bool,
    showTextRowsSelected: PropTypes.bool,
    sorting: PropTypes.bool,
    toolbar: PropTypes.bool
  }),
  localization: PropTypes.shape({
    grouping: PropTypes.shape({
      groupedBy: PropTypes.string,
      placeholder: PropTypes.string
    }),
    pagination: PropTypes.object,
    toolbar: PropTypes.object,
    header: PropTypes.object,
    body: PropTypes.object
  }),
  initialFormData: PropTypes.object,
  onSelectionChange: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  onChangePage: PropTypes.func,
  onOrderChange: PropTypes.func,
  onRowClick: PropTypes.func,
  onTreeExpandChange: PropTypes.func,
  tableRef: PropTypes.any,
  style: PropTypes.object
};

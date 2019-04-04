/* eslint-disable no-unused-vars */
import { Icon, Paper, Table, TableFooter, TablePagination, TableRow, CircularProgress, LinearProgress, withStyles } from '@material-ui/core';
import DoubleScrollbar from "react-double-scrollbar";
import PropTypes from 'prop-types';
import * as React from 'react';
import MTableAction from './m-table-action';
import MTableActions from './m-table-actions';
import MTableBody from './m-table-body';
import MTableBodyRow from './m-table-body-row';
import MTableGroupbar from './m-table-groupbar';
import MTableGroupRow from './m-table-group-row';
import MTableCell from './m-table-cell';
import MTableEditRow from './m-table-edit-row';
import MTableFilterRow from './m-table-filter-row';
import MTableHeader from './m-table-header';
import MTablePagination from './m-table-pagination';
import MTableSteppedPagination from './m-table-stepped-pagination';
import MTableToolbar from './m-table-toolbar';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import DataManager from './utils/data-manager';
import { debounce } from 'debounce';

/* eslint-enable no-unused-vars */

class MaterialTable extends React.Component {
  dataManager = new DataManager();

  constructor(props) {
    super(props);

    const calculatedProps = this.getProps(props);
    this.setDataManagerFields(calculatedProps, true);

    this.state = {
      data: [],
      ...this.dataManager.getRenderState(),
      query: {
        filters: [],
        orderBy: null,
        orderDirection: 'asc',
        page: 0,
        pageSize: calculatedProps.options.pageSize,
        search: '',

        totalCount: 0
      },
      showAddRow: false
    };
  }

  componentDidMount() {
    this.setState(this.dataManager.getRenderState(), () => {
      if (this.isRemoteData()) {
        this.onQueryChange(this.state.query);
      }
    });
  }

  setDataManagerFields(props, isInit) {
    let defaultSortColumnIndex = -1;
    let defaultSortDirection = '';
    if (props) {
      defaultSortColumnIndex = props.columns.findIndex(a => a.defaultSort);
      defaultSortDirection = defaultSortColumnIndex > -1 ? props.columns[defaultSortColumnIndex].defaultSort : '';
    }

    this.dataManager.setColumns(props.columns);

    if (this.isRemoteData()) {
      this.dataManager.changeApplySearch(false);
      this.dataManager.changeApplyFilters(false);
    }
    else {
      this.dataManager.changeApplySearch(true);
      this.dataManager.changeApplyFilters(true);
      this.dataManager.setData(props.data);
    }

    isInit && this.dataManager.changeCurrentPage(props.options.initialPage ? props.options.initialPage : 0);
    isInit && this.dataManager.changePageSize(props.options.pageSize);
    isInit && this.dataManager.changeOrder(defaultSortColumnIndex, defaultSortDirection);
    isInit && this.dataManager.changePaging(props.options.paging);
    isInit && this.dataManager.changeParentFunc(props.parentChildData);
    this.dataManager.changeDetailPanelType(props.options.detailPanelType);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const props = this.getProps(nextProps);
    this.setDataManagerFields(props);
    this.setState(this.dataManager.getRenderState());
  }

  getProps(props) {
    const calculatedProps = { ...(props || this.props) };

    const localization = calculatedProps.localization.body;

    calculatedProps.actions = [...(calculatedProps.actions || [])];
    if (calculatedProps.editable) {
      if (calculatedProps.editable.onRowAdd) {
        calculatedProps.actions.push({
          icon: calculatedProps.icons.Add,
          tooltip: localization.addTooltip,
          isFreeAction: true,
          onClick: () => {
            this.dataManager.changeRowEditing();
            this.setState({
              ...this.dataManager.getRenderState(),
              showAddRow: !this.state.showAddRow
            });
          }
        });
      }
      if (calculatedProps.editable.onRowUpdate) {
        calculatedProps.actions.push({
          icon: calculatedProps.icons.Edit,
          tooltip: localization.editTooltip,
          onClick: (e, rowData) => {
            this.dataManager.changeRowEditing(rowData, "update");
            this.setState({
              ...this.dataManager.getRenderState(),
              showAddRow: false
            });
          }
        });
      }
      if (calculatedProps.editable.onRowDelete) {
        calculatedProps.actions.push({
          icon: calculatedProps.icons.Delete,
          tooltip: localization.deleteTooltip,
          onClick: (e, rowData) => {
            this.dataManager.changeRowEditing(rowData, "delete");
            this.setState({
              ...this.dataManager.getRenderState(),
              showAddRow: false
            });
          }
        });
      }
    }

    calculatedProps.components = { ...MaterialTable.defaultProps.components, ...calculatedProps.components };
    calculatedProps.icons = { ...MaterialTable.defaultProps.icons, ...calculatedProps.icons };
    calculatedProps.options = { ...MaterialTable.defaultProps.options, ...calculatedProps.options };

    return calculatedProps;
  }

  onSelectionChange = () => {
    if (this.props.onSelectionChange) {
      const selectedRows = [];

      const findSelecteds = list => {
        list.forEach(row => {
          if (row.tableData.checked) {
            selectedRows.push(row);
          }

          row.tableData.childRows && findSelecteds(row.tableData.childRows);
        });
      };

      findSelecteds(this.state.data);
      this.props.onSelectionChange(selectedRows);
    }
  }

  onChangePage = (...args) => {
    this.props.onChangePage && this.props.onChangePage(...args);
  }

  onChangeRowsPerPage = (...args) => {
    this.props.onChangeRowsPerPage && this.props.onChangeRowsPerPage(...args);
  }

  onOrderChange = (...args) => {
    this.props.onOrderChange && this.props.onOrderChange(...args);
  }

  isRemoteData = () => !Array.isArray(this.props.data)

  onQueryChange = (query) => {
    query = { ...this.state.query, ...query };

    this.setState({ isLoading: true }, () => {
      this.props.data(query).then((result) => {
        query.totalCount = result.totalCount;
        query.page = result.page;
        this.dataManager.setData(result.data);
        this.setState({
          isLoading: false,
          ...this.dataManager.getRenderState(),
          query
        });
      });
    });
  }

  onSearchChange = debounce(() => {
    this.dataManager.changeSearchText(this.state.searchText);

    if (this.isRemoteData()) {
      const query = { ...this.state.query };
      query.page = 0;
      query.search = this.state.searchText;

      this.onQueryChange(query);
    }
    else {
      this.setState(this.dataManager.getRenderState());
    }
  }, this.props.options.debounceInterval)

  onFilterChange = debounce(() => {
    if (this.isRemoteData()) {
      const query = { ...this.state.query };
      query.filters = this.state.columns
        .filter(a => a.tableData.filterValue)
        .map(a => ({
          column: a,
          operator: "=",
          value: a.tableData.filterValue
        }));

      this.onQueryChange(query);
    }
    else {
      this.setState(this.dataManager.getRenderState());
    }
  }, this.props.options.debounceInterval)

  renderFooter() {
    const props = this.getProps();
    if (props.options.paging) {
      const localization = { ...MaterialTable.defaultProps.localization.pagination, ...this.props.localization.pagination };
      return (
        <Table>
          <TableFooter style={{ display: 'grid' }}>
            <TableRow>
              <props.components.Pagination
                classes={{
                  root: props.classes.paginationRoot,
                  toolbar: props.classes.paginationToolbar,
                  caption: props.classes.paginationCaption,
                  selectRoot: props.classes.paginationSelectRoot,
                }}
                style={{ float: props.theme.direction === "rtl" ? "" : "right", overflowX: 'auto' }}
                colSpan={3}
                count={this.isRemoteData() ? this.state.query.totalCount : this.state.data.length}
                icons={props.icons}
                rowsPerPage={this.state.pageSize}
                rowsPerPageOptions={props.options.pageSizeOptions}
                SelectProps={{
                  renderValue: value => <div style={{ padding: '0px 5px' }}>{value + ' ' + localization.labelRowsSelect + ' '}</div>
                }}
                page={this.isRemoteData() ? this.state.query.page : this.state.currentPage}
                onChangePage={(event, page) => {
                  if (this.isRemoteData()) {
                    const query = { ...this.state.query };
                    query.page = page;
                    this.onQueryChange(query);
                  }
                  else {
                    this.dataManager.changeCurrentPage(page);
                    this.setState(this.dataManager.getRenderState(), () => {
                      this.onChangePage(page);
                    });
                  }
                }}
                onChangeRowsPerPage={(event) => {
                  this.dataManager.changePageSize(event.target.value);

                  if (this.isRemoteData()) {
                    const query = { ...this.state.query };
                    query.pageSize = event.target.value;
                    query.page = 0;
                    this.onQueryChange(query);
                  }
                  else {
                    this.dataManager.changeCurrentPage(0);
                    this.setState(this.dataManager.getRenderState(), () => {
                      this.onChangeRowsPerPage(event.target.value);
                    });
                  }
                }}
                ActionsComponent={(subProps) => props.options.paginationType === 'normal' ?
                  <MTablePagination {...subProps} icons={props.icons} localization={localization} /> :
                  <MTableSteppedPagination {...subProps} icons={props.icons} localization={localization} />}
                labelDisplayedRows={(row) => localization.labelDisplayedRows.replace('{from}', row.from).replace('{to}', row.to).replace('{count}', row.count)}
                labelRowsPerPage={localization.labelRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      );
    }
  }

  render() {
    const props = this.getProps();

    return (
      <DragDropContext onDragEnd={result => {
        this.dataManager.changeByDrag(result);
        this.setState(this.dataManager.getRenderState());
      }}>
        <props.components.Container style={{ position: 'relative' }}>
          {props.options.toolbar &&
            <props.components.Toolbar
              actions={props.actions}
              components={props.components}
              selectedRows={this.state.selectedCount > 0 ? this.state.originalData.filter(a => { return a.tableData.checked }) : []}
              columns={this.state.columns}
              columnsButton={props.options.columnsButton}
              icons={props.icons}
              exportButton={props.options.exportButton}
              exportDelimiter={props.options.exportDelimiter}
              exportFileName={props.options.exportFileName}
              exportCsv={props.options.exportCsv}
              data={this.state.data}
              renderData={this.state.renderData}
              search={props.options.search}
              showTitle={props.options.showTitle}
              toolbarButtonAlignment={props.options.toolbarButtonAlignment}
              searchFieldAlignment={props.options.searchFieldAlignment}
              searchText={this.state.searchText}
              searchFieldStyle={props.options.searchFieldStyle}
              title={props.title}
              customTitle={props.customTitle}
              onSearchChanged={searchText => this.setState({ searchText }, this.onSearchChange)}
              onColumnsChanged={(columnId, hidden) => {
                this.dataManager.changeColumnHidden(columnId, hidden);
                this.setState(this.dataManager.getRenderState());
              }}
              localization={{ ...MaterialTable.defaultProps.localization.toolbar, ...this.props.localization.toolbar }}
            />
          }
          {props.options.grouping &&
            <props.components.Groupbar
              icons={props.icons}
              localization={{ ...MaterialTable.defaultProps.localization.grouping, ...props.localization.grouping }}
              groupColumns={this.state.columns
                .filter(col => col.tableData.groupOrder > -1)
                .sort((col1, col2) => col1.tableData.groupOrder - col2.tableData.groupOrder)
              }
              onSortChanged={(groupedColumn) => {
                this.dataManager.changeGroupOrder(groupedColumn.tableData.id);
                this.setState(this.dataManager.getRenderState());
              }}
              onGroupRemoved={(groupedColumn, index) => {
                const result = {
                  combine: null,
                  destination: { droppableId: "headers", index: 0 },
                  draggableId: groupedColumn.tableData.id,
                  mode: "FLUID",
                  reason: "DROP",
                  source: { index, droppableId: "groups" },
                  type: "DEFAULT"
                };
                this.dataManager.changeByDrag(result);
                this.setState(this.dataManager.getRenderState());
              }}
            />
          }
          <ScrollBar double={props.options.doubleHorizontalScroll}>
            <Droppable droppableId="headers" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                //style={this.getListStyle(snapshot.isDraggingOver)}
                >
                  <div style={{ maxHeight: props.options.maxBodyHeight, overflowY: 'auto' }}>
                    <Table>
                      {props.options.header &&
                        <props.components.Header
                          localization={{ ...MaterialTable.defaultProps.localization.header, ...this.props.localization.header }}
                          columns={this.state.columns}
                          hasSelection={props.options.selection}
                          headerStyle={props.options.headerStyle}
                          selectedCount={this.state.selectedCount}
                          dataCount={props.parentChildData ? this.state.treefiedDataLength : this.state.data.length}
                          hasDetailPanel={!!props.detailPanel}
                          showActionsColumn={props.actions && props.actions.filter(a => !a.isFreeAction && !this.props.options.selection).length > 0}
                          showSelectAllCheckbox={props.options.showSelectAllCheckbox}
                          orderBy={this.state.orderBy}
                          orderDirection={this.state.orderDirection}
                          onAllSelected={(checked) => {
                            this.dataManager.changeAllSelected(checked);
                            this.setState(this.dataManager.getRenderState(), () => this.onSelectionChange());
                          }}
                          onOrderChange={(orderBy, orderDirection) => {
                            this.dataManager.changeOrder(orderBy, orderDirection);

                            if (this.isRemoteData()) {
                              const query = { ...this.state.query };
                              query.page = 0;
                              query.orderBy = this.state.columns.find(a => a.tableData.id === orderBy);
                              query.orderDirection = orderDirection;
                              this.onQueryChange(query);
                            }
                            else {
                              this.setState(this.dataManager.getRenderState(), () => {
                                this.onOrderChange(orderBy, orderDirection);
                              });
                            }
                          }}
                          actionsHeaderIndex={props.options.actionsColumnIndex}
                          sorting={props.options.sorting}
                          grouping={props.options.grouping}
                          isTreeData={this.props.parentChildData !== undefined}
                        />
                      }


                      <props.components.Body
                        actions={props.actions}
                        components={props.components}
                        icons={props.icons}
                        renderData={this.state.renderData}
                        currentPage={this.state.currentPage}
                        pageSize={this.state.pageSize}
                        columns={this.state.columns}
                        detailPanel={props.detailPanel}
                        options={props.options}
                        getFieldValue={this.dataManager.getFieldValue}
                        isTreeData={this.props.parentChildData !== undefined}
                        onFilterChanged={(columnId, value) => {
                          this.dataManager.changeFilterValue(columnId, value);
                          this.setState({}, () => this.onFilterChange());
                        }}
                        onFilterSelectionChanged={(event) => {
                          this.dataManager.changeFilterSelectionChecked(event.target.checked);
                          this.setState(this.dataManager.getRenderState());
                        }}
                        onRowSelected={(event, path) => {
                          this.dataManager.changeRowSelected(event.target.checked, path);
                          this.setState(this.dataManager.getRenderState(), () => this.onSelectionChange());
                        }}
                        onToggleDetailPanel={(path, render) => {
                          this.dataManager.changeDetailPanelVisibility(path, render);
                          this.setState(this.dataManager.getRenderState());
                        }}
                        onGroupExpandChanged={(path) => {
                          this.dataManager.changeGroupExpand(path);
                          this.setState(this.dataManager.getRenderState());
                        }}
                        onTreeExpandChanged={(path) => {
                          this.dataManager.changeTreeExpand(path);
                          this.setState(this.dataManager.getRenderState());
                        }}
                        onEditingCanceled={(mode, rowData) => {
                          if (mode === "add") {
                            this.setState({ showAddRow: false });
                          }
                          else if (mode === "update" || mode === "delete") {
                            this.dataManager.changeRowEditing(rowData);
                            this.setState(this.dataManager.getRenderState());
                          }
                        }}
                        onEditingApproved={(mode, newData, oldData) => {
                          if (mode === "add") {
                            this.setState({ isLoading: true }, () => {
                              this.props.editable.onRowAdd(newData)
                                .then(result => {
                                  this.setState({ isLoading: false, showAddRow: false }, () => {
                                    if (this.isRemoteData()) {
                                      this.onQueryChange(this.state.query);
                                    }
                                  });
                                })
                                .catch(reason => {
                                  this.setState({ isLoading: false });
                                });
                            });
                          }
                          else if (mode === "update") {
                            this.setState({ isLoading: true }, () => {
                              this.props.editable.onRowUpdate(newData, oldData)
                                .then(result => {
                                  this.dataManager.changeRowEditing(oldData);
                                  this.setState({
                                    isLoading: false,
                                    ...this.dataManager.getRenderState()
                                  }, () => {
                                    if (this.isRemoteData()) {
                                      this.onQueryChange(this.state.query);
                                    }
                                  });
                                })
                                .catch(reason => {
                                  this.setState({ isLoading: false });
                                });
                            });

                          }
                          else if (mode === "delete") {
                            this.setState({ isLoading: true }, () => {
                              this.props.editable.onRowDelete(oldData)
                                .then(result => {
                                  this.dataManager.changeRowEditing(oldData);
                                  this.setState({
                                    isLoading: false,
                                    ...this.dataManager.getRenderState()
                                  }, () => {
                                    if (this.isRemoteData()) {
                                      this.onQueryChange(this.state.query);
                                    }
                                  });
                                })
                                .catch(reason => {
                                  this.setState({ isLoading: false });
                                });
                            });
                          }
                        }}
                        localization={{ ...MaterialTable.defaultProps.localization.body, ...this.props.localization.body }}
                        onRowClick={this.props.onRowClick}
                        showAddRow={this.state.showAddRow}
                        hasAnyEditingRow={!!(this.state.lastEditingRow || this.state.showAddRow)}
                        hasDetailPanel={!!props.detailPanel}
                      />
                    </Table>
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

          </ScrollBar>
          {(this.state.isLoading || props.isLoading) && props.options.loadingType === "linear" &&
            <div style={{ position: 'relative', width: '100%' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}>
                <LinearProgress />
              </div>
            </div>
          }
          {this.renderFooter()}

          {(this.state.isLoading || props.isLoading) && props.options.loadingType === 'overlay' &&
            <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}>
              <div style={{ display: 'table', width: '100%', height: '100%', backgroundColor: '#FFFFFFAA' }}>
                <div style={{ display: 'table-cell', width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }}>
                  <CircularProgress />
                </div>
              </div>
            </div>
          }
        </props.components.Container>
      </DragDropContext>
    );
  }
}

const ScrollBar = ({ double, children }) => {
  if (double) {
    return (
      <DoubleScrollbar>
        {children}
      </DoubleScrollbar>
    );
  }
  else {
    return (
      <div style={{ overflowX: 'auto' }}>
        {children}
      </div>
    );
  }
};

MaterialTable.defaultProps = {
  actions: [],
  classes: {},
  columns: [],
  components: {
    Action: MTableAction,
    Actions: MTableActions,
    Body: MTableBody,
    Cell: MTableCell,
    Container: Paper,
    EditRow: MTableEditRow,
    FilterRow: MTableFilterRow,
    Groupbar: MTableGroupbar,
    GroupRow: MTableGroupRow,
    Header: MTableHeader,
    Pagination: TablePagination,
    Row: MTableBodyRow,
    Toolbar: MTableToolbar,
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
    columnsButton: false,
    detailPanelType: 'multiple',
    debounceInterval: 200,
    doubleHorizontalScroll: false,
    emptyRowsWhenPaging: true,
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
    toolbar: true
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

MaterialTable.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.string]).isRequired,
    isFreeAction: PropTypes.bool,
    tooltip: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    iconProps: PropTypes.object
  })])),
  columns: PropTypes.arrayOf(PropTypes.shape({
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
    defaultSort: PropTypes.oneOf(['asc', 'desc']),
    grouping: PropTypes.bool,
    emptyValue: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
    export: PropTypes.bool,
    field: PropTypes.string,
    filtering: PropTypes.bool,
    headerStyle: PropTypes.object,
    hidden: PropTypes.bool,
    lookup: PropTypes.object,
    readonly: PropTypes.bool,
    removable: PropTypes.bool,
    render: PropTypes.func,
    searchable: PropTypes.bool,
    sorting: PropTypes.bool,
    title: PropTypes.string,
    type: PropTypes.oneOf(['string', 'boolean', 'numeric', 'date', 'datetime', 'time', 'currency'])
  })).isRequired,
  components: PropTypes.shape({
    Action: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Actions: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Body: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Cell: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Container: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    EditRow: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    FilterRow: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Groupbar: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    GroupRow: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Header: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Pagination: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Row: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Toolbar: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  }),
  data: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.func]).isRequired,
  editable: PropTypes.shape({
    onRowAdd: PropTypes.func,
    onRowUpdate: PropTypes.func,
    onRowDelete: PropTypes.func
  }),
  detailPanel: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({
        disabled: PropTypes.bool,
        icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.string]),
        openIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.string]),
        tooltip: PropTypes.string,
        render: PropTypes.func.isRequired
      })
    ]))
  ]),
  icons: PropTypes.shape({
    Add: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Check: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Clear: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Delete: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    DetailPanel: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Edit: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Export: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Filter: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    FirstPage: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    LastPage: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    NextPage: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    PreviousPage: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    ResetSearch: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Search: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    SortArrow: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    ThirdStateCheck: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    ViewColumn: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  }),
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  options: PropTypes.shape({
    actionsColumnIndex: PropTypes.number,
    columnsButton: PropTypes.bool,
    debounceInterval: PropTypes.number,
    detailPanelType: PropTypes.oneOf(['single', 'multiple']),
    doubleHorizontalScroll: PropTypes.bool,
    emptyRowsWhenPaging: PropTypes.bool,
    exportButton: PropTypes.bool,
    exportDelimiter: PropTypes.string,
    exportFileName: PropTypes.string,
    exportCsv: PropTypes.func,
    filtering: PropTypes.bool,
    header: PropTypes.bool,
    headerStyle: PropTypes.object,
    initialPage: PropTypes.number,
    maxBodyHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    loadingType: PropTypes.oneOf(['overlay', 'linear']),
    paging: PropTypes.bool,
    pageSize: PropTypes.number,
    pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
    paginationType: PropTypes.oneOf(['normal', 'stepped']),
    rowStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    showEmptyDataSourceMessage: PropTypes.bool,
    showSelectAllCheckbox: PropTypes.bool,
    search: PropTypes.bool,
    showTitle: PropTypes.bool,
    toolbarButtonAlignment: PropTypes.oneOf(['left', 'right']),
    searchFieldAlignment: PropTypes.oneOf(['left', 'right']),
    searchFieldStyle: PropTypes.object,
    selection: PropTypes.bool,
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
  onSelectionChange: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  onChangePage: PropTypes.func,
  onOrderChange: PropTypes.func,
  onRowClick: PropTypes.func,
  tableRef: PropTypes.any
};


const styles = theme => ({
  paginationRoot: {
    width: '100%'
  },
  paginationToolbar: {
    padding: 0,
    width: '100%'
  },
  paginationCaption: {
    display: 'none'
  },
  paginationSelectRoot: {
    margin: 0
  }
});



export default withStyles(styles, { withTheme: true })(props => <MaterialTable {...props} ref={props.tableRef} />);

export {
  MTableAction, MTableActions, MTableBody, MTableCell, MTableEditRow,
  MTableFilterRow, MTableHeader, MTableSteppedPagination, MTablePagination,
  MTableBodyRow, MTableToolbar, MTableGroupRow
};

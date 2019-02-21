/* eslint-disable no-unused-vars */
import { Icon, Paper, Table, TableFooter, TablePagination, TableRow, CircularProgress, LinearProgress } from '@material-ui/core';
import DoubleScrollbar from "react-double-scrollbar";
import formatDate from 'date-fns/format';
import PropTypes from 'prop-types';
import * as React from 'react';
import MTableActions from './m-table-actions';
import MTableBody from './m-table-body';
import MTableBodyRow from './m-table-body-row';
import MTableGroupbar from './m-table-groupbar';
import MTableGroupRow from './m-table-group-row';
import MTableCell from './m-table-cell';
import MTableFilterRow from './m-table-filter-row';
import MTableHeader from './m-table-header';
import MTablePagination from './m-table-pagination';
import MTableToolbar from './m-table-toolbar';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
/* eslint-enable no-unused-vars */

class MaterialTable extends React.Component {
  constructor(props) {
    super(props);

    const calculatedProps = this.getProps(props);
    let defaultSortColumnIndex = -1;
    let defaultSortDirection = '';
    if (calculatedProps) {
      defaultSortColumnIndex = calculatedProps.columns.findIndex(a => a.defaultSort);
      defaultSortDirection = defaultSortColumnIndex > -1 ? calculatedProps.columns[defaultSortColumnIndex].defaultSort : '';
    }
    this.state = {
      columns: [],
      currentPage: props.options.initialPage ? props.options.initialPage : 0,
      data: [],
      pageSize: calculatedProps.options.pageSize,
      renderData: [],
      searchText: '',
      selectedCount: 0,
      orderBy: defaultSortColumnIndex,
      orderDirection: defaultSortDirection,
      filterSelectionChecked: false,
      ...this.getData(calculatedProps),
      ...this.getColumns(calculatedProps)
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const props = this.getProps(nextProps);
    const columns = this.getColumns(props);
    this.setState({ ...columns }, () => {
      const data = this.getData(props);
      this.setState({ ...data });
    });
    // const data = this.getData(props);
    // this.setState(() => ({ ...columns, ...data }));
  }

  getData(props) {
    let selectedCount = 0;
    const data = props.data.map((row, index) => {
      row.tableData = { ...row.tableData, id: index };
      if (row.tableData.checked) {
        selectedCount++;
      }
      return row;
    });

    const renderData = this.getRenderData(data, props);

    return { data, renderData, selectedCount };
  }

  getColumns(props) {
    const columns = props.columns.map((columnDef, index) => {
      columnDef.tableData = {
        filterValue: columnDef.defaultFilter,
        groupOrder: columnDef.defaultGroupOrder,
        groupSort: columnDef.defaultGroupSort || 'asc',
        ...columnDef.tableData,
        id: index
      };
      return columnDef;
    });

    return { columns };
  }

  getProps(props) {
    const calculatedProps = { ...(props || this.props) };
    calculatedProps.components = { ...MaterialTable.defaultProps.components, ...calculatedProps.components };
    calculatedProps.icons = { ...MaterialTable.defaultProps.icons, ...calculatedProps.icons };
    calculatedProps.options = { ...MaterialTable.defaultProps.options, ...calculatedProps.options };

    return calculatedProps;
  }

  setData(data) {
    data = data || this.state.data;

    const renderData = this.getRenderData(data);
    this.setState({ data, renderData });
  }

  getRenderData = (data, props) => {
    data = data || this.state.data;
    props = this.getProps();

    let renderData = [...data];

    // App filter
    if (this.state) {
      renderData = renderData.filter(row => {
        if (this.state.filterSelectionChecked) return row.tableData.checked;
        return row.tableData;
      });

      this.state.columns.filter(columnDef => columnDef.tableData.filterValue).forEach(columnDef => {
        const { lookup, type, tableData, field } = columnDef;

        if (columnDef.customFilterAndSearch) {
          renderData = renderData.filter(row => !!columnDef.customFilterAndSearch(tableData.filterValue, row, columnDef));
        }
        else
          if (lookup) {
            renderData = renderData.filter(row => {
              return !tableData.filterValue ||
                tableData.filterValue.length === 0 ||
                tableData.filterValue.indexOf(row[field] && row[field].toString()) > -1;
            });
          } else if (type === 'numeric') {
            renderData = renderData.filter(row => {
              return row[field] === tableData.filterValue;
            });
          } else if (type === 'boolean' && tableData.filterValue) {
            renderData = renderData.filter(row => {
              return (row[field] && tableData.filterValue === 'checked') ||
                (!row[field] && tableData.filterValue === 'unchecked');
            });
          } else if (['date', 'datetime'].includes(type)) {
            renderData = renderData.filter(row => {
              const currentDate = row[field] ? new Date(row[field]) : null;

              if (currentDate && currentDate.toString() !== 'Invalid Date') {
                const selectedDate = tableData.filterValue;
                let currentDateToCompare = '';
                let selectedDateToCompare = '';

                if (type === 'date') {
                  currentDateToCompare = formatDate(currentDate, 'MM/dd/yyyy');
                  selectedDateToCompare = formatDate(selectedDate, 'MM/dd/yyyy');
                } else if (type === 'datetime') {
                  currentDateToCompare = formatDate(currentDate, 'MM/dd/yyyy - HH:mm');
                  selectedDateToCompare = formatDate(selectedDate, 'MM/dd/yyyy - HH:mm');
                }

                return currentDateToCompare === selectedDateToCompare;
              }

              return true;
            });
          } else if (type === 'time') {
            renderData = renderData.filter(row => {
              const currentHour = row[field] || null;

              if (currentHour) {
                const selectedHour = tableData.filterValue;
                const currentHourToCompare = formatDate(selectedHour, 'HH:mm');

                return currentHour === currentHourToCompare;
              }

              return true;
            });
          } else {
            renderData = renderData.filter(row => {
              return row[field] && row[field].toString().toUpperCase().includes(tableData.filterValue.toUpperCase());
            });
          }
      });
    }

    if (this.state && this.state.searchText) {
      renderData = renderData.filter(row => {
        return this.state.columns
          .filter(columnDef => { return columnDef.searchable === undefined ? !columnDef.hidden : columnDef.searchable })
          .some(columnDef => {
            if (columnDef.customFilterAndSearch) {
              return !!columnDef.customFilterAndSearch(this.state.searchText, row, columnDef);
            }
            else if (columnDef.field) {
              const value = this.getFieldValue(row, columnDef);
              if (value) {
                return value.toString().toUpperCase().includes(this.state.searchText.toUpperCase());
              }
            }
          });
      });
    }

    // Apply grouping & sorting
    const groups = this.state && this.state.columns
      .filter(col => col.tableData.groupOrder > -1)
      .sort((col1, col2) => col1.tableData.groupOrder - col2.tableData.groupOrder);
    if (groups && groups.length > 0) {
      renderData = this.groupBy(renderData, groups);

      const sortGroups = (list, columnDef) => {
        if(columnDef.customSort) {
          return list.sort(
            columnDef.tableData.groupSort === 'desc'
              ? (a, b) => columnDef.customSort(b.value, a.value, 'group')
              : (a, b) => columnDef.customSort(a.value, b.value, 'group')
          );
        }
        else {
          return list.sort(
            columnDef.tableData.groupSort === 'desc'
              ? (a, b) => this.sort(b.value, a.value, columnDef.type)
              : (a, b) => this.sort(a.value, b.value, columnDef.type)
          );
        }
      };

      renderData = sortGroups(renderData, groups[0]);

      const sortGroupData = (list, level) => {
        list.forEach(element => {
          if (element.groups.length > 0) {
            const column = groups[level];
            element.groups = sortGroups(element.groups, column);
            sortGroupData(element.groups, level + 1);
          }
          else {
            if (this.state && this.state.orderBy >= 0 && this.state.orderDirection) {
              element.data = this.sortList(element.data);
            }
          }
        });
      };

      sortGroupData(renderData, 1);
    }
    else if (this.state && this.state.orderBy >= 0 && this.state.orderDirection) {
      renderData = this.sortList(renderData);
    }

    return renderData || data;
  }

  sortList = (list) => {
    const columnDef = this.state.columns.find(_ => _.tableData.id === this.state.orderBy);
    let result = list;

    if (columnDef.customSort) {
      if (this.state.orderDirection === 'desc') {
        result = list.sort((a, b) => columnDef.customSort(b, a, 'row'));
      }
      else {
        result = list.sort((a, b) => columnDef.customSort(a, b, 'row'));
      }
    }
    else {
      result = list.sort(
        this.state.orderDirection === 'desc'
          ? (a, b) => this.sort(this.getFieldValue(b, columnDef), this.getFieldValue(a, columnDef), columnDef.type)
          : (a, b) => this.sort(this.getFieldValue(a, columnDef), this.getFieldValue(b, columnDef), columnDef.type)
      );
    }

    return result;
  }

  groupBy(data, groups) {
    const subData = data.reduce((result, current) => {

      let object = result;
      object = groups.reduce((o, colDef) => {
        const value = current[colDef.field] || this.byString(current, colDef.field);
        let group = o.groups.find(g => g.value === value);
        if (!group) {
          group = { value, groups: [], data: [], isExpanded: false };
          o.groups.push(group);
        }
        return group;
      }, object);

      object.data.push(current);

      return result;
    }, { groups: [] });

    return subData.groups;
  }

  getFieldValue = (rowData, columnDef) => {
    let value = (typeof rowData[columnDef.field] !== 'undefined' ? rowData[columnDef.field] : this.byString(rowData, columnDef.field));
    if (columnDef.lookup) {
      value = columnDef.lookup[value];
    }

    return value;
  }

  byString(o, s) {
    if (!s) {
      return;
    }

    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
      var x = a[i];
      if (x in o) {
        o = o[x];
      } else {
        return;
      }
    }
    return o;
  }

  sort(a, b, type) {
    if (type === 'numeric') {
      return a - b;
    } else {
      return a < b ? -1 : a > b ? 1 : 0;
    }
  }

  onSelectionChange = () => {
    if (this.props.onSelectionChange) {
      const selectedRows = this.state.data.filter(row => row.tableData.checked);
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

  renderFooter() {
    const props = this.getProps();
    if (props.options.paging) {
      const localization = { ...MaterialTable.defaultProps.localization.pagination, ...this.props.localization.pagination };
      return (
        <Table>
          <TableFooter style={{ display: 'grid' }}>
            <TableRow>
              <props.components.Pagination
                style={{ float: 'right' }}
                colSpan={3}
                count={this.state.renderData.length}
                icons={props.icons}
                rowsPerPage={this.state.pageSize}
                rowsPerPageOptions={props.options.pageSizeOptions}
                page={this.state.currentPage}
                onChangePage={(event, page) => {
                  this.setState({ currentPage: page }, () => {
                    this.setData();
                    this.onChangePage(page);
                  });
                }}
                onChangeRowsPerPage={(event) => {
                  this.setState(state => {
                    state.pageSize = event.target.value;
                    state.currentPage = 0;
                    return state;
                  }, () => {
                    this.setData();
                    this.onChangeRowsPerPage(event.target.value);
                  });
                }}
                ActionsComponent={(subProps) => <MTablePagination {...subProps} icons={props.icons} localization={localization} />}
                labelDisplayedRows={(row) => localization.labelDisplayedRows.replace('{from}', row.from).replace('{to}', row.to).replace('{count}', row.count)}
                labelRowsPerPage={localization.labelRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      );
    }
  }

  componentDidMount() {
    this.setData();
  }

  reOrderGroups = result => {
    let start = 0;

    let groups = this.state.columns
      .filter(col => col.tableData.groupOrder > -1)
      .sort((col1, col2) => col1.tableData.groupOrder - col2.tableData.groupOrder);


    if (result.destination.droppableId === "groups" && result.source.droppableId === "groups") {
      start = Math.min(result.destination.index, result.source.index);
      const end = Math.max(result.destination.index, result.source.index);

      groups = groups.slice(start, end + 1);

      if (result.destination.index < result.source.index) {
        // Take last and add as first
        const last = groups.pop();
        groups.unshift(last);
      }
      else {
        // Take first and add as last
        const last = groups.shift();
        groups.push(last);
      }
    }
    else if (result.destination.droppableId === "groups" && result.source.droppableId === "headers") {
      const newGroup = this.state.columns.find(c => c.tableData.id == result.draggableId);
      groups.splice(result.destination.index, 0, newGroup);
    }
    else if (result.destination.droppableId === "headers" && result.source.droppableId === "groups") {
      const removeGroup = this.state.columns.find(c => c.tableData.id == result.draggableId);
      removeGroup.tableData.groupOrder = undefined;
      groups.splice(result.source.index, 1);
    }
    else if(result.destination.droppableId === "headers" && result.source.droppableId === "headers") {
      // Column reordering
    }
    else {
      return;
    }

    for (let i = 0; i < groups.length; i++) {
      groups[i].tableData.groupOrder = start + i;
    }

    this.setData();
  }

  findDataByPath = (renderData, path) => {
    const data = { groups: renderData };

    const node = path.reduce((result, current) => {
      if (result.groups.length > 0) {
        return result.groups[current];
      }
      else {
        return result.data[current];
      }
    }, data);
    return node;
  }

  render() {
    const props = this.getProps();

    return (
      <DragDropContext onDragEnd={this.reOrderGroups}>
        <props.components.Container style={{ position: 'relative' }}>
          {props.options.toolbar &&
            <props.components.Toolbar
              actions={props.actions}
              components={props.components}
              selectedRows={this.state.selectedCount > 0 ? this.state.data.filter(a => { return a.tableData.checked }) : []}
              columns={this.state.columns}
              columnsButton={props.options.columnsButton}
              icons={props.icons}
              exportButton={props.options.exportButton}
              exportDelimiter={props.options.exportDelimiter}
              exportFileName={props.options.exportFileName}
              renderData={this.state.renderData}
              search={props.options.search}
              showTitle={props.options.showTitle}
              toolbarButtonAlignment={props.options.toolbarButtonAlignment}
              searchText={this.state.searchText}
              searchFieldStyle={props.options.searchFieldStyle}
              title={props.title}
              onSearchChanged={searchText => this.setState({ searchText }, () => this.setData())}
              onColumnsChanged={columns => this.setState({ columns })}
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
                const columns = this.state.columns;
                const column = columns.find(c => c.tableData.id === groupedColumn.tableData.id);

                if (column.tableData.groupSort === 'asc') {
                  column.tableData.groupSort = 'desc';
                }
                else {
                  column.tableData.groupSort = 'asc';
                }

                this.setState({ columns });
                this.setData();
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
                  <Table>
                    {props.options.header &&
                      <props.components.Header
                        localization={{ ...MaterialTable.defaultProps.localization.header, ...this.props.localization.header }}
                        columns={this.state.columns}
                        hasSelection={props.options.selection}
                        headerStyle={props.options.headerStyle}
                        selectedCount={this.state.selectedCount}
                        dataCount={this.state.data.length}
                        hasDetailPanel={!!props.detailPanel}
                        showActionsColumn={props.actions && props.actions.filter(a => !a.isFreeAction && !this.props.options.selection).length > 0}
                        orderBy={this.state.orderBy}
                        orderDirection={this.state.orderDirection}
                        onAllSelected={(checked) => {
                          let renderData = this.state.renderData;
                          let selectedCount = 0;
                          if (this.state.columns.filter(g => g.tableData.groupOrder > -1).length > 0) {
                            const setCheck = (data) => {
                              data.forEach(element => {
                                if (element.groups.length > 0) {
                                  setCheck(element.groups);
                                }
                                else {
                                  element.data.forEach(d => {
                                    d.tableData.checked = checked;
                                    selectedCount++;
                                  });
                                }
                              });
                            };

                            setCheck(renderData);
                          }
                          else {
                            renderData = renderData.map(row => {
                              row.tableData.checked = checked;
                              return row;
                            });
                            selectedCount = renderData.length;
                          }

                          selectedCount = checked ? selectedCount : 0;
                          this.setState({ renderData, selectedCount }, () => this.onSelectionChange());
                        }}
                        onOrderChange={(orderBy, orderDirection) => {
                          this.setState({ orderBy, orderDirection, currentPage: 0 }, () => {
                            this.setData();
                            this.onOrderChange(orderBy, orderDirection);
                          });
                        }}
                        actionsHeaderIndex={props.options.actionsColumnIndex}
                        sorting={props.options.sorting}
                        grouping={props.options.grouping}
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
                      getFieldValue={this.getFieldValue}
                      onFilterChanged={(columnId, value) => {
                        const columns = this.state.columns;
                        columns[columnId].tableData.filterValue = value;
                        this.setState({ columns }, () => {
                          this.setData();
                        });
                      }}
                      onFilterSelectionChanged={(event) => {
                        const filterSelectionChecked = event.target.checked;
                        const columns = this.state.columns;
                        this.setState({ columns, filterSelectionChecked }, () => {
                          this.setData();
                        });
                      }}
                      onRowSelected={(event, path) => {
                        const checked = event.target.checked;
                        const renderData = this.state.renderData;
                        const node = this.findDataByPath(renderData, path);
                        node.tableData.checked = checked;
                        this.setState(state => ({
                          renderData,
                          selectedCount: state.selectedCount + (checked ? 1 : -1)
                        }), () => this.onSelectionChange());
                        this.setState({ renderData });
                      }}
                      onToggleDetailPanel={(path, render) => {
                        const renderData = this.state.renderData;
                        const targetRow = this.findDataByPath(renderData, path);

                        if (targetRow.tableData.showDetailPanel === render) {
                          targetRow.tableData.showDetailPanel = undefined;
                        }
                        else {
                          targetRow.tableData.showDetailPanel = render;
                        }
                        this.setState({ renderData });
                      }}
                      onGroupExpandChanged={(path) => {
                        const renderData = this.state.renderData;
                        const node = this.findDataByPath(renderData, path);
                        node.isExpanded = !node.isExpanded;

                        this.setState({ renderData });
                      }}
                      localization={{ ...MaterialTable.defaultProps.localization.body, ...this.props.localization.body }}
                      onRowClick={this.props.onRowClick}
                    />
                  </Table>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

          </ScrollBar>
          {props.isLoading && props.options.loadingType === "linear" &&
            <div style={{ position: 'relative', width: '100%' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}>
                <LinearProgress />
              </div>
            </div>
          }
          {this.renderFooter()}

          {props.isLoading && props.options.loadingType === 'overlay' &&
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
    Actions: MTableActions,
    Body: MTableBody,
    Cell: MTableCell,
    Container: Paper,
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
    Check: (props) => <Icon {...props}>check</Icon>,
    DetailPanel: (props) => <Icon {...props}>chevron_right</Icon>,
    Export: (props) => <Icon {...props}>save_alt</Icon>,
    Filter: (props) => <Icon {...props}>filter_list</Icon>,
    FirstPage: (props) => <Icon {...props}>first_page</Icon>,
    LastPage: (props) => <Icon {...props}>last_page</Icon>,
    NextPage: (props) => <Icon {...props}>chevron_right</Icon>,
    PreviousPage: (props) => <Icon {...props}>chevron_left</Icon>,
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
    showEmptyDataSourceMessage: true,
    search: true,
    showTitle: true,
    toolbarButtonAlignment: 'right',
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
      labelRowsPerPage: 'Rows per page:'
    },
    toolbar: {},
    header: {},
    body: {
      filterRow: {}
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
    disableGrouping: PropTypes.bool,
    emptyValue: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
    field: PropTypes.string,
    filtering: PropTypes.bool,
    headerStyle: PropTypes.object,
    hidden: PropTypes.bool,
    lookup: PropTypes.object,
    removable: PropTypes.bool,
    render: PropTypes.func,
    searchable: PropTypes.bool,
    sorting: PropTypes.bool,
    title: PropTypes.string,
    type: PropTypes.oneOf(['string', 'boolean', 'numeric', 'date', 'datetime', 'time', 'currency'])
  })).isRequired,
  components: PropTypes.shape({
    Actions: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Body: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Cell: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Container: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    FilterRow: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Groupbar: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    GroupRow: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Header: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Pagination: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Row: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Toolbar: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  }),
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  detailPanel: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.string]),
      openIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.string]),
      tooltip: PropTypes.string,
      render: PropTypes.func.isRequired
    }))
  ]),
  icons: PropTypes.shape({
    Check: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    DetailPanel: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Export: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Filter: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    FirstPage: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    LastPage: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    NextPage: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    PreviousPage: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
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
    doubleHorizontalScroll: PropTypes.bool,
    emptyRowsWhenPaging: PropTypes.bool,
    exportButton: PropTypes.bool,
    exportDelimiter: PropTypes.string,
    exportFileName: PropTypes.string,
    filtering: PropTypes.bool,
    header: PropTypes.bool,
    headerStyle: PropTypes.object,
    initialPage: PropTypes.number,
    loadingType: PropTypes.oneOf(['overlay', 'linear']),
    paging: PropTypes.bool,
    pageSize: PropTypes.number,
    pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
    rowStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    showEmptyDataSourceMessage: PropTypes.bool,
    search: PropTypes.bool,
    showTitle: PropTypes.bool,
    toolbarButtonAlignment: PropTypes.string,
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
};

export default MaterialTable;

export {
  MTableActions, MTableBody, MTableCell,
  MTableFilterRow, MTableHeader, MTablePagination,
  MTableBodyRow, MTableToolbar, MTableGroupRow
};


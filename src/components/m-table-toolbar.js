/* eslint-disable no-unused-vars */
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';
import { CsvBuilder } from 'filefy';
import PropTypes, { oneOf } from 'prop-types';
import * as React from 'react';
/* eslint-enable no-unused-vars */

export class MTableToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnsButtonAnchorEl: null,
      exportButtonAnchorEl: null,
      searchText: '',
      searchBy: ''
    };
  }

  onSearchChange = searchText => {
    this.props.dataManager.changeSearchText(searchText);
    this.setState({ searchText }, this.props.onSearchChanged(searchText));
  }

  onSearchByChange = (searchBy, searchText) => {
    this.props.dataManager.changeSearchBy(searchBy, searchText);
    this.setState({ searchBy }, this.onSearchChange(searchText));
  }

  defaultExportCsv = () => {
    const columns = this.props.columns
      .filter(columnDef => {
        return !columnDef.hidden && columnDef.field && columnDef.export !== false;
      })
      .sort((a, b) => a.tableData.columnOrder > b.tableData.columnOrder ? 1 : -1);
    const dataToExport = this.props.exportAllData ? this.props.data : this.props.renderData;
    const data = dataToExport.map(rowData =>
      columns.map(columnDef => {
        return this.props.getFieldValue(rowData, columnDef);
      })
    );

    const builder = new CsvBuilder((this.props.exportFileName || this.props.title || 'data') + '.csv');
    builder
      .setDelimeter(this.props.exportDelimiter)
      .setColumns(columns.map(columnDef => columnDef.title))
      .addRows(data)
      .exportFile();
  }

  exportCsv = () => {
    if (this.props.exportCsv) {
      this.props.exportCsv(this.props.columns, this.props.data);
    } else {
      this.defaultExportCsv();
    }
    this.setState({ exportButtonAnchorEl: null });
  }

  renderSearch() {
    const localization = { ...MTableToolbar.defaultProps.localization, ...this.props.localization };
    if (this.props.search) {
      return (
        <div>
          { this.props.searchBy
            ? this.renderSearchBy()
            : null
          }
          <TextField
              autoFocus={this.props.searchAutoFocus}
              className={this.props.searchFieldAlignment === 'left' && this.props.showTitle === false ? null : this.props.classes.searchField}
              value={this.state.searchText}
              onChange={event => this.onSearchChange(event.target.value)}
              placeholder={localization.searchPlaceholder}
              variant={this.props.searchFieldVariant}
              InputProps={{
              startAdornment: 
                <InputAdornment position="start">
                  <Tooltip title={localization.searchTooltip}>
                    <this.props.icons.Search color="inherit" fontSize="small" />
                  </Tooltip>
                </InputAdornment>
              ,
              endAdornment: 
                <InputAdornment position="end">
                  <IconButton
                      disabled={!this.state.searchText}
                      onClick={() => this.onSearchChange("")}
                  >
                    <this.props.icons.ResetSearch color="inherit" fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ,
              style: this.props.searchFieldStyle,
              inputProps: {
                'aria-label': "Search"
              }
            }}
          />
        </div>
      );
    }
    else {
      return null;
    }
  }

  renderSearchBy() {
    return (
      <TextField
          select
          label={`Search by: ${this.state.searchBy}`}
          variant="filled"
          value={this.state.searchBy}
          onChange={event => this.onSearchByChange(event.target.value, this.state.searchText)}
      >
        {this.props.searchByOptions && this.props.searchByOptions.length
          ? this.props.searchByOptions.map(option => {
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>;
            })
          : null}
      </TextField>
    );
  }

  renderDefaultActions() {
    const localization = { ...MTableToolbar.defaultProps.localization, ...this.props.localization };
    const { classes } = this.props;

    return (
      <div>
        {this.props.columnsButton &&
          <span>
            <Tooltip title={localization.showColumnsTitle}>
              <IconButton
                  color="inherit"
                  onClick={event => this.setState({ columnsButtonAnchorEl: event.currentTarget })}
                  aria-label={localization.showColumnsAriaLabel}
              >

                <this.props.icons.ViewColumn />
              </IconButton>
            </Tooltip>
            <Menu
                anchorEl={this.state.columnsButtonAnchorEl}
                open={Boolean(this.state.columnsButtonAnchorEl)}
                onClose={() => this.setState({ columnsButtonAnchorEl: null })}
            >
              <MenuItem key={"text"} disabled style={{ opacity: 1, fontWeight: 600, fontSize: 12 }}>
                {localization.addRemoveColumns}
              </MenuItem>
              {
                this.props.columns.map((col) => {
                  return (
                    <li key={col.tableData.id}>
                      <MenuItem
                          className={classes.formControlLabel}
                          component="label"
                          htmlFor={`column-toggle-${col.tableData.id}`}
                          disabled={col.removable === false}
                      >
                        <Checkbox
                            checked={!col.hidden}
                            id={`column-toggle-${col.tableData.id}`}
                            onChange={() => this.props.onColumnsChanged(col, !col.hidden)}
                        />
                        <span>{col.title}</span>
                      </MenuItem>
                    </li>
                  );
                })
              }
            </Menu>
          </span>
        }
        {this.props.exportButton &&
          <span>
            <Tooltip title={localization.exportTitle}>
              <IconButton
                  color="inherit"
                  onClick={event => this.setState({ exportButtonAnchorEl: event.currentTarget })}
                  aria-label={localization.exportAriaLabel}
              >
                <this.props.icons.Export />
              </IconButton>
            </Tooltip>
            <Menu
                anchorEl={this.state.exportButtonAnchorEl}
                open={Boolean(this.state.exportButtonAnchorEl)}
                onClose={() => this.setState({ exportButtonAnchorEl: null })}
            >
              <MenuItem key="export-csv" onClick={this.exportCsv}>
                {localization.exportName}
              </MenuItem>
            </Menu>
          </span>

        }
        <span>
          <this.props.components.Actions actions={this.props.actions && this.props.actions.filter(a => a.position === "toolbar")} components={this.props.components} />
        </span>
      </div>
    );
  }

  renderSelectedActions() {
    return (
      <React.Fragment>
        <this.props.components.Actions actions={this.props.actions.filter(a => a.position === "toolbarOnSelect")} data={this.props.selectedRows} components={this.props.components} />
      </React.Fragment>
    );
  }

  renderActions() {
    const { classes } = this.props;

    return (
      <div className={classes.actions}>
        <div>
          {this.props.selectedRows && this.props.selectedRows.length > 0
            ? this.renderSelectedActions()
            : this.renderDefaultActions()
          }
        </div>
      </div>
    );
  }

  renderToolbarTitle(title) {
    const { classes } = this.props;
    const toolBarTitle = typeof title === 'string' ? <Typography variant='h6' style={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }}>{title}</Typography> : title;

    return (
      <div className={classes.title}>
        {toolBarTitle}
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const localization = { ...MTableToolbar.defaultProps.localization, ...this.props.localization };
    const title = this.props.showTextRowsSelected && this.props.selectedRows && this.props.selectedRows.length > 0 ? localization.nRowsSelected.replace('{0}', this.props.selectedRows.length) : this.props.showTitle ? this.props.title : null;
    return (
      <Toolbar className={classNames(classes.root, { [classes.highlight]: this.props.showTextRowsSelected && this.props.selectedRows && this.props.selectedRows.length > 0 })}>
        {title && this.renderToolbarTitle(title)}
        {this.props.searchFieldAlignment === 'left' && this.renderSearch()}
        {this.props.toolbarButtonAlignment === 'left' && this.renderActions()}
        <div className={classes.spacer} />
        {this.props.searchFieldAlignment === 'right' && this.renderSearch()}
        {this.props.toolbarButtonAlignment === 'right' && this.renderActions()}
      </Toolbar >
    );
  }
}

MTableToolbar.defaultProps = {
  actions: [],
  columns: [],
  columnsButton: false,
  localization: {
    addRemoveColumns: 'Add or remove columns',
    nRowsSelected: '{0} row(s) selected',
    showColumnsTitle: 'Show Columns',
    showColumnsAriaLabel: 'Show Columns',
    exportTitle: 'Export',
    exportAriaLabel: 'Export',
    exportName: 'Export as CSV',
    searchTooltip: 'Search',
    searchPlaceholder: 'Search'
  },
  search: true,
  showTitle: true,
  showTextRowsSelected: true,
  toolbarButtonAlignment: 'right',
  searchAutoFocus: false,
  searchFieldAlignment: 'right',
  searchFieldVariant: 'standard',
  selectedRows: [],
  title: 'No Title!'
};

MTableToolbar.propTypes = {
  actions: PropTypes.array,
  classes: PropTypes.object,
  columns: PropTypes.array,
  columnsButton: PropTypes.bool,
  components: PropTypes.object.isRequired,
  data: PropTypes.array,
  dataManager: PropTypes.object.isRequired,
  exportAllData: PropTypes.bool,
  exportButton: PropTypes.bool,
  exportCsv: PropTypes.func,
  exportDelimiter: PropTypes.string,
  exportFileName: PropTypes.string,
  getFieldValue: PropTypes.func.isRequired,
  localization: PropTypes.object.isRequired,
  onColumnsChanged: PropTypes.func.isRequired,
  onSearchChanged: PropTypes.func.isRequired,
  renderData: PropTypes.array,
  search: PropTypes.bool.isRequired,
  searchAutoFocus: PropTypes.bool,
  searchBy: PropTypes.bool,
  searchByOptions: PropTypes.array,
  searchFieldAlignment: PropTypes.string.isRequired,
  searchFieldStyle: PropTypes.object,
  searchFieldVariant: PropTypes.string,
  selectedRows: PropTypes.array,
  showTextRowsSelected: PropTypes.bool.isRequired,
  showTitle: PropTypes.bool.isRequired,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  toolbarButtonAlignment: PropTypes.string.isRequired
};

export const styles = theme => ({
  root: {
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  spacer: {
    flex: '1 1 10%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    overflow: 'hidden'
  },
  searchField: {
    minWidth: 150,
    paddingLeft: theme.spacing(2)
  },
  formControlLabel: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  }
});

export default withStyles(styles)(MTableToolbar);

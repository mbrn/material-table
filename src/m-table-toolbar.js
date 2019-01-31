/* eslint-disable no-unused-vars */
import { Checkbox, FormControlLabel, Icon, IconButton, InputAdornment, Menu, MenuItem, TextField, Toolbar, Tooltip, Typography, withStyles } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';
import { CsvBuilder } from 'filefy';
import PropTypes from 'prop-types';
import * as React from 'react';
/* eslint-enable no-unused-vars */

class MTableToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnsButtonAnchorEl: null,
      exportButtonAnchorEl: null
    };
  }

  exportCsv = () => {
    const columns = this.props.columns
      .filter(columnDef => {
        return !columnDef.hidden && columnDef.field;
      });

    const data = this.props.renderData.map(rowData =>
      columns.map(columnDef => rowData[columnDef.field])
    );

    // eslint-disable-next-line no-unused-vars
    const builder = new CsvBuilder((this.props.exportFileName || this.props.title || 'data') + '.csv')
      .setDelimeter(this.props.exportDelimiter)
      .setColumns(columns.map(columnDef => columnDef.title))
      .addRows(data)
      .exportFile();

    this.setState({ exportButtonAnchorEl: null });
  }

  renderSearch() {
    const localization = { ...MTableToolbar.defaultProps.localization, ...this.props.localization };
    if (this.props.search) {
      return (
        <TextField
          value={this.props.searchText}
          onChange={event => this.props.onSearchChanged(event.target.value)}
          color="inherit"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Tooltip title={localization.searchTooltip}>
                  <this.props.icons.Search color="inherit" />
                </Tooltip>
              </InputAdornment>
            ),
            style: this.props.searchFieldStyle
          }}
        />
      );
    }
    else {
      return null;
    }
  }

  renderDefaultActions() {
    const localization = { ...MTableToolbar.defaultProps.localization, ...this.props.localization };
    return (
      <div>
        {this.renderSearch()}
        {this.props.columnsButton &&
          <span>
            <Tooltip title={localization.showColumnsTitle}>
              <IconButton
                color="inherit"
                onClick={event => this.setState({ columnsButtonAnchorEl: event.currentTarget })}
                aria-label={localization.showColumnsAriaLabel}>

                <this.props.icons.ViewColumn />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={this.state.columnsButtonAnchorEl}
              open={Boolean(this.state.columnsButtonAnchorEl)}
              onClose={() => this.setState({ columnsButtonAnchorEl: null })}>
              <MenuItem key={"text"} disabled style={{opacity: 1, fontWeight: 600, fontSize: 12}}>
                {localization.addRemoveColumns}
              </MenuItem>
              {
                this.props.columns.map((col, index) => {
                  return (
                    <MenuItem key={col.tableData.id} disabled={col.removable === false}>
                      <FormControlLabel
                        label={col.title}
                        control={
                          <Checkbox
                            checked={!col.hidden}
                            onChange={(event, checked) => {
                              const columns = this.props.columns;
                              columns[index].hidden = !checked;
                              this.props.onColumnsChanged(columns);
                            }
                            } />
                        }
                      />
                    </MenuItem>
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
                aria-label={localization.exportAriaLabel}>
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
        <this.props.components.Actions actions={this.props.actions && this.props.actions.filter(a => a.isFreeAction)} />
      </div>
    );
  }

  renderSelectedActions() {
    return (
      <React.Fragment>
        {this.renderSearch()}
        <this.props.components.Actions actions={this.props.actions.filter(a => !a.isFreeAction)} data={this.props.selectedRows} />
      </React.Fragment>
    );
  }

  renderActions() {
    return (
      <div>
        {this.props.selectedRows && this.props.selectedRows.length > 0
          ? this.renderSelectedActions()
          : this.renderDefaultActions()
        }
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const localization = { ...MTableToolbar.defaultProps.localization, ...this.props.localization };
    const title = this.props.selectedRows && this.props.selectedRows.length > 0 ? localization.nRowsSelected.replace('{0}', this.props.selectedRows.length) : this.props.title;
    return (
      <Toolbar className={classNames(classes.root, { [classes.highlight]: this.props.selectedRows && this.props.selectedRows.length > 0 })}>
        <div className={classes.title}>
          <Typography variant="h6">{title}</Typography>
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {this.renderActions()}
        </div>
      </Toolbar>
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
    searchTooltip: 'Search'
  },
  search: true,
  searchText: '',
  selectedRows: [],
  title: 'No Title!'
};

MTableToolbar.propTypes = {
  actions: PropTypes.array,
  columns: PropTypes.array,
  columnsButton: PropTypes.bool,
  localization: PropTypes.object.isRequired,
  onColumnsChanged: PropTypes.func.isRequired,
  onSearchChanged: PropTypes.func.isRequired,
  search: PropTypes.bool.isRequired,
  searchFieldStyle: PropTypes.object,
  searchText: PropTypes.string.isRequired,
  selectedRows: PropTypes.array,
  title: PropTypes.string.isRequired,
  renderData: PropTypes.array,
  exportButton: PropTypes.bool,
  exportDelimiter: PropTypes.string,
  exportFileName: PropTypes.string,
  classes: PropTypes.object
};

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
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
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto'
  }
});

export default withStyles(styles)(MTableToolbar);

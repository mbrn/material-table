/* eslint-disable no-unused-vars */
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import classNames from "classnames";
import { CsvBuilder } from "filefy";
import PropTypes, { oneOf } from "prop-types";
import "jspdf-autotable";
import * as React from "react";
const jsPDF = typeof window !== "undefined" ? require("jspdf") : null;
/* eslint-enable no-unused-vars */

export class MTableToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnsButtonAnchorEl: null,
      exportButtonAnchorEl: null,
      searchText: props.searchText,
    };
  }

  onSearchChange = (searchText) => {
    this.props.dataManager.changeSearchText(searchText);
    this.setState({ searchText }, this.props.onSearchChanged(searchText));
  };

  getTableData = () => {
    const columns = this.props.columns
      .filter(
        (columnDef) =>
          (!columnDef.hidden || columnDef.export === true) &&
          columnDef.export !== false &&
          columnDef.field
      )
      .sort((a, b) =>
        a.tableData.columnOrder > b.tableData.columnOrder ? 1 : -1
      );
    const data = (this.props.exportAllData
      ? this.props.data
      : this.props.renderData
    ).map((rowData) =>
      columns.map((columnDef) => this.props.getFieldValue(rowData, columnDef))
    );

    return [columns, data];
  };

  defaultExportCsv = () => {
    const [columns, data] = this.getTableData();

    let fileName = this.props.title || "data";
    if (this.props.exportFileName) {
      fileName =
        typeof this.props.exportFileName === "function"
          ? this.props.exportFileName()
          : this.props.exportFileName;
    }

    const builder = new CsvBuilder(fileName + ".csv");
    builder
      .setDelimeter(this.props.exportDelimiter)
      .setColumns(columns.map((columnDef) => columnDef.title))
      .addRows(data)
      .exportFile();
  };

  defaultExportPdf = () => {
    if (jsPDF !== null) {
      const [columns, data] = this.getTableData();

      let content = {
        startY: 50,
        head: [columns.map((columnDef) => columnDef.title)],
        body: data,
      };

      const unit = "pt";
      const size = "A4";
      const orientation = "landscape";

      const doc = new jsPDF(orientation, unit, size);
      doc.setFontSize(15);
      doc.text(this.props.title, 40, 40);
      doc.autoTable(content);
      doc.save(
        (this.props.exportFileName || this.props.title || "data") + ".pdf"
      );
    }
  };

  exportCsv = () => {
    if (this.props.exportCsv) {
      this.props.exportCsv(this.props.columns, this.props.data);
    } else {
      this.defaultExportCsv();
    }
    this.setState({ exportButtonAnchorEl: null });
  };

  exportPdf = () => {
    if (this.props.exportPdf) {
      this.props.exportPdf(this.props.columns, this.props.data);
    } else {
      this.defaultExportPdf();
    }
    this.setState({ exportButtonAnchorEl: null });
  };

  renderSearch() {
    const localization = {
      ...MTableToolbar.defaultProps.localization,
      ...this.props.localization,
    };
    if (this.props.search) {
      return (
        <TextField
          autoFocus={this.props.searchAutoFocus}
          className={
            this.props.searchFieldAlignment === "left" &&
            this.props.showTitle === false
              ? null
              : this.props.classes.searchField
          }
          value={this.state.searchText}
          onChange={(event) => this.onSearchChange(event.target.value)}
          placeholder={localization.searchPlaceholder}
          variant={this.props.searchFieldVariant}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Tooltip title={localization.searchTooltip}>
                  <this.props.icons.Search fontSize="small" />
                </Tooltip>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  disabled={!this.state.searchText}
                  onClick={() => this.onSearchChange("")}
                  aria-label={localization.clearSearchAriaLabel}
                >
                  <this.props.icons.ResetSearch
                    fontSize="small"
                    aria-label="clear"
                  />
                </IconButton>
              </InputAdornment>
            ),
            style: this.props.searchFieldStyle,
            inputProps: {
              "aria-label": localization.searchAriaLabel,
            },
          }}
        />
      );
    } else {
      return null;
    }
  }

  renderDefaultActions() {
    const localization = {
      ...MTableToolbar.defaultProps.localization,
      ...this.props.localization,
    };
    const { classes } = this.props;

    return (
      <div>
        {this.props.columnsButton && (
          <span>
            <Tooltip title={localization.showColumnsTitle}>
              <IconButton
                color="inherit"
                onClick={(event) =>
                  this.setState({
                    columnsButtonAnchorEl: event.currentTarget,
                  })
                }
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
              <MenuItem
                key={"text"}
                disabled
                style={{
                  opacity: 1,
                  fontWeight: 600,
                  fontSize: 12,
                }}
              >
                {localization.addRemoveColumns}
              </MenuItem>
              {this.props.columns.map((col) => {
                if (!col.hidden || col.hiddenByColumnsButton) {
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
                          onChange={() =>
                            this.props.onColumnsChanged(col, !col.hidden)
                          }
                        />
                        <span>{col.title}</span>
                      </MenuItem>
                    </li>
                  );
                }
                return null;
              })}
            </Menu>
          </span>
        )}
        {this.props.exportButton && (
          <span>
            <Tooltip title={localization.exportTitle}>
              <IconButton
                color="inherit"
                onClick={(event) =>
                  this.setState({
                    exportButtonAnchorEl: event.currentTarget,
                  })
                }
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
                {localization.exportCSVName}
              </MenuItem>
              <MenuItem key="export-pdf" onClick={this.exportPdf}>
                {localization.exportPDFName}
              </MenuItem>
            </Menu>
          </span>
        )}
        <span>
          <this.props.components.Actions
            actions={
              this.props.actions &&
              this.props.actions.filter((a) => a.position === "toolbar")
            }
            components={this.props.components}
          />
        </span>
      </div>
    );
  }

  renderSelectedActions() {
    return (
      <React.Fragment>
        <this.props.components.Actions
          actions={this.props.actions.filter(
            (a) => a.position === "toolbarOnSelect"
          )}
          data={this.props.selectedRows}
          components={this.props.components}
        />
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
            : this.renderDefaultActions()}
        </div>
      </div>
    );
  }

  renderToolbarTitle(title) {
    const { classes } = this.props;
    const toolBarTitle =
      typeof title === "string" ? (
        <Typography
          variant="h6"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>
      ) : (
        title
      );

    return <div className={classes.title}>{toolBarTitle}</div>;
  }

  render() {
    const { classes } = this.props;
    const localization = {
      ...MTableToolbar.defaultProps.localization,
      ...this.props.localization,
    };
    const title =
      this.props.showTextRowsSelected &&
      this.props.selectedRows &&
      this.props.selectedRows.length > 0
        ? typeof localization.nRowsSelected === "function"
          ? localization.nRowsSelected(this.props.selectedRows.length)
          : localization.nRowsSelected.replace(
              "{0}",
              this.props.selectedRows.length
            )
        : this.props.showTitle
        ? this.props.title
        : null;
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]:
            this.props.showTextRowsSelected &&
            this.props.selectedRows &&
            this.props.selectedRows.length > 0,
        })}
      >
        {title && this.renderToolbarTitle(title)}
        {this.props.searchFieldAlignment === "left" && this.renderSearch()}
        {this.props.toolbarButtonAlignment === "left" && this.renderActions()}
        <div className={classes.spacer} />
        {this.props.searchFieldAlignment === "right" && this.renderSearch()}
        {this.props.toolbarButtonAlignment === "right" && this.renderActions()}
      </Toolbar>
    );
  }
}

MTableToolbar.defaultProps = {
  actions: [],
  columns: [],
  columnsButton: false,
  localization: {
    addRemoveColumns: "Add or remove columns",
    nRowsSelected: "{0} row(s) selected",
    showColumnsTitle: "Show Columns",
    showColumnsAriaLabel: "Show Columns",
    exportTitle: "Export",
    exportAriaLabel: "Export",
    exportCSVName: "Export as CSV",
    exportPDFName: "Export as PDF",
    searchTooltip: "Search",
    searchPlaceholder: "Search",
    searchAriaLabel: "Search",
    clearSearchAriaLabel: "Clear Search",
  },
  search: true,
  showTitle: true,
  searchText: "",
  showTextRowsSelected: true,
  toolbarButtonAlignment: "right",
  searchAutoFocus: false,
  searchFieldAlignment: "right",
  searchFieldVariant: "standard",
  selectedRows: [],
  title: "No Title!",
};

MTableToolbar.propTypes = {
  actions: PropTypes.array,
  columns: PropTypes.array,
  columnsButton: PropTypes.bool,
  components: PropTypes.object.isRequired,
  getFieldValue: PropTypes.func.isRequired,
  localization: PropTypes.object.isRequired,
  onColumnsChanged: PropTypes.func.isRequired,
  dataManager: PropTypes.object.isRequired,
  searchText: PropTypes.string,
  onSearchChanged: PropTypes.func.isRequired,
  search: PropTypes.bool.isRequired,
  searchFieldStyle: PropTypes.object,
  searchFieldVariant: PropTypes.string,
  selectedRows: PropTypes.array,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  showTitle: PropTypes.bool.isRequired,
  showTextRowsSelected: PropTypes.bool.isRequired,
  toolbarButtonAlignment: PropTypes.string.isRequired,
  searchFieldAlignment: PropTypes.string.isRequired,
  renderData: PropTypes.array,
  data: PropTypes.array,
  exportAllData: PropTypes.bool,
  exportButton: PropTypes.bool,
  exportDelimiter: PropTypes.string,
  exportFileName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  exportCsv: PropTypes.func,
  exportPdf: PropTypes.func,
  classes: PropTypes.object,
  searchAutoFocus: PropTypes.bool,
};

export const styles = (theme) => ({
  root: {
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: "1 1 10%",
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    overflow: "hidden",
  },
  searchField: {
    minWidth: 150,
    paddingLeft: theme.spacing(2),
  },
  formControlLabel: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
});

export default withStyles(styles)(MTableToolbar);

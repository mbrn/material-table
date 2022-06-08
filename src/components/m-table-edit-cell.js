import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import CircularProgress from "@mui/material/CircularProgress";

class MTableEditCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      value: this.props.rowData[this.props.columnDef.field],
    };
  }

  getStyle = () => {
    let cellStyle = {
      boxShadow: "2px 0px 15px rgba(125,147,178,.25)",
      color: "inherit",
      width: this.props.columnDef.tableData.width,
      boxSizing: "border-box",
      fontSize: "inherit",
      fontFamily: "inherit",
      fontWeight: "inherit",
      px: 2,
    };

    if (typeof this.props.columnDef.cellStyle === "function") {
      cellStyle = {
        ...cellStyle,
        ...this.props.columnDef.cellStyle(this.state.value, this.props.rowData),
      };
    } else {
      cellStyle = { ...cellStyle, ...this.props.columnDef.cellStyle };
    }

    if (typeof this.props.cellEditable.cellStyle === "function") {
      cellStyle = {
        ...cellStyle,
        ...this.props.cellEditable.cellStyle(
          this.state.value,
          this.props.rowData,
          this.props.columnDef
        ),
      };
    } else {
      cellStyle = { ...cellStyle, ...this.props.cellEditable.cellStyle };
    }

    return cellStyle;
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.onApprove();
    } else if (e.keyCode === 27) {
      this.onCancel();
    }
  };

  onApprove = () => {
    this.setState({ isLoading: true }, () => {
      this.props.cellEditable
        .onCellEditApproved(
          this.state.value, // newValue
          this.props.rowData[this.props.columnDef.field], // oldValue
          this.props.rowData, // rowData with old value
          this.props.columnDef // columnDef
        )
        .then(() => {
          this.setState({ isLoading: false });
          this.props.onCellEditFinished(
            this.props.rowData,
            this.props.columnDef
          );
        })
        .catch((error) => {
          this.setState({ isLoading: false });
        });
    });
  };

  onCancel = () => {
    this.props.onCellEditFinished(this.props.rowData, this.props.columnDef);
  };

  renderActions() {
    if (this.state.isLoading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", width: 60 }}>
          <CircularProgress size={20} />
        </Box>
      );
    }

    const actions = [
      {
        icon: this.props.icons.Check,
        tooltip: this.props.localization.saveTooltip,
        onClick: this.onApprove,
        disabled: this.state.isLoading,
      },
      {
        icon: this.props.icons.Clear,
        tooltip: this.props.localization.cancelTooltip,
        onClick: this.onCancel,
        disabled: this.state.isLoading,
      },
    ];

    return (
      <this.props.components.Actions
        actions={actions}
        components={this.props.components}
        size="small"
      />
    );
  }

  render() {
    return (
      <TableCell size={this.props.size} sx={this.getStyle()} padding="none">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ flex: 1, mr: 0.5 }}>
            <this.props.components.EditField
              columnDef={this.props.columnDef}
              value={this.state.value}
              onChange={(value) => this.setState({ value })}
              onKeyDown={this.handleKeyDown}
              disabled={this.state.isLoading}
              autoFocus
            />
          </Box>
          {this.renderActions()}
        </Box>
      </TableCell>
    );
  }
}

MTableEditCell.defaultProps = {
  columnDef: {},
};

MTableEditCell.propTypes = {
  cellEditable: PropTypes.object.isRequired,
  columnDef: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  errorState: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  icons: PropTypes.object.isRequired,
  localization: PropTypes.object.isRequired,
  onCellEditFinished: PropTypes.func.isRequired,
  rowData: PropTypes.object.isRequired,
  size: PropTypes.string,
};

export default MTableEditCell;

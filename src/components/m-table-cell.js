/* eslint-disable no-unused-vars */
import * as React from "react";
import TableCell from "@material-ui/core/TableCell";
import PropTypes from "prop-types";
import parseISO from "date-fns/parseISO";
/* eslint-enable no-unused-vars */

/* eslint-disable no-useless-escape */
const isoDateRegex = /^\d{4}-(0[1-9]|1[0-2])-([12]\d|0[1-9]|3[01])([T\s](([01]\d|2[0-3])\:[0-5]\d|24\:00)(\:[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3])\:?([0-5]\d)?)?)?$/;
/* eslint-enable no-useless-escape */

export default class MTableCell extends React.Component {
  getRenderValue() {
    const dateLocale =
      this.props.columnDef.dateSetting &&
      this.props.columnDef.dateSetting.locale
        ? this.props.columnDef.dateSetting.locale
        : undefined;
    if (
      this.props.columnDef.emptyValue !== undefined &&
      (this.props.value === undefined || this.props.value === null)
    ) {
      return this.getEmptyValue(this.props.columnDef.emptyValue);
    }
    if (this.props.columnDef.render) {
      if (this.props.rowData) {
        return this.props.columnDef.render(this.props.rowData, "row");
      } else if (this.props.value) {
        return this.props.columnDef.render(this.props.value, "group");
      }
    } else if (this.props.columnDef.type === "boolean") {
      const style = { textAlign: "left", verticalAlign: "middle", width: 48 };
      if (this.props.value) {
        return <this.props.icons.Check style={style} />;
      } else {
        return <this.props.icons.ThirdStateCheck style={style} />;
      }
    } else if (this.props.columnDef.type === "date") {
      if (this.props.value instanceof Date) {
        return this.props.value.toLocaleDateString(dateLocale);
      } else if (isoDateRegex.exec(this.props.value)) {
        return parseISO(this.props.value).toLocaleDateString(dateLocale);
      } else {
        return this.props.value;
      }
    } else if (this.props.columnDef.type === "time") {
      if (this.props.value instanceof Date) {
        return this.props.value.toLocaleTimeString();
      } else if (isoDateRegex.exec(this.props.value)) {
        return parseISO(this.props.value).toLocaleTimeString(dateLocale);
      } else {
        return this.props.value;
      }
    } else if (this.props.columnDef.type === "datetime") {
      if (this.props.value instanceof Date) {
        return this.props.value.toLocaleString();
      } else if (isoDateRegex.exec(this.props.value)) {
        return parseISO(this.props.value).toLocaleString(dateLocale);
      } else {
        return this.props.value;
      }
    } else if (this.props.columnDef.type === "currency") {
      return this.getCurrencyValue(
        this.props.columnDef.currencySetting,
        this.props.value
      );
    } else if (typeof this.props.value === "boolean") {
      // To avoid forwardref boolean children.
      return this.props.value.toString();
    }

    return this.props.value;
  }

  getEmptyValue(emptyValue) {
    if (typeof emptyValue === "function") {
      return this.props.columnDef.emptyValue(this.props.rowData);
    } else {
      return emptyValue;
    }
  }

  getCurrencyValue(currencySetting, value) {
    if (currencySetting !== undefined) {
      return new Intl.NumberFormat(
        currencySetting.locale !== undefined ? currencySetting.locale : "en-US",
        {
          style: "currency",
          currency:
            currencySetting.currencyCode !== undefined
              ? currencySetting.currencyCode
              : "USD",
          minimumFractionDigits:
            currencySetting.minimumFractionDigits !== undefined
              ? currencySetting.minimumFractionDigits
              : 2,
          maximumFractionDigits:
            currencySetting.maximumFractionDigits !== undefined
              ? currencySetting.maximumFractionDigits
              : 2,
        }
      ).format(value !== undefined ? value : 0);
    } else {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value !== undefined ? value : 0);
    }
  }

  handleClickCell = (e) => {
    if (this.props.columnDef.disableClick) {
      e.stopPropagation();
    }
  };

  getStyle = () => {
    let cellStyle = {
      color: "inherit",
      width: this.props.columnDef.tableData.width,
      boxSizing: "border-box",
      fontSize: "inherit",
      fontFamily: "inherit",
      fontWeight: "inherit",
    };

    if (typeof this.props.columnDef.cellStyle === "function") {
      cellStyle = {
        ...cellStyle,
        ...this.props.columnDef.cellStyle(this.props.value, this.props.rowData),
      };
    } else {
      cellStyle = { ...cellStyle, ...this.props.columnDef.cellStyle };
    }

    if (this.props.columnDef.disableClick) {
      cellStyle.cursor = "default";
    }

    return { ...this.props.style, ...cellStyle };
  };

  render() {
    const { icons, columnDef, rowData, errorState, ...cellProps } = this.props;
    const cellAlignment =
      columnDef.align !== undefined
        ? columnDef.align
        : ["numeric", "currency"].indexOf(this.props.columnDef.type) !== -1
        ? "right"
        : "left";
    return (
      <TableCell
        size={this.props.size}
        {...cellProps}
        style={this.getStyle()}
        align={cellAlignment}
        onClick={this.handleClickCell}
      >
        {this.props.children}
        {this.getRenderValue()}
      </TableCell>
    );
  }
}

MTableCell.defaultProps = {
  columnDef: {},
  value: undefined,
};

MTableCell.propTypes = {
  columnDef: PropTypes.object.isRequired,
  value: PropTypes.any,
  rowData: PropTypes.object,
  errorState: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

import * as React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import PropTypes from "prop-types";

function MTableSummaryRow({ data, columns, currentData, renderSummaryRow }) {
  if (!renderSummaryRow) {
    return null;
  }
  return (
    <TableRow>
      {columns.map((column, index) => {
        const summaryColumn = renderSummaryRow({
          index,
          column,
          data,
          currentData,
          columns,
        });
        let value = "";
        let style = {};
        if (summaryColumn && summaryColumn.value) {
          value = summaryColumn.value;
          style = summaryColumn.style;
        } else {
          value = summaryColumn;
        }
        return (
          <TableCell key={index} style={style}>
            {value}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

MTableSummaryRow.propTypes = {
  data: PropTypes.array,
  currentData: PropTypes.array,
  columns: PropTypes.array,
  renderSummaryRow: PropTypes.func,
};

export { MTableSummaryRow };

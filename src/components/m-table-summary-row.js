import * as React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import PropTypes from "prop-types";

function MTableSummaryRow({ data, columns, currentData, renderSummaryRow }) {
  if (!renderSummaryRow) {
    return null;
  }
  return (
    <TableRow>
      {columns.map((column, index) => (
        <TableCell key={index}>
          {renderSummaryRow({ index, column, data, currentData, columns })}
        </TableCell>
      ))}
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

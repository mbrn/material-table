import * as React from "react";
import TableCell from "@material-ui/core/TableCell";
import Fab from "@material-ui/core/Fab";
import PropTypes from "prop-types";

export const SelectionCount = ({ size, children }) => {
  return (
    <TableCell
      style={{
        right: "-1em",
        top: "-2em",
        position: "absolute",
        borderBottom: "none",
      }}
    >
      {" "}
      <Fab
        size="small"
        color="secondary"
        aria-label="selectedCount"
        style={{
          height: `${size}px`,
          width: `${size}px`,
          lineHeight: `${size}px`,
          fontSize: "0.8rem",
          textAlign: "center",
        }}
      >
        {children}
      </Fab>
    </TableCell>
  );
};

SelectionCount.defaultProps = {
  size: 32,
  children: 1,
};

SelectionCount.propTypes = {
  size: PropTypes.number,
  children: PropTypes.number,
};

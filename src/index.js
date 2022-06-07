import "./utils/polyfill";
import React from "react";
import { useTheme } from "@mui/material";
import { defaultProps } from "./default-props";
import { propTypes } from "./prop-types";
import MaterialTable from "./material-table";

MaterialTable.defaultProps = defaultProps;
MaterialTable.propTypes = propTypes;

export { MaterialTable as MTable };

export default function StyledMaterialTable(props) {
  const theme = useTheme();
  return <MaterialTable {...props} theme={theme} ref={props.tableRef} />;
}
export * from "./components";

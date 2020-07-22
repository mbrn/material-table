/* eslint-disable no-unused-vars */
import * as React from "react";
import PropTypes from "prop-types";
/* eslint-enable no-unused-vars */

export default class MTableCellEditField extends React.Component {
  render() {
    return "editing";
  }
}

MTableCellEditField.defaultProps = {
  columnDef: {},
  value: undefined,
};

MTableCellEditField.propTypes = {
  columnDef: PropTypes.object.isRequired,
  value: PropTypes.any,
  rowData: PropTypes.object,
  errorState: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

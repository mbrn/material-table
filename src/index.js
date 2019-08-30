import "./utils/polyfill";
import React from 'react';
import { defaultProps } from './default-props';
import { propTypes } from './prop-types';
import MaterialTable from './material-table';
import withStyles from '@material-ui/core/styles/withStyles';

MaterialTable.defaultProps = defaultProps;
MaterialTable.propTypes = propTypes;

export { MaterialTable as MTable };

const styles = theme => ({
  paginationRoot: {
    width: '100%'
  },
  paginationToolbar: {
    padding: 0,
    width: '100%'
  },
  paginationCaption: {
    display: 'none'
  },
  paginationSelectRoot: {
    margin: 0
  }
});


export default withStyles(styles, { withTheme: true })(props => <MaterialTable {...props} ref={props.tableRef} />);
export * from './components';

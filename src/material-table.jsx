import * as React from 'react'
import PropTypes from 'prop-types';
import MTableToolbar from './m-table-toolbar'
import {
  Checkbox, Paper, Table,
  TableHead, TableBody, TableRow,
  TableCell, withStyles
} from '@material-ui/core'

class MaterialTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  renderHeader() {
    return (
      <TableHead>
        <TableRow>
          {this.props.columns.map(columnDef => (
            <TableCell numeric={columnDef.isNumeric}>{columnDef.title}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  renderBody() {
    return (
      <TableBody>
        {this.props.data.map(data => (this.renderRow(data)))}
      </TableBody>
    );
  }

  renderRow(data) {
    return (
      <TableRow>
        {this.props.columns.map(columnDef => {
          const value = data[columnDef.field];
          return <TableCell numeric={columnDef.isNumeric}>{value}</TableCell>
        })}
      </TableRow>
    );
  }

  render() {
    const { classes, columns, data } = this.props;

    return (
      <Paper className={classes.root}>
        {this.props.options.toolbar && <MTableToolbar {...this.props.options.toolbar}/>}
        <Table className={classes.table}>
          {this.renderHeader()}
          {this.renderBody()}
        </Table>
      </Paper>
    );
  }
}

MaterialTable.defaultProps = {
  classes: {},
  columns: [],
  data: [],  
  options: {    
    selection: false,            
    toolbar: true
  }
}

MaterialTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  options: PropTypes.object
}

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

export default withStyles(styles)(MaterialTable)
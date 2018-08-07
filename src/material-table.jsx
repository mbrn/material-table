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
      columns: this.props.columns
    }
  }

  renderHeader() {
    return (
      <TableHead>
        <TableRow>
          {this.state.columns.filter(columnDef => {return !columnDef.hidden}).map(columnDef => (
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
        {this.state.columns.filter(columnDef => {return !columnDef.hidden}).map(columnDef => {
          const value = data[columnDef.field];
          return <TableCell numeric={columnDef.isNumeric}>{value}</TableCell>
        })}
      </TableRow>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        {this.props.options.toolbar && 
          <MTableToolbar 
            {...this.props.options.toolbar} 
            columns={this.state.columns}
            onColumnsChanged={columns => this.setState({columns})}
          />
        }
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
    toolbar: false,
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
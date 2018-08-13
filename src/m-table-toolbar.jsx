/* eslint-disable no-unused-vars */
import * as React from 'react';
import classNames from 'classnames';
import MTableActions from './m-table-actions';
import PropTypes from 'prop-types';
import {
  Icon, IconButton, Menu, List, ListItem,
  MenuItem, Toolbar, Tooltip,
  Typography, withStyles, Checkbox,
  FormControlLabel, TextField, InputAdornment
} from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
/* eslint-enable no-unused-vars */

class MTableToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnsButtonAnchorEl: null
    };
  }

  renderSelectedActions() {
    return <MTableActions actions={this.props.actions} data={this.props.selectedRows}/>;
  }

  renderDefaultActions() {
    return (
      <div>
        {this.props.search &&
          <TextField
            value={this.props.searchText}
            onChange={event => this.props.onSearchChanged(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>search</Icon>
                </InputAdornment>
              )
            }}
          />
        }
        {this.props.columnsButton &&
          <div>
            <Tooltip title="Show Columns">
              <IconButton
                onClick={event => this.setState({ columnsButtonAnchorEl: event.currentTarget }) }
                aria-label="Show Columns">
                <Icon>view_column</Icon>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={this.state.columnsButtonAnchorEl}
              open={Boolean(this.state.columnsButtonAnchorEl)}
              onClose={() => this.setState({ columnsButtonAnchorEl: null }) }>

              {
                this.props.columns.map((col, index) => {
                  return (
                    <MenuItem>
                      <FormControlLabel
                        label={col.title}
                        control={
                          <Checkbox
                            checked={!col.hidden}
                            onChange={(event, checked) => {
                              const columns = this.props.columns;
                              columns[index].hidden = !checked;
                              this.props.onColumnsChanged(columns);
                            }
                          }/>
                        }
                      />
                    </MenuItem>
                  );
                })
              }
            </Menu>
          </div>
        }
      </div>
    );
  }

  renderActions() {
    return (
      <div>
        {this.props.selectedRows
          ? this.renderSelectedActions()
          : this.renderDefaultActions()
        }
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const title = this.props.selectedRows ? this.props.selectedRows.length + ' row(s) selected' : this.props.title;
    return (
      <Toolbar className={classNames(classes.root, {[classes.highlight]: this.props.selectedRows})}>
        <div className={classes.title}>
          <Typography variant="title">
            {title}asd
          </Typography>
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {this.renderActions()}
        </div>
      </Toolbar>
    );
  }
}

MTableToolbar.defaultProps = {
  actions: [],
  columns: [],
  search: true,
  columnsButton: false,
  title: 'No Title!'

};

MTableToolbar.propTypes = {
  actions: PropTypes.array,
  columns: PropTypes.array,
  columnsButton: PropTypes.bool,
  title: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  spacer: {
    flex: '1 1 10%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  }
});

export default withStyles(styles)(MTableToolbar);

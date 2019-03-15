/* eslint-disable no-unused-vars */
import { Icon, IconButton, withStyles, Tooltip, Hidden, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as React from 'react';
/* eslint-enable no-unused-vars */

class MTablePaginationInner extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleNumberButtonClick = number => event => {
    this.props.onChangePage(event, number);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    );
  };

  render() {
    const { classes, count, page, rowsPerPage } = this.props;
    
    const localization = { ...MTablePaginationInner.defaultProps.localization, ...this.props.localization };
    const maxPages = Math.ceil(count / rowsPerPage) - 1;
    return (
      <div className={classes.root}>
        <Tooltip title={localization.previousTooltip}>
          <span>
            <IconButton
              onClick={this.handleBackButtonClick}
              disabled={page === 0}
              aria-label={localization.previousAriaLabel}
            >
              <this.props.icons.PreviousPage/>
            </IconButton>
          </span>
        </Tooltip>
        <Hidden smDown={true}>
          <span>
            <IconButton
              onClick={this.handleFirstPageButtonClick}
              aria-label={localization.firstAriaLabel}
            ><Typography variant={page === 0 ? 'h6' : 'body1'}>0</Typography></IconButton></span>
            {page > 2 && <span>..</span>}  
            {page > 1 && <span><IconButton
                onClick={this.handleNumberButtonClick(page-1)}
                aria-label={localization.lastAriaLabel}
              ><Typography variant='body1'>{page -1}</Typography></IconButton></span>}   
            {page > 0 && page < maxPages &&<span> <IconButton
                onClick={this.handleNumberButtonClick(page)}
                aria-label={localization.lastAriaLabel}
              >
              <Typography variant='h6'>{page}</Typography>
            </IconButton></span>}    
            {page < maxPages -1 && <span><IconButton
                onClick={this.handleNumberButtonClick(page+1)}
                aria-label={localization.lastAriaLabel}
              ><Typography variant='body1'>{page +1}</Typography></IconButton></span>}  
              {page < maxPages -1 && <span>..</span>}  
            <span> <IconButton
                onClick={this.handleLastPageButtonClick}
                aria-label={localization.lastAriaLabel}
              >
              <Typography variant={page === maxPages ? 'h6' : 'body1'}>{maxPages}</Typography>
            </IconButton></span>
        </Hidden>
        <Tooltip title={localization.nextTooltip}>
          <span>
            <IconButton
              onClick={this.handleNextButtonClick}
              disabled={page >= maxPages}
              aria-label={localization.nextAriaLabel}
            >
              <this.props.icons.NextPage/>
            </IconButton>
          </span>
        </Tooltip>
      </div>
    );
  }
}

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});

MTablePaginationInner.propTypes = {
  onChangePage: PropTypes.func,
  page: PropTypes.number,
  count: PropTypes.number,
  rowsPerPage: PropTypes.number,
  classes: PropTypes.object,
  localization: PropTypes.object
};

MTablePaginationInner.defaultProps = {
  localization: {
    firstTooltip: 'First Page',
    previousTooltip: 'Previous Page',
    nextTooltip: 'Next Page',
    lastTooltip: 'Last Page',
    labelDisplayedRows: '{from}-{to} of {count}',
    labelRowsPerPage: 'Rows per page:'
  }
};

const MTablePagination = withStyles(actionsStyles, { withTheme: true })(MTablePaginationInner);

export default MTablePagination;

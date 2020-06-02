/* eslint-disable no-unused-vars */
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
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

  renderPagesButton(start, end) {
    const buttons = [];

    for (let p = start; p <= end; p++) {
      const buttonVariant = p === this.props.page ? "contained" : "text";
      buttons.push(
        <Button
            size="small"
            style={{
            boxShadow: 'none',
            maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'
          }}
            disabled={p === this.props.page}
            variant={buttonVariant}
            onClick={this.handleNumberButtonClick(p)}
            key={p}
        >
          {p + 1}
        </Button>
      );
    }

    return <span>{buttons}</span>;
  }

  render() {
    const { classes, count, page, rowsPerPage, theme, showFirstLastPageButtons } = this.props;

    const localization = { ...MTablePaginationInner.defaultProps.localization, ...this.props.localization };
    const maxPages = Math.ceil(count / rowsPerPage) - 1;

    const pageStart = Math.max(page - 1, 0);
    const pageEnd = Math.min(maxPages, page + 1);

    return (
      <div className={classes.root}>
      {showFirstLastPageButtons &&
        <Tooltip title={localization.firstTooltip}>
            <span>
              <IconButton
                  onClick={this.handleFirstPageButtonClick}
                  disabled={page === 0}
                  aria-label={localization.firstAriaLabel}
              >
                {theme.direction === 'rtl' ? <this.props.icons.LastPage /> : <this.props.icons.FirstPage />}
              </IconButton>
            </span>
        </Tooltip>
        }
        <Tooltip title={localization.previousTooltip}>
          <span>
            <IconButton
                onClick={this.handleBackButtonClick}
                disabled={page === 0}
                aria-label={localization.previousAriaLabel}
            >
              <this.props.icons.PreviousPage />
            </IconButton>
          </span>
        </Tooltip>
        <Hidden smDown>
          {this.renderPagesButton(pageStart, pageEnd)}
        </Hidden>
        <Tooltip title={localization.nextTooltip}>
          <span>
            <IconButton
                onClick={this.handleNextButtonClick}
                disabled={page >= maxPages}
                aria-label={localization.nextAriaLabel}
            >
              <this.props.icons.NextPage />
            </IconButton>
          </span>
        </Tooltip>
      {showFirstLastPageButtons &&
        <Tooltip title={localization.lastTooltip}>
            <span>
              <IconButton
                  onClick={this.handleLastPageButtonClick}
                  disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                  aria-label={localization.lastAriaLabel}
              >
                {theme.direction === 'rtl' ? <this.props.icons.FirstPage /> : <this.props.icons.LastPage />}
              </IconButton>
            </span>
        </Tooltip>
      }
      </div>
    );
  }
}

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5)
  }
});

MTablePaginationInner.propTypes = {
  classes: PropTypes.object,
  count: PropTypes.number,
  localization: PropTypes.object,
  onChangePage: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  showFirstLastPageButtons: PropTypes.bool,
  theme: PropTypes.any
};

MTablePaginationInner.defaultProps = {
  showFirstLastPageButtons: true,
  localization: {
    firstTooltip: 'First Page',
    previousTooltip: 'Previous Page',
    nextTooltip: 'Next Page',
    lastTooltip: 'Last Page',
    labelDisplayedRows: '{from}-{to} of {count}',
    labelRowsPerPage: 'Rows per page:'
  }
};

const MTableSteppedPagination = withStyles(actionsStyles, { withTheme: true })(MTablePaginationInner);

export default MTableSteppedPagination;

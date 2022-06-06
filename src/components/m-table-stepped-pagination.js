import * as React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Hidden,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";

const MTableSteppedPagination = (props) => {
  const theme = useTheme();

  const {
    count,
    page,
    rowsPerPage,
    icons,
    onPageChange,
    showFirstLastPageButtons,
    localization: localizationProp,
  } = props;

  const maxPages = Math.ceil(count / rowsPerPage) - 1;
  const pageStart = Math.max(page - 1, 0);
  const pageEnd = Math.min(maxPages, page + 1);

  const localization = {
    ...MTableSteppedPagination.defaultProps.localization,
    ...localizationProp,
  };

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleNumberButtonClick = (number) => (event) => {
    onPageChange(event, number);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  const renderPagesButton = (start, end) => {
    const buttons = [];

    for (let p = start; p <= end; p++) {
      const buttonVariant = p === page ? "contained" : "text";
      buttons.push(
        <Button
          size="small"
          sx={{
            boxShadow: 0,
            maxWidth: 30,
            maxHeight: 30,
            minWidth: 30,
            minHeight: 30,
          }}
          disabled={p === page}
          variant={buttonVariant}
          onClick={handleNumberButtonClick(p)}
          key={p}
        >
          {p + 1}
        </Button>
      );
    }

    return <span>{buttons}</span>;
  };

  return (
    <Box
      sx={{
        flexShrink: 0,
        color: "text.secondary",
        ml: 2.5,
      }}
    >
      {showFirstLastPageButtons && (
        <Tooltip title={localization.firstTooltip}>
          <span>
            <IconButton
              onClick={handleFirstPageButtonClick}
              disabled={page === 0}
              aria-label={localization.firstAriaLabel}
              size="large"
            >
              {theme.direction === "rtl" ? (
                <icons.LastPage />
              ) : (
                <icons.FirstPage />
              )}
            </IconButton>
          </span>
        </Tooltip>
      )}
      <Tooltip title={localization.previousTooltip}>
        <span>
          <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            aria-label={localization.previousAriaLabel}
            size="large"
          >
            <icons.PreviousPage />
          </IconButton>
        </span>
      </Tooltip>
      <Hidden mdDown={true}>{renderPagesButton(pageStart, pageEnd)}</Hidden>
      <Tooltip title={localization.nextTooltip}>
        <span>
          <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= maxPages}
            aria-label={localization.nextAriaLabel}
            size="large"
          >
            <icons.NextPage />
          </IconButton>
        </span>
      </Tooltip>
      {showFirstLastPageButtons && (
        <Tooltip title={localization.lastTooltip}>
          <span>
            <IconButton
              onClick={handleLastPageButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label={localization.lastAriaLabel}
              size="large"
            >
              {theme.direction === "rtl" ? (
                <icons.FirstPage />
              ) : (
                <icons.LastPage />
              )}
            </IconButton>
          </span>
        </Tooltip>
      )}
    </Box>
  );
};

MTableSteppedPagination.propTypes = {
  onPageChange: PropTypes.func,
  page: PropTypes.number,
  count: PropTypes.number,
  rowsPerPage: PropTypes.number,
  localization: PropTypes.object,
  icons: PropTypes.object,
  showFirstLastPageButtons: PropTypes.bool,
};

MTableSteppedPagination.defaultProps = {
  showFirstLastPageButtons: true,
  localization: {
    firstTooltip: "First Page",
    previousTooltip: "Previous Page",
    nextTooltip: "Next Page",
    lastTooltip: "Last Page",
    labelDisplayedRows: "{from}-{to} of {count}",
    labelRowsPerPage: "Rows per page:",
  },
};

export default MTableSteppedPagination;

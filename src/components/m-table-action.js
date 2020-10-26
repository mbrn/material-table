/* eslint-disable no-unused-vars */
import * as React from "react";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
/* eslint-enable no-unused-vars */

class MTableAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltip: this.props.action.tooltip,
    };
  }

  render() {
    let action = this.props.action;

    if (typeof action === "function") {
      action = action(this.props.data);
      if (!action) {
        return null;
      }
    }

    if (action.action) {
      action = action.action(this.props.data);
      if (!action) {
        return null;
      }
    }

    if (action.hidden) {
      return null;
    }

    const disabled = action.disabled || this.props.disabled;

    const tooltip = this.state.tooltip ? this.state.tooltip : action.tooltip;

    const handleTooltipClose = () => {
      setTooltipMessage(action.tooltip);
    };

    const setTooltipMessage = (tooltipMessage) => {
      this.setState({ tooltip: tooltipMessage });
    };

    const handleOnClick = (event) => {
      if (action.onClick) {
        action.onClick(event, this.props.data);
        if (action.tooltipAfterClick)
          setTooltipMessage(action.tooltipAfterClick);
        event.stopPropagation();
      }
    };

    const icon =
      typeof action.icon === "string" ? (
        <Icon {...action.iconProps}>{action.icon}</Icon>
      ) : typeof action.icon === "function" ? (
        action.icon({ ...action.iconProps, disabled: disabled })
      ) : (
        <action.icon />
      );

    const button = (
      <IconButton
        size={this.props.size}
        color="inherit"
        disabled={disabled}
        onClick={handleOnClick}
      >
        {icon}
      </IconButton>
    );

    if (tooltip) {
      // fix for issue #1049
      // https://github.com/mbrn/material-table/issues/1049
      return disabled ? (
        <Tooltip title={tooltip}>
          <span>{button}</span>
        </Tooltip>
      ) : (
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip onClose={handleTooltipClose} title={tooltip}>
            {button}
          </Tooltip>
        </ClickAwayListener>
      );
    } else {
      return button;
    }
  }
}

MTableAction.defaultProps = {
  action: {},
  data: {},
};

MTableAction.propTypes = {
  action: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  disabled: PropTypes.bool,
  size: PropTypes.string,
};

export default MTableAction;

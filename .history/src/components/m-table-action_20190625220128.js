/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Icon, IconButton, Tooltip } from '@material-ui/core';
/* eslint-enable no-unused-vars */

class MTableAction extends React.Component {
  render() {
    let action = this.props.action;
    if (typeof action === 'function') {
      action = action(this.props.data);
      if (!action) {
        return null;
      }
    }

    if (action.hidden) {
      return null;
    }

    const handleOnClick = event => {
      if (action.onClick) {
        action.onClick(event, this.props.data);
        event.stopPropagation();
      }
    };

    const button = (
      <span>
        <IconButton
          size={this.props.size}
          color="inherit"
          disabled={action.disabled}
          onClick={(event) => handleOnClick(event)}
          { ...(action.iconButtonProps || {}) }
        >
          {typeof action.icon === "string" ? (
            <Icon {...action.iconProps} fontSize="small">{action.icon}</Icon>
          ) : (
              <action.icon
                {...action.iconProps}
                disabled={action.disabled}
              />
            )
          }
        </IconButton>
      </span>
    );

    if (action.tooltip) {
      return <Tooltip title={action.tooltip}>{button}</Tooltip>;
    } else {
      return button;
    }
  }
}

MTableAction.defaultProps = {
  action: {},
  data: {}
};

MTableAction.propTypes = {
  action: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
  size: PropTypes.string
};

export default MTableAction;

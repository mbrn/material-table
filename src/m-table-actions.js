/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Icon, IconButton, Tooltip } from '@material-ui/core';
/* eslint-enable no-unused-vars */

class MTableActions extends React.Component {
  renderButton(action, index) {
    if (typeof action === 'function') {
      action = action(this.props.data);
      if (!action) {
        return null;
      }
    }

    const button = (
      <div>
        <IconButton
          key={action.icon + '' + index}
          color="inherit"
          disabled={action.disabled}
          onClick={(event) => {
            if (action.onClick) {
              action.onClick(event, this.props.data);
              event.stopPropagation();
            }
          }}
        >
          {typeof action.icon === "string" ?
            <Icon {...action.iconProps}>{action.icon}</Icon>
            :
            <action.icon {...action.iconProps} />
          }
        </IconButton>
      </div>
    );

    if (action.tooltip) {
      return <Tooltip title={action.tooltip} key={action.tooltip + '' + index}>{button}</Tooltip>;
    } else {
      return button;
    }
  }

  render() {
    if (this.props.actions) {
      return this.props.actions.map((action, index) => (this.renderButton(action, index)));
    }

    return null;
  }
}

MTableActions.defaultProps = {
  actions: [],
  data: {}
};

MTableActions.propTypes = {
  actions: PropTypes.array.isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)])
};

export default MTableActions;

/* eslint-disable no-unused-vars */
import * as React from 'react';
import {
  Icon, IconButton, Tooltip
} from '@material-ui/core';
/* eslint-enable no-unused-vars */

class MTableActions extends React.Component {
  renderButton(action) {
    if (typeof action === 'function') {
      action = action(this.props.data);
      if (!action) {
        return null;
      }
    }

    const button = (
      <IconButton
        disabled={action.disabled}
        onClick={(event) => action.onClick && action.onClick(event, this.props.data)}
      >
        <Icon>{action.icon}</Icon>
      </IconButton>
    );

    if (action.tooltip) {
      return <Tooltip title={action.tooltip}>{button}</Tooltip>;
    } else {
      return button;
    }
  }

  render() {
    if (this.props.actions) {
      return (
        <div style={{display: 'flex'}}>
          {this.props.actions.map(action => (this.renderButton(action)))}
        </div>
      );
    }

    return null;
  }
}

export default MTableActions;

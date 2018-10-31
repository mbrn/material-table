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
      <IconButton
        key={action.icon + "" + index}
        disabled={action.disabled}
        onClick={(event) => action.onClick && action.onClick(event, this.props.data)}
      >
        <Icon {...action.iconProps}>{action.icon}</Icon>
      </IconButton>
    );

    if (action.tooltip && !action.disabled) {
      return <Tooltip title={action.tooltip} key={action.tooltip + "" + index}>{button}</Tooltip>;
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
  data: PropTypes.object.isRequired
};

export default MTableActions;

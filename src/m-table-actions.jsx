import * as React from 'react'
import {
  Icon, IconButton, Tooltip
} from '@material-ui/core'

class MTableActions extends React.Component {  

  renderButton(action) {
    const button = (
      <IconButton
        onClick={(event) => action.action && action.action(event, this.props.data)}
      >
        <Icon>{action.icon}</Icon>
      </IconButton>
    );

    if(action.tooltip) {
      return <Tooltip title={action.tooltip}>{button}</Tooltip>
    }
    else {
      return button;
    }
  }

  render() {
    if(this.props.actions) {
      return this.props.actions.map(action => (this.renderButton(action)));
    }

    return null
  }
}

export default MTableActions

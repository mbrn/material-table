import * as React from 'react'
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { 
  Icon, IconButton, Toolbar, 
  Tooltip, Typography, withStyles 
} from '@material-ui/core'

class MTableToolbar extends React.Component {
  render() {
    const { classes } = this.props;    
    return (
      <Toolbar className={classNames(classes.root)}>
        <div className={classes.title}>
          <Typography variant="title">
            {this.props.title}
          </Typography>            
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {/* <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <Icon>delete</Icon>
            </IconButton>
          </Tooltip> */}
        </div>
      </Toolbar>
    );
  }
}

MTableToolbar.defaultProps = {
  title: 'No Title!'
}

MTableToolbar.propTypes = {
  title: PropTypes.string.isRequired
}

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  // highlight:
  //   theme.palette.type === 'light'
  //     ? {
  //         color: theme.palette.secondary.main,
  //         backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  //       }
  //     : {
  //         color: theme.palette.text.primary,
  //         backgroundColor: theme.palette.secondary.dark,
  //       },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

export default withStyles(styles)(MTableToolbar)
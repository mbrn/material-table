/* eslint-disable no-unused-vars */
import { Toolbar, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as React from 'react';
/* eslint-enable no-unused-vars */


class MTableGroupbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const localization = { ...MTableGroupbar.defaultProps.localization, ...this.props.localization };
    return (
      <Toolbar>
        {this.props.groupColumns.map(columnDef => {
          return (
            <Button 
              color="inherit" 
              variant="contained"
              style={{ textTransform: 'none', marginRight: 10, boxShadow: 'none' }}
            >
              {columnDef.title}
            </Button>
          )
        })}
      </Toolbar>
    );
  }
}

MTableGroupbar.defaultProps = {
};

MTableGroupbar.propTypes = {
};

export default MTableGroupbar;

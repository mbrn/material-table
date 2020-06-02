/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';
/* eslint-enable no-unused-vars */

class MTableActions extends React.Component {

  render() {
    if (this.props.actions) {
      return this.props.actions.map((action, index) => <this.props.components.Action action={action} key={"action-" + index} data={this.props.data} size={this.props.size} disabled={this.props.disabled} />);
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
  components: PropTypes.object.isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
  disabled: PropTypes.bool,
  size: PropTypes.string
};

export default MTableActions;

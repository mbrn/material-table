import PropTypes from 'prop-types';

export const MTableConditionalRender = ({ condition, wrapperSuccess, children, wrapperNotSuccess }) => {
  return condition ? wrapperSuccess(children) :
    wrapperNotSuccess ? wrapperNotSuccess(children)
      : children;
};

MTableConditionalRender.defaultProps = {
  condition: false,
};

MTableConditionalRender.propTypes = {
  condition: PropTypes.bool,
  wrapperSuccess: PropTypes.any,
  children: PropTypes.any.isRequired,
  wrapperNotSuccess: PropTypes.any,
};
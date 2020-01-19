// Imports
import React from 'react';
import PropTypes from 'prop-types';

// Component
const Preloader = props => {
  // console.log('props in Preloader: ', props);

  return (
    <div className="progress preloader">
      <div className="indeterminate" />
    </div>
  );
};

export default Preloader;

// Prop Types
Preloader.propTypes = {
  props: PropTypes.object,
};

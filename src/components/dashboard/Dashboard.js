// Imports
import React from 'react';
import PropTypes from 'prop-types';

// Component
const Dashboard = props => {
  // console.log('props in Dashboard: ', props);

  return (
    <div className="dashboard container">
      <div>
        <div className="center-text-align padding-bottom">
          Made with ❤ by{' '}
          <a
            href="https://www.linkedin.com/in/talluigi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="bold-text-style">Tal Luigi</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// Prop Types
Dashboard.propTypes = {
  props: PropTypes.object,
};

// Imports
import React from 'react';

import UserSelect from '../leaderboard/UserSelect';
import OrganizationSelect from '../leaderboard/OrganizationSelect';
import TeamSelect from '../leaderboard/TeamSelect';
import ContributorsGenerate from '../leaderboard/ContributorsGenerate';
import ContributorsDisplay from '../leaderboard/ContributorsDisplay';
import { generateStyle, displayStyle } from '../../styles';

// Component
const Dashboard = () => {
  return (
    <div className="dashboard container">
      <div>
        <div className="row">
          <div className="col s12 m3" style={generateStyle}>
            <UserSelect />
          </div>

          <div className="col s12 m3" style={generateStyle}>
            <OrganizationSelect />
          </div>

          <div className="col s12 m3" style={generateStyle}>
            <TeamSelect />
          </div>

          <div className="col s12 m3" style={generateStyle}>
            <ContributorsGenerate />
          </div>
        </div>

        <div className="row">
          <div className="col s12 m12" style={displayStyle}>
            <ContributorsDisplay />
          </div>
        </div>

        <div className="center-text-align padding-bottom">
          {'Made with ❤ by '}
          <a
            href="https://www.linkedin.com/in/talluigi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-style-bold">Tal Luigi</span>
          </a>
        </div>
      </div>
    </div>
  );
};

// Exports
export default Dashboard;

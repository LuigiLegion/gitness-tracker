/* eslint-disable react/button-has-type */

// Imports
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { clearedContributorsActionCreator } from '../../store/reducers/leaderboardReducer';
import {
  contributorsSorter,
  toastNotificationGenerator,
} from '../../helpers/index';

// Component
const DisplayContributors = ({
  contributors,
  isNotClearable,
  clearedContributorsAction,
}) => {
  contributorsSorter(contributors);

  const handleSubmit = event => {
    event.preventDefault();

    clearedContributorsAction();
    toastNotificationGenerator('Leaderboard Cleared Succesfully', 'green');
  };

  return (
    <div className="section center">
      <div className="card white center">
        <div className="card-content grey-text text-darken-3 center">
          <span className="card-title">
            <span className="bold-text-style">Commits Leaderboard</span>
          </span>

          <br />

          <div className="contributors">
            {contributors.length ? (
              <table className="striped centered">
                <thead>
                  <tr>
                    <th title="Leaderboard Rank">Rank</th>

                    <th title="GitHub Username">Username</th>

                    <th title="Total GitHub Commits">Score</th>
                  </tr>
                </thead>

                <tbody>
                  {contributors.map((curContributor, idx) => (
                    <tr key={curContributor.node.id}>
                      <td className="bold-text-style">{idx + 1}</td>

                      <td>
                        <a
                          className="events-time-and-rsvp-containee"
                          href={`https://github.com/${curContributor.node.login}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="bold-text-style">
                            {curContributor.node.login}
                          </span>
                        </a>
                      </td>

                      <td className="bold-text-style">
                        {
                          curContributor.node.contributionsCollection
                            .totalCommitContributions
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>Generate a leaderboard to populate this section.</div>
            )}
          </div>

          <br />

          <form className="clear-form" onSubmit={handleSubmit}>
            <button
              className="btn waves-effect waves-light grey darken-4"
              disabled={isNotClearable}
            >
              Clear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Container
const mapStateToProps = state => ({
  contributors: state.leaderboard.contributors,
  isNotClearable: state.leaderboard.isNotClearable,
});

const mapDispatchToProps = dispatch => ({
  clearedContributorsAction() {
    dispatch(clearedContributorsActionCreator());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayContributors);

// Prop Types
DisplayContributors.propTypes = {
  contributors: PropTypes.array,
  isNotClearable: PropTypes.bool,
  clearedContributorsAction: PropTypes.func,
};

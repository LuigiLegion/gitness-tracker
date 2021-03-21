/* eslint-disable react/button-has-type */

// Imports
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { clearedContributorsActionCreator } from '../../store';
import { contributorsSorter, toastNotification } from '../../utils';

// Component
const ContributorsDisplay = ({
  contributors,
  isNotClearable,
  clearedContributorsAction,
}) => {
  contributorsSorter(contributors);

  const handleClear = () => {
    clearedContributorsAction();
    toastNotification('Leaderboard Cleared Succesfully', 'green');
  };

  return (
    <div className="section center">
      <div className="card white center">
        <div className="card-content grey-text text-darken-3 center">
          <span className="card-title">
            <span className="text-style-bold">Commits Leaderboard</span>
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
                      <td className="text-style-bold">{idx + 1}</td>

                      <td>
                        <a
                          className="events-time-and-rsvp-containee"
                          href={`https://github.com/${curContributor.node.login}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="text-style-bold">
                            {curContributor.node.login}
                          </span>
                        </a>
                      </td>

                      <td className="text-style-bold">
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

          <button
            className="btn grey darken-4 waves-effect waves-light clear-button"
            type="button"
            disabled={isNotClearable}
            onClick={handleClear}
          >
            Clear
          </button>
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
  clearedContributorsAction: () => dispatch(clearedContributorsActionCreator()),
});

// Prop Types
ContributorsDisplay.propTypes = {
  contributors: PropTypes.array,
  isNotClearable: PropTypes.bool,
  clearedContributorsAction: PropTypes.func,
};

// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContributorsDisplay);

/* eslint-disable react/button-has-type */

// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { clearedContributorsActionCreator } from '../../store/reducers/leaderboardReducer';
import {
  contributorsSorter,
  toastNotificationGenerator,
} from '../../data/index';

// Component
class DisplayContributors extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { clearedContributorsAction } = this.props;

    clearedContributorsAction();

    toastNotificationGenerator('Leaderboard Cleared Succesfully', 'green');
  }

  render() {
    const { contributors, isNotClearable } = this.props;

    contributorsSorter(contributors);

    // console.log('contributors in DisplayContributors render: ', contributors);
    // console.log('isNotClearable in DisplayContributors render: ', isNotClearable);

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
                    {contributors.map((curContributor, idx) => {
                      const {
                        id,
                        login,
                        contributionsCollection,
                      } = curContributor.node;

                      return (
                        <tr key={id}>
                          <td>
                            <strong>{idx + 1}</strong>
                          </td>

                          <td>
                            <a
                              className="events-time-and-rsvp-containee"
                              href={`https://github.com/${login}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span>
                                <strong>{login}</strong>
                              </span>
                            </a>
                          </td>

                          <td>
                            <strong>
                              {contributionsCollection.totalCommitContributions}
                            </strong>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div>Generate a leaderboard to populate this section.</div>
              )}
            </div>

            <br />

            <form className="clear-form" onSubmit={this.handleSubmit}>
              <button
                className="btn black black-1 z-depth-0"
                disabled={isNotClearable}
              >
                Clear
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

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

/* eslint-disable react/button-has-type */

// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { clearedAllDataActionCreator } from '../../store/reducers/leaderboardReducer';

// Component
class DisplayContributors extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { clearedAllDataAction } = this.props;

    // console.log('clearedAllDataAction in DisplayContributors handleSubmit: ', clearedAllDataAction);

    clearedAllDataAction();
  }

  render() {
    const { contributors, disabledClear } = this.props;

    // console.log('contributors in DisplayContributors: ', DisplayContributors);
    // console.log('disabledClear in DisplayContributors: ', DisplayContributors);

    return (
      <div className="section center">
        <div className="card z-depth-0 center">
          <div className="card-content grey-text text-darken-3 center">
            <span className="card-title">
              <span className="bold-text-style">Contributors Leaderboard</span>
            </span>

            <div className="contributors">
              {contributors.length ? (
                <table className="striped centered">
                  <thead>
                    <tr>
                      <th>Rank</th>

                      <th>Username</th>

                      <th>Total</th>
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
                <div>Generate contributors to populate this leaderboard.</div>
              )}
            </div>

            <form className="clear-form" onSubmit={this.handleSubmit}>
              <button
                className="btn black black-1 z-depth-0"
                disabled={disabledClear}
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
  disabledClear: state.leaderboard.disabledClear,
});

const mapDispatchToProps = dispatch => ({
  clearedAllDataAction() {
    dispatch(clearedAllDataActionCreator());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayContributors);

// Prop Types
DisplayContributors.propTypes = {
  contributors: PropTypes.array,
  disabledClear: PropTypes.bool,
  clearedAllDataAction: PropTypes.func,
};

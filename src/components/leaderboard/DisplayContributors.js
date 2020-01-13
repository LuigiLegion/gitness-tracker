/* eslint-disable react/button-has-type */

// Imports
import React, { Component, Fragment } from 'react';
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
      <div className="section">
        <div className="card z-depth-0">
          <div className="card-content grey-text text-darken-3">
            <span className="card-title">
              <span className="bold-text-style">Contributors Leaderboard</span>
            </span>

            <ul className="contributors">
              {contributors.length ? (
                <Fragment>
                  {contributors.map((curContributor, idx) => {
                    const {
                      id,
                      login,
                      contributionsCollection,
                    } = curContributor.node;

                    return (
                      <li key={id}>
                        <span>
                          {`${idx + 1}. ${login} - ${
                            contributionsCollection.totalCommitContributions
                          }`}
                        </span>
                      </li>
                    );
                  })}
                </Fragment>
              ) : (
                <li>
                  <span>
                    Generate contributors to populate this leaderboard.
                  </span>
                </li>
              )}
            </ul>

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

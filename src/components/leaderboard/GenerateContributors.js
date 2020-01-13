/* eslint-disable react/button-has-type */

// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getTeamContributorsThunkCreator } from '../../store/reducers/leaderboardReducer';

// Component
export class GenerateContributors extends Component {
  constructor() {
    super();

    this.state = {
      team: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // console.log('event.target.id: ', event.target.id);
    // console.log('event.target.value: ', event.target.value);

    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSubmit(event) {
    // console.log('event.target.id: ', event.target.id);
    // console.log('event.target.value: ', event.target.value);

    event.preventDefault();

    const { team } = this.state;
    const { getTeamContributorsThunk } = this.props;

    // console.log('team in GenerateContributors handleSubmit: ', team);
    // console.log(
    //   'getTeamContributorsThunk in GenerateContributors handleSubmit: ',
    //   getTeamContributorsThunk
    // );

    getTeamContributorsThunk(team, '2020', '01');
  }

  render() {
    const { teams } = this.props;

    // console.log('teams in GenerateContributors: ', teams);

    return (
      <div className="container">
        <div className="section">
          <form onSubmit={this.handleSubmit} className="card white">
            <span className="card-title">
              <span className="gray-text-color bold-text-style">
                Generate Contributors
              </span>
            </span>

            <div className="input-field col s12">
              <label htmlFor="team">
                Teams<span className="red-text-color">*</span>
              </label>

              <br />
              <br />

              <select
                id="team"
                className="browser-default"
                required
                onChange={this.handleChange}
              >
                <option value="">Choose Team</option>

                {teams.length
                  ? teams.map(curTeam => (
                      <option key={curTeam.node.id} value={curTeam.node.slug}>
                        {curTeam.node.slug}
                      </option>
                    ))
                  : null}
              </select>
            </div>

            <button
              className="btn black lighten-1 z-depth-0"
              disabled={!this.state.team.length}
            >
              Generate (Team)
            </button>
          </form>
        </div>
      </div>
    );
  }
}

// Container
const mapStateToProps = state => ({
  teams: state.leaderboard.teams,
});

const mapDispatchToProps = dispatch => ({
  getTeamContributorsThunk(teamSlug, fullYear, fullMonth) {
    dispatch(getTeamContributorsThunkCreator(teamSlug, fullYear, fullMonth));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenerateContributors);

// Prop Types
GenerateContributors.propTypes = {
  teams: PropTypes.array,
  getTeamContributorsThunk: PropTypes.func,
};

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
      teamTime: '0',
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

    const { team, teamTime } = this.state;
    const { getTeamContributorsThunk } = this.props;

    // console.log('team in GenerateContributors handleSubmit: ', team);
    // console.log('teamTime in GenerateContributors handleSubmit: ', teamTime);
    // console.log('getTeamContributorsThunk in GenerateContributors handleSubmit: ', getTeamContributorsThunk);

    getTeamContributorsThunk(team, teamTime);
  }

  render() {
    const { teams } = this.props;

    // console.log('teams in GenerateContributors: ', teams);

    return (
      <div className="container center">
        <div className="section center">
          <form onSubmit={this.handleSubmit} className="card white center">
            <span className="card-title">
              <span className="gray-text-color bold-text-style">
                Generate Team Leaderboard
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

            <div className="input-field col s12">
              <label htmlFor="time">
                Times<span className="red-text-color">*</span>
              </label>

              <br />
              <br />

              <select
                id="teamTime"
                className="browser-default"
                required
                onChange={this.handleChange}
              >
                <option value="0">Choose Time</option>
                <option value="2629746000">Past Month</option>
                <option value="7889238000">Past 3 Months</option>
                <option value="15778476000">Past 6 Months</option>
                <option value="31556952000">Past Year</option>
              </select>
            </div>

            <br />

            <button
              className="btn black lighten-1 z-depth-0"
              disabled={!this.state.team.length || !Number(this.state.teamTime)}
            >
              Generate
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
  getTeamContributorsThunk(teamSlug, time) {
    dispatch(getTeamContributorsThunkCreator(teamSlug, time));
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

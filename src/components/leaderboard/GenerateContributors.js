/* eslint-disable react/button-has-type */

// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getOrganizationContributorsThunkCreator,
  getTeamContributorsThunkCreator,
} from '../../store/reducers/leaderboardReducer';

// Component
export class GenerateContributors extends Component {
  constructor() {
    super();

    this.state = {
      team: '',
      time: '0',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.organization !== this.props.organization) {
      this.setState({ team: '' });
    }
  }

  handleChange(event) {
    // console.log('event.target.id: ', event.target.id);
    // console.log('event.target.value: ', event.target.value);

    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleClick(event) {
    event.preventDefault();

    const { time } = this.state;
    const { organization, getOrganizationContributorsThunk } = this.props;

    // console.log('time in GenerateTeams handleClick: ', time);
    // console.log('organization in GenerateTeams handleClick: ', organization);
    // console.log('getOrganizationContributorsThunk in GenerateTeams handleClick: ', getOrganizationContributorsThunk);

    getOrganizationContributorsThunk(organization, time);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { team, time } = this.state;
    const { getTeamContributorsThunk } = this.props;

    // console.log('team in GenerateContributors handleSubmit: ', team);
    // console.log('time in GenerateContributors handleSubmit: ', time);
    // console.log('getTeamContributorsThunk in GenerateContributors handleSubmit: ', getTeamContributorsThunk);

    getTeamContributorsThunk(team, time);
  }

  render() {
    const { organization, teams } = this.props;

    // console.log('organization in GenerateContributors: ', organization);
    // console.log('teams in GenerateContributors: ', teams);

    return (
      <div className="container center">
        <div className="section center">
          <form onSubmit={this.handleSubmit} className="card white center">
            <span className="card-title">
              <span className="gray-text-color bold-text-style">
                Generate Leaderboard
              </span>
            </span>

            <br />

            <div className="input-field col s12">
              <label htmlFor="time">
                Time<span className="red-text-color">*</span>
              </label>

              <br />
              <br />

              <select
                id="time"
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

            <div className="col s12">
              <hr />

              <span className="card-title">
                <span className="gray-text-color bold-text-style">Team</span>
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
            </div>

            <br />

            <button
              className="btn black lighten-1 z-depth-0"
              disabled={
                !teams.length ||
                !this.state.team.length ||
                !Number(this.state.time)
              }
            >
              Generate
            </button>

            <br />

            <hr />

            <span className="card-title">
              <span className="gray-text-color bold-text-style">Org</span>
            </span>

            <br />
            <br />

            <span className="italic-text-style">
              {organization ? organization : 'Not Chosen Yet'}
            </span>

            <br />

            <button
              className="btn black lighten-1 z-depth-0"
              disabled={!organization.length || !Number(this.state.time)}
              onClick={this.handleClick}
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
  organization: state.leaderboard.organization,
  teams: state.leaderboard.teams,
});

const mapDispatchToProps = dispatch => ({
  getOrganizationContributorsThunk(organizationLogin, time) {
    dispatch(getOrganizationContributorsThunkCreator(organizationLogin, time));
  },
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
  organization: PropTypes.string,
  teams: PropTypes.array,
  getOrganizationContributorsThunk: PropTypes.func,
  getTeamContributorsThunk: PropTypes.func,
};

/* eslint-disable complexity */
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
      type: '',
      time: '0',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { type, time } = this.state;
    const { userLogin, organizationLogin, teamSlug } = this.props;

    // console.log('type in GenerateContributors componentDidUpdate: ', type);
    // console.log('time in GenerateContributors componentDidUpdate: ', time);
    // console.log('userLogin in GenerateContributors componentDidUpdate: ', userLogin);
    // console.log('organizationLogin in GenerateContributors componentDidUpdate: ', organizationLogin);
    // console.log('teamSlug in GenerateContributors componentDidUpdate: ', teamSlug);

    if (
      prevState.type !== type ||
      prevState.time !== time ||
      prevProps.userLogin !== userLogin ||
      prevProps.organizationLogin !== organizationLogin ||
      prevProps.teamSlug !== teamSlug
    ) {
      const userLoginCheck = type === 'user' && userLogin;
      const organizationLoginCheck =
        type === 'organization' && organizationLogin;
      const teamSlugCheck = type === 'team' && teamSlug;
      const timeCheck = Number(time);

      let newDisabledStatus = true;

      if (
        (userLoginCheck || organizationLoginCheck || teamSlugCheck) &&
        timeCheck
      ) {
        newDisabledStatus = false;
      }

      this.setState({
        disabled: newDisabledStatus,
      });
    }
  }

  handleChange(event) {
    // console.log('event.target.id: ', event.target.id);
    // console.log('event.target.value: ', event.target.value);

    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { type, time } = this.state;

    // console.log('type in GenerateContributors handleSubmit: ', type);
    // console.log('time in GenerateContributors handleSubmit: ', time);

    if (type === 'user') {
      const { userLogin } = this.props;

      console.log('userLogin in GenerateTeams handleSubmit: ', userLogin);
    } else if (type === 'organization') {
      const { getOrganizationContributorsThunk } = this.props;

      // console.log('getOrganizationContributorsThunk in GenerateTeams handleSubmit: ', getOrganizationContributorsThunk);

      getOrganizationContributorsThunk(time);
    } else if (type === 'team') {
      const { getTeamContributorsThunk } = this.props;

      // console.log('getTeamContributorsThunk in GenerateContributors handleSubmit: ', getTeamContributorsThunk);

      getTeamContributorsThunk(time);
    }
  }

  render() {
    return (
      <div className="container center">
        <div className="section center">
          <form onSubmit={this.handleSubmit} className="card white center">
            <span className="card-title">
              <span className="gray-text-color bold-text-style">Time</span>
            </span>

            <br />

            <div className="input-field col s12">
              <label htmlFor="type">
                Type<span className="red-text-color">*</span>
              </label>

              <br />
              <br />

              <select
                id="type"
                className="browser-default"
                required
                onChange={this.handleChange}
              >
                <option value="">Select Type</option>
                <option value="user">User</option>
                <option value="organization">Org</option>
                <option value="team">Team</option>
              </select>
            </div>

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
                <option value="0">Select Time</option>
                <option value="86400000">Past Day</option>
                <option value="604800000">Past Week</option>
                <option value="2629746000">Past Month</option>
                <option value="7889238000">Past 3 Months</option>
                <option value="15778476000">Past 6 Months</option>
                <option value="23667714000">Past 9 Months</option>
                <option value="31556952000">Past Year</option>
              </select>
            </div>

            <br />

            <button
              className="btn black lighten-1 z-depth-0"
              // disabled={!this.state.type.length || !Number(this.state.time)}
              disabled={this.state.disabled}
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
  userLogin: state.leaderboard.userLogin,
  organizationLogin: state.leaderboard.organizationLogin,
  teamSlug: state.leaderboard.teamSlug,
});

const mapDispatchToProps = dispatch => ({
  getOrganizationContributorsThunk(time) {
    dispatch(getOrganizationContributorsThunkCreator(time));
  },
  getTeamContributorsThunk(time) {
    dispatch(getTeamContributorsThunkCreator(time));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenerateContributors);

// Prop Types
GenerateContributors.propTypes = {
  userLogin: PropTypes.string,
  organizationLogin: PropTypes.string,
  teamSlug: PropTypes.string,
  getOrganizationContributorsThunk: PropTypes.func,
  getTeamContributorsThunk: PropTypes.func,
};

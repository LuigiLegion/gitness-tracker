/* eslint-disable react/button-has-type */

// Imports
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getUserContributionsThunkCreator,
  getOrganizationContributorsThunkCreator,
  getTeamContributorsThunkCreator,
} from '../../store/reducers/leaderboardReducer';

// Component
const GenerateContributors = ({
  userLogin,
  organizationLogin,
  teamSlug,
  getUserContributionsThunk,
  getOrganizationContributorsThunk,
  getTeamContributorsThunk,
}) => {
  const [state, setState] = useState({
    type: '',
    time: '0',
  });
  const [disabled, setSDisabled] = useState(true);

  useEffect(() => {
    const userLoginCheck = state.type === 'user' && userLogin;
    const organizationLoginCheck =
      state.type === 'organization' && organizationLogin;
    const teamSlugCheck = state.type === 'team' && teamSlug;
    const timeCheck = Number(state.time);

    let newDisabledStatus = true;
    if (
      (userLoginCheck || organizationLoginCheck || teamSlugCheck) &&
      timeCheck
    ) {
      newDisabledStatus = false;
    }

    setSDisabled(newDisabledStatus);
  }, [state, userLogin, organizationLogin, teamSlug]);

  const handleChange = event => {
    setState({
      ...state,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (state.type === 'user') {
      getUserContributionsThunk(state.time);
    } else if (state.type === 'organization') {
      getOrganizationContributorsThunk(state.time);
    } else if (state.type === 'team') {
      getTeamContributorsThunk(state.time);
    }
  };

  return (
    <div className="container center">
      <div className="section center">
        <form className="card white center" onSubmit={handleSubmit}>
          <span className="card-title">
            <span className="gray-text-color bold-text-style">Generate</span>
          </span>

          <br />

          <div className="input-field col s12">
            <label htmlFor="type">
              Type<span className="red-text-color">*</span>
            </label>

            <br />
            <br />

            <select
              className="browser-default"
              id="type"
              required
              onChange={handleChange}
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
              className="browser-default"
              id="time"
              required
              onChange={handleChange}
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
            className="btn waves-effect waves-light grey darken-4"
            disabled={disabled}
          >
            Generate
          </button>
        </form>
      </div>
    </div>
  );
};

// Container
const mapStateToProps = state => ({
  userLogin: state.leaderboard.userLogin,
  organizationLogin: state.leaderboard.organizationLogin,
  teamSlug: state.leaderboard.teamSlug,
});

const mapDispatchToProps = dispatch => ({
  getUserContributionsThunk(time) {
    dispatch(getUserContributionsThunkCreator(time));
  },
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
  getUserContributionsThunk: PropTypes.func,
  getOrganizationContributorsThunk: PropTypes.func,
  getTeamContributorsThunk: PropTypes.func,
};

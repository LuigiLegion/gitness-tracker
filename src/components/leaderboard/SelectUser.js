/* eslint-disable react/button-has-type */

// Imports
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getOrganizationsThunkCreator } from '../../store/reducers/leaderboardReducer';

// Component
const SelectUser = ({ userLogin, getOrganizationsThunk }) => {
  const [selectedUserLogin, setSelectedUserLogin] = useState('');

  const handleChange = event => {
    setSelectedUserLogin(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    getOrganizationsThunk(selectedUserLogin);
  };

  return (
    <div className="container center">
      <div className="section center">
        <form onSubmit={handleSubmit} className="card white center">
          <span className="card-title">
            <span className="gray-text-color bold-text-style">User</span>
          </span>

          <div className="input-field">
            <label htmlFor="userLogin">
              GitHub Username<span className="red-text-color">*</span>
            </label>

            <input
              type="text"
              id="userLogin"
              required
              onChange={handleChange}
            />
          </div>

          <button
            className="btn waves-effect waves-light grey darken-4"
            disabled={!selectedUserLogin.length}
          >
            Select
          </button>

          <br />
          <br />

          <span className="italic-text-style">
            {userLogin ? userLogin : 'Not Yet Selected'}
          </span>

          <br />
          <br />
        </form>
      </div>
    </div>
  );
};

// Container
const mapStateToProps = state => ({
  userLogin: state.leaderboard.userLogin,
});

const mapDispatchToProps = dispatch => ({
  getOrganizationsThunk(userLogin) {
    dispatch(getOrganizationsThunkCreator(userLogin));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectUser);

// Prop Types
SelectUser.propTypes = {
  userLogin: PropTypes.string,
  getOrganizationsThunk: PropTypes.func,
};

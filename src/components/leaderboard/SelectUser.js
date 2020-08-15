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
        <form className="card white center" onSubmit={handleSubmit}>
          <span className="card-title">
            <span className="text-color-gray text-style-bold">User</span>
          </span>

          <div className="input-field">
            <label htmlFor="userLogin">
              GitHub Username<span className="text-color-red">*</span>
            </label>

            <input
              type="text"
              id="userLogin"
              autoComplete="user-login"
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

          <span className="text-style-italic">
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

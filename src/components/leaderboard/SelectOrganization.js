/* eslint-disable react/button-has-type */

// Imports
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getTeamsThunkCreator,
  gotOrganizationLoginActionCreator,
} from '../../store/reducers/leaderboardReducer';

// Component
const SelectOrganization = ({
  userLogin,
  organizations,
  organizationLogin,
  getTeamsThunk,
  gotOrganizationLoginAction,
}) => {
  const [selectedOrganizationLogin, setSelectedOrganizationLogin] = useState(
    ''
  );

  useEffect(() => {
    if (userLogin) {
      setSelectedOrganizationLogin('');
      gotOrganizationLoginAction('');
    }
  }, [userLogin, setSelectedOrganizationLogin, gotOrganizationLoginAction]);

  const handleChange = event => {
    setSelectedOrganizationLogin(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    getTeamsThunk(selectedOrganizationLogin);
  };

  return (
    <div className="container center">
      <div className="section center">
        <form className="card white center" onSubmit={handleSubmit}>
          <span className="card-title">
            <span className="text-color-gray text-style-bold">Org</span>
          </span>

          <div className="input-field col s12">
            <label htmlFor="organizationLogin">
              Orgs<span className="text-color-red">*</span>
            </label>

            <br />
            <br />

            <select
              className="browser-default"
              id="organizationLogin"
              value={selectedOrganizationLogin}
              required
              onChange={handleChange}
            >
              <option value="">Select Org</option>

              {organizations.length
                ? organizations.map(curOrganization => (
                    <option
                      key={curOrganization.id}
                      value={curOrganization.login}
                    >
                      {curOrganization.login}
                    </option>
                  ))
                : null}
            </select>
          </div>

          <br />

          <button
            className="btn waves-effect waves-light grey darken-4"
            disabled={!selectedOrganizationLogin.length}
          >
            Select
          </button>

          <br />
          <br />

          <span className="text-style-italic">
            {organizationLogin ? organizationLogin : 'Not Yet Selected'}
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
  organizations: state.leaderboard.organizations,
  organizationLogin: state.leaderboard.organizationLogin,
});

const mapDispatchToProps = dispatch => ({
  getTeamsThunk(organizationLogin) {
    dispatch(getTeamsThunkCreator(organizationLogin));
  },
  gotOrganizationLoginAction(organizationLogin) {
    dispatch(gotOrganizationLoginActionCreator(organizationLogin));
  },
});

// Prop Types
SelectOrganization.propTypes = {
  userLogin: PropTypes.string,
  organizations: PropTypes.array,
  organizationLogin: PropTypes.string,
  getTeamsThunk: PropTypes.func,
  gotOrganizationLoginAction: PropTypes.func,
};

// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectOrganization);

/* eslint-disable react/button-has-type */

// Imports
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getTeamsThunkCreator,
  gotOrganizationLoginActionCreator,
} from '../../store/reducers/leaderboardReducer';
import { usePrevious } from '../../helpers/index';

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

  const prevOrganizationLogin = usePrevious(selectedOrganizationLogin);

  useEffect(() => {
    if (prevOrganizationLogin) {
      setSelectedOrganizationLogin('');
      document.getElementById('organizationLogin').value = '';
      gotOrganizationLoginAction('');
    }
    // eslint-disable-next-line
  }, [userLogin]);

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
        <form onSubmit={handleSubmit} className="card white center">
          <span className="card-title">
            <span className="gray-text-color bold-text-style">Org</span>
          </span>

          <div className="input-field col s12">
            <label htmlFor="organizationLogin">
              Orgs<span className="red-text-color">*</span>
            </label>

            <br />
            <br />

            <select
              id="organizationLogin"
              className="browser-default"
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
            className="btn waves-effect waves-light black lighten-1 z-depth-0"
            disabled={!selectedOrganizationLogin.length}
          >
            Select
          </button>

          <br />
          <br />

          <span className="italic-text-style">
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectOrganization);

// Prop Types
SelectOrganization.propTypes = {
  userLogin: PropTypes.string,
  organizations: PropTypes.array,
  organizationLogin: PropTypes.string,
  getTeamsThunk: PropTypes.func,
  gotOrganizationLoginAction: PropTypes.func,
};

/* eslint-disable react/button-has-type */

// Imports
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getTeamsThunkCreator,
  gotOrganizationLoginActionCreator,
} from '../../store/reducers/leaderboardReducer';

// Component
class SelectOrganization extends PureComponent {
  state = {
    organizationLogin: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.userLogin !== this.props.userLogin &&
      prevState.organizationLogin
    ) {
      this.setState({
        organizationLogin: '',
      });
      this.props.gotOrganizationLoginAction('');
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.getTeamsThunk(this.state.organizationLogin);
  };

  render() {
    const { organizations, organizationLogin } = this.props;

    return (
      <div className="container center">
        <div className="section center">
          <form onSubmit={this.handleSubmit} className="card white center">
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
                onChange={this.handleChange}
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
              disabled={!this.state.organizationLogin.length}
            >
              Select
            </button>

            <br />
            <br />

            <span className="italic-text-style">
              {organizationLogin ? organizationLogin : 'Not Selected Yet'}
            </span>

            <br />
            <br />
          </form>
        </div>
      </div>
    );
  }
}

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

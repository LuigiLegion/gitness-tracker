/* eslint-disable react/button-has-type */

// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getTeamsThunkCreator,
  getOrganizationContributorsThunkCreator,
} from '../../store/reducers/leaderboardReducer';

// Component
export class GenerateTeams extends Component {
  constructor() {
    super();

    this.state = {
      organization: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);
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

    const { organization } = this.state;
    const { getTeamsThunk } = this.props;

    // console.log('organization in GenerateTeams handleSubmit: ', organization);
    // console.log('getTeamsThunk in GenerateTeams handleSubmit: ', getTeamsThunk);

    getTeamsThunk(organization);
  }

  handleGenerate(event) {
    // console.log('event.target.id: ', event.target.id);
    // console.log('event.target.value: ', event.target.value);

    event.preventDefault();

    const { organization } = this.state;
    const { getOrganizationContributorsThunk } = this.props;

    // console.log('organization in GenerateTeams handleSubmit: ', organization);
    // console.log('getOrganizationContributorsThunk in GenerateTeams handleSubmit: ', getOrganizationContributorsThunk);

    getOrganizationContributorsThunk(organization, '2020', '01');
  }

  render() {
    const { organizations } = this.props;

    // console.log('organizations in GenerateTeams: ', organizations);

    return (
      <div className="container center">
        <div className="section center">
          <form onSubmit={this.handleSubmit} className="card white center">
            <span className="card-title">
              <span className="gray-text-color bold-text-style">
                Generate Teams
              </span>
            </span>

            <div className="input-field col s12">
              <label htmlFor="organization">
                Organizations<span className="red-text-color">*</span>
              </label>

              <br />
              <br />

              <select
                id="organization"
                className="browser-default"
                required
                onChange={this.handleChange}
              >
                <option value="">Choose Organization</option>

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
              className="btn black lighten-1 z-depth-0"
              disabled={!this.state.organization.length}
            >
              Generate
            </button>

            <hr />

            <span className="card-title">
              <span className="gray-text-color bold-text-style">
                Generate Org Leaderboard
              </span>
            </span>

            <br />

            <button
              className="btn black lighten-1 z-depth-0"
              disabled={!this.state.organization.length}
              onClick={this.handleGenerate}
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
  organizations: state.leaderboard.organizations,
});

const mapDispatchToProps = dispatch => ({
  getTeamsThunk(organizationLogin) {
    dispatch(getTeamsThunkCreator(organizationLogin));
  },
  getOrganizationContributorsThunk(organizationLogin, fullYear, fullMonth) {
    dispatch(
      getOrganizationContributorsThunkCreator(
        organizationLogin,
        fullYear,
        fullMonth
      )
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenerateTeams);

// Prop Types
GenerateTeams.propTypes = {
  organizations: PropTypes.array,
  getTeamsThunk: PropTypes.func,
  getOrganizationContributorsThunk: PropTypes.func,
};

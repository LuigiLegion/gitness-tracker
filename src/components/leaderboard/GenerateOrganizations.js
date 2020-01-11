/* eslint-disable react/button-has-type */

// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getOrganizationsThunkCreator } from '../../store/reducers/leaderboardReducer';

// Component
export class GenerateOrganizations extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
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

    const { username } = this.state;
    const { getOrganizationsThunk } = this.props;

    // console.log('username in GenerateOrganizations handleSubmit: ', username);
    // console.log('getOrganizationsThunk in GenerateOrganizations handleSubmit: ', getOrganizationsThunk);

    getOrganizationsThunk(username);
  }

  render() {
    return (
      <div className="container">
        <div className="section">
          <form onSubmit={this.handleSubmit} className="card white">
            <span className="card-title">
              <span className="gray-text-color bold-text-style">
                Generate Organizations
              </span>
            </span>

            <div className="input-field">
              <label htmlFor="username">
                GitHub Username<span className="red-text-color">*</span>
              </label>

              <input
                type="text"
                id="username"
                required
                onChange={this.handleChange}
              />
            </div>

            <button
              className="btn black lighten-1 z-depth-0"
              disabled={!this.state.username.length}
            >
              Generate Orgs
            </button>
          </form>
        </div>
      </div>
    );
  }
}

// Container
const mapDispatchToProps = dispatch => ({
  getOrganizationsThunk(username) {
    dispatch(getOrganizationsThunkCreator(username));
  },
});

export default connect(
  null,
  mapDispatchToProps
)(GenerateOrganizations);

// Prop Types
GenerateOrganizations.propTypes = {
  getOrganizationsThunk: PropTypes.func,
};

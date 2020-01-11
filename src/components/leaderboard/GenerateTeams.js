/* eslint-disable react/button-has-type */

// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Component
export class GenerateTeams extends Component {
  constructor() {
    super();

    this.state = {
      organization: '',
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

    const { organization } = this.state;

    // console.log('organization in GenerateTeams handleSubmit: ', organization);
  }

  render() {
    const { organizations } = this.props;

    // console.log('organizations in GenerateTeams: ', organizations);

    return (
      <div className="container">
        <div className="section">
          <form onSubmit={this.handleSubmit} className="card white">
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

            <button
              className="btn black lighten-1 z-depth-0"
              disabled={!this.state.organization.length}
            >
              Generate Teams
            </button>

            <button
              className="btn black lighten-1 z-depth-0"
              disabled={!this.state.organization.length}
            >
              Generate (Org)
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

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenerateTeams);

// Prop Types
GenerateTeams.propTypes = {
  organizations: PropTypes.array,
};

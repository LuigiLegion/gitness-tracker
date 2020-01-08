/* eslint-disable react/button-has-type */

// Imports
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Component
export class GenerateContributors extends Component {
  constructor() {
    super();

    this.state = {
      team: '',
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

    const { team } = this.props;

    // console.log('team in GenerateContributors handleSubmit: ', team);
  }

  render() {
    const { team } = this.state;
    const { organization } = this.props;

    // console.log('team in GenerateContributors: ', team);
    // console.log('organization in GenerateContributors: ', organization);

    return (
      <div className="container">
        <div className="section">
          <form onSubmit={this.handleSubmit} className="card white">
            <span className="card-title">
              <span className="gray-text-color bold-text-style">
                Generate Contributors
              </span>
            </span>

            <div className="input-field col s12">
              <label htmlFor="team">
                Teams<span className="red-text-color">*</span>
              </label>

              <br />
              <br />

              <select
                id="team"
                className="browser-default"
                required
                onChange={this.handleChange}
              >
                <option value="" disabled>
                  --Please choose a team--
                </option>
              </select>
            </div>

            <button
              className="btn black lighten-1 z-depth-0"
              disabled={!team.length}
            >
              Generate (Team)
            </button>

            <button
              className="btn black lighten-1 z-depth-0"
              disabled={!organization.login}
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
  organization: state.leaderboard.organization,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenerateContributors);

// Prop Types
GenerateContributors.propTypes = {
  organization: PropTypes.object,
};

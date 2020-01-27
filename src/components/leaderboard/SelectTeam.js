/* eslint-disable react/button-has-type */

// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { gotTeamSlugActionCreator } from '../../store/reducers/leaderboardReducer';
import { toastNotificationGenerator } from '../../data/index';

// Component
export class SelectTeam extends Component {
  constructor() {
    super();
    this.state = {
      teamSlug: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.organizationLogin !== this.props.organizationLogin &&
      prevState.teamSlug
    ) {
      this.setState({
        teamSlug: '',
      });
      this.props.gotTeamSlugAction('');
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.gotTeamSlugAction(this.state.teamSlug);
    toastNotificationGenerator('Team Selected Succesfully', 'green');
  }

  render() {
    const { teams, teamSlug } = this.props;

    return (
      <div className="container center">
        <div className="section center">
          <form onSubmit={this.handleSubmit} className="card white center">
            <span className="card-title">
              <span className="gray-text-color bold-text-style">Team</span>
            </span>

            <div className="input-field col s12">
              <label htmlFor="teamSlug">
                Teams<span className="red-text-color">*</span>
              </label>

              <br />
              <br />

              <select
                id="teamSlug"
                className="browser-default"
                required
                onChange={this.handleChange}
              >
                <option value="">Select Team</option>

                {teams.length
                  ? teams.map(curTeam => (
                      <option key={curTeam.node.id} value={curTeam.node.slug}>
                        {curTeam.node.slug}
                      </option>
                    ))
                  : null}
              </select>
            </div>

            <br />

            <button
              className="btn black lighten-1 z-depth-0"
              disabled={!teams.length || !this.state.teamSlug.length}
            >
              Select
            </button>

            <br />
            <br />

            <span className="italic-text-style">
              {teamSlug ? teamSlug : 'Not Selected Yet'}
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
  organizationLogin: state.leaderboard.organizationLogin,
  teams: state.leaderboard.teams,
  teamSlug: state.leaderboard.teamSlug,
});

const mapDispatchToProps = dispatch => ({
  gotTeamSlugAction(teamSlug) {
    dispatch(gotTeamSlugActionCreator(teamSlug));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectTeam);

// Prop Types
SelectTeam.propTypes = {
  organizationLogin: PropTypes.string,
  teams: PropTypes.array,
  teamSlug: PropTypes.string,
  gotTeamSlugAction: PropTypes.func,
};

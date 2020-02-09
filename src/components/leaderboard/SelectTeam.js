/* eslint-disable react/button-has-type */

// Imports
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { gotTeamSlugActionCreator } from '../../store/reducers/leaderboardReducer';
import { usePrevious, toastNotificationGenerator } from '../../helpers/index';

// Component
const SelectTeam = ({
  organizationLogin,
  teams,
  teamSlug,
  gotTeamSlugAction,
}) => {
  const [selectedTeamSlug, setSelectedTeamSlug] = useState('');

  const prevTeamSlug = usePrevious(selectedTeamSlug);

  useEffect(() => {
    if (prevTeamSlug) {
      setSelectedTeamSlug('');
      document.getElementById('teamSlug').value = '';
      gotTeamSlugAction('');
    }
    // eslint-disable-next-line
  }, [organizationLogin]);

  const handleChange = event => {
    setSelectedTeamSlug(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    gotTeamSlugAction(selectedTeamSlug);
    toastNotificationGenerator('Team Selected Succesfully', 'green');
  };

  return (
    <div className="container center">
      <div className="section center">
        <form onSubmit={handleSubmit} className="card white center">
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
              onChange={handleChange}
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
            className="btn waves-effect waves-light black lighten-1 z-depth-0"
            disabled={!teams.length || !selectedTeamSlug.length}
          >
            Select
          </button>

          <br />
          <br />

          <span className="italic-text-style">
            {teamSlug ? teamSlug : 'Not Yet Selected'}
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

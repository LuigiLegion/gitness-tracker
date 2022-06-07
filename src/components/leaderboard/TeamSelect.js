/* eslint-disable react/button-has-type */

// Imports
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { gotTeamSlugActionCreator } from '../../store';
import { toast } from '../../utils';

// Component
const TeamSelect = ({
  organizationLogin,
  teams,
  teamSlug,
  gotTeamSlugAction,
}) => {
  const [selectedTeamSlug, setSelectedTeamSlug] = useState('');

  useEffect(() => {
    if (organizationLogin) {
      setSelectedTeamSlug('');
      gotTeamSlugAction('');
    }
  }, [organizationLogin, setSelectedTeamSlug, gotTeamSlugAction]);

  const handleChange = event => {
    setSelectedTeamSlug(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    gotTeamSlugAction(selectedTeamSlug);
    toast('Team selected', 'green');
  };

  return (
    <div className="container center">
      <div className="section center">
        <form className="card white center" onSubmit={handleSubmit}>
          <span className="card-title">
            <span className="text-color-gray text-style-bold">Team</span>
          </span>

          <div className="input-field col s12">
            <label htmlFor="teamSlug">
              GitHub Teams<span className="text-color-red">*</span>
            </label>

            <br />
            <br />

            <select
              className="browser-default"
              id="teamSlug"
              value={selectedTeamSlug}
              required
              onChange={handleChange}
            >
              <option value="">Select Team</option>

              {teams.length
                && teams.map(curTeam => (
                    <option key={curTeam.node.id} value={curTeam.node.slug}>
                      {curTeam.node.slug}
                    </option>
                  ))
                }
            </select>
          </div>

          <br />

          <button
            className="btn waves-effect waves-light grey darken-4"
            disabled={!teams.length || !selectedTeamSlug.length}
          >
            Select
          </button>

          <br />
          <br />

          <span className="text-style-italic">
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
  gotTeamSlugAction: teamSlug => dispatch(gotTeamSlugActionCreator(teamSlug)),
});

// Prop Types
TeamSelect.propTypes = {
  organizationLogin: PropTypes.string,
  teams: PropTypes.arrayOf(PropTypes.object),
  teamSlug: PropTypes.string,
  gotTeamSlugAction: PropTypes.func,
};

// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamSelect);

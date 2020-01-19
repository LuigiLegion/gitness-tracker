// Imports
import {
  organizationsQueryGenerator,
  teamsQueryGenerator,
  organizationContributorsQueryGenerator,
  teamContributorsQueryGenerator,
  githubDataFetcher,
  contributorsSorter,
  toastNotificationGenerator,
} from '../../data';

// Initial State
const initialState = {
  organizations: [],
  teams: [],
  contributors: [],
  organization: '',
  disabledClear: true,
};

// Action Types
const GOT_ORGANIZATIONS = 'GOT_ORGANIZATIONS';
const GOT_TEAMS = 'GOT_TEAMS';
const GOT_ORGANIZATION_CONTRIBUTORS = 'GOT_ORGANIZATION_CONTRIBUTORS';
const GOT_TEAM_CONTRIBUTORS = 'GOT_TEAM_CONTRIBUTORS';
const CLEARED_CONTRIBUTORS = 'CLEARED_CONTRIBUTORS';

// Action Creators
export const gotOrganizationsActionCreator = organizations => ({
  type: GOT_ORGANIZATIONS,
  organizations,
});

export const gotTeamsActionCreator = (teams, organization) => ({
  type: GOT_TEAMS,
  teams,
  organization,
});

export const gotOrganizationContributorsActionCreator = contributors => ({
  type: GOT_ORGANIZATION_CONTRIBUTORS,
  contributors,
});

export const gotTeamContributorsActionCreator = contributors => ({
  type: GOT_TEAM_CONTRIBUTORS,
  contributors,
});

export const clearedContributorsActionCreator = () => ({
  type: CLEARED_CONTRIBUTORS,
});

// Thunk Creators
export const getOrganizationsThunkCreator = username => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      toastNotificationGenerator(
        'Generating Organizations...',
        'yellow darken-3'
      );

      const customQuery = organizationsQueryGenerator(username);

      const { data } = await githubDataFetcher(customQuery);

      const organizations = data.user.organizations.nodes;

      // console.log('organizations in getOrganizationsThunkCreator: ', organizations);

      dispatch(gotOrganizationsActionCreator(organizations));

      if (organizations.length) {
        toastNotificationGenerator(
          'Organizations Generated Successfully',
          'green'
        );
      } else {
        toastNotificationGenerator('No Organizations Were Found', 'red');
      }
    } catch (error) {
      console.error(error);

      toastNotificationGenerator('Error! Invalid GitHub Username', 'red');
    }
  };
};

export const getTeamsThunkCreator = organizationLogin => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      toastNotificationGenerator('Generating Teams...', 'yellow darken-3');

      const customQuery = teamsQueryGenerator(organizationLogin);

      const { data } = await githubDataFetcher(customQuery);

      const teams = data.organization.teams.edges;

      // console.log('teams in getTeamsThunkCreator: ', teams);

      dispatch(gotTeamsActionCreator(teams, organizationLogin));

      if (teams.length) {
        toastNotificationGenerator('Teams Generated Successfully', 'green');
      } else {
        toastNotificationGenerator('No Teams Were Found', 'red');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const getOrganizationContributorsThunkCreator = (
  organizationLogin,
  time
) => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      toastNotificationGenerator(
        'Generating Organization Leaderboard...',
        'yellow darken-3'
      );

      const timeUTC = new Date(Date.now() - time);
      const timeISO = timeUTC.toISOString();

      const getAllContributors = async (totalContributors = []) => {
        let cursor = null;

        if (totalContributors.length) {
          cursor = totalContributors[totalContributors.length - 1].cursor;
        }

        const customQuery = organizationContributorsQueryGenerator(
          organizationLogin,
          cursor,
          timeISO
        );

        const { data } = await githubDataFetcher(customQuery);

        const curContributors = data.organization.membersWithRole.edges;

        // console.log('curContributors in : getOrganizationContributorsThunkCreator', curContributors);

        if (curContributors.length) {
          const updatedTotalContributors = totalContributors.concat(
            curContributors
          );

          return getAllContributors(updatedTotalContributors);
        } else {
          return totalContributors;
        }
      };

      const contributors = await getAllContributors();

      contributorsSorter(contributors);

      // console.log('contributors in getOrganizationContributorsThunkCreator: ', contributors);

      dispatch(gotOrganizationContributorsActionCreator(contributors));

      toastNotificationGenerator(
        'Organization Leaderboard Generated Successfully',
        'green'
      );
    } catch (error) {
      console.error(error);

      toastNotificationGenerator(
        'Error! Please Try A Shorter Time Period',
        'red'
      );
    }
  };
};

export const getTeamContributorsThunkCreator = (teamSlug, time) => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      toastNotificationGenerator(
        'Generating Team Leaderboard...',
        'yellow darken-3'
      );

      const timeUTC = new Date(Date.now() - time);
      const timeISO = timeUTC.toISOString();

      const organizationLogin = getState().leaderboard.organization;

      const getAllContributors = async (totalContributors = []) => {
        let cursor = null;

        if (totalContributors.length) {
          cursor = totalContributors[totalContributors.length - 1].cursor;
        }

        const customQuery = teamContributorsQueryGenerator(
          organizationLogin,
          teamSlug,
          cursor,
          timeISO
        );

        const { data } = await githubDataFetcher(customQuery);

        const curContributors = data.organization.team.members.edges;

        // console.log('curContributors in : getTeamContributorsThunkCreator', curContributors);

        if (curContributors.length) {
          const updatedTotalContributors = totalContributors.concat(
            curContributors
          );

          return getAllContributors(updatedTotalContributors);
        } else {
          return totalContributors;
        }
      };

      const contributors = await getAllContributors();

      contributorsSorter(contributors);

      // console.log('contributors in getTeamContributorsThunkCreator: ', contributors);

      dispatch(gotTeamContributorsActionCreator(contributors));

      toastNotificationGenerator(
        'Team Leaderboard Generated Successfully',
        'green'
      );
    } catch (error) {
      console.error(error);

      toastNotificationGenerator(
        'Error! Please Try A Shorter Time Period',
        'red'
      );
    }
  };
};

// Reducer
const leaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ORGANIZATIONS:
      // console.log('action.organizations in GOT_ORGANIZATIONS: ', action.organizations);

      return {
        ...state,
        organizations: [...action.organizations],
      };

    case GOT_TEAMS:
      // console.log('action.teams in GOT_TEAMS: ', action.teams);
      // console.log('action.organization in GOT_TEAMS: ', action.organization);

      return {
        ...state,
        teams: [...action.teams],
        organization: action.organization,
      };

    case GOT_ORGANIZATION_CONTRIBUTORS:
      // console.log('action.contributors in GOT_ORGANIZATION_CONTRIBUTORS: ', action.contributors);

      return {
        ...state,
        contributors: [...action.contributors],
        disabledClear: false,
      };

    case GOT_TEAM_CONTRIBUTORS:
      // console.log('action.contributors in GOT_TEAM_CONTRIBUTORS: ', action.contributors);

      return {
        ...state,
        contributors: [...action.contributors],
        disabledClear: false,
      };

    case CLEARED_CONTRIBUTORS:
      return {
        ...state,
        contributors: [],
        disabledClear: true,
      };

    default:
      return state;
  }
};

export default leaderboardReducer;

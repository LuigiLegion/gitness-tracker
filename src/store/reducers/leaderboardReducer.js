/* eslint-disable complexity */

// Imports
import {
  organizationsQueryGenerator,
  teamsQueryGenerator,
  organizationContributorsQueryGenerator,
  teamContributorsQueryGenerator,
  githubDataFetcher,
  toastNotificationGenerator,
} from '../../data';

// Initial State
const initialState = {
  userLogin: '',
  organizations: [],
  organizationLogin: '',
  teams: [],
  teamSlug: '',
  contributors: [],
  isLoading: false,
  disabledClear: true,
};

// Action Types
const GOT_USER_LOGIN = 'GOT_USER_LOGIN';
const GOT_ORGANIZATIONS = 'GOT_ORGANIZATIONS';
const GOT_ORGANIZATION_LOGIN = 'GOT_ORGANIZATION_LOGIN';
const GOT_TEAMS = 'GOT_TEAMS';
const GOT_TEAM_SLUG = 'GOT_TEAM_SLUG';
const GOT_ORGANIZATION_CONTRIBUTORS = 'GOT_ORGANIZATION_CONTRIBUTORS';
const GOT_TEAM_CONTRIBUTORS = 'GOT_TEAM_CONTRIBUTORS';
const TOGGLED_PRELOADER = 'TOGGLED_PRELOADER';
const CLEARED_CONTRIBUTORS = 'CLEARED_CONTRIBUTORS';

// Action Creators
export const gotUserLoginActionCreator = userLogin => ({
  type: GOT_USER_LOGIN,
  userLogin,
});

export const gotOrganizationsActionCreator = organizations => ({
  type: GOT_ORGANIZATIONS,
  organizations,
});

export const gotOrganizationLoginActionCreator = organizationLogin => ({
  type: GOT_ORGANIZATION_LOGIN,
  organizationLogin,
});

export const gotTeamsActionCreator = teams => ({
  type: GOT_TEAMS,
  teams,
});

export const gotTeamSlugActionCreator = teamSlug => ({
  type: GOT_TEAM_SLUG,
  teamSlug,
});

export const gotOrganizationContributorsActionCreator = contributors => ({
  type: GOT_ORGANIZATION_CONTRIBUTORS,
  contributors,
});

export const gotTeamContributorsActionCreator = contributors => ({
  type: GOT_TEAM_CONTRIBUTORS,
  contributors,
});

export const toggledPreloaderActionCreator = status => ({
  type: TOGGLED_PRELOADER,
  status,
});

export const clearedContributorsActionCreator = () => ({
  type: CLEARED_CONTRIBUTORS,
});

// Thunk Creators
export const getOrganizationsThunkCreator = userLogin => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      dispatch(toggledPreloaderActionCreator(true));
      dispatch(gotUserLoginActionCreator(userLogin));

      const customQuery = organizationsQueryGenerator(userLogin);

      const { data } = await githubDataFetcher(customQuery);
      const organizations = data.user.organizations.nodes;

      // console.log('organizations in getOrganizationsThunkCreator: ', organizations);

      dispatch(gotOrganizationsActionCreator(organizations));
      dispatch(toggledPreloaderActionCreator(false));

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

      dispatch(toggledPreloaderActionCreator(false));

      toastNotificationGenerator('Error! Invalid GitHub Username', 'red');
    }
  };
};

export const getTeamsThunkCreator = organizationLogin => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      dispatch(toggledPreloaderActionCreator(true));
      dispatch(gotOrganizationLoginActionCreator(organizationLogin));

      const customQuery = teamsQueryGenerator(organizationLogin);

      const { data } = await githubDataFetcher(customQuery);
      const teams = data.organization.teams.edges;

      // console.log('teams in getTeamsThunkCreator: ', teams);

      dispatch(gotTeamsActionCreator(teams));
      dispatch(toggledPreloaderActionCreator(false));

      if (teams.length) {
        toastNotificationGenerator('Teams Generated Successfully', 'green');
      } else {
        toastNotificationGenerator('No Teams Were Found', 'red');
      }
    } catch (error) {
      console.error(error);

      dispatch(toggledPreloaderActionCreator(false));
    }
  };
};

export const getOrganizationContributorsThunkCreator = time => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      dispatch(toggledPreloaderActionCreator(true));
      dispatch(clearedContributorsActionCreator());

      const timeUTC = new Date(Date.now() - time);
      const timeISO = timeUTC.toISOString();

      const { organizationLogin } = getState().leaderboard;

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

        dispatch(gotOrganizationContributorsActionCreator(curContributors));

        if (curContributors.length === 25) {
          return getAllContributors(curContributors);
        } else {
          return totalContributors;
        }
      };

      await getAllContributors();

      dispatch(toggledPreloaderActionCreator(false));

      toastNotificationGenerator(
        'Organization Leaderboard Generated Successfully',
        'green'
      );
    } catch (error) {
      console.error(error);

      dispatch(toggledPreloaderActionCreator(false));

      toastNotificationGenerator(
        'Error! Please Try A Shorter Time Period',
        'red'
      );
    }
  };
};

export const getTeamContributorsThunkCreator = time => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      dispatch(toggledPreloaderActionCreator(true));
      dispatch(clearedContributorsActionCreator());

      const timeUTC = new Date(Date.now() - time);
      const timeISO = timeUTC.toISOString();

      const { organizationLogin, teamSlug } = getState().leaderboard;

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

        // console.log('curContributors in getTeamContributorsThunkCreator: ', curContributors);

        dispatch(gotTeamContributorsActionCreator(curContributors));

        if (curContributors.length === 25) {
          return getAllContributors(curContributors);
        } else {
          return totalContributors;
        }
      };

      await getAllContributors();

      dispatch(toggledPreloaderActionCreator(false));

      toastNotificationGenerator(
        'Team Leaderboard Generated Successfully',
        'green'
      );
    } catch (error) {
      console.error(error);

      dispatch(toggledPreloaderActionCreator(false));

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
    case GOT_USER_LOGIN:
      // console.log('action.userLogin in GOT_USER_LOGIN: ', action.userLogin);

      return {
        ...state,
        userLogin: action.userLogin,
      };

    case GOT_ORGANIZATIONS:
      // console.log('action.organizations in GOT_ORGANIZATIONS: ', action.organizations);

      return {
        ...state,
        organizations: [...action.organizations],
      };

    case GOT_ORGANIZATION_LOGIN:
      // console.log('action.organizationLogin in GOT_ORGANIZATION_LOGIN: ', action.organizationLogin);

      return {
        ...state,
        organizationLogin: action.organizationLogin,
      };

    case GOT_TEAMS:
      // console.log('action.teams in GOT_TEAMS: ', action.teams);

      return {
        ...state,
        teams: [...action.teams],
      };

    case GOT_TEAM_SLUG:
      // console.log('action.teamSlug in GOT_TEAM_SLUG: ', action.teamSlug);

      return {
        ...state,
        teamSlug: action.teamSlug,
      };

    case GOT_ORGANIZATION_CONTRIBUTORS:
      // console.log('action.contributors in GOT_ORGANIZATION_CONTRIBUTORS: ', action.contributors);

      return {
        ...state,
        contributors: [...state.contributors, ...action.contributors],
        disabledClear: false,
      };

    case GOT_TEAM_CONTRIBUTORS:
      // console.log('action.contributors in GOT_TEAM_CONTRIBUTORS: ', action.contributors);

      return {
        ...state,
        contributors: [...state.contributors, ...action.contributors],
        disabledClear: false,
      };

    case TOGGLED_PRELOADER:
      // console.log('action.status in TOGGLED_PRELOADER: ', action.status);

      return {
        ...state,
        isLoading: action.status,
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

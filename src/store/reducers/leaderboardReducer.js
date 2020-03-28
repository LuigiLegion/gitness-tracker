/* eslint-disable complexity */

// Imports
import {
  organizationsQueryGenerator,
  teamsQueryGenerator,
  userContributionsQueryGenerator,
  organizationContributorsQueryGenerator,
  teamContributorsQueryGenerator,
  githubDataFetcher,
  toastNotificationGenerator,
} from '../../helpers';

// Initial State
const initialState = {
  userLogin: '',
  organizations: [],
  organizationLogin: '',
  teams: [],
  teamSlug: '',
  contributors: [],
  isLoading: false,
  isNotClearable: true,
};

// Action Types
const GOT_USER_LOGIN = 'GOT_USER_LOGIN';
const GOT_ORGANIZATIONS = 'GOT_ORGANIZATIONS';
const GOT_ORGANIZATION_LOGIN = 'GOT_ORGANIZATION_LOGIN';
const GOT_TEAMS = 'GOT_TEAMS';
const GOT_TEAM_SLUG = 'GOT_TEAM_SLUG';
const GOT_USER_CONTRIBUTIONS = 'GOT_USER_CONTRIBUTIONS';
const GOT_ORGANIZATION_CONTRIBUTORS = 'GOT_ORGANIZATION_CONTRIBUTORS';
const GOT_TEAM_CONTRIBUTORS = 'GOT_TEAM_CONTRIBUTORS';
const TOGGLED_PRELOADER = 'TOGGLED_PRELOADER';
const TOGGLED_CLEAR_BUTTON = 'TOGGLED_CLEAR_BUTTON';
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

export const gotUserContributionsActionCreator = contributor => ({
  type: GOT_USER_CONTRIBUTIONS,
  contributor,
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

export const toggledClearButtonActionCreator = status => ({
  type: TOGGLED_CLEAR_BUTTON,
  status,
});

export const clearedContributorsActionCreator = () => ({
  type: CLEARED_CONTRIBUTORS,
});

// Thunk Creators
export const getOrganizationsThunkCreator = userLogin => {
  return async dispatch => {
    try {
      dispatch(toggledPreloaderActionCreator(true));
      dispatch(gotUserLoginActionCreator(userLogin));

      const customQuery = organizationsQueryGenerator(userLogin);

      const { data } = await githubDataFetcher(customQuery);
      const organizations = data.user.organizations.nodes;

      dispatch(gotOrganizationsActionCreator(organizations));
      dispatch(toggledPreloaderActionCreator(false));

      if (organizations.length) {
        toastNotificationGenerator(
          'Organizations Generated Successfully',
          'green'
        );
      } else {
        toastNotificationGenerator('No Organizations Found', 'red');
      }
    } catch (error) {
      console.error(error);
      dispatch(toggledPreloaderActionCreator(false));
      toastNotificationGenerator('Error! Invalid GitHub Username', 'red');
    }
  };
};

export const getTeamsThunkCreator = organizationLogin => {
  return async dispatch => {
    try {
      dispatch(toggledPreloaderActionCreator(true));
      dispatch(gotOrganizationLoginActionCreator(organizationLogin));

      const customQuery = teamsQueryGenerator(organizationLogin);

      const { data } = await githubDataFetcher(customQuery);
      const teams = data.organization.teams.edges;

      dispatch(gotTeamsActionCreator(teams));
      dispatch(toggledPreloaderActionCreator(false));

      if (teams.length) {
        toastNotificationGenerator('Teams Generated Successfully', 'green');
      } else {
        toastNotificationGenerator('No Teams Found', 'red');
      }
    } catch (error) {
      console.error(error);
      dispatch(toggledPreloaderActionCreator(false));
    }
  };
};

export const getUserContributionsThunkCreator = time => {
  return async (dispatch, getState) => {
    try {
      dispatch(toggledPreloaderActionCreator(true));
      dispatch(clearedContributorsActionCreator());

      const timeUTC = new Date(Date.now() - time);
      const timeISO = timeUTC.toISOString();

      const { userLogin } = getState().leaderboard;

      const customQuery = userContributionsQueryGenerator(userLogin, timeISO);

      const { data } = await githubDataFetcher(customQuery);
      const contributor = {
        node: data.user,
      };

      dispatch(gotUserContributionsActionCreator(contributor));
      dispatch(toggledPreloaderActionCreator(false));
      dispatch(toggledClearButtonActionCreator(false));

      toastNotificationGenerator(
        'User Leaderboard Generated Successfully',
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

export const getOrganizationContributorsThunkCreator = time => {
  return async (dispatch, getState) => {
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

        dispatch(gotOrganizationContributorsActionCreator(curContributors));

        if (curContributors.length === 25) {
          return getAllContributors(curContributors);
        } else {
          return totalContributors;
        }
      };

      await getAllContributors();

      dispatch(toggledPreloaderActionCreator(false));
      dispatch(toggledClearButtonActionCreator(false));

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
  return async (dispatch, getState) => {
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

        dispatch(gotTeamContributorsActionCreator(curContributors));

        if (curContributors.length === 25) {
          return getAllContributors(curContributors);
        } else {
          return totalContributors;
        }
      };

      await getAllContributors();

      dispatch(toggledPreloaderActionCreator(false));
      dispatch(toggledClearButtonActionCreator(false));

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
      return {
        ...state,
        userLogin: action.userLogin,
      };

    case GOT_ORGANIZATIONS:
      return {
        ...state,
        organizations: [...action.organizations],
      };

    case GOT_ORGANIZATION_LOGIN:
      return {
        ...state,
        organizationLogin: action.organizationLogin,
      };

    case GOT_TEAMS:
      return {
        ...state,
        teams: [...action.teams],
      };

    case GOT_TEAM_SLUG:
      return {
        ...state,
        teamSlug: action.teamSlug,
      };

    case GOT_USER_CONTRIBUTIONS:
      return {
        ...state,
        contributors: [action.contributor],
      };

    case GOT_ORGANIZATION_CONTRIBUTORS:
      return {
        ...state,
        contributors: [...state.contributors, ...action.contributors],
      };

    case GOT_TEAM_CONTRIBUTORS:
      return {
        ...state,
        contributors: [...state.contributors, ...action.contributors],
      };

    case TOGGLED_PRELOADER:
      return {
        ...state,
        isLoading: action.status,
      };

    case TOGGLED_CLEAR_BUTTON:
      return {
        ...state,
        isNotClearable: action.status,
      };

    case CLEARED_CONTRIBUTORS:
      return {
        ...state,
        contributors: [],
        isNotClearable: true,
      };

    default:
      return state;
  }
};

export default leaderboardReducer;

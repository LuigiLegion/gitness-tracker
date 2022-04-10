/* eslint-disable complexity */

// Imports
import { toggledPreloaderActionCreator } from '..';
import {
  organizationsQuery,
  teamsQuery,
  userContributionsQuery,
  organizationContributorsQuery,
  teamContributorsQuery,
  githubData,
  toast,
} from '../../utils';

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

      const customQuery = organizationsQuery(userLogin);

      const { data } = await githubData(customQuery);
      const organizations = data.user.organizations.nodes;

      dispatch(gotOrganizationsActionCreator(organizations));

      if (organizations.length) {
        toast('Organizations generated', 'green');
      } else {
        toast('No organizations found', 'red');
      }
    } catch (error) {
      console.error(error);
      toast('Error! Invalid GitHub username', 'red');
    } finally {
      dispatch(toggledPreloaderActionCreator(false));
    }
  };
};

export const getTeamsThunkCreator = organizationLogin => {
  return async dispatch => {
    try {
      dispatch(toggledPreloaderActionCreator(true));
      dispatch(gotOrganizationLoginActionCreator(organizationLogin));

      const customQuery = teamsQuery(organizationLogin);

      const { data } = await githubData(customQuery);
      const teams = data.organization.teams.edges;

      dispatch(gotTeamsActionCreator(teams));

      if (teams.length) {
        toast('Teams generated', 'green');
      } else {
        toast('No teams found', 'red');
      }
    } catch (error) {
      console.error(error);
    } finally {
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

      const customQuery = userContributionsQuery(userLogin, timeISO);

      const { data } = await githubData(customQuery);
      const contributor = {
        node: data.user,
      };

      dispatch(gotUserContributionsActionCreator(contributor));
      dispatch(toggledClearButtonActionCreator(false));

      toast('User leaderboard generated', 'green');
    } catch (error) {
      console.error(error);
      toast('Error! Please try a shorter time period', 'red');
    } finally {
      dispatch(toggledPreloaderActionCreator(false));
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

        const customQuery = organizationContributorsQuery(
          organizationLogin,
          cursor,
          timeISO
        );

        const { data } = await githubData(customQuery);
        const curContributors = data.organization.membersWithRole.edges;

        dispatch(gotOrganizationContributorsActionCreator(curContributors));

        if (curContributors.length === 25) {
          return getAllContributors(curContributors);
        } else {
          return totalContributors;
        }
      };

      await getAllContributors();

      dispatch(toggledClearButtonActionCreator(false));

      toast('Organization leaderboard generated', 'green');
    } catch (error) {
      console.error(error);
      toast('Error! Please try a shorter time period', 'red');
    } finally {
      dispatch(toggledPreloaderActionCreator(false));
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

        const customQuery = teamContributorsQuery(
          organizationLogin,
          teamSlug,
          cursor,
          timeISO
        );

        const { data } = await githubData(customQuery);
        const curContributors = data.organization.team.members.edges;

        dispatch(gotTeamContributorsActionCreator(curContributors));

        if (curContributors.length === 25) {
          return getAllContributors(curContributors);
        } else {
          return totalContributors;
        }
      };

      await getAllContributors();

      dispatch(toggledClearButtonActionCreator(false));

      toast('Team leaderboard generated', 'green');
    } catch (error) {
      console.error(error);
      toast('Error! Please try a shorter time period', 'red');
    } finally {
      dispatch(toggledPreloaderActionCreator(false));
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

// Exports
export default leaderboardReducer;

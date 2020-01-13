// Imports
import {
  organizationsQueryGenerator,
  teamsQueryGenerator,
  organizationContributionsQueryGenerator,
  teamContributionsQueryGenerator,
  githubDataFetcher,
} from '../../data';

// Initial State
const initialState = {
  organizations: [],
  teams: [],
  contributors: [],
  disabledClear: true,
};

// Action Types
const GOT_ORGANIZATIONS = 'GOT_ORGANIZATIONS';
const GOT_TEAMS = 'GOT_TEAMS';
const CLEARED_ALL_DATA = 'CLEARED_ALL_DATA';

// Action Creators
export const gotOrganizationsActionCreator = organizations => ({
  type: GOT_ORGANIZATIONS,
  organizations,
});

export const gotTeamsActionCreator = teams => ({
  type: GOT_TEAMS,
  teams,
});

export const clearedAllDataActionCreator = () => ({
  type: CLEARED_ALL_DATA,
});

// Thunk Creators
export const getOrganizationsThunkCreator = username => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      const customQuery = organizationsQueryGenerator(username);

      const { data } = await githubDataFetcher(customQuery);

      const organizations = data.user.organizations.nodes;

      // console.log(
      //   'organizations in getOrganizationsThunkCreator: ',
      //   organizations
      // );

      dispatch(gotOrganizationsActionCreator(organizations));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getTeamsThunkCreator = organizationLogin => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      const customQuery = teamsQueryGenerator(organizationLogin);

      const { data } = await githubDataFetcher(customQuery);

      const teams = data.organization.teams.edges;

      // console.log('teams in getTeamsThunkCreator: ', teams);

      dispatch(gotTeamsActionCreator(teams));
    } catch (error) {
      console.error(error);
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

      return {
        ...state,
        teams: [...action.teams],
      };

    case CLEARED_ALL_DATA:
      return {
        ...state,
        organizations: [],
        teams: [],
        contributors: [],
        disabledClear: true,
      };

    default:
      return state;
  }
};

export default leaderboardReducer;

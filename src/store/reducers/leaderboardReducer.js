// Imports
import {
  organizationsQueryGenerator,
  teamsQueryGenerator,
  organizationContributorsQueryGenerator,
  teamContributorsQueryGenerator,
  githubDataFetcher,
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
const GOT_TEAM_CONTRIBUTORS = 'GOT_TEAM_CONTRIBUTORS';
const CLEARED_ALL_DATA = 'CLEARED_ALL_DATA';

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

export const gotTeamContributorsActionCreator = contributors => ({
  type: GOT_TEAM_CONTRIBUTORS,
  contributors,
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

      dispatch(gotTeamsActionCreator(teams, organizationLogin));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getTeamContributorsThunkCreator = (
  teamSlug,
  fullYear,
  fullMonth
) => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      const organizationLogin = getState().leaderboard.organization;

      const customQuery = teamContributorsQueryGenerator(
        organizationLogin,
        teamSlug,
        fullYear,
        fullMonth
      );

      const { data } = await githubDataFetcher(customQuery);

      const contributors = data.organization.team.members.edges;

      contributors.sort((contributorOne, contributorTwo) => {
        if (
          contributorOne.node.contributionsCollection.totalCommitContributions >
          contributorTwo.node.contributionsCollection.totalCommitContributions
        ) {
          return -1;
        } else if (
          contributorOne.node.contributionsCollection.totalCommitContributions <
          contributorTwo.node.contributionsCollection.totalCommitContributions
        ) {
          return 1;
        } else {
          return 0;
        }
      });

      // console.log(
      //   'contributors in getTeamContributorsThunkCreator: ',
      //   contributors
      // );

      dispatch(gotTeamContributorsActionCreator(contributors));
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
      // console.log('action.organization in GOT_TEAMS: ', action.organization);

      return {
        ...state,
        teams: [...action.teams],
        organization: action.organization,
      };

    case GOT_TEAM_CONTRIBUTORS:
      // console.log('action.contributors in GOT_TEAM_CONTRIBUTORS: ', action.contributors);

      return {
        ...state,
        contributors: [...action.contributors],
        disabledClear: false,
      };

    case CLEARED_ALL_DATA:
      return {
        ...state,
        organizations: [],
        teams: [],
        contributors: [],
        organization: '',
        disabledClear: true,
      };

    default:
      return state;
  }
};

export default leaderboardReducer;

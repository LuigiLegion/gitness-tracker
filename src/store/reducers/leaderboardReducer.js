// Initial State
const initialState = {
  organizations: [],
  organization: {},
  teams: [],
  team: {},
  contributors: [],
  disabledClear: true,
};

// Action Types
const CLEARED_ALL_DATA = 'CLEARED_ALL_DATA';

// Action Creators
export const clearedAllDataActionCreator = () => ({
  type: CLEARED_ALL_DATA,
});

// Thunk Creators

// Reducer
const leaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEARED_ALL_DATA:
      return {
        ...state,
        organizations: [],
        organization: {},
        teams: [],
        team: {},
        contributors: [],
        disabledClear: true,
      };

    default:
      return state;
  }
};

export default leaderboardReducer;

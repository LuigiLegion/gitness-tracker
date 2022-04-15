// Imports
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import leaderboardReducer from './reducers/leaderboardReducer';
import layoutReducer from './reducers/layoutReducer';

// Initializations
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  leaderboard: leaderboardReducer,
  layout: layoutReducer,
});

// Exports
export default rootReducer;

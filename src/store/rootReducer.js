// Imports
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import leaderboardReducer from './reducers/leaderboardReducer';

// Initializations
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  leaderboard: leaderboardReducer,
});

export default rootReducer;

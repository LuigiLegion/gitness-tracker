const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_DOMAIN_HERE',
  databaseURL: 'YOUR_DB_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

firebase.initializeApp(firebaseConfig);

module.exports = firebase;

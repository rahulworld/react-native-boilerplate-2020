// if (process.env.NODE_ENV === 'production') {
//   module.exports = require('./store.prod')
// } else {
//   module.exports = require('./store.dev')
// }


// Imports: Dependencies
import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
//brew update && brew cask install react-native-debugger
//install react native debugger tool use composedevtools for development and compose for production
import { PermissionsAndroid } from "react-native";
import ReduxThunk from "redux-thunk";
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import SQLite from 'react-native-sqlite-storage';

// Imports: Redux
import rootReducer from '../reducers/index';

//SQLITE DATABASE
import { database } from '../constants/AppConstants';
import { seedDb, runMigration, getProgressiveTest } from '../dbClient';

// Middleware: Redux Persist Config
const persistConfig = {
  // Root?
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [
    'authReducer',
  ],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [
    'counterReducer',
  ],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

//Dev Tool for redux

// const middleware =  applyMiddleware(ReduxThunk, createLogger())
const middleware =  applyMiddleware(ReduxThunk);

const composer = process.env.NODE_ENV === 'production' ? compose(middleware) : composeWithDevTools(middleware);

// Redux: Store
const store = createStore(
  persistedReducer,
  composer,
);

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "App needs Internet Permission",
        message:
          "Internnet Permisssion for weather" +
          "so you can take awesome weather report.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the internet");
    } else {
      console.log("Internet permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

// Middleware: Redux Persist Persister
let persistor = persistStore(store, null, () => {
    const db = SQLite.openDatabase({ name: database.name }, this.openCB, this.errorCB);
    global.db = db;
    seedDb();
    runMigration().then(() => {
        console.log('MIGRATION COMPLETED');
        // requestCameraPermission();
    });
});

// Exports
export {
  store,
  persistor,
};
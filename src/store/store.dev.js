// Imports: Dependencies
import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
//brew update && brew cask install react-native-debugger
//install react native debugger tool use composedevtools for development and compose for production

import ReduxThunk from "redux-thunk";
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';

// Imports: Redux
import rootReducer from '../reducers/index';

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
const middleware =  applyMiddleware(ReduxThunk)

// Redux: Store
const store = createStore(
  persistedReducer,
  composeWithDevTools(middleware),
);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

// Exports
export {
  store,
  persistor,
};
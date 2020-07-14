/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


// Imports: Dependencies
import React from 'react';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';

// Imports: Redux Persist Persister
import { store, persistor } from './store/store';

import MainNavigation from './navigations/MainNavigation';

// Imports: Screens
// import Counter from './src/components/Counter';

// React Native: App
export default App = () => {
  return (
    // Redux: Global Store
    <Provider store={store}>
      <PersistGate 
        loading={null}
        persistor={persistor}
      >
        <MainNavigation />
        {/* <Counter /> */}
      </PersistGate>
    </Provider>
  );
};
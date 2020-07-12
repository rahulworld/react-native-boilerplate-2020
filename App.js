/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


// Imports: Dependencies
// import 'react-native-gesture-handler';
import React from 'react';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from 'react-redux';

// Imports: Redux Persist Persister
import { store, persistor } from './src/store/store';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


// React Native Elements
import { View, Text } from 'react-native';

// Imports: Screens
import Counter from './src/screens/Counter';
// import HomeScreen from './src/screens/HomeScreen';
// import OtherScreen from './src/screens/OtherScreen';

const Stack = createStackNavigator();




const HomeScreen = ({ navigation }) => {
  return (
    <Counter navigation={navigation} />
  );
};
const OtherScreen = () => {
  return (<View><Text></Text></View>);
};

// React Native: App
export default App = () => {
  return (
    // Redux: Global Store
    <Provider store={store}>
      <PersistGate 
        loading={null}
        persistor={persistor}
      >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ title: 'Welcome' }}
            />
            <Stack.Screen name="OtherScreen" component={OtherScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        {/* <NavigationContainer>
          <Counter />
        </NavigationContainer> */}
      </PersistGate>
    </Provider>
  );
};
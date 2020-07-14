// Navigation
import React from "react";
import 'react-native-gesture-handler';

// Full App Content and Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// React Native Elements
import { View, Text } from 'react-native';

// Imports: Screens
import Counter from '../components/Counter';
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

export default MainNavigation = () => {
    return(
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
    );
}
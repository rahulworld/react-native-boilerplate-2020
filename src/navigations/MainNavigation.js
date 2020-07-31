// Navigation
import React from "react";
import 'react-native-gesture-handler';

// Full App Content and Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// React Native Elements
import { View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
// Imports: Screens
import Counter from '../components/Counter';
import Weather from '../components/Weather';
// import HomeScreen from './src/screens/HomeScreen';
// import OtherScreen from './src/screens/OtherScreen';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
    return (
      <Counter navigation={navigation} />
    );
};

const WeatherScreen = ({ navigation }) => {
    return (
      <Weather navigation={navigation} />
    );
};

const OtherScreen = () => {
    return (<View><Text></Text></View>);
};

export default class MainNavigation extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        SplashScreen.hide();
    }

    //SQLITE FUNCTIONS
    errorCB(err) {
        console.log(`SQL Error: ${err}`);
    }

    successCB() {
        console.log('SQL executed fine');
    }

    openCB() {
        console.log('Database OPENED');
    }

    render() {
        return(
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}>
                    <Stack.Screen
                        name="WeatherScreen"
                        component={WeatherScreen}
                        // options={{ title: 'Welcome' }}
                    />
                {/* <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ title: 'Welcome' }}
                /> */}
                <Stack.Screen name="OtherScreen" component={OtherScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
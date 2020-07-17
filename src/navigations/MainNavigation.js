// Navigation
import React from "react";
import 'react-native-gesture-handler';

// Full App Content and Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// React Native Elements
import { View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
// Imports: Screens
import Counter from '../components/Counter';
import TabScreen from '../components/TabScreen';
import AntDesignCarouse from '../components/AntDesignCarouse';
import AntDesignAccordian from '../components/AntDesignAccordian';
// import HomeScreen from './src/screens/HomeScreen';
// import OtherScreen from './src/screens/OtherScreen';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
    return (<Counter navigation={navigation} />);
};

const OtherScreen = ({ navigation }) => {
    return (<TabScreen navigation={navigation} />);
};

const AntDesignCarouseScreen = ({ navigation }) => {
    return (<AntDesignCarouse navigation={navigation} />);
};
const AntDesignAccordianScreen = ({ navigation }) => {
    return (<AntDesignAccordian navigation={navigation} />);
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
                <Stack.Navigator>
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ title: 'Welcome' }}
                />
                <Stack.Screen name="OtherScreen" component={OtherScreen} />
                <Stack.Screen name="AntDesignCarouse" component={AntDesignCarouseScreen} />
                <Stack.Screen name="AntDesignAccordian" component={AntDesignAccordianScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
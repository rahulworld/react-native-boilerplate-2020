// Imports: Dependencies
import React, { Component } from 'react';
import { Button, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';

// Screen: Counter
class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    // await this.request_location_runtime_permission();
  }

  async request_location_runtime_permission() {

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert("Location Permission Granted.");
      }
      else {
        Alert.alert("Location Permission Not Granted");
      }
    } catch (err) {
      console.warn(err)
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.counterTitle}>Weather App</Text>
        <View style={{ marginTop: 20 }}>
          {/* <Button
            title="Get All Permissions"
            onPress={() =>
              {this.request_location_runtime_permission()}
            }
          /> */}
          <Button
            title="Go to Weather Details"
            onPress={() =>
              this.props.navigation.navigate('WeatherScreen', { name: 'Jane' })
            }
          />
        </View>
      </SafeAreaView>
    )
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterTitle: {
    fontFamily: 'System',
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
  },
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    counter: state.counterReducer.counter,
    loggedIn: state.authReducer.loggedIn,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
    return {};
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
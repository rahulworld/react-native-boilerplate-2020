// Imports: Dependencies
import React, {Component} from 'react';
import {
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import SearchIcon from 'react-native-vector-icons/AntDesign';

import {LineChart, AreaChart, Grid, XAxis} from 'react-native-svg-charts';
import {
  Svg,
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
  G,
  Line,
} from 'react-native-svg';
import * as shape from 'd3-shape';

// Imports: Redux Actions
import {login} from '../actions/authActions';
import {getWeatherData, getWeatherForcast} from '../actions/counterActions';
import SunImage from '../assets/images/sun.png';
import {TextInput} from 'react-native-gesture-handler';

// Screen Dimensions
const {height: SCREEN_HIGHT, width: SCREEEN_WIDTH} = Dimensions.get('window');

// Screen: Weather
class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCity: 'London,uk',
    };
  }

  componentDidMount() {
    this.props.getWeatherData(this.state.searchCity);
  }

  getCityWeather() {
    if (this.state.searchCity.length > 0) {
      this.props.getWeatherData(this.state.searchCity);
    }
  }

  renderWeeklyWeather() {
    const flatListData = [
      {day: 'Fri', maxTemp: 28, minTemp: 19, type: 'Sunny'},
      {day: 'Sat', maxTemp: 29, minTemp: 21, type: 'Sunny'},
      {day: 'Sun', maxTemp: 29, minTemp: 21, type: 'Cloudy'},
      {day: 'Mon', maxTemp: 30, minTemp: 20, type: 'Rain'},
      {day: 'Tue', maxTemp: 32, minTemp: 22, type: 'Cloudy'},
      {day: 'Wed', maxTemp: 29, minTemp: 21, type: 'Sunny'},
      {day: 'Thu', maxTemp: 29, minTemp: 21, type: 'Sunny'},
    ];
    const { weatherForcastData } = this.props;
    return (
      <View
        style={{
          width: SCREEEN_WIDTH * 0.86,
          marginHorizontal: SCREEEN_WIDTH * 0.07,
          marginVertical: 10,
          marginBottom: 30,
        }}>
        <FlatList
          horizontal
          data={flatListData}
          showsHorizontalScrollIndicator={false}
          renderItem={({item: rowData}) => {
            return (
              <View
                style={{
                  width: SCREEEN_WIDTH * 0.19,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginBottom: 10,
                    textAlign: 'center',
                  }}>
                  {rowData.day}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginBottom: 10,
                    textAlign: 'center',
                  }}>
                  {rowData.maxTemp}°
                  <Text style={{fontWeight: 'normal'}}>
                    {' '}
                    {rowData.minTemp}°
                  </Text>
                </Text>
                <Image style={styles.itemImage} source={SunImage} />
                <Text style={{fontSize: 14, textAlign: 'center'}}>
                  {rowData.type}
                </Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  renderTodayWeather() {
    const graphData = [22, 21, 22, 24, 25, 29, 28, 27];
    const labels = ['', '9am', '10am', '11am', '12am', '1pm', '2pm', ''];
    const graphColor = '#5AA2CC';
    const {weatherData} = this.props;
    const DarkLine = ({line}) => (
      <Path
        key="line-2"
        d={line}
        stroke={graphColor}
        strokeWidth={2}
        fill="none"
      />
    );
    const Decorator = ({x, y}) => {
      return graphData.map((value, index) => (
        <Circle
          key={x(index)}
          cx={x(index)}
          cy={y(value)}
          r={5}
          stroke={graphColor}
          strokeWidth={2}
          fill="white"
        />
      ));
    };
    if (this.props.message) {
      return <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{this.props.message}</Text>;
    }
    if (typeof weatherData.main === 'undefined') {
      return <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Please Wait</Text>;
    }
    return (
      <View style={styles.cardStyle}>
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <Text style={{fontSize: 50, fontWeight: 'bold', marginRight: 20}}>
            {parseInt(weatherData.main.temp - 273)} °C
          </Text>
          <Image style={styles.sunImage} source={SunImage} />
        </View>
        <LineChart
          style={{height: 120}}
          data={graphData}
          svg={{stroke: 'rgb(96, 172, 208)'}}
          contentInset={{top: 20, bottom: 20}}
          curve={shape.curveMonotoneX}>
          <G>
            {graphData.map((tick, index) => (
              <Line
                key={`${tick} + ${index}`}
                y1="0%"
                y2="100%"
                x1={`${((index + 1) * 100) / graphData.length}%`}
                x2={`${((index + 1) * 100) / graphData.length}%`}
                contentInset={{top: 20, bottom: 15, left: 10}}
                strokeWidth={0.8}
                stroke="rgba(0,0,0,0.2)"
              />
            ))}
          </G>
          <Decorator />
          <DarkLine />
        </LineChart>
        <XAxis
          style={{marginHorizontal: -1, marginTop: 10}}
          data={graphData}
          svg={{
            fill: '#000000',
            fontSize: 15,
            fontWeight: 'bold',
            y: 5,
          }}
          spacing={0.2}
          formatLabel={(value, index) => graphData[value] + '°'}
          contentInset={{
            left: -(SCREEEN_WIDTH * 0.03),
            right: -(SCREEEN_WIDTH * 0.03),
          }}
        />
        <XAxis
          style={{marginHorizontal: 0}}
          data={graphData}
          svg={{
            fill: '#C9C9C9',
            fontSize: 15,
            y: 1,
          }}
          spacing={0.2}
          formatLabel={(value, index) => labels[value]}
          contentInset={{
            left: -(SCREEEN_WIDTH * 0.03),
            right: -(SCREEEN_WIDTH * 0.03),
          }}
        />

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <View
            style={{
              backgroundColor: '#F5FAFE',
              width: '50%',
              padding: 10,
              flex: 1,
              marginRight: 10,
            }}>
            <Text style={{fontWeight: 'bold'}}>Pressuer</Text>
            <Text>{weatherData.main.pressure} hpa</Text>
          </View>
          <View
            style={{
              backgroundColor: '#F5FAFE',
              width: '50%',
              padding: 10,
              flex: 1,
              marginLeft: 10,
            }}>
            <Text style={{fontWeight: 'bold'}}>Humidity</Text>
            <Text>{weatherData.main.humidity} %</Text>
          </View>
        </View>

        <AreaChart
          style={{height: 150}}
          data={[-30, 30, -30]}
          contentInset={{top: 30, bottom: 30}}
          curve={shape.curveNatural}
          svg={{fill: 'rgba(253, 233, 191, 0.8)'}}>
        </AreaChart>
        <XAxis
          style={{marginHorizontal: -1, marginTop: 5}}
          data={[6, 1, 8]}
          key={(index) => index}
          svg={{fill: '#000000', fontSize: 15, fontWeight: 'bold', y: 5}}
          spacing={0.2}
          formatLabel={(value, index) => graphData[value] + 'pm'}
          contentInset={{
            left: -(SCREEEN_WIDTH * 0.03),
            right: -(SCREEEN_WIDTH * 0.03),
          }}
        />
      </View>
    );
  }

  render() {
    const {weatherData, weatherForcastData} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.searchStyle}>
          <Icon
            name="location-pin"
            size={30}
            color="#000"
            backgroundColor="#ffffff"
          />
          <TextInput
            style={styles.searchBar}
            placeholder="City"
            onChangeText={(text) => {
              this.setState({searchCity: text});
            }}
            value={this.state.searchCity}
          />
          <SearchIcon.Button
            name="search1"
            size={25}
            color="#000"
            backgroundColor="#ffffff"
            onPress={() => {
              console.log(this.state.searchCity);
              this.getCityWeather();

            }}
          />
        </View>
        {weatherForcastData.length > 0 && this.renderWeeklyWeather()}
        {weatherData && this.renderTodayWeather()}
      </SafeAreaView>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  sunImage: {
    width: 70,
    height: 70,
  },
  itemImage: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    marginBottom: 10,
  },
  searchBar: {
    fontSize: 18,
    margin: 8,
    flex: 1,
    height: 50,
    backgroundColor: 'white',
  },
  searchStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginHorizontal: SCREEEN_WIDTH * 0.05,
    borderColor: '#E5E5E5',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    width: SCREEEN_WIDTH * 0.9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.41,
    shadowRadius: 3,
    elevation: 3,
  },
  cardStyle: {
    marginHorizontal: SCREEEN_WIDTH * 0.05,
    borderColor: 'white',
    borderWidth: 0,
    borderRadius: 1,
    padding: SCREEEN_WIDTH * 0.05,
    width: SCREEEN_WIDTH * 0.9,
    shadowColor: '#E5E5E5',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loggedInContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  loginButton: {
    marginTop: 20,
    paddingTop: 20,
  },
  counterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loggedInText: {
    fontFamily: 'System',
    fontSize: 17,
    fontWeight: '400',
    color: '#000',
  },
  counterTitle: {
    fontFamily: 'System',
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
  },
  counterText: {
    fontFamily: 'System',
    fontSize: 36,
    fontWeight: '400',
    color: '#000',
  },
  buttonText: {
    fontFamily: 'System',
    fontSize: 50,
    fontWeight: '300',
    color: '#007AFF',
    marginLeft: 40,
    marginRight: 40,
  },
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    counter: state.counterReducer.counter,
    weatherData: state.counterReducer.weatherData,
    message: state.counterReducer.message,
    weatherForcastData: state.counterReducer.weatherForcastData,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // Increase Counter
    reduxIncreaseCounter: () => dispatch(increaseCounter()),
    // Decrease Counter
    reduxDecreaseCounter: () => dispatch(decreaseCounter()),
    getGithubUserRepositories: () => getGithubUserRepositories(),
    getWeatherData: (city) => dispatch(getWeatherData(city)),
    getWeatherForcast: (city) => dispatch(getWeatherForcast(city)),
    // Login
    reduxLogin: (trueFalse) => dispatch(login(trueFalse)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Weather);

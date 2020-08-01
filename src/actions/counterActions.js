import Api from '../helpers/ApiHelper';

// Increase Counter
export const increaseCounter = () => ({
  type: 'INCREASE_COUNTER',
});

// Decrease Counter
export const decreaseCounter = () => ({
  type: 'DECREASE_COUNTER',
});

// This axios api is working properly
export const getGithubUserRepositories = () => {
  // Api({
  //   method: 'get',
  //   url: 'https://api.github.com/users/rahulworld/repos',
  // }).then((resp) => {
  //   console.log(resp);
  // })
};

export const getWeatherData = (city) => async(dispatch) => {
  Api({
    method: 'get',
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city ? city : "London,uk"}&APPID=32fda7233ca32f2c99d4f7263a5a23b0`,
  }).then((response) => {
    if(response && response.cod == "200") {
      dispatch({type: 'GET_WEATHER_DATA', payload: response });
    }
  }).catch((error) => {
    dispatch({type: 'MESSAGE_DISPLAY', payload: error.data.message });
  })
};

export const getWeatherForcast = (city) => async(dispatch) => {
  Api({
    method: 'get',
    url: `https://samples.openweathermap.org/data/2.5/forecast/daily?q=${city ? city : "London,uk"}&appid=439d4b804bc8187953eb36d2a8c26a02`,
    // url: `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city ? city : "London,uk"}&APPID=32fda7233ca32f2c99d4f7263a5a23b0`,
    // url: `http://api.openweathermap.org/data/2.5/forecast?q=${city ? city : "London,uk"}&APPID=32fda7233ca32f2c99d4f7263a5a23b0`,
  }).then((response) => {
    console.log(response);
    if(response.cod == "200") {
      dispatch({type: 'GET_WEATHER_FORCAST', payload: response.list.slice(0, 7)});
    }
  })
};
// Initial State
const initialState = {
    counter: 0,
    weatherData: {},
    weatherForcastData: [],
    message: '',
  };
  
// Reducers (Modifies The State And Returns A New State)
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    // Increase Counter
    case 'INCREASE_COUNTER': {
      return {...state, counter: state.counter + 1}
    }

    // Decrease Counter
    case 'DECREASE_COUNTER': {
      return {...state, counter: state.counter - 1 }
    }

    case 'GET_WEATHER_DATA': {
      return {...state, weatherData: action.payload, message: '' }
    }

    case 'GET_WEATHER_FORCAST': {
      return {...state, weatherForcastData: action.payload,  }
    }

    case 'MESSAGE_DISPLAY': {
      return {...state, message: action.payload }
    }
    default: {
      return state;
    }
  }
};

// Exports
export default counterReducer;
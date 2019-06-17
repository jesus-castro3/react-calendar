export const getNextMonth = () => ({
  type: "NEXT_MONTH"
});

export const getPrevMonth = () => ({
  type: "PREV_MONTH"
});

export const openModal = ([idx, date, currentDay, edit = false]) => ({
  type: 'OPEN_MODAL',
  data: {
    idx,
    date,
    currentDay,
    edit
  }
});

export const closeModal = () => ({
  type: 'CLOSE_MODAL'
});

export const onInputChange = (value, type) => ({
  type: 'ON_INPUT_CHANGE',
  data: {
    value,
    type
  }
});

export const setWeather = (data) => ({
  type: 'SET_WEATHER',
  data
})

export const getWeather = (value, type) => {
  return (dispatch) => {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?APPID=86f2b021c1dfa18aca3fdb54a0e741d9&q=${value}`)
      .then((res) => res.json())
      .then(res => {
        dispatch(setWeather({ weather: res.weather, value, type}));
      });
  }
};


export const addEvent = (eventData) => ({
  type: 'ADD_EVENT',
  data: eventData
});

export const editEvent = (eventData) => ({
  type: 'EDIT_EVENT',
  data: eventData
});

export const removeEvent = (eventData) => ({
  type: 'REMOVE_EVENT',
  data: eventData
})
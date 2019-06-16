import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './App.css';
import './Calendar.css';
import Calendar from './Calendar';
import rootReducer from './reducers';

const store = createStore(
  rootReducer
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Calendar/>
        </div>
      </Provider>
    );
  }
}

export default App;

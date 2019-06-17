import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './App.css';
import './Calendar.css';
import Calendar from './Calendar';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
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

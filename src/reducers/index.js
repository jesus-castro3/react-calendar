import { combineReducers } from 'redux';
import * as calendar  from './calendar';

const rootReducer = combineReducers({
  ...calendar
});

export default rootReducer

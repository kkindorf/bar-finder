import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import barReducer from './bar_reducer';
const rootReducer = combineReducers({
  form: form,
  auth: authReducer,
  barData: barReducer
});

export default rootReducer;

import { combineReducers } from 'redux';
import counterReducer from './CouterReducer';
import general from './General';


const allReducers=combineReducers({
  counterReducer,
  general
});
export default allReducers;
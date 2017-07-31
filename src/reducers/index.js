import { combineReducers } from 'redux';
import item from '../redux/influence/InfluenceReducer';

const rootReducer = combineReducers({
  state: (state = {}) => state,
  item
});

export default rootReducer;

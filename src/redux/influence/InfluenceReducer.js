import * as types from './InfluenceTypes';

const initialState = {
  user: [],
  brand: [],
  iterator: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_USER:
      const newStateUser = {
        ...state,
        user: action.entries,
      };
      return newStateUser;
    case types.UPDATE_BRAND:
      const newStateBrand = {
        ...state,
        brand: action.entries,
      };
      return newStateBrand;
    case types.UPDATE_ITERATOR:
      const newStateIterator = {
        ...state,
        iterator: action.entries,
      };
      return newStateIterator;
    case types.RESET_STATE:
      return initialState;
    default:
      return state;
  }
}

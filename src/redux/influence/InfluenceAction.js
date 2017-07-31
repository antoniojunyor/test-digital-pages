import * as types from './InfluenceTypes';

export const updateUser = entries => ({
  type: types.UPDATE_USER,
  entries,
});

export const updateBrand= entries => ({
  type: types.UPDATE_BRAND,
  entries,
});

export const updateIterator = entries => ({
  type: types.UPDATE_ITERATOR,
  entries,
});

export const resetState = entries => ({
  type: types.RESET_STATE,
  entries,
});


import React from 'react';
import { shallow, mount } from 'enzyme';

import {updateUser, updateBrand, updateIterator, resetState} from '../../../src/redux/influence/InfluenceAction';
import reducer from '../../../src/redux/influence/InfluenceReducer';


describe('actions', function() {
    test('updateUser', () => {
        expect(updateUser().type).toEqual("UPDATE_USER")
    });

    test('updateBrand', () => {
        expect(updateBrand().type).toEqual("UPDATE_BRAND")
    });

    test('updateIterator', () => {
        expect(updateIterator().type).toEqual("UPDATE_ITERATOR")
    });

    test('resetState', () => {
        expect(resetState().type).toEqual("RESET_STATE")
    });
});


describe('Reducers', () => {
  it('initalstate', () => {
    expect(reducer(undefined, {})).toEqual(
      {
       	user: [],
        brand: [],
        iterator: []
      }
    )
  })
})


import React from 'react';
import { shallow, mount } from 'enzyme';

import {updateShots, resetState} from '../../../src/redux/shot/ShotAction';
import reducer from '../../../src/redux/shot/ShotReducer';


describe('actions', function() {
    test('updateShots', () => {
        expect(updateShots().type).toEqual("UPDATE_SHOTS")
    });

    test('resetState', () => {
        expect(resetState().type).toEqual("RESET_STATE")
    });
});


describe('Reducers', () => {
  it('initalstate', () => {
    expect(reducer(undefined, {})).toEqual(
      {
       	shots: []
      }
    )
  })
})


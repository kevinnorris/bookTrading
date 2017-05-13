
import { fromJS } from 'immutable';
import wishlistPageReducer from '../reducer';

describe('wishlistPageReducer', () => {
  it('returns the initial state', () => {
    expect(wishlistPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});

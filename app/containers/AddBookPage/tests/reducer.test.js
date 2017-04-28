
import { fromJS } from 'immutable';
import addBookPageReducer from '../reducer';

describe('addBookPageReducer', () => {
  it('returns the initial state', () => {
    expect(addBookPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});

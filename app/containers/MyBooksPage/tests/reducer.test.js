
import { fromJS } from 'immutable';
import myBooksPageReducer from '../reducer';

describe('myBooksPageReducer', () => {
  it('returns the initial state', () => {
    expect(myBooksPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});

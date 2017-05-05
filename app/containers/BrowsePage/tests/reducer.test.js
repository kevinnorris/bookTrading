
import { fromJS } from 'immutable';
import browsPageReducer from '../reducer';

describe('browsePageReducer', () => {
  it('returns the initial state', () => {
    expect(browsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});

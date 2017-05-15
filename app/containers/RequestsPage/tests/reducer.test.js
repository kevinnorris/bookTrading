
import { fromJS } from 'immutable';
import requestsPageReducer from '../reducer';

describe('requestsPageReducer', () => {
  it('returns the initial state', () => {
    expect(requestsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});

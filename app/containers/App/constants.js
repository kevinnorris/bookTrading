/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';

export const AUTHENTICATE_USER = 'bookTrader/App/AUTHENTICATE_USER';
export const AUTHENTICATE_USER_SUCCESS = 'bookTrader/App/AUTHENTICATE_USER_SUCCESS';
export const AUTHENTICATE_USER_ERROR = 'bookTrader/App/AUTHENTICATE_USER_ERROR';

export const LOGOUT_USER = 'bookTrader/App/LOGOUT_USER';

export const SELECT_BOOK = 'bookTrader/App/SELECT_BOOK';
export const UNSELECT_BOOK = 'bookTrader/App/UNSELECT_BOOK';

export const UPDATE_SETTINGS_REQUEST = 'bookTrader/App/UPDATE_SETTINGS_REQUEST';
export const UPDATE_SETTINGS_SUCCESS = 'bookTrader/App/UPDATE_SETTINGS_SUCCESS';
export const UPDATE_SETTINGS_ERROR = 'bookTrader/App/UPDATE_SETTINGS_ERROR';

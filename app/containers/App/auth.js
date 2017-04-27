import request from 'utils/request';
import { appUrl } from 'utils/constants';

const localStorage = global.window.localStorage;
const localStorageString = 'bookTrader-FCC';

/**
 * Save user data to local storage and return the cookie object
 * @param {string} token
 * @param {object} user
 * @param {number} expiresIn
 */
function saveCookie(token, user, expiresIn) {
  const cookie = { token, user };
  cookie.expireDate = new Date(Date.now() + expiresIn);
  localStorage.setItem(localStorageString, JSON.stringify(cookie));
  return cookie;
}

/**
  * Logs a user in, returning a object with token and user object
  * @param  {string} username The username of the user
  * @param  {string} password The password of the user
  */
export function login(username, password) {
  if (loggedIn()) return JSON.parse(localStorage.get(localStorageString));

  return request(`${appUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => (
      saveCookie(response.token, response.user, response.expiresIn)
    ));
}

/**
  * Sign a user up, returning a object with token and user object
  * @param  {string} username The username of the user
  * @param  {string} password The password of the user
  */
export function signup({ username, password, email, name, city, state, country }) {
  console.log(`auth signup called with: ${username} ${email} ${password}`);
  return request(`${appUrl}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email, name, city, state, country }),
  })
    .then((response) => {
      console.log('response from server:');
      console.log(response);
      return saveCookie(response.token, response.user, response.expiresIn);
    });
}

/**
  * Logs the current user out
  */
export function logout() {
  // remove cookie
  localStorage.removeItem(localStorageString);
}

/**
 * Check if a user is logged in
 * Returns false or the users cookie
 */
export function loggedIn() {
  const cookie = JSON.parse(localStorage.getItem(localStorageString));
  // If a cookie is stored and it has not yet expired
  if (cookie && Date.now() < new Date(cookie.expireDate)) {
    return cookie;
  }
  return false;
}

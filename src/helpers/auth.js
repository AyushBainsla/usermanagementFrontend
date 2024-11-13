import { setAuthorization } from './api';
import { jwtDecode } from 'jwt-decode';
import { Base64 } from 'js-base64';

export function storeAccessToken(token, id_token, refresh_token) {
  localStorage.setItem('access_token', token);
  localStorage.setItem('id_token', id_token);
  localStorage.setItem('refresh_token', refresh_token);
  setAuthorization();
  return true;
}

export function logout() {
  localStorage.clear();
  removeAllCookies();
  setAuthorization();
  setTimeout(() => {
    if (process.browser) window.location.href = `${window.location.origin}/`;
  }, 500);
  return true;
}
export const encodeData = (payload) => {
  try {
    let dataString = Base64.btoa(encodeURI(JSON.stringify(payload)));
    return dataString;
  } catch (error) {
    return error;
  }
};

export const decodeData = (token) => {
  try {
    if (!token) {
      return '';
    }
    let payload = JSON.parse(decodeURI(Base64.atob(token)));
    return payload;
  } catch (error) {
    return error;
  }
};

export function isAuth() {
  try {
    const tokenChecked = localStorage.getItem('access_token');
    if (tokenChecked) {
      return decryptedToken(tokenChecked);
    }
    return false;
  } catch (err) {
    return false;
  }
}

export function currentUser() {
  try {
    if (process.browser) {
      return localStorage.getItem('access_token');
    }
    return false;
  } catch (error) {
    return false;
  }
}

export function getUserProfile() {
  try {
    if (process.browser) {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        return decodeData(currentUser);
      } else {
        return logout();
      }
    }
    return false;
  } catch (error) {
    return error;
  }
}

// for getting cookie by name
export function getCookie(name) {
  const cookies = document?.cookie.split(';').map((cookie) => cookie.trim());
  for (const cookie of cookies) {
    const [cookieName, value] = cookie.split('=');
    if (cookieName === name) {
      return value;
    }
  }
  return undefined;
}

// for removing all cookies
export function removeAllCookies() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
  }
}

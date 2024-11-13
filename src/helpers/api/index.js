import axios from './instance';
import * as auth from '../auth';
import apiKeys from './apiKeys';

let controller = new AbortController();

const getUrlByKey = (key) => {
  return apiKeys[key];
};

class API {
  // eslint-disable-next-line lines-around-comment
  /**
   * auth2 login api
   * @param {string} url String
   * @param {object} payload Object
   * @param {object} action Object e.g {type: 'AUTH', dispatch: function(){} }
   * @returns {Promise<void>} void
   */

  static apiGet = async (key, args) => {
    if (typeof args === 'string') {
      return axios.get(getUrlByKey(key) + args, {
        signal: controller.signal,
      });
    }
    return axios.get(getUrlByKey(key), {
      data: args,
      signal: controller.signal,
    });
  };

  static apiGetByKey = async (key, args, query) => {
    if (typeof args === 'string') {
      return axios.get(getUrlByKey(key) + args, {
        signal: controller.signal,
      });
    }
    return axios.get(`${getUrlByKey(key)}/query?${query}`, {
      data: args,
      signal: controller.signal,
    });
  };

  static apiPost = async (key, args, headers) => {
    return axios.post(getUrlByKey(key), args, {
      ...headers,
      signal: controller.signal,
    });
  };

  static apiPostUrl = async (key, dynamicUrl, args) => {
    return axios.post(getUrlByKey(key) + dynamicUrl, args, {
      signal: controller.signal,
    });
  };

  static apiPut = async (key, args) => {
    if (typeof args === 'string') {
      return axios.put(getUrlByKey(key) + args, {
        signal: controller.signal,
      });
    }
    return axios.put(getUrlByKey(key), args, {
      signal: controller.signal,
    });
  };

  static apiPutUrl = async (key, dynamicUrl, args) => {
    return axios.put(getUrlByKey(key) + dynamicUrl, args, {
      signal: controller.signal,
    });
  };

  static apiUploadFile = async (key, args, configs) => {
    return axios.post(getUrlByKey(key), args, {
      ...configs,
      signal: controller.signal,
    });
  };

  static apiUpdateFile = async (key, dynamicUrl, args, configs) => {
    return axios.put(getUrlByKey(key) + dynamicUrl, args, {
      ...configs,
      signal: controller.signal,
    });
  };

  static apiDelete = async (key, args) => {
    return axios.delete(getUrlByKey(key), {
      data: args,
      signal: controller.signal,
    });
  };

  static apiDeleteUrl = async (key, dynamicUrl, args) => {
    return axios.delete(getUrlByKey(key) + dynamicUrl, {
      data: args,
      signal: controller.signal,
    });
  };

  static apiDeletePost = async (key, args) => {
    return axios.delete(getUrlByKey(key), {
      data: args,
      signal: controller.signal,
    });
  };

  static setCSRF = (csrfToken, sessionid) => {
    const CSRF_COOKIE = sessionid;
    if (process.browser) {
      localStorage.setItem('web_token', CSRF_COOKIE);
      axios.defaults.headers.common['X-CSRFToken'] = CSRF_COOKIE;
    }
  };

  static apiDownloadFile = async (key, args, configs) => {
    return axios.get(`${getUrlByKey(key)}/${args}`, {
      ...configs,
      signal: controller.signal,
    });
  };
}

export default API;

// # interceptors
axios.interceptors.request.use(
  (configs) => {
    configs.signal = controller.signal;
    return configs;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      controller.abort();
      auth.logout();
    }
    return Promise.reject(error);
  },
);

export const setAuthorization = () => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.authorization =
    'Bearer' + process.browser && localStorage.getItem('access_token')
      ? localStorage.getItem('access_token')
      : '';
  axios.defaults.headers.common.id_authorization =
    process.browser && localStorage.getItem('id_token')
      ? localStorage.getItem('id_token')
      : '';
  axios.defaults.headers.common.refresh_authorization =
    process.browser && localStorage.getItem('refresh_authorization')
      ? localStorage.getItem('refresh_token')
      : '';
};
setAuthorization();

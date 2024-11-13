import API from '../../helpers/api';
import { handleErrorMessage } from '../../utils/commonFunctions';
import { get } from 'lodash';
import * as auth from '../../helpers/auth';

function errorRequest(err, dispatch) {
  let data = get(err, 'response.data', null);
  data = data || get(err, 'response');
  data = data || err;
  dispatch({
    type: 'AUTH_FAILURE',
    payload: data,
  });
}

export function login(payload) {
  return (dispatch) => {
    const type = 'AUTH';
    dispatch({ type: `${type}_REQUEST` });
    try {
      API.apiPost('userLogin', { payload: auth.encodeData(payload) })
        .then(({ data }) => {
          if (data && data.token) {
            dispatch({ type: `${type}_SUCCESS`, payload: data });
            setTimeout(() => {
              dispatch(getUserData(data.token));
              dispatch(setTheme());
            }, 500);
          }
        })
        .catch((err) => {
          // toast.error(err?.message);
          errorRequest(err, dispatch);
          handleErrorMessage(err);
        });
    } catch (err) {
      toast.error(err?.message);
      errorRequest(err, dispatch);
      handleErrorMessage(err);
    }
  };
}

export function getUsersList() {
  return (dispatch) => {
    debugger
    const type = 'GET_USERS';
    dispatch({ type: `${type}_REQUEST` });
    try {
      API.apiGet('getUsersList')
        .then(({ data }) => {
          debugger
          if (data) {
            dispatch({ type: `${type}_SUCCESS`, payload: data });
          }
        })
        .catch((err) => {
          errorRequest(err, dispatch);
          handleErrorMessage(err);
        });
    } catch (err) {
      errorRequest(err, dispatch);
      handleErrorMessage(err);
    }
  };
}
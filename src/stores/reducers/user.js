const INITIAL_STATE = {
  loading: false,
  usersList: []
};
const mainPageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'AUTH_REQUEST':
      return { ...state, loading: true };
    case 'GET_USERS_REQUEST': 
      return { ...state, loading: true};
    case 'GET_USERS_SUCCESS': 
      return { ...state, loading: false, usersList: action.payload};
    default:
      return state;
  }
};

export default mainPageReducer;

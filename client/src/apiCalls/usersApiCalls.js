import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.defaults.withCredentials = true; // allow us to include cookies
const setAuthToken = () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const signup = async (dispatch, data) => {
  setAuthToken();
  const { firstName, lastName, email, password } = data;
  try {
    const response = await axios.post('/auth/signup', {
      firstName,
      lastName,
      email,
      password,
    });

    dispatch({ type: 'LOGIN', payload: response.data.data });
    return response.data;
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILED', payload: error.response.data.message });
    return error.response.data;
  }
};

export const login = async (dispatch, data) => {
  setAuthToken();
  const { email, password } = data;
  try {
    const response = await axios.post('/auth/login', {
      email,
      password,
    });
    console.log(response);
    dispatch({ type: 'LOGIN', payload: response.data.data });

    console.log(response.data);
    localStorage.setItem('jwt', response.data.data.token);

    return response.data;
  } catch (error) {
    // handle error
  }
};

export const getUser = async (dispatch) => {
  setAuthToken();
  try {
    const response = await axios.get('/me');

    dispatch({ type: 'LOGIN', payload: response.data.data });
    // return response.data.data;
  } catch (error) {
    console.log(error.response);
    dispatch({ type: 'LOGOUT' });
    // return error.response.data;
  }
};

export const logout = async (usersDispatch, cartsDispatch) => {
  setAuthToken();
  try {
    await axios.get('/auth/logout');
    usersDispatch({ type: 'LOGOUT' });
    cartsDispatch({ type: 'RESET_CART' });
  } catch (error) {
    dispatch({ type: 'LOGOUT' });
  }
};

export const updateUser = async (dispatch, data) => {
  setAuthToken();
  try {
    const response = await axios.patch('/me', data);
    dispatch({ type: 'UPDATE_USER', payload: response.data.data });
    return response.data.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

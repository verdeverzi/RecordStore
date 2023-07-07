import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const setAuthToken = () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

const getAllRecords = async (dispatch) => {
  setAuthToken();
  try {
    const response = await axios.get(`${API_URL}/records`);

    dispatch({ type: 'FETCH_RECORD_SUCCESS', payload: response.data.data });
  } catch (error) {
    dispatch({ type: 'FETCH_RECORD_FAIL' });
  }
};

export default getAllRecords;

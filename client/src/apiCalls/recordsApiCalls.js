import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const getAllRecords = async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/records`);

    dispatch({ type: 'FETCH_RECORD_SUCCESS', payload: response.data.data });
  } catch (error) {
    dispatch({ type: 'FETCH_RECORD_FAIL' });
  }
};

export default getAllRecords;

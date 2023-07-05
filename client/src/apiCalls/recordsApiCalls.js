import axios from 'axios';

const getAllRecords = async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8000/records');

    dispatch({ type: 'FETCH_RECORD_SUCCESS', payload: response.data.data });
  } catch (error) {
    dispatch({ type: 'FETCH_RECORD_FAIL' });
  }
};

export default getAllRecords;

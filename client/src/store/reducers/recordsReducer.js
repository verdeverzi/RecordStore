export const recordsInitialState = {
  data: [],
};

export const recordsReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_RECORD_SUCCESS':
      return {
        data: action.payload,
      };

    case 'FETCH_RECORD_FAIL':
      return {
        ...state,
      };
    default:
      return state;
  }
};

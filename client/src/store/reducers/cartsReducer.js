export const cartsInitialState = {
  items: [],
  id: '',
};

export const cartsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CART':
      return {
        id: action.payload._id,
        items: action.payload.items,
      };

    case 'ADD_CART_ITEM':
      return {
        ...state,
        items: action.payload.items,
      };

    case 'GET_CART_DATA':
      return {
        items: action.payload.items,
        id: action.payload._id,
      };

    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        items: state.items.map((item) =>
          item.record._id === action.payload.record ? action.payload : item
        ),
      };

    case 'DELETE_CART_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.record._id !== action.payload),
      };

    case 'RESET_CART':
      return {
        items: [],
        id: '',
      };

    default:
      return state;
  }
};

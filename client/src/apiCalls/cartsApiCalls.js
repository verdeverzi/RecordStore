import axios from 'axios';

//! Add an item to the cart
export const addToCart = async (cartsDispatch, cartsState, recordId) => {
  console.log(' .cartsState.id. ', cartsState.id);
  try {
    const itemToUpdate = cartsState.items.find(
      (item) => item.record._id === recordId
    );
    if (itemToUpdate) {
      const response = await axios.patch('http://localhost:8000/carts', {
        quantity: itemToUpdate.quantity + 1,
        cartId: cartsState.id,
        recordId,
      });

      // Dispatch an action to update the cart with the new data
      cartsDispatch({ type: 'UPDATE_CART_ITEM', payload: response.data.data });
      return;
    }

    const response = await axios.post('http://localhost:8000/carts', {
      record: recordId,
      quantity: 1,
      cartId: cartsState.id,
    });

    console.log(response.data.data);
    cartsDispatch({
      type: 'ADD_CART_ITEM',
      payload: response.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

//! Get all items from the cart
export const getCartItems = async (cartsDispatch) => {
  try {
    const response = await axios.get('http://localhost:8000/carts/me');

    if (response.data.data) {
      cartsDispatch({ type: 'GET_CART_DATA', payload: response.data.data });
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteCartItem = async (cartsDispatch, cartsState, recordId) => {
  console.log(recordId);
  try {
    const response = await axios.patch(
      `http://localhost:8000/carts/${cartsState.id}`,
      {
        recordId,
      }
    );

    console.log('delet cart itesms res ->', response.data.data);

    cartsDispatch({ type: 'DELETE_CART_ITEM', payload: recordId });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const createCart = async (cartsDispatch) => {
  try {
    const response = await axios.post('http://localhost:8000/carts/me');

    cartsDispatch({ type: 'ADD_CART', payload: response.data.data });
  } catch (error) {
    console.log(error);
  }
};

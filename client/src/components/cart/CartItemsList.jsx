import { useContext } from 'react';
import { MdDelete } from 'react-icons/md';
import { deleteCartItem, getCartItems } from '../../apiCalls/cartsApiCalls';
import { DataContext } from '../../store/context';

const CartItemsList = () => {
  const { cartsState, cartsDispatch } = useContext(DataContext);

  const handleDeleteCartItem = async (recordId) => {
    try {
      await deleteCartItem(cartsDispatch, cartsState, recordId);
      getCartItems(cartsDispatch);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ul className="cart-items-list">
      {cartsState.items.length > 0 ? (
        cartsState.items.map((item) => (
          <li key={item.record._id} className="cart-item">
            <div className="cart-item-info">
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.record.title}</h3>
                <p className="cart-item-artist">by {item.record.artist}</p>
                <p className="cart-item-quantity">
                  Price: €{item.record.price.toFixed(2)}
                </p>
                <p className="cart-item-quantity">Quantity: {item.quantity}</p>

                <MdDelete
                  className="cart-item-remove"
                  onClick={() => handleDeleteCartItem(item.record._id)}
                />
              </div>
            </div>
          </li>
        ))
      ) : (
        <p>Cart Is empty</p>
      )}
    </ul>
  );
};

export default CartItemsList;

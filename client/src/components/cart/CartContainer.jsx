import { useContext } from 'react';
import { DataContext } from '../../store/context';
import CartItemsList from './CartItemsList';

const CartSidebar = ({ isOpen, handleCloseCart }) => {
  const { cartsState } = useContext(DataContext);

  /* 
   We did no write this function in the class, i added it here as it has 
   nothing to do with useReducer, it's just plain javascript to calculate the price
*/
  const getTotalPrice = () => {
    let totalPrice = 0;
    cartsState.items.forEach((item) => {
      totalPrice += item.quantity * item.record.price;
    });
    return totalPrice;
  };

  return (
    <div>
      {isOpen ? (
        <div className="cart-sidebar">
          {' '}
          <button
            type="button"
            onClick={handleCloseCart}
            className="close-button"
          >
            &times;
          </button>
          {cartsState.items ? (
            <>
              <p className="cart-price">Total: €{getTotalPrice().toFixed(2)}</p>
              <div className="cart-body">
                <CartItemsList />
              </div>
            </>
          ) : (
            <>
              <p className="cart-price">Total: €0</p>
              <div className="cart-body">
                <p className="cart-empty">The silence is deafening here!</p>
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default CartSidebar;

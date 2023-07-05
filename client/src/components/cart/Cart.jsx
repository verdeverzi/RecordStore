import { useContext, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { DataContext } from '../../store/context';
// import { createCart, getCartItems } from '../../apiCalls/cartsApiCalls';

import CartContainer from './CartContainer';

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartsState } = useContext(DataContext);

  const handleCartOpenCart = async () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="cart">
      <button type="button" className="btn-cart" onClick={handleCartOpenCart}>
        <FaShoppingCart />
        <div className="items-amount">
          {cartsState.items ? cartsState.items.length : 0}
        </div>
      </button>
      <CartContainer isOpen={isOpen} handleCloseCart={handleCartOpenCart} />
    </div>
  );
};

export default Cart;

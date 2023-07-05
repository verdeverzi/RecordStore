import { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

import { addToCart, getCartItems } from '../../apiCalls/cartsApiCalls';
import skiptrace from '../../assets/SKiPTRACE.jpg';
import { DataContext } from '../../store/context';

const RecordCard = ({ record }) => {
  const { title, artist, year, price } = record;

  const { cartsDispatch, cartsState } = useContext(DataContext);

  const clickHandler = async (recordId) => {
    try {
      await addToCart(cartsDispatch, cartsState, recordId);
      getCartItems(cartsDispatch);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="record">
      <div>
        <img src={skiptrace} alt="cartoon of record" />
      </div>

      <div className="record-info">
        <p>{title}</p>
        <p>
          <span>
            {artist} - {year}
          </span>
        </p>
      </div>

      <div className="record-footer">
        <p className="record-footer-price">{price} €</p>
        <div className="record-footer-icon">
          <FaShoppingCart onClick={() => clickHandler(record._id)} />
        </div>
      </div>
    </div>
  );
};

export default RecordCard;

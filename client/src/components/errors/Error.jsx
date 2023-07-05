import { useContext } from 'react';
import { DataContext } from '../../store/context';

// when an axios error happens, display this component

const Error = () => {
  const { error, setError } = useContext(DataContext);
  // reset the error to null when closed / button click
  const handleClick = () => {
    setError(null);
  };

  // display the error message
  return (
    <div className="error">
      <div>
        <h3>
          Error <span>&#128544;</span>
        </h3>
        <p>Message: {error.message || 'Something went wrong'}</p>
        <button type="button" onClick={handleClick}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Error;

import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <h3>Page not found</h3>
      <button type="button" onClick={handleClick}>
        Back
      </button>
    </div>
  );
};

export default NotFound;

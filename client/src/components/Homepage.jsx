import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../store/context';

const Homepage = () => {
  const navigate = useNavigate();
  const { isUserLoggedIn } = useContext(DataContext);
  if (isUserLoggedIn) return navigate('/dashboard');

  return (
    <div className="homepage">
      <section className="hero">
        <div className="gabriel">
          <a
            href="https://www.gabrielhollington.com/"
            target="_blank"
            rel="noreferrer"
          >
            Illustrations by Gabriel Hollington
          </a>
        </div>
      </section>
    </div>
  );
};

export default Homepage;

import { FaRecordVinyl } from 'react-icons/fa';
import { useNavigate, NavLink } from 'react-router-dom';

import { useContext } from 'react';
import { DataContext } from '../store/context';
import Cart from './cart/Cart';
import { logout } from '../apiCalls/usersApiCalls';

const Nav = () => {
  const { user, isUserLoggedIn, usersDispatch, cartsDispatch } =
    useContext(DataContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(usersDispatch, cartsDispatch);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav>
      <ul>
        <div className="logo">
          <FaRecordVinyl />
          <NavLink to={isUserLoggedIn ? '/dashboard' : '/'}>
            <span>Vinyl Destination</span>
          </NavLink>
        </div>

        <div className="items">
          {isUserLoggedIn ? (
            <>
              <Cart />
              <NavLink to="/profile">
                <img
                  src={user.avatar}
                  alt="users avatar"
                  className="nav-avatar"
                />
              </NavLink>
              <NavLink className="button-bg" onClick={handleLogout}>
                <p>Logout</p>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <p>Login</p>
              </NavLink>
              <NavLink to="/signup" className="button-bg">
                <p>Signup</p>
              </NavLink>
            </>
          )}
        </div>
      </ul>

      {/* <Cart /> */}
    </nav>
  );
};

export default Nav;

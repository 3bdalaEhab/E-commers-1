import React, { useContext, useEffect } from 'react';
import { Link, NavLink, BrowserRouter as Router,  useNavigate } from 'react-router-dom';

import { tokenContext } from '../CounterContext/TokenContext';
import { CartContext } from '../CounterContext/CartContext';
import { CounterContext } from '../CounterContext/CounterContext';

const logoPath = process.env.PUBLIC_URL + '/freshcart-logo.svg';

const NavBar = () => {
  let navigate = useNavigate();
  const { token, setToken } = useContext(tokenContext);
  const { numOfCartItems } = useContext(CartContext);
  const { getWishlist, CountWish } = useContext(CounterContext);

  async function countWishlist() {
    await getWishlist();
  }

  useEffect(() => {
    countWishlist();
  }, [CountWish]);

  function logOut() {
    localStorage.clear();
    navigate("/Login");
    setToken(null);
  }

  return (
    <>
      <nav className="navbar  mb-5 navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logoPath} alt="This is Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-bold">
                <li className="nav-item">
                  <NavLink exact className="nav-link" activeStyle={{ color: 'red' }} to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" activeStyle={{ color: 'red' }} to="/Products">
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" activeStyle={{ color: 'red' }} to="/Categories">
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" activeStyle={{ color: 'red' }} to="/AllOrders">
                    AllOrders
                  </NavLink>
                </li>
              </ul>
            ) : (
              ''
            )}
            <ul className="navbar-nav ms-auto mb-2 text-center mb-lg-0">
              {token ? (
                <>
                  <li className="nav-item text-center m-auto">
                    <NavLink className="nav-link fet d-flex d-block justify-content-center position-relative align-items-center" to="/Wishlist">
                      Wishlist<i className="fa-solid ms-2 h3 fa-bookmark"></i>{' '}
                      <span className="bg-main position-absolute d-flex justify-content-center align-items-center redCount text-white">
                        {CountWish >= 9 ? '9+' : CountWish ? CountWish : '0'}
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item text-center m-auto">
                    <NavLink className="nav-link fet d-flex d-block justify-content-center position-relative align-items-center" to="/Cart">
                      Cart<i className="fa-solid ms-2 h3 fa-cart-shopping"></i>{' '}
                      <span className="bg-main position-absolute d-flex justify-content-center align-items-center redCount text-white">
                        {numOfCartItems >= 9 ? '9+' : numOfCartItems ? numOfCartItems : '0'}
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item text-center m-auto fw-bold">
                    <button onClick={logOut} className="nav-link ms-md-2">
                      LogOut
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Login">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    
    </>
  );
};

export default NavBar;

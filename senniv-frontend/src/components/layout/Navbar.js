// src/components/layout/Navbar.js
import React, { memo } from 'react'; // Consolidata in un'unica importazione
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';

function Navbar() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const guestLinks = (
    <>
      <li><Link to="/register">Registrati</Link></li>
      <li><Link to="/login">Accedi</Link></li>
    </>
  );

  const authLinks = (
    <>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><a href="#!" onClick={() => dispatch(logout())}>Logout</a></li>
    </>
  );

  return (
    <nav>
      <h1><Link to="/">Senniv</Link></h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        {auth.isAuthenticated ? authLinks : guestLinks}
      </ul>
    </nav>
  );
}

export default memo(Navbar); // Memoized il componente Navbar per ottimizzare i re-render

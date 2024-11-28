// src/actions/authActions.js
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
} from './types';

// Carica l'utente
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token); // Imposta il token nei default headers
  }

  try {
    const res = await axios.get('/api/users/profile'); // Richiesta per ottenere i dati dell'utente
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Registrazione utente
export const register = ({ nome, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ nome, email, password });

  try {
    const res = await axios.post('/api/auth/register', body, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser()); // Carica l'utente una volta registrato
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response?.data?.error || 'Errore di registrazione.',
    });
  }
};

// Login utente
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth/login', body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser()); // Carica l'utente una volta loggato
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response?.data?.error || 'Errore di login.',
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  localStorage.removeItem('token'); // Rimuovi il token dal localStorage
  setAuthToken(null); // Rimuovi il token dai default headers
  dispatch({ type: LOGOUT });
};

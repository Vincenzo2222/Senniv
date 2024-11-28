// src/components/auth/Register.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/authActions';

function Register() {
  const [formData, setFormData] = useState({ nome: '', email: '', password: '' });
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const { nome, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(register({ nome, email, password }));
  };

  if (auth.isAuthenticated) {
    return <p>Utente registrato con successo. Vai alla dashboard.</p>;
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="nome" value={nome} onChange={onChange} placeholder="Nome" required />
      <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
      <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
      <button type="submit">Registrati</button>
    </form>
  );
}

export default Register;

import axios from 'axios';

const validateIdea = async (idea) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token non trovato. Effettua il login.');
    return { error: 'Devi effettuare il login.' };
  }

  try {
    const res = await axios.post(
      '/api/ai/idea-validation',
      { idea },
      { headers: { 'x-auth-token': token } }
    );
    return res.data;
  } catch (err) {
    console.error('Errore durante la validazione dell\'idea:', err.response?.data || err.message);
    return { error: 'Errore durante la validazione dell\'idea.' };
  }
};

export default validateIdea;

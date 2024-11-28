import axios from 'axios';

// Ottieni tutti i progetti
export const getProgetti = () => async dispatch => {
  try {
    const res = await axios.get('/api/projects');
    dispatch({ type: 'GET_PROGETTI_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'GET_PROGETTI_FAIL', payload: err.response.data });
  }
};

// Crea un nuovo progetto
export const createProgetto = (progetto) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/projects', progetto, config);
    dispatch({ type: 'CREATE_PROGETTO_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'CREATE_PROGETTO_FAIL', payload: err.response.data });
  }
};

// Elimina un progetto
export const deleteProgetto = (id) => async dispatch => {
  try {
    await axios.delete(`/api/projects/${id}`);
    dispatch({ type: 'DELETE_PROGETTO_SUCCESS', payload: id });
  } catch (err) {
    dispatch({ type: 'DELETE_PROGETTO_FAIL', payload: err.response.data });
  }
};

// Ottieni il progresso di un progetto
export const getProgresso = (progettoId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/projects/${progettoId}/progress`);
    dispatch({ type: 'GET_PROGRESSO_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'GET_PROGRESSO_FAIL', payload: err.response?.data });
  }
};


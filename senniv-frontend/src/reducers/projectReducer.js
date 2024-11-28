const initialState = {
  progetti: [], // Lista dei progetti
  progettoCorrente: null, // Un singolo progetto selezionato
  loading: true, // Indica se i dati sono in fase di caricamento
  error: null, // Eventuali errori
};

export default function projectReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'GET_PROGETTI_SUCCESS':
      return {
        ...state,
        progetti: payload, // Aggiorna la lista dei progetti con quelli ricevuti dall'API
        loading: false,
      };
    case 'GET_PROGETTI_FAIL':
      return {
        ...state,
        progetti: [],
        error: payload,
        loading: false,
      };
    case 'CREATE_PROGETTO_SUCCESS':
      return {
        ...state,
        progetti: [payload, ...state.progetti], // Aggiunge un nuovo progetto in cima alla lista
        loading: false,
      };
    case 'CREATE_PROGETTO_FAIL':
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case 'DELETE_PROGETTO_SUCCESS':
      return {
        ...state,
        progetti: state.progetti.filter(progetto => progetto._id !== payload), // Rimuove il progetto eliminato
        loading: false,
      };
    case 'DELETE_PROGETTO_FAIL':
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

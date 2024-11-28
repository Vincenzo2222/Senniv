// src/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; // Importazione corretta del middleware
import { composeWithDevTools } from 'redux-devtools-extension';

// Importa i reducer
import authReducer from './reducers/authReducer';
import projectReducer from './reducers/projectReducer';

// Combina i reducer
const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
});

// Configura lo store
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) // Configura Redux DevTools e Redux Thunk
);

export default store;


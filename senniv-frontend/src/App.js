import React, { useEffect, lazy, Suspense } from 'react'; // Consolidato in un'unica dichiarazione
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/authActions';

// Importa componenti principali
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import IdeaValidation from './components/sections/IdeaValidation'; // Nuove sezioni
import BusinessPlan from './components/sections/BusinessPlan';
import Marketing from './components/sections/Marketing';

// Lazy loading per alcune pagine
const Home = lazy(() => import('./components/pages/Home'));
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));

// Imposta il token di autenticazione se presente
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

// Componente per proteggere le rotte
function PrivateRoute({ element, ...rest }) {
  const auth = useSelector(state => state.auth);
  return auth.isAuthenticated ? element : <Navigate to="/login" />;
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Rotte pubbliche */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Rotte protette */}
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/idea-validation" element={<PrivateRoute element={<IdeaValidation />} />} />
            <Route path="/business-plan" element={<PrivateRoute element={<BusinessPlan />} />} />
            <Route path="/marketing" element={<PrivateRoute element={<Marketing />} />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;

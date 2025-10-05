import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Patients from './pages/Patients';
import Vitals from './pages/Vitals';
import Prescriptions from './pages/Prescriptions';
import Settings from './pages/Settings';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('ryuehr_auth');
    setIsAuthenticated(auth === 'true');
  }, []);

  const handleLogin = () => {
    localStorage.setItem('ryuehr_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('ryuehr_auth');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <DashboardLayout onLogout={handleLogout}>
                <Dashboard />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/appointments"
          element={
            isAuthenticated ? (
              <DashboardLayout onLogout={handleLogout}>
                <Appointments />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/patients"
          element={
            isAuthenticated ? (
              <DashboardLayout onLogout={handleLogout}>
                <Patients />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/vitals"
          element={
            isAuthenticated ? (
              <DashboardLayout onLogout={handleLogout}>
                <Vitals />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/prescriptions"
          element={
            isAuthenticated ? (
              <DashboardLayout onLogout={handleLogout}>
                <Prescriptions />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/settings"
          element={
            isAuthenticated ? (
              <DashboardLayout onLogout={handleLogout}>
                <Settings />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

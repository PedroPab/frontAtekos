import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Me from './pages/Me';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/me" element={<Me />} />
    </Routes>
  );
}

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


const AppRoutes = () => {
  return (

    <Routes>
      <Route path="/" element={<Home />} />


      {/* login ... */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    </Routes>
  );
}

const App = () => {
  return (
    // <ContextProvider>
    <Router>
      <AppRoutes />
    </Router>
    // </ContextProvider>
  )
}

export default App

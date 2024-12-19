import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';


const AppRoutes = () => {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
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

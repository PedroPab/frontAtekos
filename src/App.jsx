import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomeRoutes from './routes/HomeRoutes';
import DashboardRoutes from './routes/DashboardRoutes';
import RoomRoutes from './routes/RoomRoutes';
import FocusRoutes from './routes/FocusRoutes';
import NotFoundRoute from './routes/NotFoundRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {HomeRoutes()}
      {DashboardRoutes()}
      {RoomRoutes()}
      {FocusRoutes()}
      {NotFoundRoute()}
    </Routes>
  );
}

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <AppRoutes />
      </Router>
    </HelmetProvider>
  )
}

export default App;

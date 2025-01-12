import { Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Me from '../pages/Me';

const DashboardRoutes = () => {
  return (
    <>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/me" element={<Me />} />
    </>
  );
}

export default DashboardRoutes;

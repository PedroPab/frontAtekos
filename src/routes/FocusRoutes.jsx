import { Route } from 'react-router-dom';
import Focus from '../pages/Focus';
import FocusDetails from '../pages/FocusDetails';

const FocusRoutes = () => {
  return (
    <>
      <Route path="/focus" element={<Focus />} />
      <Route path="/focus/:id" element={<FocusDetails />} />
    </>
  );
}

export default FocusRoutes;

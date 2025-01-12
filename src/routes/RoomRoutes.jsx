import { Route } from 'react-router-dom';
import Rooms from '../pages/Rooms';
import RoomDetail from '../pages/RoomDetail';

const RoomRoutes = () => {
  return (
    <>
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/rooms/:id" element={<RoomDetail />} />
    </>
  );
}

export default RoomRoutes;

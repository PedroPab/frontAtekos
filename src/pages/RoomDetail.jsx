import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import DefaultLayout from '../layout/default';
import { fetchRoomById, switchRoomLight } from '../services/api';
import { useWebSocket } from '../hooks/websocket';
import LampControl from '../components/LampControl';

const RoomDetail = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  const handleWebSocketMessage = (message) => {
    if (message?.type === 'room.update' || message?.event === 'room.update') {
      const dataRoom = message.data;
      console.table(dataRoom);
      setRoom(dataRoom);
    }
    console.log('Mensaje recibido:', message);
  };

  const { isConnected, error, socket } = useWebSocket(handleWebSocketMessage, '1');

  useEffect(() => {
    if (isConnected) {
      console.log('Conectado al servidor WebSocket');
      handleSubscribe(id);
    }
  }, [isConnected]);

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const roomData = await fetchRoomById(id);
        console.table(roomData);
        setRoom(roomData);
      } catch (error) {
        console.error('Error al cargar la sala:', error);
      }
    };

    loadRoom();
  }, [id]);

  const handleSubscribe = (room) => {
    console.log('handleSubscribe', room, socket);
    if (socket) {
      socket.send(
        JSON.stringify({ type: 'subscribe', event: 'room.update', room })
      );
      console.log(`Suscrito a la sala ${room}`);
    }
  };

  const handleSwitchLight = async () => {
    try {
      await switchRoomLight(id);
      console.log(`Estado de la sala ${id} cambiado`);
    } catch (error) {
      console.error('Error al cambiar el estado de la sala:', error);
    }
  };

  return (
    <DefaultLayout>
      <Container className="mt-5">
        {room ? (
          <Row>
            <Col md={12}>
              <LampControl name={room.name} state={room.state} toggleLamp={handleSwitchLight} />
            </Col>
          </Row>
        ) : (
          <p>Cargando sala...</p>
        )}
      </Container>
    </DefaultLayout>
  );
};

export default RoomDetail;

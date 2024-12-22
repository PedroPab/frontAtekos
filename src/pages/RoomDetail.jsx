import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import DefaultLayout from '../layout/default';
import { fetchRoomById, switchRoomLight } from '../services/api';
import { useWebSocket } from '../hooks/websocket';

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
            <Col md={8}>
              <Card>
                <Card.Body>
                  <Card.Title>{room.name}</Card.Title>
                  <Card.Text>{room.description}</Card.Text>
                  <Card.Text>
                    <strong>ID:</strong> {room.id}
                  </Card.Text>
                  <Card.Text>
                    <strong>Estado:</strong> {room.state ? 'Activo' : 'Inactivo'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Fecha de Creación:</strong> {new Date(room.dateCreate).toLocaleString()}
                  </Card.Text>
                  <Card.Text>
                    <strong>Última Actualización:</strong> {new Date(room.dateUpdate).toLocaleString()}
                  </Card.Text>
                  <Button variant="secondary" onClick={handleSwitchLight}>
                    Cambiar Estado
                  </Button>
                </Card.Body>
              </Card>
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

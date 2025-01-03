import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import DefaultLayout from '../layout/default';
import RoomList from '../components/RoomList';
import Messages from '../components/Messages';
import { fetchRooms, switchRoomLight } from '../apis/rooms/api';
import { useWebSocket } from '../hooks/websocket';

const Rooms = () => {
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState('');

  const idUser = '1';



  useEffect(() => {
    const loadRooms = async () => {
      try {
        const roomsData = await fetchRooms();
        setRooms(roomsData);
      } catch (error) {
        console.error('Error al cargar las salas:', error);
      }
    };

    loadRooms();
  }, []);

  const handleWebSocketMessage = (message) => {
    switch (message?.type || message?.event) {
      case 'message':
        setMessages((prev) => [...prev, message.data]);
        break;
      case 'room.update':
        setRooms((prev) =>
          prev.map((room) => (room.id === message.data.id ? message.data : room))
        );
        break;
      case 'room.create':
        setRooms((prev) => [...prev, message.data]);
        break;
      default:
        console.log('Mensaje no manejado:', message);
    }
  };

  const { isConnected, error, socket } = useWebSocket(handleWebSocketMessage, idUser);


  const handleSubscribe = (room) => {
    if (socket) {
      socket.send(
        JSON.stringify({ type: 'subscribe', event: 'room.update', room })
      );
      console.log(`Suscrito a la sala ${room}`);
    }
  };

  const handleSwitchLight = async (roomId) => {
    try {
      await switchRoomLight(roomId);
      console.log(`Estado de la sala ${roomId} cambiado`);
    } catch (error) {
      console.error('Error al cambiar el estado de la sala:', error);
    }
  };

  return (
    <DefaultLayout>
      <Container className="mt-5">
        <Row>
          <Col md={8}>
            <h2>Salas Disponibles</h2>
            <RoomList
              rooms={rooms}
              onSubscribe={handleSubscribe}
              onSwitchLight={handleSwitchLight}
            />
          </Col>
          <Col md={4}>
            <h2>Mensajes Recibidos</h2>
            <Messages messages={messages} />
            <h2 className="mt-4">Suscribirse a una Sala</h2>
            <Form>
              <Form.Group controlId="formRoomId">
                <Form.Label>ID de la Sala</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el ID de la sala"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                className="mt-3"
                onClick={() => handleSubscribe(roomId)}
              >
                Suscribirse
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default Rooms;

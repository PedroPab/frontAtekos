import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Alert, Form } from 'react-bootstrap';
import DefaultLayout from '../layout/default';
import axios from 'axios';

const Rooms = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    // Fetch rooms from API
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:3012/api/v1/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();

    const ws = new WebSocket('ws://localhost:3012');
    setSocket(ws);

    // Connection opened
    ws.addEventListener('open', () => {
      console.log('%cConectado al servidor WebSocket', 'color: green');
      const data = {
        type: 'identify',
        userId: '1'
      };
      ws.send(JSON.stringify(data));
    });

    // Listen for messages
    ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      console.log('Mensaje recibido:', message);
      switch (message?.type || message?.event) {
        case 'message':
          setMessages((prevMessages) => [...prevMessages, message.data]);
          break;
        case 'room.update':
          setRooms((prevRooms) =>
            prevRooms.map((room) =>
              room.id === message.data.id ? message.data : room
            )
          );
          break;
        case 'room.create':
          setRooms((prevRooms) => [...prevRooms, message.data]);
          break;
        default:
          console.log('Mensaje no manejado:', message);
          break;
      }
    });

    ws.addEventListener('close', () => {
      console.log('%cDesconectado del servidor WebSocket', 'color: red');
    });

    ws.addEventListener('error', (error) => {
      console.error('%cError en la conexión WebSocket:', 'color: red', error);
    });

    return () => {
      ws.close();
    };
  }, []);

  const handleSubscribe = (room) => {
    if (socket) {
      const data = {
        type: 'subscribe',
        event: 'room.update',
        room: room
      };
      socket.send(JSON.stringify(data));
      console.log(`Suscrito a la sala ${room}`);
    }
  };

  const handleSwitchLight = async (roomId) => {
    try {
      await axios.get(`http://localhost:3012/api/v1/rooms/${roomId}/switchLight`);
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
            <ListGroup>
              {rooms.map((room, index) => {
                console.log(room);
                return (
                  <ListGroup.Item key={index}>
                    <Card>
                      <Card.Body>
                        <Card.Title>{room.name}</Card.Title>
                        <Card.Text>
                          {room.description}
                        </Card.Text>
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
                        <Button variant="primary"
                          onClick={() => handleSubscribe(room.id)}>Unirse</Button>
                        <Button variant="secondary" className="ms-2" onClick={() => handleSwitchLight(room.id)}>
                          Cambiar Estado
                        </Button>
                      </Card.Body>
                    </Card>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Col>
          <Col md={4}>
            <h2>Mensajes Recibidos</h2>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <Alert key={index} variant="info">
                    {msg}
                  </Alert>
                ))
              ) : (
                <p>No hay mensajes recibidos.</p>
              )}
            </div>
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
              <Button variant="primary" className="mt-3" onClick={() => handleSubscribe(roomId)}>
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

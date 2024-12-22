import { Card, Button, ListGroup } from 'react-bootstrap';

const RoomList = ({ rooms, onSubscribe, onSwitchLight }) => (
  <ListGroup>
    {rooms.map((room, index) => (
      <ListGroup.Item key={index}>
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
              <strong>Última Actualización:</strong>{' '}
              {new Date(room.dateUpdate).toLocaleString()}
            </Card.Text>
            <Button variant="primary" onClick={() => onSubscribe(room.id)}>
              Unirse
            </Button>
            <Button
              variant="secondary"
              className="ms-2"
              onClick={() => onSwitchLight(room.id)}
            >
              Cambiar Estado
            </Button>
          </Card.Body>
        </Card>
      </ListGroup.Item>
    ))}
  </ListGroup>
);

export default RoomList;

import { Card, Button, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

const RoomList = ({ rooms, onSubscribe }) => (
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
              href={`/rooms/${room.id}`}
              variant="secondary"
              className="ms-2"
            >
              Ver mas
            </Button>
          </Card.Body>
        </Card>
      </ListGroup.Item>
    ))}
  </ListGroup>
);

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      state: PropTypes.bool,
      dateUpdate: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSubscribe: PropTypes.func.isRequired,
};

export default RoomList;

import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const FocusCard = ({ focus }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/focus/${focus.id}`);
  };

  return (
    <Card className="h-100 shadow-sm border-10" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="fs-5 text-truncate">{focus.name}</Card.Title>
          <Card.Text className="text-muted">
            {focus.description.length > 100 ? `${focus.description.substring(0, 100)}...` : focus.description}
          </Card.Text>
        </div>
        <div className="mt-2">
          <Card.Text>
            <span className="d-flex justify-content-between">
              <small className={`badge bg-${focus.state ? 'success' : 'danger'}`}>
                {focus.state ? 'Activo' : 'Inactivo'}
              </small>
              <small className="text-muted">
                <i className="bi bi-calendar-event me-1"></i>
                {new Date(focus.dateUpdate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
              </small>
              <small className="text-muted"> {focus.id}</small>
            </span>
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

FocusCard.propTypes = {
  focus: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    state: PropTypes.bool.isRequired,
    dateUpdate: PropTypes.string.isRequired,
  }).isRequired,
};

export default FocusCard;

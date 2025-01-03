import { Card } from "react-bootstrap";
import PropTypes from 'prop-types';

const CardCreate = ({ handleShowModal, messageText }) => {
  return (
    <Card className="h-100 shadow-sm border-10" onClick={handleShowModal}>
      <Card.Body className="d-flex flex-column justify-content-center align-items-center">
        <Card.Title className="fs-1">+</Card.Title>
        <Card.Text className="text-muted text-center">
          {messageText}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

CardCreate.propTypes = {
  handleShowModal: PropTypes.func.isRequired,
  messageText: PropTypes.string.isRequired,
};

export default CardCreate;

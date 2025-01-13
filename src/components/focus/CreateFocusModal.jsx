import PropTypes from 'prop-types';
import { Button, Form } from "react-bootstrap";
import ReusableModal from '../common/ReusableModal';

const CreateFocusModal = ({ showModal, handleCloseModal, handleSubmit, handleChange, newFocus }) => {
  return (
    <ReusableModal show={showModal} handleClose={handleCloseModal} title="Crear Nuevo Focus">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formFocusName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre"
            name="name"
            value={newFocus.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formFocusDescription">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Ingrese la descripción"
            name="description"
            value={newFocus.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formFocusId">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el ID"
            name="id"
            value={newFocus.id}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Crear
        </Button>
      </Form>
    </ReusableModal>
  );
};

CreateFocusModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  newFocus: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string
  }).isRequired,
};

export default CreateFocusModal;

import PropTypes from 'prop-types';
import { Button, Form } from "react-bootstrap";
import ReusableModal from '../common/ReusableModal';

const CreateFocusElementModal = ({ showModal, handleCloseModal, handleSubmit, handleChange, newFocusElement }) => {
  return (
    <ReusableModal show={showModal} handleClose={handleCloseModal} title="Crear Nuevo Focus">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formFocusName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre"
            name="name"
            value={newFocusElement.name}
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
            value={newFocusElement.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formFocusType">
          <Form.Label>Tipo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el tipo"
            name="type"
            value={newFocusElement.type}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formFocusPhoto">
          <Form.Label>Foto</Form.Label>
          <Form.Control
            type="file"
            name="photo"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Crear
        </Button>
      </Form>
    </ReusableModal>
  );
};

CreateFocusElementModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  newFocusElement: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['img', 'text']).isRequired,
    photo: PropTypes.object
  }).isRequired,
};

export default CreateFocusElementModal;

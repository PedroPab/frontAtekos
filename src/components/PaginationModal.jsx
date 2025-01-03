import PropTypes from 'prop-types';
import { Modal, Button, Pagination } from 'react-bootstrap';

const PaginationModal = ({ showModal, handleCloseModal, page, handlePageChange }) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Cambiar página</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Pagination className="justify-content-center">
          <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
          <Pagination.Item active>{page}</Pagination.Item>
          <Pagination.Next onClick={() => handlePageChange(page + 1)} />
        </Pagination>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

PaginationModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default PaginationModal;

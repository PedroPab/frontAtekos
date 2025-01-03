import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Spinner } from 'react-bootstrap';
import imgsService from '../../apis/imgs/imgsService';

const VITE_PUBLIC_API_URL = import.meta.env.VITE_PUBLIC_API_URL;

const FocusElementCard = ({ element }) => {
  const [loadingElementPure, setLoadingElementPure] = useState(true);
  const [errorElementPure, setErrorElementPure] = useState('');
  const [srcElementPure, setSrcElementPure] = useState(null);

  useEffect(() => {
    const fetchElementPure = async () => {
      try {
        const data = await imgsService.getImgById(element.elementPureId);
        setSrcElementPure(`${VITE_PUBLIC_API_URL}${data.urlPublic}`);
      } catch (error) {
        console.log('Error fetching image:', error);
        setErrorElementPure('No se pudo cargar la imagen');
      } finally {
        setLoadingElementPure(false);
      }
    };
    fetchElementPure();
  }, [element.elementPureId]);

  return (
    <Card className="h-100 shadow-sm border-10 hover-shadow">
      {loadingElementPure ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : errorElementPure ? (
        <div className="text-center text-danger" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>{errorElementPure}</p>
        </div>
      ) : (
        <div style={{ position: 'relative' }}>
          <Card.Img
            variant="top"
            src={srcElementPure}
            alt={element.name}
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <small className="text-muted" style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <span className="badge bg-light text-dark">{element.type}</span>
          </small>
        </div>
      )}

      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title className="text-truncate">{element.name}</Card.Title>
        <Card.Text className="text-truncate">{element.description || 'Sin descripción disponible.'}</Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <small>
            <span className={`badge bg-${element.state ? 'success' : 'danger'}`}>
              {element.state ? 'Activo' : 'Inactivo'}
            </span>
          </small>

          <small className="text-muted">
            <i className="bi bi-calendar-event me-1"></i>
            {element.id}
          </small>

        </div>
      </Card.Body>
    </Card>
  );
};

FocusElementCard.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.string.isRequired,
    focusProjectId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    dateCreate: PropTypes.string.isRequired,
    dateUpdate: PropTypes.string.isRequired,
    state: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    data: PropTypes.object,
    elementPureId: PropTypes.string.isRequired,
  }).isRequired,
};

export default FocusElementCard;

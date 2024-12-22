import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../layout/default';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <DefaultLayout>
      <Container className="mt-5 text-center">
        <Row>
          <Col>
            <h1>404</h1>
            <p>La página que estás buscando no existe.</p>
            <Button variant="primary" onClick={handleGoHome}>
              Volver al Inicio
            </Button>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default NotFound;

import { useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Spinner, Container, Row, Col } from 'react-bootstrap';
import DefaultLayout from '../layout/default';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  }, [navigate]);

  return (
    <DefaultLayout>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <Spinner animation="border" />
            <p>Cerrando sesión...</p>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default Logout;

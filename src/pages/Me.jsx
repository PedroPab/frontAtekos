import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import DefaultLayout from '../layout/default';

const Me = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      console.log('Usuario autenticado:', user)
    });

    return () => unsubscribe();
  }, []);

  return (
    <DefaultLayout>
      <Container className="mt-5">
        <Row>
          <Col>
            <h2>Mi Perfil</h2>
            {user ? (
              <Card>
                <Card.Body>
                  <Row className="mb-3">
                    <Col md={4} className="text-center">
                      <Image src={user.photoURL} roundedCircle fluid />
                    </Col>
                    <Col md={8}>
                      <Card.Title>{user.displayName}</Card.Title>
                      <Card.Text>
                        <strong>Email:</strong> {user.email}
                      </Card.Text>
                      <Card.Text>
                        <strong>UID:</strong> {user.uid}
                      </Card.Text>

                      <Card.Text>
                        <strong>Número de Teléfono:</strong> {user.phoneNumber || 'No disponible'}
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ) : (
              <p>No hay usuario autenticado.</p>
            )}
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
}

export default Me;

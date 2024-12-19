import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import DefaultLayout from '../layout/default';

const Home = () => {
  return (
    <DefaultLayout>
      <Container className="mt-5">
        <Row className="mb-4">
          <Col>
            <h2>Bienvenido a Atekoss</h2>
            <p>Explora nuestras características y servicios.</p>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Característica 1</Card.Title>
                <Card.Text>
                  Descripción breve de la característica 1.
                </Card.Text>
                <Button variant="primary">Ver más</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Característica 2</Card.Title>
                <Card.Text>
                  Descripción breve de la característica 2.
                </Card.Text>
                <Button variant="primary">Ver más</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Característica 3</Card.Title>
                <Card.Text>
                  Descripción breve de la característica 3.
                </Card.Text>
                <Button variant="primary">Ver más</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
}

export default Home;
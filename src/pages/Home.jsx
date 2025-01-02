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
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Rooms</Card.Title>
                <Card.Text>
                  <p>
                    Tengo varios dispositivos conectados por websockets, solo llamo &apos;Rooms&apos; porque el primero enciende la luz de mi cuarto.
                  </p>
                  <p>
                    Aquí puedes ver todos estos dispositivos y sus tipos
                  </p>
                </Card.Text>
                <Button variant="primary" href="/rooms">Ver más</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Focus</Card.Title>
                <Card.Text>
                  <p>
                    Visualiza los Proyectos y Elementos en el que tienes un enfoque.
                  </p>
                  <p>
                    También puedes crear tus &apos;Focus&apos; propios
                  </p>
                </Card.Text>
                <Button variant="primary" href="/focus">Ver más</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
}

export default Home;
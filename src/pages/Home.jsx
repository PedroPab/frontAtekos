import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import DefaultLayout from '../layout/default';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <DefaultLayout>
      <Helmet>
        <title>Home - Atekoss</title>
        <meta name="description" content="Bienvenido a Atekoss. Explora nuestras características y servicios." />
      </Helmet>
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
                  Tengo varios dispositivos conectados por websockets, solo llamo &apos;Rooms&apos; porque el primero enciende la luz de mi cuarto.
                </Card.Text>
                <Card.Text>
                  Aquí puedes ver todos estos dispositivos y sus tipos
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
                  Visualiza los Proyectos y Elementos en el que tienes un enfoque.
                </Card.Text>
                <Card.Text>
                  También puedes crear tus &apos;Focus&apos; propios
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
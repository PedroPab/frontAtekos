import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import DefaultLayout from '../layout/default';

const Dashboard = () => {
  return (
    <DefaultLayout>
      <Container className="mt-5">
        <Row className="mb-4">
          <Col>
            <h2>Dashboard</h2>
            <p>Resumen de la actividad reciente y estadísticas.</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Estadísticas</Card.Title>
                <Card.Text>
                  Aquí puedes ver un resumen de las estadísticas clave.
                </Card.Text>
                <Button variant="primary">Ver detalles</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Actividad Reciente</Card.Title>
                <Card.Text>
                  Un vistazo rápido a la actividad reciente.
                </Card.Text>
                <Button variant="primary">Ver más</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Usuarios Recientes</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Fecha de Registro</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Juan Pérez</td>
                  <td>juan.perez@example.com</td>
                  <td>01/01/2023</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>María López</td>
                  <td>maria.lopez@example.com</td>
                  <td>02/01/2023</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Carlos García</td>
                  <td>carlos.garcia@example.com</td>
                  <td>03/01/2023</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
}

export default Dashboard;

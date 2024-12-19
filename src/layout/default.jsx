import { Container, Navbar, Nav, } from 'react-bootstrap';

const DefaultLayout = ({ children }) => {
  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Atekoss</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Inicio</Nav.Link>
              <Nav.Link href="/login">login</Nav.Link>
              <Nav.Link href="/register">Registro</Nav.Link>
              {/* cerrar session */}
              <Nav.Link href="/logout">Cerrar session</Nav.Link>
              {/* <Nav.Link href="#contact">Contacto</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Layout */}
      <Container >
        {children}
      </Container>
    </div>
  );
};

export default DefaultLayout;

import { Container, Navbar, Nav, } from 'react-bootstrap';

const DefaultLayout = ({ children }) => {

  // Cambiar el tema de la aplicación a oscuro
  const htmlElement = document.querySelector('html');
  htmlElement.setAttribute('data-bs-theme', 'dark');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar */}
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="#home">Atekoss</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Inicio</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Registro</Nav.Link>
              {/* cerrar sesión */}
              <Nav.Link href="/logout">Cerrar sesión</Nav.Link>
              {/* <Nav.Link href="#contact">Contacto</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Layout */}
      <container style={{ flex: 1 }}>
        {children}
      </container>

      <footer className={"text-center"}>
        <div className="d-flex justify-content-center">
          ( ˶ˆᗜˆ˵ )
        </div>
      </footer>
    </div>
  );
};

export default DefaultLayout;

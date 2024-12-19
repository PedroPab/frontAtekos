import { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import DefaultLayout from '../layout/default';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de inicio de sesión
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <DefaultLayout>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2 className="text-center">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-4 w-100">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default Login;

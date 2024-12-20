import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Image, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import DefaultLayout from '../layout/default';
import { requestOTP, verifyOTP } from '../firebase/firebase-otp';

const Me = () => {
  const [user, setUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('3054489598');
  const [otp, setOtp] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      console.log('Usuario autenticado:', user);
    });

    return () => unsubscribe();
  }, []);

  const handleSendOtp = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      requestOTP(phoneNumber);
      setOtpSent(true);
      setSuccess('OTP enviado al número de teléfono.');
    } catch (error) {
      console.error('Error al enviar OTP:', error);
      setError('No se pudo enviar el OTP. Verifica el número e inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await verifyOTP(otp);
      setSuccess('Número de teléfono verificado y vinculado exitosamente.');
      setOtp('');
      setOtpSent(false);
      setPhoneNumber('');
    } catch (error) {
      console.error('Error al verificar OTP:', error);
      setError('No se pudo verificar el OTP. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <Container className="mt-5">
        <Row>
          <Col>
            <h2>Mi Perfil</h2>
            <div id="recaptcha-container"></div>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
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

            {user && !user.phoneNumber && (
              <Card className="mt-4">
                <Card.Body>
                  <h4>Vincular Número de Teléfono</h4>
                  <Form>
                    <Form.Group controlId="formPhoneNumber">
                      <Form.Label>Número de Teléfono</Form.Label>
                      <Form.Control
                        type="tel"
                        autoComplete='tel'
                        title='phone'
                        autoSave='on'
                        placeholder="Ingresa tu número de teléfono"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        disabled={otpSent || loading}
                      />
                    </Form.Group>

                    {otpSent && (
                      <Form.Group controlId="formOtp" className="mt-3">
                        <Form.Label>OTP</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Ingresa el código OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          disabled={loading}
                        />
                      </Form.Group>
                    )}

                    <Button
                      variant="primary"
                      className="mt-3"
                      onClick={otpSent ? handleVerifyOtp : handleSendOtp}
                      disabled={loading || (!otpSent && !phoneNumber)}
                    >
                      {loading ? (
                        <Spinner animation="border" size="sm" />
                      ) : otpSent ? (
                        'Verificar OTP'
                      ) : (
                        'Enviar OTP'
                      )}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default Me;

import { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert, Spinner } from 'react-bootstrap';
import Layout from '../layout/default';
import { auth } from '../firebase/firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Nuevo estado para controlar la carga
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const location = useLocation();

  // Determinar la ruta de redirección (si existe)
  const from = location.state?.from?.pathname || '/me';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Activar indicador de carga
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess('¡Inicio de sesión exitoso!');
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      switch (error.code) {
        case 'auth/wrong-password':
          setError('La contraseña es incorrecta. Inténtalo de nuevo.');
          break;
        case 'auth/user-not-found':
          setError('No se encontró una cuenta con este correo electrónico.');
          break;
        case 'auth/invalid-email':
          setError('El formato del correo electrónico no es válido.');
          break;
        default:
          setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
      }
    } finally {
      setLoading(false); // Desactivar indicador de carga
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true); // Activar indicador de carga
    try {
      await signInWithPopup(auth, provider);
      setSuccess('¡Inicio de sesión con Google exitoso!');
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          setError('La ventana de inicio de sesión se cerró antes de completar el proceso.');
          break;
        default:
          setError('Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.');
      }
    } finally {
      setLoading(false); // Desactivar indicador de carga
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Inicio de Sesión</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Ingresa tu correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Iniciar Sesión'}
              </button>
            </form>
            <hr />
            <button
              type="button"
              className="btn btn-outline-dark w-100"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <>
                  <img
                    src="https://img.icons8.com/color/16/000000/google-logo.png"
                    alt="Google logo"
                    className="me-2"
                  />
                  Iniciar sesión con Google
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

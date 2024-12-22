import { Alert } from 'react-bootstrap';

const Messages = ({ messages }) => (
  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
    {messages.length > 0 ? (
      messages.map((msg, index) => (
        <Alert key={index} variant="info">
          {msg}
        </Alert>
      ))
    ) : (
      <p>No hay mensajes recibidos.</p>
    )}
  </div>
);

export default Messages;

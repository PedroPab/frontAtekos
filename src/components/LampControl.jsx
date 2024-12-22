import { Card, Button } from 'react-bootstrap';
import { FaLightbulb } from 'react-icons/fa';

const LampControl = ({ state, name, toggleLamp }) => {

  return (
    <div
      className='mt-3'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '100vh',
        // backgroundColor: state ? '#fff9c4' : '#f5f5f5', // Fondo dinámico
      }}
    >
      <Card
        style={{
          border: 'none',
          textAlign: 'center',
          padding: '2rem',
          boxShadow: state ? '0px 4px 10px rgba(255, 193, 7, 0.7)' : 'none',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        <Card.Body>
          <FaLightbulb
            size={80}
            color={state ? '#ffc107' : '#6c757d'} // Color dinámico
          />
          <Card.Title className="mt-3">{name}</Card.Title>
          <Card.Text>
            Estado: {state ? 'Encendida' : 'Apagada'}
          </Card.Text>
          <Button
            variant={state ? 'warning' : 'secondary'}
            onClick={toggleLamp}
          >
            {state ? 'Apagar' : 'Encender'}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LampControl;

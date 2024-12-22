import { useState, useEffect } from 'react';

export const useWebSocket = (onMessage, userId) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3012');

    ws.addEventListener('open', () => {
      console.log('%cConectado al servidor WebSocket', 'color: green');
      ws.send(JSON.stringify({ type: 'identify', userId }));
      setIsConnected(true);
    });

    ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      onMessage(message);
    });

    ws.addEventListener('close', () => {
      console.log('%cDesconectado del servidor WebSocket', 'color: red');
      setIsConnected(false);
    });

    ws.addEventListener('error', (error) => {
      console.error('%cError en WebSocket:', 'color: red', error);
      setError(error);
    });

    setSocket(ws);

    return () => ws.close();
  }, [userId]);

  return { isConnected, error, socket };
};

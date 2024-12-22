export const initializeWebSocket = (onMessage, userId) => {
  const ws = new WebSocket('ws://localhost:3012');

  ws.addEventListener('open', () => {
    console.log('%cConectado al servidor WebSocket', 'color: green');
    ws.send(JSON.stringify({ type: 'identify', userId }));
  });

  ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    onMessage(message);
  });

  ws.addEventListener('close', () =>
    console.log('%cDesconectado del servidor WebSocket', 'color: red')
  );

  ws.addEventListener('error', (error) =>
    console.error('%cError en WebSocket:', 'color: red', error)
  );

  return ws;
};

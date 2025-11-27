import { io, Socket } from 'socket.io-client';

const URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:5001';

// Create a single socket instance
// autoConnect: false prevents it from connecting automatically on page load
export const socket: Socket = io(URL, {
  autoConnect: false,
});
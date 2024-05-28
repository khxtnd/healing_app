import { Socket, io } from 'socket.io-client';
import { CallInfo } from './CallInfo';

let socket: Socket | null
export const SocketIO = {
  getInstcance: () => {
    if (!socket) {
      socket = io('http://192.168.1.236:3500', {
        secure: true,
        transports: ['websocket'],
        query: {
          callerId: CallInfo.getMyId()
        },
      })
    }

    return socket
  },

  disconnection: () => {
    if (socket) {
      socket?.disconnect
    }
    socket = null
  }
}

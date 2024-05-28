import { CallInfo } from "./CallInfo";

let socket: WebSocket | null;

export const WebSocketUntils = {
    getInstance: () => {
        if (!socket) {
            const clientId = CallInfo.getMyId();
            socket = new WebSocket(`ws://192.168.1.236:3000?id=${clientId}`);
        }
        return socket;
    },
    disconnect: () => {
        if (socket) {
            socket.close
        }
        socket = null
    }
};

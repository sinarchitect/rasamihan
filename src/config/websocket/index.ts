import WebSocket from 'websocket';
import config from "..";

let socket: WebSocket.w3cwebsocket;

export const connectWebSocket = (url: string, onMessage: (message: any) => void) => {
    socket = new WebSocket.w3cwebsocket(`${config.websocketUrl}${url}`);

    socket.onopen = () => {
        console.log('WebSocket is Working');
    };

    socket.onmessage = (event) => {
        onMessage(JSON.parse(event.data as string));
    };
};

export const disconnectWebSocket = () => {
    if (socket) {
        socket.close();
    }
};
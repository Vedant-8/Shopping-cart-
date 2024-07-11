import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

class WebSocketService {
  constructor(onMessageReceived) {
    this.sock = new SockJS("http://localhost:8080/ws");
    this.stompClient = new Client({
      webSocketFactory: () => this.sock,
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(str);
      },
    });

    this.stompClient.onConnect = (frame) => {
      console.log("Connected: " + frame);
      this.stompClient.subscribe("/topic/sales", (message) => {
        onMessageReceived(message.body);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    this.stompClient.activate();
  }

  disconnect() {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.deactivate();
    }
  }
}

export default WebSocketService;

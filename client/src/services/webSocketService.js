// src/services/webSocketService.js
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class WebSocketService {
  constructor() {
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
      this.stompClient.subscribe("/topic/sales", this.onMessageReceived);
    };

    this.stompClient.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    this.stompClient.activate();
  }

  onMessageReceived = (message) => {
    const salesMessage = message.body;
    console.log("Sales Message: " + salesMessage);
    if (this.messageHandler) {
      this.messageHandler(salesMessage);
    }
  };

  setMessageHandler(handler) {
    this.messageHandler = handler;
  }
}

export default new WebSocketService();

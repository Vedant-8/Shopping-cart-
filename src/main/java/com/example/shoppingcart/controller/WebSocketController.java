package com.example.shoppingcart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Scheduled(fixedRate = 10000) // Send a message every 10 seconds
    public void sendSaleMessage() {
        String message = "This is a sales message!";
        messagingTemplate.convertAndSend("/topic/sales", message);
    }
}

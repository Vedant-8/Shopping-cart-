package com.example.shoppingcart.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaListenerService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @KafkaListener(topics = "sales_topic", groupId = "sales_group")
    public void listen(String message) {
        System.out.println("Received message: " + message);
        messagingTemplate.convertAndSend("/topic/sales", message);
    }
}

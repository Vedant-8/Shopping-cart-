package com.example.shoppingcart.controller;

import java.security.Principal;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.shoppingcart.model.Order;
import com.example.shoppingcart.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    /**
     * GET endpoint to retrieve all orders.
     * @return List of all orders.
     */
    @GetMapping()
    public List<Order> getAllOrders() {
        return orderService.findAll();
    }
    
    /**
     * POST endpoint to place a new order.
     * @param order The order details sent in the request body.
     * @param principal Principal object representing the authenticated user.
     * @return The saved Order object.
     */
    @PostMapping()
    public Order placeOrder(@RequestBody Order order, Principal principal) {
        // Set order details
        order.setOrderDate(new Date());
        
        // Example logic to associate order with the logged-in user
        // Replace with your actual logic to fetch user details
        // For example: order.setUser(userService.findByUsername(principal.getName()));
        
        return orderService.save(order);
    }
}

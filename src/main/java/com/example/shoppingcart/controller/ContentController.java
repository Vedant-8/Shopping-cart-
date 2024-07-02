package com.example.shoppingcart.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
@CrossOrigin
public class ContentController {

    @GetMapping("/home")
    public String handleWelcome() {
        return "home";
    }

    @GetMapping("/admin/home")
    public String handleAdminHome() {
        return "admin_home";
    }

    @GetMapping("/user/home")
    public String handleUserHome() {
        return "user_home";
    }
    
    @GetMapping("/login")
    public String handleLogin() {
        return "custom_login";
    }

    @GetMapping("/register")
    public String handleRegister() {
        return "register";
    }
    
    @GetMapping("/user/orders")
    public String handleOrders() {
        return "orders";
    }

    @GetMapping("/admin/products")
    public String handleProducts() {
        return "products";
    }
    
}

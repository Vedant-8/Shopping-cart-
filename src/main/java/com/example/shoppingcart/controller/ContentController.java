package com.example.shoppingcart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.shoppingcart.jwt.JwtService;
import com.example.shoppingcart.jwt.LoginForm;
import com.example.shoppingcart.service.MyUserDetailService;


@Controller
@CrossOrigin
public class ContentController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private MyUserDetailService myUserDetailService;

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

    @PostMapping("/authenticate")
    public String authenticateAndGetToken(@RequestBody LoginForm loginForm) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginForm.username(), loginForm.password()
        ));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(myUserDetailService.loadUserByUsername(loginForm.username()));
        } else {
            throw new UsernameNotFoundException("Invalid credentials");
        }
    }
    
}

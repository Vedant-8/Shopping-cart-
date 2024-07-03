package com.example.shoppingcart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.shoppingcart.model.LoginRequest;
import com.example.shoppingcart.model.MyUser;
import com.example.shoppingcart.service.MyUserDetailService;
import com.example.shoppingcart.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private MyUserDetailService userDetailService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody MyUser user) {
        if (userService.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already taken!");
        }
        userService.saveUser(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
    
        SecurityContextHolder.getContext().setAuthentication(authentication);
    
        // Load user details after successful authentication
        UserDetails userDetails = userDetailService.loadUserByUsername(loginRequest.getUsername());
    
        // Optionally return userDetails or any other response based on your application needs
        // Example: return ResponseEntity.ok(userDetails);
    
        // Here you would normally generate and return a JWT token or manage session
    
        return ResponseEntity.ok(userDetails);
    }
    

    // Additional endpoints can be added as needed
}

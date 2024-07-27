package com.example.shoppingcart.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.shoppingcart.jwt.JwtService;
import com.example.shoppingcart.jwt.LoginForm;
import com.example.shoppingcart.model.MyUser;
import com.example.shoppingcart.service.MyUserDetailService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private MyUserDetailService myUserDetailService;

    @PostMapping("/login")
    public Map<String, String> authenticateAndGetToken(@RequestBody LoginForm loginForm) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginForm.username(), loginForm.password())
        );
        if (authentication.isAuthenticated()) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtService.generateToken(userDetails);
            String role = userDetails.getAuthorities().iterator().next().getAuthority();

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("role", role);
            return response;
        } else {
            throw new UsernameNotFoundException("Invalid credentials");
        }
    }

    @GetMapping("/profile")
    public MyUser getProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();  
        UserDetails userDetails = myUserDetailService.loadUserByUsername(username);
        return myUserDetailService.getUserByUsername(userDetails.getUsername());
    }

    @PutMapping("/profile")
    public MyUser updateProfile(@RequestBody MyUser updatedUser) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName(); 
        if (!currentUsername.equals(updatedUser.getUsername())) {
            throw new IllegalArgumentException("Cannot update profile with a different username");
        }

        return myUserDetailService.updateUserProfile(updatedUser);
    }
}
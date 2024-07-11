package com.example.shoppingcart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.shoppingcart.model.MyUser;
import com.example.shoppingcart.service.MyUserDetailService;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class ProfileController {

    @Autowired
    private MyUserDetailService myUserDetailService;

    @GetMapping("/profile")
    public MyUser getProfile(@AuthenticationPrincipal MyUser currentUser) {
        // Load user details using MyUserDetailService
        MyUser user = (MyUser) myUserDetailService.loadUserByUsername(currentUser.getUsername());
        // Return the user profile information
        return user;
    }
}

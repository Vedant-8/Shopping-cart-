package com.example.shoppingcart.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.example.shoppingcart.model.MyUser;
import com.example.shoppingcart.repository.MyUserRepository;


@RestController
@CrossOrigin
public class RegistrationController {

    @Autowired
    private MyUserRepository myUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public RedirectView createUser(@ModelAttribute MyUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        myUserRepository.save(user);
        return new RedirectView("/login");
    }

    @GetMapping("/profile")
    public ModelAndView getProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        MyUser user = myUserRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        
        ModelAndView mav = new ModelAndView("profile");
        mav.addObject("user", user);
        return mav;
    }
    
}

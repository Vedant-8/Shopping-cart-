package com.example.shoppingcart.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.shoppingcart.model.MyUser;
import com.example.shoppingcart.repository.MyUserRepository;

@Service
public class UserService {

    @Autowired
    private MyUserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public void saveUser(MyUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }
}
